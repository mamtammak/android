

Module_employees.controller('emp_acct_info_controller', function($scope,BankValues,$timeout, $mdSidenav,$ionicPopup,$state,$http,AmsConstants,AmsValues,$window,$mdDialog,ConnectivityService,$ionicViewSwitcher) {

$scope.IFSC = BankValues.ifsc;
$scope.account_number = BankValues.account_number;
$scope.account_type = BankValues.account_type;
$scope.name = BankValues.name;

$scope.goBack = function(){
$ionicViewSwitcher.nextTransition('none');
$state.go("employee_profile");
};

});




