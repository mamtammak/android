

Module_employees.controller('employee_controller', function($scope,StoreResponse,$mdDialog,AmsValues,MenuList,$timeout,$mdSidenav,$ionicPopup,$state,$http,AmsConstants,DetailValues,EmpProfilePic,PersonelValues,EmergencyValues,BankValues,$window,$mdDialog,ConnectivityService,$ionicViewSwitcher,$http) {

            $scope.loggedInUserName = AmsValues.HRMS_name;
            $scope.OrganizationName = AmsValues.HRMS_orgName;
            if(AmsValues.HRMS_orgLogo != ""){
             $scope.OrganisationLogo = AmsConstants.url_notify_web+AmsValues.HRMS_orgLogo;
            }
            else{
             $scope.OrganisationLogo = "img/brand_logo.png";
            }
            $scope.url_profile = AmsConstants.url_hrms +"getProfile/"+AmsValues.HRMS_email;
            $scope.url_pic = AmsConstants.url_onBoard;
            $scope.url_pic_default = 'img/ic_face_black.png';
            $scope.emp_list = false;
            $scope.norecords = false;
            $scope.ONBOARD_BTN = false;

             $scope.menuItem=MenuList.get();

                         $scope.LoggedinName = AmsValues.HRMS_name;
                         $scope.toggleLeft = function(menuId) {
                             $mdSidenav(menuId).toggle();
                           };
$scope.goToMenuItem = function(menuitem){
var page = StoreResponse.goToMenuItemPage(menuitem);
$mdSidenav('leftE').close()
.then(function () {
    $ionicViewSwitcher.nextTransition('none');
    $state.go(page);
});

};

$scope.init = function () {
 initializeEmp();
};

            $scope.emp_profile = function(email,item_pic){
            $scope.emailID = email;
            if(item_pic == undefined){
                EmpProfilePic.original =  'img/ic_face_Profile.png';
            }
            else{
            EmpProfilePic.original =  AmsConstants.url_onBoard+item_pic;
            }

            var URL_Profile = AmsConstants.url_hrms +"getProfile/"+email;
           $scope.loader = true;
           setTimeout(function(){

           var response_getProfile = ConnectivityService.AjaxRequest(URL_Profile);

           if(response_getProfile != null && response_getProfile != "undefined"){
            var emp_p = response_getProfile;
            console.log(emp_p);

           angular.forEach(response_getProfile, function(value, key){
                          DetailValues.name = value.name;
                          localStorage.setItem("Temp_emp_name",value.email);
                          DetailValues.job_title = value.job_title;
                          DetailValues.email = value.email;
                          DetailValues.joining_date = value.joining_date;
                          DetailValues.workingHoursShift = value.workingHours;
                          if(!value.reporting_to){DetailValues.reporting_to = 'NA';}
                          else{
                          DetailValues.reporting_to = value.reporting_to;
                          }

                          DetailValues.employee_status = value.employee_status;
                          DetailValues.employee_type = value.employee_type;
                          DetailValues.bio = value.bio;

                          //personel values
                          if(value.personal_info != null){
                          PersonelValues.address = value.personal_info.address;
                          PersonelValues.city = value.personal_info.city;
                          PersonelValues.country = value.personal_info.country;
                          PersonelValues.postal_code = value.personal_info.postal_code;
                          PersonelValues.dob = value.personal_info.dob;
                          PersonelValues.gender = value.personal_info.gender;
                          PersonelValues.landline = value.personal_info.landline;
                          PersonelValues.marital_status = value.personal_info.marital_status;
                          PersonelValues.state = value.personal_info.state;
                          PersonelValues.mobile = value.personal_info.mobile;
                          }
                          else{
                          PersonelValues.address = "";
                          PersonelValues.city = "";
                          PersonelValues.country = "";
                          PersonelValues.postal_code = "";
                          PersonelValues.dob = "";
                          PersonelValues.gender = "";
                          PersonelValues.landline = "";
                          PersonelValues.marital_status = "";
                          PersonelValues.state = "";
                          PersonelValues.mobile = "";
                          }


                          //emergency values
                          if(value.emergency_info != null){
                          EmergencyValues.contact = value.emergency_info.contact;
                          EmergencyValues.first_name = value.emergency_info.first_name;
                          EmergencyValues.last_name = value.emergency_info.last_name;
                          EmergencyValues.relationship = value.emergency_info.relationship;
                          }
                          else{
                          EmergencyValues.contact = "";
                          EmergencyValues.first_name = "";
                          EmergencyValues.last_name = "";
                          EmergencyValues.relationship = "";
                          }


                          //Bank values
                          if(value.bank_info != null){
                          BankValues.ifsc = value.bank_info.IFSC;
                          BankValues.account_number = value.bank_info.account_number;
                          BankValues.account_type = value.bank_info.account_type;
                          BankValues.name = value.bank_info.bank_name;
                          }
                          else{
                          BankValues.ifsc = "";
                          BankValues.account_number = "";
                          BankValues.account_type = "";
                          BankValues.name = "";
                          }


                          //var projects1 = value.projects; console.log(projects1);
                          if(value.projects != null){
                          StoreResponse.store_projects(value.projects);
                          if(value.projects[0] != null){
                              StoreResponse.store_members(value.projects[0].members);
                             }
                          }


                          if(value.skill_set != undefined || value.skill_set != null){
                          $window.localStorage.setItem("Skills",value.skill_set);
                          }


                       });

                       $timeout( function(){
                         $scope.loader = false;
                         $ionicViewSwitcher.nextTransition('none');
                         $state.go('employee_profile');
                       },100);
                       }
                       else{
                       return false;
                       }
                       $scope.loader = false;

           },200);


            };

            $scope.addOnBoard = function() {
            $ionicViewSwitcher.nextTransition('none');
            $state.go('onBoard');

            };

            $scope.filterFunction = function(element) {
                return element.name.match(/^Ma/) ? true : false;
              };



            function initializeEmp(){
            $scope.myface =  AmsConstants.url_onBoard+AmsValues.HRMS_ProfilePic_thumbnail;
            $scope.url = AmsConstants.url_hrms+'getEmployees?org='+AmsValues.HRMS_orgId;
            $scope.loader = true;
            setTimeout(function(){

            ConnectivityService.PostData($scope.url)
                .then(function(response) {
                $window.localStorage.setItem("w_response",response);
                                   $window.localStorage.getItem("w_response");
                                   $scope.emp_list = true;
                                   $scope.norecords = false;
                if(response != null){
                   $window.localStorage.setItem("w_response",response);
                   $window.localStorage.getItem("w_response");
                   $scope.emp_list = true;
                   $scope.norecords = false;
                   $scope.emp_details = response;
                   console.log($scope.emp_details);
                   $scope.norecords = false;
                   $('.nodata').html("");
                }
                else{
                  $scope.emp_list = false;
                  $scope.norecords = true;
                  $('.nodata').html("<center><p>No records found.</p></center>");
                }

                $scope.loader = false;
            },
            function(jqxhr) {
               $scope.loader = false;
               var status = navigator.onLine;
               if (status) {
                   $scope.emp_list = true;
                   $scope.norecords = false;
                   $('.nodata').html("");
                   console.log("internet is there..");
               }
               else{
                  $scope.emp_list = false;
                  $scope.norecords = true;
                  $('.nodata').html("<center><p>Please check your internet connection.</p><p>Click to refresh.</p></center>");
               }

            });
            },200);

            };

            $scope.EditMyProfile = function(){
            $ionicViewSwitcher.nextTransition('none');
            $state.go("myProfileEdit");
            };

            $scope.doRefresh = function() {
                initializeEmp();

              };

         $scope.showSearchbar = true;
         $scope.hideSearchbar = false;

         $scope.showSearch = function(){
         $scope.showSearchbar = false;
         $scope.hideSearchbar = true;
        };

                 $scope.hideSearch = function(){
                      $scope.showSearchbar = true;
                      $scope.hideSearchbar = false;
                      $ionicViewSwitcher.nextTransition('none');
                      $state.reload();
                 };

                 $scope.swipeDOWN = function(event){

                 if(event == 0 || event == 1 || event == 3){
                    $timeout( function() {
                     $scope.loader = false;
                     initializeEmp();
                     }, 100);
                 }

                 };

                 $scope.getListHeight = function() {
                   return {height: '' + ($window.innerHeight - 72) + 'px'};
                 };

                 $window.addEventListener('resize', onResize);
                 function onResize() {
                   $scope.$digest();
                 }
                 $scope.$on('$destroy', function() {
                   $window.removeEventListener('resize', onResize);
                 });



            });



