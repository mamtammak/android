

Module_myProfile.controller('myprofile_edit', function($scope,$rootScope,StoreResponse,$mdDialog,MenuList,$timeout, $mdSidenav,$ionicPopup,$state,$http,AmsConstants,AmsValues,DetailValues,PersonelValues,EmergencyValues,BankValues,$window,$mdDialog,ConnectivityService,$ionicViewSwitcher,$ionicHistory,Upload) {


  cordova.getAppVersion.getVersionNumber().then(function (version) {
  //alert(version);
         $scope.VersionNumber = version;
    });
$scope.logout = function(){
var confirmPopup = $ionicPopup.confirm({
   title: 'Logout',
   template: 'Are you sure, you want to logout from HRMS.'
});
confirmPopup.then(function (res) {
  if (res) {
  $scope.loader = false;
   setTimeout(function(){
   console.log($window.localStorage.getItem("USERNAME"));
   var pushnotify = AmsConstants.url_pushnotify;
   var tokenValue = "";
   var req = {
      "token": tokenValue,
      "email": AmsValues.HRMS_email,
      "org": AmsValues.HRMS_orgId,
      "device": "AND"
   };
   ConnectivityService.PostData_post(pushnotify, req)
    .then(function(response) {
    $('#password').val("");
    $window.localStorage.clear();
    localStorage.clear();
    $scope.loader = false;
    $ionicHistory.clearCache().then(function(){ $state.go('login') });
    },
    function(data) {
      $scope.loader = false;
      var alertPopup = $ionicPopup.alert({
      title: '',
      template: "Logout failed , please try again later."
      });
      alertPopup.then(function(res) {
      console.log('Thank you');
      });

    });
   },2);
  }

});

};
$scope.close = function(){
$ionicViewSwitcher.nextTransition('none');
 $state.go("dashboard");
};
$scope.EditMyProfile = function(){
$ionicViewSwitcher.nextTransition('none');
$state.go("myProfileEdit");
};

$scope.addAPhoto = "img/ic_add_a_photo.png";
$scope.init = function(){
   UserProfile();
};
function UserProfile(){
$scope.loggedInUserName = AmsValues.HRMS_name;
$scope.LoggedinName = AmsValues.HRMS_name;
$scope.URL = AmsConstants.url_hrms +"getProfile/"+AmsValues.HRMS_email;
$scope.loader = true;
setTimeout(function(){
    var response_getProfile = ConnectivityService.AjaxRequest($scope.URL);
    if(response_getProfile != null && response_getProfile != "undefined"){
      $scope.emp_p = response_getProfile;

      angular.forEach($scope.emp_p, function(value, key){
      if(value.profile_pic == undefined || value.profile_pic == ""){
               $scope.emp_pic =  'img/ic_face_Profile.png';
            }
            else{
              $scope.emp_pic =  AmsConstants.url_onBoard+value.profile_pic.original;
            }
        $scope.emp_name = value.name;
        $scope.emp_mail = value.email;
        $scope.emp_joiningDT = value.joining_date;
        $scope.employee_code = value.employee_code;
        $scope.fpsid = value.fpsid;
        $scope.branch_id = value.branch._id;
        $scope.AppVersion = $scope.VersionNumber;
        DetailValues.name = value.name;
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
           DetailValues.hr_manager = value.hr_manager;
           DetailValues.department = value.department;
           DetailValues.workingDays = value.workingDays;
           DetailValues.workingHours = value.workingHours;
           DetailValues.employee_code = value.employee_code;
           DetailValues.branch_name = value.branch.name;
           DetailValues.bio = value.bio;

           //personel values
           if(value.personal_info != 'undefined' && value.personal_info != null){
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

        //emergency values
        if(value.emergency_info != null){
          EmergencyValues.first_name = value.emergency_info.first_name;
          EmergencyValues.last_name = value.emergency_info.last_name;
          EmergencyValues.relationship = value.emergency_info.relationship;
          EmergencyValues.mobile = value.emergency_info.contact;
        }

      //Bank values
      if(value.bank_info != null){
         BankValues.ifsc = value.bank_info.IFSC;
         BankValues.account_number = value.bank_info.account_number;
         BankValues.account_type = value.bank_info.account_type;
         BankValues.name = value.bank_info.bank_name;
      }

//var projects1 = value.projects; console.log(projects1);
     if(value.projects != null){
        StoreResponse.store_projects(value.projects);
     }

    if(value.skill_set != null){
       $window.localStorage.setItem("Skills",value.skill_set);
    }
   });
   $scope.loader = false;
  }
  else{
    $scope.loader = false;
  }
},200);

}
            $scope.myprofile = function () {
            $ionicViewSwitcher.nextTransition('none');
            $state.go("myProfile");
            };



            $scope.updateProfilePic = function(){
            $("#dimCam").css("display","block");
            };
            $scope.closecam = function(){
            $("#dimCam").css("display","none");
            };
            $scope.uploadPicLibrary = function(){

                  navigator.camera.getPicture(onSuccess, onFail, { quality: 75,
                                    destinationType: Camera.DestinationType.FILE_URI,
                                    sourceType: 0,
                                    encodingType : 0,
                                    correctOrientation: true,
                                    mediaType : Camera.MediaType.ALLMEDIA,
                                    allowEdit: true,

                                    saveToPhotoAlbum: false


                });


            };
            $scope.uploadPicCamera = function(){
            //alert("uploadPicCamera");
                  navigator.camera.getPicture(onSuccess, onFail, { quality: 25,
                                      destinationType: Camera.DestinationType.FILE_URI,
                                      sourceType: 1,
                                      allowEdit : true,
                                      saveToPhotoAlbum: true
                                      });
            };
            function onSuccess(imageURI) {

               var image = document.getElementById('addPhoto');
               image.src = "";
               image.src = imageURI;
               console.log(image.src);
               var options = new FileUploadOptions();
               options.fileKey = "file";
               options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
               options.chunkedMode = false;
               var params = {};
               params.idfolder = AmsValues.HRMS_email;
               params.file = imageURI;
               options.params = params;
               var ft = new FileTransfer();
               ft.upload(imageURI, encodeURI(AmsConstants.url_uploadProfilePic), win, fail, options);
            }


            function onSuccessCleanUp() {
               console.log("Camera cleanup success.")
            }
            function onFail(message) {
               var alertPopup = $ionicPopup.alert({
                             title: "",
                             template: message
                             });
                             alertPopup.then(function(res) {
                             console.log('ionic alert');
                             });
            }
            function win(r) {
            console.log(JSON.stringify(r));
              console.log("Code = " + r.responseCode);
              console.log("Response = " + r.response);
              console.log("Sent = " + r.bytesSent);
              $scope.url = AmsConstants.url_hrms +"updateProfile";
              $scope.envelope = {"email":AmsValues.HRMS_email,"reporting_to":DetailValues.reporting_to._id,"hr_manager":DetailValues.hr_manager._id,"profilePicObj":{"thumbnail":AmsValues.HRMS_email+"/"+r.response,"original":AmsValues.HRMS_email+"/"+r.response,"uncropped":AmsValues.HRMS_email+"/"+r.response},"r":AmsValues.HRMS_role,"i":AmsValues.HRMS_imft,"a":AmsValues.HRMS__a};

              $scope.loader = true;
                    ConnectivityService.PostData_post($scope.url,$scope.envelope)
                    .then(function(response) {
                    localStorage.setItem('response_token',JSON.stringify(response));
                    window.plugins.toast.showLongBottom('Profile pic updated.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
                               $scope.loader = false;

                       },
                       function(data) {
                          $scope.loader = false;
                          console.log("error");
                       });


            }
            function fail(error) {
               console.log("An error has occurred: Code = " + error.code);
               console.log("upload error source " + error.source);
               console.log("upload error target " + error.target);
               var alertPopup = $ionicPopup.alert({
                                title: "",
                                template: "Profile pic upload failed,try again."
                              });
                            alertPopup.then(function(res) {
                                 console.log('ionic alert');
                             });
            }


                            $scope.doRefresh = function() {

                            console.log('Refreshing!');
                            $timeout( function() {
                                     //simulate async response
                                     $scope.loader = false;
                                     UserProfile();
                                     //Stop the ion-refresher from spinning
                                     $scope.$broadcast('scroll.refreshComplete');

                                     }, 100);

                            };

     $scope.EmployeeDetails = function () {
                 $ionicViewSwitcher.nextTransition('none');
                 $state.go("myDetails");

                 };

                 $scope.EmpPersonalDetails = function () {
                    $ionicViewSwitcher.nextTransition('none');
                    $state.go("myPersonalDetails");

                 };

                 $scope.EmpContact = function () {
                 $ionicViewSwitcher.nextTransition('none');
                 $state.go("myContact");

                 };

                 $scope.AccountInfo = function () {
                 $ionicViewSwitcher.nextTransition('none');
                    $state.go("my_acct_info");

                 };

                 $scope.ProjectInfo = function () {
                 $ionicViewSwitcher.nextTransition('none');
                    $state.go("myProjects");

                 };



            });




