

Module_employees.controller('employeeDetails_controller', function($scope,MenuList,$ionicHistory,$timeout,$ionicPopup,$state,$http,DetailValues,$window,$mdDialog,$ionicViewSwitcher) {



$scope.emp_name = DetailValues.name;
$scope.emp_mail = DetailValues.email;
$scope.emp_joiningDT = DetailValues.joining_date;
$scope.emp_type = DetailValues.employee_type;
$scope.job_title = DetailValues.job_title.name;
$scope.reportTo = DetailValues.reporting_to.name;
$scope.emp_status = DetailValues.employee_status;
$scope.bio = DetailValues.bio;
var SKILLS = MenuList.skills();
$scope.skill_set = SKILLS;


$scope.goBack = function(){
$ionicHistory.goBack();
};

});




