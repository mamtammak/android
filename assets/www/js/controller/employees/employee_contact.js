

Module_employees.controller('employeeContact_controller', function($scope,EmergencyValues,$timeout, $mdSidenav,$ionicPopup,$state,$http,AmsConstants,AmsValues,$window,$mdDialog,ConnectivityService,$ionicViewSwitcher) {

$scope.contact = EmergencyValues.contact;
$scope.first_name = EmergencyValues.first_name;
$scope.last_name = EmergencyValues.last_name;
$scope.relationship = EmergencyValues.relationship;

$scope.goBack = function(){
$ionicViewSwitcher.nextTransition('none');
$state.go("employee_profile");
};

});




