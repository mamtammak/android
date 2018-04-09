

Module_attendance.controller('attendanceFilter', function($scope,$mdBottomSheet,AmsValues,AmsConstants,$ionicPopup,$state,$http,$ionicViewSwitcher,ConnectivityService,$rootScope,$ionicHistory) {

$scope.project = {};

$scope.month = [{"month":"Jan","id":1},{"month":"Feb","id":2},{"month":"Mar","id":3},{"month":"Apr","id":4},{"month":"May","id":5},{"month":"Jun","id":6},{"month":"Jul","id":7},{"month":"Aug","id":8},{"month":"Sep","id":9},{"month":"Oct","id":10},{"month":"Nov","id":11},{"month":"Dec","id":12}];

$scope.onChangeToMonthFilter = function(){
$scope.project.myDate = "";
}

$scope.onChangeToDateFilter = function(){
$scope.project.FilterByMonth = "";
}
var year = new Date();
$scope.getAttendanceReportByFilter = function(){
var status,filterBy,filterData;
if($scope.project.myDate == ""){
status = "monthly";
filterBy = '&month='+$scope.project.FilterByMonth+'&year='+moment(year).format('YYYY');
filterData = {"m":$scope.project.FilterByMonth,"status":"monthly"};
}
else{
status = "daily";
filterBy = '&month='+moment($scope.project.myDate).format('M')+'&year='+moment($scope.project.myDate).format('YYYY')+'&day='+moment($scope.project.myDate).format('D');
filterData = {"m":$scope.project.myDate,"status":"daily"};
}
var url_attendanceFilter = AmsConstants.url_hrms_attendance + 'dailyMonthlyAttendanceReport?org='+AmsValues.HRMS_orgId+'&status='+status+filterBy;

$scope.loader = true;
setTimeout(function() {
  ConnectivityService.PostData(url_attendanceFilter)
   .then(function(response) {
   if(response != undefined && response.length > 0){
   $scope.emp_attendance_report = response;
   $rootScope.$emit("CallAttendanceReportByFilter",{param:JSON.stringify(response),param1:JSON.stringify(filterData)});
   $scope.loader = false;
   }
   else{
    window.plugins.toast.showLongBottom('No records found.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
   }
    $scope.loader = false;
    $mdBottomSheet.hide();
    },
    function(data, status) {
      $scope.loader = false;
    });
  }, 200);

}


});
