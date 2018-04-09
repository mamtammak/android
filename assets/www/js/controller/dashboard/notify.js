

HRMS_Module.controller('notify', function($scope,$timeout,$mdSidenav,$ionicPopup,$state,$http,AmsConstants,AmsValues,$window,$mdDialog,$ionicViewSwitcher,StoreResponse,ConnectivityService,StoreResponse,$ionicPlatform,$ionicHistory,$interval,$ionicPopover,$rootScope,DetailValues,EmpProfilePic,PersonelValues,EmergencyValues,BankValues,$location,$sce) {
$scope.showNotify = false;
$scope.norecords = false;
$scope.url_pic = AmsConstants.url_onBoard;

/*var socket = io.connect(AmsConstants.url_notify_web+'/notif');
socket.on(AmsValues.HRMS_orgId + '/' + AmsValues.HRMS__a + '/' + AmsValues.HRMS__id, function (data) {
console.log(data);
});*/
$scope.initNotifications = function(){
refreshNotify();
};


function refreshNotify(){
var url_notifyWeb = AmsConstants.url_notify_web+"notifs/notifications/"+AmsValues.HRMS_orgId +"/"+ AmsValues.HRMS__a +"/"+AmsValues.HRMS__id;
$scope.loader = true;
    setTimeout(function(){
        ConnectivityService.PostData(url_notifyWeb)
        .then(function(response) {
            console.log(response);
            if(response.length == 0){
            $scope.showNotify = false;
            $scope.norecords = true;
            $('.norecords').html("<center><p>No records found</p></center>");
            }
            else{
            $scope.showNotify = true;
            $scope.norecords = false;
            $scope.notifyList = response;
            }
            $scope.loader = false;
        },
        function(jqxhr) {
          $scope.loader = false;
        });
    },200);
}



$scope.RedirectNotification = function(item){
//console.log(item);
$scope.response = item;var navID;
//socket.emit('updateAction', item._id);
var module = $scope.response.item.module.split('.')[1];
var sentence = $scope.response.item.sentence;
if($scope.response.item.navid != undefined){
navID = $scope.response.item.navid;
}

if(module == 'taskDescription'){

if( navID.indexOf(',') != -1 ){
                navID = navID.split(',')[0];//alert(navID);
                var comment = "true";
                var url_comment = AmsConstants.url_hrms_task +"getNotes?_id="+ navID;
                $scope.loader = true;
                    setTimeout(function(){
                        ConnectivityService.PostData(url_comment)
                        .then(function(response) {
                            console.log(response);
                            localStorage.setItem("CommentTaskID",navID);
                            $state.go("comments");
                            $scope.loader = false;
                        },
                        function(jqxhr) {
                        $scope.loader = false;
                    });
                },200);
                return false;
 }
 else{
 var url_task = AmsConstants.url_hrms_task +"getTask/"+ navID;
 $scope.loader = true;
     setTimeout(function(){
         ConnectivityService.PostData(url_task)
         .then(function(response) {
             console.log(response);
             localStorage.setItem("STATUS_NOTIFY",response.status);
             if( response.type == 'Leave' ){
             $scope.url = AmsConstants.url_hrms_lms+'getLeaveByID?org='+AmsValues.HRMS_orgId+"&leaveid="+response.leaveid;
             ConnectivityService.PostData($scope.url)
                      .then(function(response_leave) {
                      //console.log(response_leave);
                      localStorage.setItem("leaveResponse",JSON.stringify(response_leave));
                      $state.go("ConfirmTask");
                      $scope.loader = false;
                      },
                      function(jqxhr) {
                        $scope.loader = false;
                      });
             }
             else if(response.type == "Compoff"){
                var url_comoff = AmsConstants.url_hrms_lms+'getCompoffID?org='+AmsValues.HRMS_orgId+'&compOffid='+response.compOffId ;

                console.log($scope.url);
                            $scope.loader = true;
                            setTimeout(function(){
                               ConnectivityService.PostData(url_comoff)
                               .then(function(response) {
                               //console.log(response);
                               $window.localStorage.setItem("CompOffResponse",JSON.stringify(response));
                               $window.localStorage.setItem("CompOffID",JSON.stringify(response.compOffId));
                               $ionicViewSwitcher.nextTransition('none');
                               $state.go("ConfirmCompOff");
                               },
                               function(data) {
                                              $scope.loader = false;
                                              console.log("error");
                                              return false;
                                              //$scope.emp_list = false;
                                              //$scope.norecords = true;
                                            });
                               },200);
             }
             else if(response.type == 'Expense'){
             $scope.url = AmsConstants.url_onBoard+'expenses/getExpenseById?_id='+response.expenseid;
             ConnectivityService.PostData($scope.url)
                      .then(function(response_expense) {
                                   //console.log(response_leave);
                      localStorage.setItem("expenseR",JSON.stringify(response_expense));
                      $state.go("taskExpense");
                      $scope.loader = false;
                      },
                      function(jqxhr) {
                       $scope.loader = false;
                      });

             }
             else{
             localStorage.setItem("completedTaskR",JSON.stringify(response));

             $state.go("taskPopUp");
             }

             $scope.loader = false;
         },
         function(jqxhr) {
           $scope.loader = false;
         });
     },200);
 }

}
else if(module == "employeedetails"){
var url_employeedetails = AmsConstants.url_hrms +"getProfile/"+ navID;
$scope.loader = true;
    setTimeout(function(){
        ConnectivityService.PostData(url_employeedetails)
        .then(function(response) {
            console.log(response);
            angular.forEach(response, function(value, key){
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

         $scope.loader = false;
        },
        function(jqxhr) {
          $scope.loader = false;
        });
    },200);
}
else if(module == "applyleave"){
$ionicViewSwitcher.nextTransition('none');
$state.go('LeaveHistory');
}
else if(module == "expenseDetails"){
var url_expense = AmsConstants.url_onBoard + "expenses/getExpenseById?_id="+navID;
$scope.loader = true;
setTimeout(function(){
  ConnectivityService.PostData(url_expense)
  .then(function(response) {
      console.log(response);
      localStorage.setItem("ExpenseDetails",JSON.stringify(response));
      $ionicViewSwitcher.nextTransition('none');
      $state.go('expensePopUp');
      $scope.loader = false;
  },
  function(jqxhr) {
    $scope.loader = false;
  });
 },200);
}
else{
return false;
}
};


$scope.close = function(){
$ionicHistory.goBack();
};
$scope.getTimeago = function(time_ago){

return moment(time_ago, "YYYY-MM-DDThh:mm:ss.Z").fromNow();
};

$scope.doRefresh = function() {
$timeout( function() {
 $scope.loader = false;
 refreshNotify();
 $scope.$broadcast('scroll.refreshComplete');
 }, 100);

};

});
