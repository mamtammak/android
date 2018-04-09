

Module_attendance.controller('atten_report_controller', function($scope,AmsValues,AmsConstants,$rootScope,MenuList,StoreResponse,$mdBottomSheet,$mdSidenav,$ionicPopup,$state,$http,$window,$mdDialog,$ionicViewSwitcher,ConnectivityService) {

$scope.project = {myDate:new Date()};
$scope.records = false;
$scope.norecords = false;
$scope.close = function(){
$ionicViewSwitcher.nextTransition('none');
$state.go("attendance");
};

$scope.init = function(){

var dt = new Date();
var dd = dt.getDate();
var mm = dt.getMonth() + 1;
var yy = dt.getFullYear();
$scope.FilterByName = moment(dt).format("DD-MM-YYYY");
initializeGetReports(mm,dd,yy,dt);
};

$scope.getAttendanceByDate = function(){
var dateValue = moment($scope.project.myDate).format("YYYY-MM-DD");
var dt = new Date(dateValue);
var dd = dt.getDate();
var mm = dt.getMonth() + 1;
var yy = dt.getFullYear();
initializeGetReports(mm,dd,yy,dt);
};

function initializeGetReports(mm,dd,yy,dt){
$scope.url = AmsConstants.url_hrms_attendance+'dailyMonthlyAttendanceReport?org='+AmsValues.HRMS_orgId+'&status=monthly&month='+mm+'&year='+yy;
 $scope.loader = true;
 setTimeout(function(){

     ConnectivityService.PostData($scope.url)
     .then(function(response) {
     $scope.emp_attendance_report = "";
     $scope.emp_attendance_report = response;
     if($scope.emp_attendance_report == ""){
     $scope.records = false;
     $scope.norecords = true;
     $('.norecords').html('<center>No records available.</center>');
     }
     else{
     $scope.records = true;
     $scope.norecords = false;
     }
     $scope.loader = false;
     },
     function(jqxhr) {
      $scope.loader = false;
      });
  },200);
};

$scope.getReportDetails = function(item){
$ionicViewSwitcher.nextTransition('none');
$state.go("attendance_filterForEmp",{data:JSON.stringify(item),data1:$scope.FilterByName});
}

$scope.showSearch = function() {

        $mdBottomSheet.show({
                    templateUrl: 'templates/attendance/bottomFilter.html',
                    controller: 'attendanceFilter'
                }).then(function(clickedItem) {
                    // alert("good");
                }).catch(function(error) {
                    // User clicked outside or hit escape
                });

    };

 $rootScope.$on('CallAttendanceReportByFilter',function(event,data){
    $scope.emp_attendance_report = JSON.parse(data.param);
    var para = JSON.parse(data.param1);
    if(para.status == 'monthly'){
     var y = new Date();
     $scope.FilterByName = para.m +'-'+ moment(y).format("YYYY");
    }
    else{
    var d = new Date(para.m);
    $scope.FilterByName = moment(d).format("DD-MM-YYYY");
    }

 })


});

