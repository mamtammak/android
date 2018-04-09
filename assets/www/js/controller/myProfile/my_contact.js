
Module_myProfile.controller('myContact_controller', function($scope,EmergencyValues,DetailValues,$timeout, $mdSidenav,$ionicPopup,$state,$http,AmsConstants,AmsValues,$window,$mdDialog,ConnectivityService,$ionicViewSwitcher) {

$scope.goBack = function(){
$ionicViewSwitcher.nextTransition('none');
$state.go("myProfileEdit");
};
$scope.project = {
fname: EmergencyValues.first_name,
lname:EmergencyValues.last_name,
relationship:EmergencyValues.relationship,
mobile:EmergencyValues.mobile
};
$scope.init = function(){

};

$scope.UpdateProfile = function(){

$scope.url = AmsConstants.url_hrms +"updateProfile";

var fname = $scope.project.fname;
var lname = $scope.project.lname ;
var relationship = $scope.project.relationship;
var mobile = $scope.project.mobile ;
var emergency_contact = {
first_name : fname,
last_name :lname,
relationship : relationship,
mobile : mobile
};

$scope.envelope = {"email":AmsValues.HRMS_email,"reporting_to":DetailValues.reporting_to._id,"hr_manager":DetailValues.hr_manager._id,"emergency_info":emergency_contact,"wd":DetailValues.workingDays._id,"wh":DetailValues.workingHours._id,"job_title":DetailValues.job_title._id,"dcode":DetailValues.department};
            $scope.loader = true;
            setTimeout(function(){
            ConnectivityService.PostData_post($scope.url,$scope.envelope)
                                        .then(function(response) {
                                        console.log(response);
                                      $scope.URL = AmsConstants.url_hrms +"getProfile/"+AmsValues.HRMS_email;
                                                                                          //$scope.loader = true;
                                                                                          setTimeout(function(){
                                                                                              ConnectivityService.PostData($scope.URL)
                                                                                              .then(function(response) {
                                                                                              $scope.emp_p = response;console.log($scope.emp_p);
                                                                                              angular.forEach($scope.emp_p, function(value, key){
                                                                                              //if(value.emergency_info != null){
                                                                                              EmergencyValues.first_name = value.emergency_info.first_name;
                                                                                                               EmergencyValues.last_name = value.emergency_info.last_name;
                                                                                                               EmergencyValues.relationship = value.emergency_info.relationship;
                                                                                                               EmergencyValues.mobile = value.emergency_info.mobile;
                                                                                                               //}
                                                                                              });
                                                                                              window.plugins.toast.showLongBottom('Employee details updated.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
                                                                                              $state.reload();
                                                                                              $scope.loader = false;

                                                                                                              },
                                                                                                              function(data) {
                                                                                                                  $scope.loader = false;

                                                                                                              });
                                                                                                              },200);
                                        $scope.loader = false;
                                        },
                                        function(data) {
                                        $scope.loader = false;
                                          console.log("error");
                                        });
            },200);

};

});




