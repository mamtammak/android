

Module_employees.controller('employeePersonalDetails_controller', function($scope, PersonelValues,MenuList,$timeout, $mdSidenav,$ionicPopup,$state,$http,AmsConstants,AmsValues,$window,$mdDialog,ConnectivityService,$ionicViewSwitcher,$ionicHistory) {

$scope.birth = PersonelValues.dob;
$scope.mobNo = PersonelValues.mobile;
$scope.gender = PersonelValues.gender;
$scope.address = PersonelValues.address;
$scope.city = PersonelValues.city;
$scope.state = PersonelValues.state;
$scope.country = PersonelValues.country;
$scope.postalCode = PersonelValues.postal_code;

$scope.goBack = function(){
$ionicHistory.goBack();
};
});




