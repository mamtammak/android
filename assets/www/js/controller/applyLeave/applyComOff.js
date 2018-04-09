

Module_applyLeave.controller('compOff_controller', function($scope,LeaveSetting,AmsConstants,AmsValues,MenuList,StoreResponse,$timeout, $mdSidenav,$ionicPopup,$state,$http,$window,$mdDialog,$ionicViewSwitcher,ConnectivityService) {

$scope.project = {
appliedOn: new Date(),
Assignedto:"",
workedon: ""
};
$scope.close = function(){
$ionicViewSwitcher.nextTransition('none');
$state.go("applyLeave");
};

$scope.myDate = new Date();
$scope.init = function(){
var Joining_Date = localStorage.getItem("JOINING_DATE");//alert(Joining_Date);
if(LeaveSetting.backdated_leave == "true"){
if(Joining_Date != undefined){
$scope.minDate = new Date(Joining_Date);
}
else{
$scope.minDate = "";
}

}
else{

$scope.minDate = new Date(
$scope.myDate.getFullYear(),
$scope.myDate.getMonth(),
$scope.myDate.getDate()
);

}


if( JSON.parse(localStorage.getItem("getWorkingDays") ) != undefined ){
$scope.response_gelWorkingDays = JSON.parse(localStorage.getItem("getWorkingDays") );
console.log($scope.response_gelWorkingDays);
}

$scope.maxDate = new Date();
};

var d = new Date();
var month = d.getMonth()+1;
var day = d.getDate();
var output = d.getFullYear() + '-'+ ((''+month).length<2 ? '0' : '') + month +'-'+ ((''+day).length<2 ? '0' : '') + day ;

function getWeek(date){
    return weekOfMonth = (0 | date.getDate() / 7)+1;
  }
$scope.workingDaysForApplyingLeaves=function(date){
if($scope.response_gelWorkingDays.holidays_list.length>0){
      var arr=$scope.response_gelWorkingDays.holidays_list;
    }else{
      var arr=[];
    }
    for(var i=0;i<arr.length;i++){
      if(moment(new Date(date)).format("YYYY-MM-DD")==moment(new Date(arr[i].hdate)).format("YYYY-MM-DD")){
        return true;
      }
    }
    if($scope.response_gelWorkingDays.workingDays.length>0){
      var weekSchema=$scope.response_gelWorkingDays.workingDays;
      var day = date.getDay();
      if(weekSchema[day].indexOf(getWeek(date))==-1){
       return true;
      }
      else{
       return false;
      }
    }else{
      var weekSchema=[];
      return false;
    }



}
$scope.applycomoffleave = function(){

var comOFF_Factor;
if($scope.project.workedon == ""){
window.plugins.toast.showLongBottom('Please provide date.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
return false;
}
else if($scope.project.forday == undefined){
window.plugins.toast.showLongBottom('Please select day.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
return false;
}

else{
$scope.project.dateString = moment($scope.project.workedon).format("YYYY-MM-DD");//alert($scope.project.dateString);
$scope.project.Typforday = $scope.project.forday;
var reason = $window.document.getElementById("comment").value;
$scope.url = AmsConstants.url_hrms_lms+"applycompoff";
var url_getComOffFactor = AmsConstants.url_hrms_lms+"getCompofffactor?org="+AmsValues.HRMS_orgId+"&compdate="+$scope.project.dateString+"&user="+AmsValues.HRMS__id;

$scope.loader = true;
 setTimeout(function(){
ConnectivityService.PostData(url_getComOffFactor)
     .then(function(response) {
     console.log(response);
     if(response == "weekdays"){
             window.plugins.toast.showLongBottom('ComOff leaves cannot be applied for weekdays.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});

         }
         else{
                 if(response == "weekoffs"){
                     comOFF_Factor = 1;
                 }
                 else{
                     comOFF_Factor = 0;
                 }
                 var envelope = {
                         "reason" : $scope.project.comment,
                         "user" : AmsValues.HRMS__id,
                         "compoff" : [{"wof":$scope.project.Typforday,"won":$scope.project.dateString,"compofffFactor":comOFF_Factor}],
                         "status" : 10,
                         "org":AmsValues.HRMS_orgId,
                         "appid":AmsValues.HRMS__a
                 };
                 ConnectivityService.PostData_post($scope.url,envelope)
                           .then(function(response) {
                           console.log(response);
                           window.plugins.toast.showLongBottom('ComOff leave applied successfully.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
                           $scope.project = {
                                appliedOn: new Date(),
                                Assignedto:"",
                                workedon: ""
                           };

                           $scope.loader = false;
                            },

                           function(data) {
                           console.log(data);
                              $scope.loader = false;

                           });

         }


     $scope.loader = false;

     },
     function(data) {
     console.log(data);
        $scope.loader = false;

     });




 },200);
}


};
});




