

Module_employees.controller('employeeProfile_controller', function($scope,AmsValues,$ionicHistory,MenuList,$timeout, $mdSidenav,$ionicPopup,$state,$http,AmsConstants,DetailValues,$window,$mdDialog,ConnectivityService,$ionicViewSwitcher,EmpProfilePic,DetailValues) {

$scope.showOnlyAccountHolder = false;
$scope.goBack = function(){
$ionicHistory.goBack();
};

$scope.init = function () {
var temp_email = localStorage.getItem("Temp_emp_name");
if(EmpProfilePic.original == ""){
$scope.emp_pic = "img/ic_face_Profile.png";
}
else{
$scope.emp_pic = EmpProfilePic.original;
}
$scope.emp_name = DetailValues.name;
$scope.emp_mail = DetailValues.email;
$scope.emp_joiningDT = DetailValues.joining_date;
var emp_email = AmsValues.HRMS_email;
if(temp_email == emp_email){
$scope.showOnlyAccountHolder = true;
}
};


$scope.getEmployeeDetails = function(){

    $ionicViewSwitcher.nextTransition("none");
    $state.go("employee_details");
};

$scope.getEmpPersonalDetails = function(){
    $ionicViewSwitcher.nextTransition("none");
    $state.go("emp_personel_details");
};

$scope.getEmpContact = function(){
    $ionicViewSwitcher.nextTransition("none");
    $state.go("emp_contact");
};

$scope.getAccountInfo = function(){
    $ionicViewSwitcher.nextTransition("none");
    $state.go("emp_account_info");
};

$scope.getProjectInfo = function(){
    $ionicViewSwitcher.nextTransition("none");
    $state.go("Projects");
};

 });




