

Module_timesheet.controller('updateEvent_controller', function($scope,AmsValues,AmsConstants,MenuList,StoreResponse, $mdSidenav,$ionicPopup,$state,$http,$window,$mdDialog,$ionicViewSwitcher,ConnectivityService,$rootScope,$ionicHistory) {


$scope.project = {};


$scope.getTitle_Value = JSON.parse(window.localStorage.getItem("TitleV"));

$scope.init = function(){
var timesheetR = JSON.parse($window.localStorage.getItem("response_timesheetV"));

$scope.project.title = $scope.getTitle_Value.title.label;
var W_hours = (parseFloat($scope.getTitle_Value.title.hours)).toFixed(2);
$scope.project.working_hr = parseFloat(W_hours);

};
var timesheet_ID = JSON.parse($window.localStorage.getItem("response_timesheetV"));

$scope.Update = function(){
$scope.task_date = localStorage.getItem("TASK_DATE");
$scope.url = AmsConstants.url_hrms_timesheets+'updateTimeSheet';
var label = $scope.project.title;
var hours = $scope.project.working_hr;
var taskID = $scope.getTitle_Value.title._id;
var otask = $scope.getTitle_Value.title.otaskid;

var timeStampJson = JSON.parse($window.localStorage.getItem("timeStampJson"));
var envelope = {
"id" : timesheet_ID.timesheet[0]._id,
"org":AmsValues.HRMS_orgId,
"datestr":$scope.task_date,
"taskid":taskID,
"label": label,
"hours":hours,
"otaskid":"",
"email" : AmsValues.HRMS_email
};

//var envelope =
$scope.loader = true;
setTimeout(function(){
ConnectivityService.PostData_post($scope.url,envelope)
.then(function(response) {
    //console.log(response);
    window.plugins.toast.showLongBottom('Task updated in timesheet.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
$scope.loader = false;
    $rootScope.$emit("CallParentTimesheet", function(){
               //alert("done");
               });
        $mdDialog.cancel();
        $rootScope.$broadcast("CallTimeSheetUpdateEvent",{param:JSON.stringify(response)});
        $state.go('timesheetEvents');
        //$ionicHistory.clearCache().then(function(){ $state.go('timesheetEvents',{data3 : JSON.stringify(response)}) })

},
function(data) {
$scope.loader = false;
 });
},200);

};

$scope.deleteTaskSheetList = function(){
//var split_ID = getTitle_Value.split('_name_NAME')[0];
//http://devsrv03-pun:1339/timesheets/deleteTask?_id=59b12d7d1bfd891a6c73325f&taskid=59b12d7d1bfd891a6c73327c
$scope.urlDelete = AmsConstants.url_hrms_timesheets+'deleteTask?_id='+timesheet_ID.timesheet[0]._id+'&taskid='+$scope.getTitle_Value.title._id;
$scope.loader = true;
setTimeout(function(){
ConnectivityService.PostData($scope.urlDelete)
.then(function(response) {
    console.log(response);
    window.plugins.toast.showLongBottom('Task deleted from timesheet.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
$scope.loader = false;
    $rootScope.$emit("CallParentTimesheet", function(){
           //alert("done");
           });
    $mdDialog.cancel();
    $rootScope.$broadcast("CallTimeSheetDeleteEvent",{param:JSON.stringify(response)});
    $state.go('timesheetEvents');

},
function(data) {
$scope.loader = false;
 });
},200);
};

$scope.close = function(){
$mdDialog.cancel();
};

/*function isFloat(n) {
   if( n.match(/^-?\d*(\.\d+)?$/) && !isNaN(parseFloat(n)) && (n%1!=0) )
      return true;
   return false;
}*/
});

