

Module_timesheet.controller('Addevent_controller', function($scope,AmsValues,AmsConstants,MenuList,StoreResponse, $mdSidenav,$ionicPopup,$state,$http,$window,$mdDialog,$ionicViewSwitcher,ConnectivityService,$rootScope,$ionicHistory) {



$scope.showTitle = true;
$scope.project = {title : "",working_hr:""};

//alert($scope.project.taskAssigned);
$scope.dayDt = localStorage.getItem("TASK_DATE");
$scope.init = function(){

$scope.url = AmsConstants.url_hrms_task+'ongoingTask?org='+AmsValues.HRMS_orgId+'&i='+AmsValues.HRMS__id;

$scope.loader = true;
setTimeout(function(){
ConnectivityService.PostData($scope.url)
.then(function(response) {
    console.log(response.length);
    if(response.length == 0){
    $scope.checkForTask = false;
    }
    else{
    $scope.task_assigned = response;//console.log(response);
    $scope.checkForTask = true;
    //otask = $scope.project.taskAssigned;
    }


    $scope.loader = false;
},
function(data) {
   $scope.loader = false;
 });
},200);
}
var timesheet_ID = JSON.parse($window.localStorage.getItem("response_timesheetV"));
//console.log(timesheet_ID.length);
$scope.submit = function(){
console.log($scope.showTitle);
if($scope.showTitle == true && $scope.project.title == ""){
window.plugins.toast.showLongBottom('Please add title.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
return false;
}
else if($scope.project.working_hr == ""){
window.plugins.toast.showLongBottom('Please add working hours.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
return false;
}
else{
$scope.url = AmsConstants.url_hrms_timesheets+'updateTimeSheet';
var label = $scope.project.title;
var hours = $scope.project.working_hr;


var envelope;
if( JSON.parse( $window.localStorage.getItem("response_timesheetV") ) == 'No Timesheets Found.'){

if($scope.project.taskAssigned == undefined){
 envelope = {
"org":AmsValues.HRMS_orgId,
"datestr":$scope.dayDt,
"label":label,
"hours":hours,
"email":AmsValues.HRMS_email
};
}
else{
envelope = {
"org":AmsValues.HRMS_orgId,
"datestr":$scope.dayDt,
"label":$scope.project.taskAssigned.title,
"hours":hours,
"otask":$scope.project.taskAssigned._id,
"email":AmsValues.HRMS_email
};
}
}
else{
var timesheet_ID = JSON.parse( $window.localStorage.getItem("response_timesheetV") );
console.log(timesheet_ID);
if($scope.project.taskAssigned == undefined){
envelope = {
 "id":timesheet_ID.timesheet[0]._id,
 "org":AmsValues.HRMS_orgId,
 "datestr":$scope.dayDt,
 "label":label,
 "hours":hours,
 "email":AmsValues.HRMS_email
};
}
else{
envelope = {
 "id":timesheet_ID.timesheet[0]._id,
 "org":AmsValues.HRMS_orgId,
 "datestr":$scope.dayDt,
 "label":$scope.project.taskAssigned.title,
 "otask":$scope.project.taskAssigned._id,
 "hours":hours,
 "email":AmsValues.HRMS_email
};
}
}
//var envelope =
$scope.loader = true;
setTimeout(function(){
ConnectivityService.PostData_post($scope.url,envelope)
.then(function(response) {
    //console.log(response);
    //if(response.length){
    window.plugins.toast.showLongBottom('Task added.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
    $rootScope.$emit("CallParentTimesheet", function(){
           //alert("done");
    });
    $rootScope.$broadcast("CallTimeSheetAddEvent",{param:JSON.stringify(response)});
    $state.go('timesheetEvents');
    $mdDialog.cancel();
    //$ionicHistory.clearCache().then(function(){ $state.go('timesheetEvents',{data2 : JSON.stringify(response)}) })

    $scope.loader = false;
},
function(data) {
window.plugins.toast.showLongBottom('Something went wrong, try again later.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
$scope.loader = false;
 });
},200);
}


};

$scope.useDefaultTask = function(){
//alert($scope.project.taskAssigned);
if($scope.project.taskAssigned == undefined){
console.log("no task");
$scope.showTitle = true;
}
else{
$scope.showTitle = false;
}
}

$scope.close = function(){
$mdDialog.cancel();

};
});
