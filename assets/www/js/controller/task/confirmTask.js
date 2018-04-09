

Module_task.controller('ConfirmL_controller', function($scope,LeaveSetting,AmsValues,AmsConstants,MenuList,StoreResponse, $mdSidenav,$ionicPopup,$state,$http,$window,$mdDialog,$ionicViewSwitcher,ConnectivityService,$rootScope,$ionicHistory) {

$scope.project = {
empName:"",
emailid:"",
reasonL:"",
leaveAOn:"",
leavetyp:"",
fdate:"",
tdate:"",
manager:"",
remainingL:"",
compoL:"",
previousL:"",
remarks:"",
no_OfDays:"",
leaveDy:""
};

$scope.close = function(){
//$ionicViewSwitcher.nextTransition('none');
//$state.go("task");
$ionicHistory.goBack();
};
var LeaveData = JSON.parse($window.localStorage.getItem("leaveResponse"));

if(localStorage.getItem("STATUS_NOTIFY") != undefined){
$scope.checkLeaveStatus = localStorage.getItem("STATUS_NOTIFY");
}

$scope.init =function(){

angular.forEach(LeaveData[0].stat,function(value,key){
$scope.name = value.status;
//alert($scope.checkLeaveStatus);
});

$scope.taskID = LeaveData[0].id;
 $scope.project.empName = LeaveData[0].userid.name;//console.log($scope.project.empName);
 $scope.project.emailid = LeaveData[0].userid.email;
 $scope.project.reasonL = LeaveData[0].reason;
 $scope.project.leaveAOn = LeaveData[0].leaveApplied_date.split('T')[0];
 $scope.project.leavetyp = LeaveData[0].type_of_leave;
 $scope.project.no_OfDays = LeaveData[0].no_of_days;
 $scope.project.fdate = LeaveData[0].from_date.split('T')[0];
 $scope.project.tdate = LeaveData[0].to_date.split('T')[0];
 if(LeaveData[0].manager_action.length != 0){
 $scope.project.manager = LeaveData[0].manager_action[0].managerid.name;
 $scope.project.remarks = LeaveData[0].manager_action[0].manager_comment;
 }

 if(LeaveData[0].path != "" || LeaveData[0].path != undefined){
 $scope.documents = LeaveData[0].path;
 }

 $.each(LeaveData[0].userid.leaves, function(k, v) {
             //alert(k + ' is ' + v);
             if($scope.project.leavetyp == k){
             $scope.project.remainingL = v;
             }
 });

    if(LeaveData[0].whichHalfOfDay == 2){
    $scope.IfHalfDay = true;
    $scope.project.leaveDy = 'Second Half'
    }
    else if(LeaveData[0].whichHalfOfDay == 1){
    $scope.IfHalfDay = true;
    $scope.project.leaveDy = 'First Half'
    }
    else{
    $scope.IfHalfDay = false;
    }

console.log(LeaveSetting.Hr_engagement);


};

$scope.ConfirmActionA = function(){
console.log(LeaveData[0].hr_action);
$scope.url = AmsConstants.url_hrms_lms+'leaveAction?org='+AmsValues.HRMS_orgId;
var status;
var d = new Date();
var month = d.getMonth()+1;
var day = d.getDate();
var output = d.getFullYear() + '-'+ ((''+month).length<2 ? '0' : '') + month +'-' +((''+day).length<2 ? '0' : '') + day;
var comment = $scope.project.remarks;
var envelope;
if(LeaveData[0].hr_action == false){
status = 3;
envelope = {
"leaveid":LeaveData[0]._id,
"mngrcomment":comment,
"mngrdate":output,
"status":status,
"appid":AmsValues.HRMS__a
};
}
else{
//comment = "" ;
status = 5;
envelope = {
"leaveid":LeaveData[0]._id,
"hrcomment":comment,
"hrdate":output,
"status":status,
"appid":AmsValues.HRMS__a
};
}

 console.log(envelope);
$scope.loader = true;
 setTimeout(function(){

 ConnectivityService.PostData_post($scope.url,envelope)
     .then(function(response) {
     console.log(response);
     window.plugins.toast.showLongBottom('Leave approved successfully.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
        $rootScope.$emit("CallParentMethod", function(){
                            //alert("done");
                            });
        $ionicViewSwitcher.nextTransition('none');
        $state.go("task");

     $scope.loader = false;
     },
     function(data) {
                    $scope.loader = false;
                   // console.log(data.statusText+"------"+);

     });
 },200);
};

$scope.ConfirmActionR = function(){
if($scope.project.remarks == ""){
window.plugins.toast.showLongBottom('Please add remarks.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
return false;
}
else{
$scope.url = AmsConstants.url_hrms_lms+'leaveAction?org='+AmsValues.HRMS_orgId;
var status;
var d = new Date();
var month = d.getMonth()+1;
var day = d.getDate();
var output = d.getFullYear() + '-'+ ((''+month).length<2 ? '0' : '') + month +'-'+ ((''+day).length<2 ? '0' : '') + day;
var comment = $scope.project.remarks;
var envelope;
if(LeaveData[0].hr_action == false){
status = 4;
envelope = {
"leaveid":LeaveData[0]._id,
"mngrcomment":comment,
"mngrdate":output,
"status":status,
"appid":AmsValues.HRMS__a
};
}
else{
status = 6;
envelope = {
"leaveid":LeaveData[0]._id,
"hrcomment":comment,
"hrdate":output,
"status":status,
"appid":AmsValues.HRMS__a
};
}

 console.log(envelope);
$scope.loader = true;
 setTimeout(function(){

 ConnectivityService.PostData_post($scope.url,envelope)
     .then(function(response) {
     console.log(response);
     //console.log(JSON.stringify( response+"kkkkkkkkkkvvvvv") );

     //if(response.length){
             window.plugins.toast.showLongBottom('Leave rejected successfully.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
             $rootScope.$emit("CallParentMethod", function(){
                    //alert("done");
                    });
             $ionicViewSwitcher.nextTransition('none');
             $state.go("task");
             $scope.loader = false;
          //}

     },
     function(data) {
                    $scope.loader = false;
                    console.log("error");

                    window.plugins.toast.showLongBottom('Leave rejected failed.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});

     });
 },200);
}

};


$scope.Revert = function(){
if($scope.project.remarks == ""){
window.plugins.toast.showLongBottom('Please add remarks.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
return false;
}
else{
$scope.url = AmsConstants.url_hrms_lms+'leaveAction?org='+AmsValues.HRMS_orgId;
var status;
var d = new Date();
var month = d.getMonth()+1;
var day = d.getDate();
var output = d.getFullYear() + '-'+ ((''+month).length<2 ? '0' : '') + month +'-'+ ((''+day).length<2 ? '0' : '') + day;
var comment = $scope.project.remarks;
var envelope;
//{"leaveid":"LV-adn-2018-489","mngrcomment":"","mngrdate":"2018-01-30","status":3,"appid":"590c6769ad5928070bf32e40"}
envelope = {
"leaveid":LeaveData[0]._id,
"revcomment":comment,
"revdate":output,
"status": 7,
"appid":AmsValues.HRMS__a
};


 console.log(envelope);
$scope.loader = true;
 setTimeout(function(){

 ConnectivityService.PostData_post($scope.url,envelope)
     .then(function(response) {
     console.log(response);
     //console.log(JSON.stringify( response+"kkkkkkkkkkvvvvv") );

     //if(response == 'Reverted Successfully'){
             window.plugins.toast.showLongBottom('Leave reverted successfully.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
             $rootScope.$emit("CallParentMethod", function(){
                                 //alert("done");
              });
             $ionicViewSwitcher.nextTransition('none');
             $state.go("task");
             $scope.loader = false;
          //}

     },
     function(data) {
                    $scope.loader = false;
                    console.log("error");

     });
 },200);
}

};

$scope.downloadDOC = function(){
window.open(AmsConstants.url_onBoard+$scope.documents);
}
});




