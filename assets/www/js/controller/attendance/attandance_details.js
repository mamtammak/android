

Module_attendance.controller('atten_detail_controller', function($scope,$ionicHistory,$stateParams,AmsValues,AmsConstants,MenuList,StoreResponse, $mdSidenav,$ionicPopup,$state,$http,$window,$mdDialog,$ionicViewSwitcher,ConnectivityService) {

$scope.close =function(){

$ionicHistory.goBack();
};
var attendance_details = JSON.parse($stateParams.data);
console.log(attendance_details);
$scope.init = function(){
$scope.DATE_of_attendance = attendance_details.today;
$scope.attd_details = attendance_details.records;

};
});

