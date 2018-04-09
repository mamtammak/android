

Module_task.controller('ConfirmCO_controller', function($scope,AmsValues,AmsConstants,MenuList,StoreResponse, $mdSidenav,$ionicPopup,$state,$http,$window,$mdDialog,$ionicViewSwitcher,ConnectivityService,$rootScope,$ionicHistory) {

$scope.project = {
appliedby:"",
appliedon:"",
reasonL:"",
workingon:"",
workingfor:""

};

$scope.close = function(){
//$ionicViewSwitcher.nextTransition('none');
//$state.go("task");
$ionicHistory.goBack();
};
var CompOffData = JSON.parse($window.localStorage.getItem("CompOffResponse"));
 //console.log(CompOffData);
 var ComOff_FactorV;
$scope.Compoff_status = CompOffData[0].Compoff_status;
var comp_type = "",comp_date = "",jsonArray = [];
 $scope.init = function(){
 //console.log(CompOffData);
    $scope.project.appliedby = CompOffData[0].user.name;
     $scope.project.appliedon = CompOffData[0].applied_on.split('T')[0];
    $scope.project.leaveReason = CompOffData[0].reason;
     var workingOnArr = CompOffData[0].compoff;
    $scope.WorkingForDays = workingOnArr;
     console.log(workingOnArr);
     angular.forEach(workingOnArr, function(value, key){
     $scope.project.workingon = value.compoff_dates.split('T')[0];
     $scope.project.workingfor = value.compoff_type;
     ComOff_FactorV = value.compofffFactor;


      });


 };
//{"taskid":"5a3c94f9a380123a584ee3ea","user":"5a166c22c3a49e2128bf8071","org":"adnate1","status":11,"mgrcomment":"","compoffid":"COMPOFF-adn-2017-82","compoff":[{"wof":"Half Day","won":"1"}],"appid":"590c6769ad5928070bf32e40"}
 $scope.ConfirmAction = function(action){

 //var actionValue = angular.element($event.target).attr("name");
 var actionValue = action;
 $scope.url = AmsConstants.url_hrms_lms+'compoffAction';
 var reason = $scope.project.reasonL;
 var compOFFID = $window.localStorage.getItem("CompOffID");

 var COMOFF_V;
 var comOFF = $scope.project.workingfor;
 var status , toast_m;


 if(actionValue == "A"){
  status = 11;
  toast_m = "CompOff is approved";
 }
 else{
 status = 12;
 toast_m = "CompOff is rejected";
 }
var envelope = {
 "taskid" : CompOffData[0].taskid,
 "compoffid" : CompOffData[0]._id,
 "user" : CompOffData[0].user._id,
 "org" : CompOffData[0].organization,
 "status" : status,
 "compoff" : [{"wof":$scope.project.workingfor,"won":ComOff_FactorV}],
 "mgrcomment" :reason,
 "appid":AmsValues.HRMS__a
 };

$scope.loader = true;
 setTimeout(function(){

 ConnectivityService.PostData_post($scope.url,envelope)
     .then(function(response) {
     console.log(response);
     //console.log(JSON.stringify( response+"kkkkkkkkkkvvvvv") );
     $scope.loader = false;
     //if(response == "success"){
        window.plugins.toast.showLongBottom(toast_m, function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
        $rootScope.$emit("CallParentMethod", function(){
               //alert("done");
               });
        $ionicViewSwitcher.nextTransition('none');
        $state.go("task");

     //}
     },
     function(data) {
                    $scope.loader = false;

     });
 },200);

 };



});




