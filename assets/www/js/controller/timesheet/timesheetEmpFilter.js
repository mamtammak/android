

Module_timesheet.controller('timesheetEmpFilter', function($scope,$mdBottomSheet,AmsValues,AmsConstants,$ionicPopup,$state,$http,$ionicViewSwitcher,ConnectivityService,$rootScope,$ionicHistory) {

$scope.project = {};
$scope.init = function(){
var url_emp = AmsConstants.url_hrms + 'getEmployees?org=' + AmsValues.HRMS_orgId;
$scope.loader = true;
setTimeout(function() {
  ConnectivityService.PostData(url_emp)
   .then(function(response) {
    $scope.emplist = response;
    $scope.loader = false;
    },
    function(data, status) {
    //$mdBottomSheet.hide();
      $scope.loader = false;
    });
  }, 200);
}

$scope.getTimesheetList = function(item) {

if($scope.project.EMPLIST == undefined || $scope.project.EMPLIST == ""){
window.plugins.toast.showLongBottom('Please select from date.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
return false;
}
else{
localStorage.setItem('emp_details',JSON.stringify($scope.project.EMPLIST));
 $ionicViewSwitcher.nextTransition('none');
 $state.go('EMP_timesheet');
 $mdBottomSheet.hide();
}
};

});

