

Module_timesheet.controller('TimesheetEvents_controller', function($scope,AmsValues,AmsConstants,MenuList,StoreResponse,$stateParams, $mdSidenav,$ionicPopup,$state,$http,$window,$mdDialog,$ionicViewSwitcher,ConnectivityService,$rootScope,$ionicHistory) {

var dupes = {};
var singles = [],UniqueArr = [];singles.length = 0;UniqueArr.length = 0;
var singles_new = [];singles_new.length = 0;
var singlesUpdate = [];singlesUpdate.length = 0;
var singlesDel = [];singlesDel.length = 0;
$scope.close = function(){
//$ionicHistory.goBack();
//$state.go('timesheet');
$ionicHistory.clearCache().then(function(){ $state.go('timesheet') });
};
var ResponseEvents = JSON.parse($stateParams.data1);
$scope.HeaderTitle = ResponseEvents[0].date;
localStorage.setItem("TASK_DATE",ResponseEvents[0].date);
var date = new Date($scope.HeaderTitle);
$scope.Day = moment(date).format("D");

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
     $('.noEvents').html("<center><h4>No events added.</h4></center>");
  //}
}
else{
$('.noEvents').html("");

$scope.EventArray = singles;
//console.log($scope.EventArray);
}


}

$rootScope.$on("CallTimeSheetAddEvent",function(event,data){
$('.noEvents').html("");
singles_new.length = 0;
var AddEvent = JSON.parse(data.param);

angular.forEach(AddEvent.daily_tasks,function(ve,ke){
 if($scope.Day == ve.date){
    angular.forEach(ve.tasks,function(vt,kt){
    var tmp = {
        "date":$scope.HeaderTitle,
        "title":vt
        }
        singles_new.push(tmp);

    })
 }
});
$scope.EventArray = singles_new;
});

$rootScope.$on("CallTimeSheetUpdateEvent",function(event,data){
$('.noEvents').html("");
singlesUpdate.length = 0;
var EditEvent = JSON.parse(data.param);
angular.forEach(EditEvent.daily_tasks,function(ve,ke){
 if($scope.Day == ve.date){
    angular.forEach(ve.tasks,function(vt,kt){
    var tmp = {
        "date":$scope.HeaderTitle,
        "title":vt
        }
        singlesUpdate.push(tmp);

    })

 }
});
$scope.EventArray = singlesUpdate;
});

$rootScope.$on("CallTimeSheetDeleteEvent",function(event,data){
var DelEvent = JSON.parse(data.param);//console.log(DelEvent);
singlesDel.length = 0;
angular.forEach(DelEvent.daily_tasks,function(ve,ke){
if($scope.Day == ve.date){
    angular.forEach(ve.tasks,function(vt,kt){
    var tmp = {
        "date":$scope.HeaderTitle,
        "title":vt
        }
        singlesDel.push(tmp);

    })

 }

});
if(singlesDel.length == 0){
$('.noEvents').html("<center><h4>No events added.</h4></center>");
$scope.EventArray = singlesDel;
}
else{
$('.noEvents').html("");
$scope.EventArray = singlesDel;
}


});

$scope.addEvent = function() {

 setTimeout(function() {
  $mdDialog.show({
    controller: "Addevent_controller",
    templateUrl: 'templates/timesheet/addevent.html',
    parent: angular.element(document.body),
      clickOutsideToClose: false,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    })
    .then(function(answer) {
    }, function() {
    });
  }, 0);
};

$scope.updateTimesheetEvent = function(event) {
localStorage.setItem("TitleV", JSON.stringify(event));
setTimeout(function() {
  $mdDialog.show({
    controller: "updateEvent_controller",
    templateUrl: 'templates/timesheet/updateEvent.html',
    parent: angular.element(document.body),
      clickOutsideToClose: false,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    })
    .then(function(answer) {
    }, function() {
    });
  }, 0);
};
});
