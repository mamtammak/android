

Module_timesheet.controller('EMP_timesheet_events', function($scope,AmsValues,AmsConstants,MenuList,StoreResponse,$stateParams, $mdSidenav,$ionicPopup,$state,$http,$window,$mdDialog,$ionicViewSwitcher,ConnectivityService,$rootScope,$ionicHistory) {

var dupes = {};
var singles = [],UniqueArr = [];singles.length = 0;UniqueArr.length = 0;
$scope.close = function(){
//var emp_tmp = JSON.parse(localStorage.setItem('Emp_details'));
$state.go('EMP_timesheet');
};
var ResponseEvents = JSON.parse($stateParams.data);
$scope.HeaderTitle = ResponseEvents[0].date;
localStorage.setItem("TASK_DATE",ResponseEvents[0].date);
var date = $scope.HeaderTitle.split('-')[2];//alert(date.split('0')[1]);


$scope.init = function(){

$.each(ResponseEvents, function(i, el) {
    if (!dupes[el.title._id]) {
     dupes[el.title._id] = true;
     UniqueArr.push(el);
    }
});

angular.forEach(UniqueArr,function(vu,ku){
 if(vu.title != 'IN'){
 singles.push(vu);
 }
 else{
 console.log("IN");
 }
});


if(singles.length == 0){
  //if(ResponseEvents[0].title == 'IN'){
     //window.plugins.toast.showLongBottom('No task added.', function(a) {console.log('toast success: ' + a)}, function(b) {console.log('toast error: ' + b)});
     $('.noEvents').html("<center><h4>No events added.</h4></center>")
  //}
}
else{
$('.noEvents').html("");

$scope.EventArray = singles;
//console.log($scope.EventArray);
}

}

});
