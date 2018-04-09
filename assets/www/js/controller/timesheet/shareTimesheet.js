

Module_timesheet.controller('shareTimesheet_controller', function($scope,AmsValues,AmsConstants,MenuList,StoreResponse, $mdSidenav,$ionicPopup,$state,$http,$window,$mdDialog,$ionicViewSwitcher,ConnectivityService,$mdBottomSheet) {

$scope.close = function(){
$ionicViewSwitcher.nextTransition('none');
$state.go("timesheet");

//$mdDialog.cancel();
//$state.reload();
};

$scope.project = {email_id : "",shareS:""};
$scope.init = function(){


$scope.loader = true;
$scope.url = AmsConstants.url_hrms+'getEmployees?org='+AmsValues.HRMS_orgId;
setTimeout(function(){
ConnectivityService.PostData($scope.url)
.then(function(response) {
    console.log(response);
    $scope.employees = response;
    $scope.loader = false;
},
function(data) {
$scope.loader = false;
 });
},200);
};


$scope.shareToUser = function(){
//alert($scope.project.shareS);
if($scope.project.shareS == 'undefined' || $scope.project.shareS == ""){
window.plugins.toast.showLongBottom('Please select employee.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
return false;
}
else{
var timesheetResponse = JSON.parse( $window.localStorage.getItem("response_timesheetV") );
var t_ID = timesheetResponse.timesheet[0]._id;
var email_id = $scope.project.shareS;
$scope.loader = true;
$scope.url = AmsConstants.url_hrms_timesheets+'shareTimeSheet';
var envelope = {"tid":t_ID,"email":email_id};
setTimeout(function(){
ConnectivityService.PostData_post($scope.url,envelope)
.then(function(response) {
    console.log(response);
    window.plugins.toast.showLongBottom('TimeSheet shared.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
    $mdBottomSheet.hide();
    $scope.loader = false;
},
function(data) {
$scope.loader = false;
window.plugins.toast.showLongBottom('Something went wrong.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});

 });
},200);
}

};


});

