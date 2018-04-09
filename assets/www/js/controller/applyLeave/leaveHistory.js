

Module_applyLeave.controller('LeaveHistory_controller', function($scope,$ionicHistory,MenuList,StoreResponse,$timeout, $mdSidenav,$ionicPopup,$state,$http,$window,$mdDialog,$ionicViewSwitcher,AmsConstants,AmsValues,ConnectivityService) {
$scope.close = function(){
$ionicHistory.goBack();
};
$scope.showrecords = false;
$scope.norecords = false;

$scope.init = function(){
leaveHistory();

};

function leaveHistory(){
$scope.loader = true;
$scope.url = AmsConstants.url_hrms_lms+'getLeavesHistory?org='+AmsValues.HRMS_orgId+'&uid='+AmsValues.HRMS__id;
setTimeout(function(){
   ConnectivityService.PostData($scope.url)
   .then(function(response) {
   console.log(response);
    if(response.length){
    $scope.Lhistory = response;
    $scope.showrecords = true;
    $scope.norecords = false;
    $('.norecords').html("");
    }
    else{
    $scope.showrecords = false;
    $scope.norecords = true;
    $('.norecords').html("<center><p>No records found</p></center>");
    }
    $scope.loader = false;
   },
   function(data) {
     $scope.loader = false;
    var status = navigator.onLine;
     if (status) {
        $scope.showrecords = true;
        $scope.norecords = false;
        $('.norecords').html("");
        console.log("internet is there..");
     }
     else{
         $scope.showrecords = false;
         $scope.norecords = true;
         $('.norecords').html("<center><p>Please check your internet connection.</p><p>Pull to refresh.</p></center>");
     }
   });
      },200);
}

$scope.doRefresh = function() {

                console.log('Refreshing!');
                $timeout( function() {
                  //simulate async response
            $scope.loader = false;
                    leaveHistory();
                  //Stop the ion-refresher from spinning
                  $scope.$broadcast('scroll.refreshComplete');

                }, 100);

              };

$scope.cancelLeave = function(status,from_dt,applied_dt,id){
var fdate = from_dt.split('T')[0];
var newFdate = fdate.split('-');
var newInputdate = newFdate[1] +'/'+ newFdate[2] +'/'+ newFdate[0];
var today = new Date();
var inputDate = new Date(newInputdate);//mm/dd/yyy

if(status == 'Final Approved'){
var alertPopup = $ionicPopup.alert({
 title: '',
 template: 'Sorry !! leave cancel time is over.'
});
alertPopup.then(function(res) {
 console.log("alert");
 });
 return false;
}
else if(applied_dt > from_dt){
var alertPopup = $ionicPopup.alert({
 title: '',
 template: 'Sorry !! leave cancel time is over.'
});
alertPopup.then(function(res) {
 console.log("alert");
 });
return false;
}
else if(today.setHours(0,0,0,0) >= inputDate.setHours(0,0,0,0)){
var alertPopup = $ionicPopup.alert({
 title: '',
 template: 'Sorry !! you cannot cancel this leave.'
});
alertPopup.then(function(res) {
 console.log("alert");
 });
return false;
}


else{
$scope.loader = true;
$scope.url = AmsConstants.url_hrms_lms+'cancelLeave';
var leaveID = {"leaveid":id};console.log(leaveID);
setTimeout(function(){
   ConnectivityService.PostData_post($scope.url,leaveID)
   .then(function(response) {
   console.log(response);
    window.plugins.toast.showLongBottom(response, function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
    leaveHistory();
    $state.reload();
    $scope.loader = false;
   },
   function(data) {
     $scope.loader = false;

   });
      },200);
}
};

$scope.notifyManager = function(status,id){
if(status == 'Accepted by Manager' || status == 'Final Approved'){
var alertPopup = $ionicPopup.alert({
 title: '',
 template: 'Sorry !! you cannot notify leave after approval.'
});
alertPopup.then(function(res) {
 console.log("alert");
 });
 return false;
}
else{
var NotifyUrl = AmsConstants.url_hrms_lms+'remindToCurrentManager?org='+AmsValues.HRMS_orgId+'&leaveid='+id+'&appid='+AmsValues.HRMS__a+'&uid='+AmsValues.HRMS__id+'&status=1';
$scope.loader = true;
setTimeout(function(){
ConnectivityService.PostData(NotifyUrl)
    .then(function(response) {
window.plugins.toast.showLongBottom("Reminder has been sent successfully.", function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
      $scope.loader = false;
    },function(error, status) {
    $scope.loader = false;
    });
},200);
}

}

$scope.reApplyLeave = function(item){

if(item.stat[0].status == 'Reverted by manager'){
$window.localStorage.setItem("itemIndex",JSON.stringify(item));
$ionicViewSwitcher.nextTransition('none');
$state.go("reApplyLeave");
}
else{
//console.log("no action");
return false;
}

};

$scope.getListHeight = function() {
                   return {height: '' + ($window.innerHeight - 72) + 'px'};
                 };

                 $window.addEventListener('resize', onResize);
                 function onResize() {
                   $scope.$digest();
                 }
                 $scope.$on('$destroy', function() {
                   $window.removeEventListener('resize', onResize);
                 });

});




