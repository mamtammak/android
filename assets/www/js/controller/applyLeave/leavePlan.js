

Module_applyLeave.controller('leavePlan_controller', function($scope,AmsValues,$timeout,AmsConstants,MenuList,StoreResponse, $mdSidenav,$ionicPopup,$state,$http,$window,$mdDialog,$ionicViewSwitcher,ConnectivityService) {

$scope.close = function(){
$ionicViewSwitcher.nextTransition('none');
$state.go("applyLeave");
};

$scope.showrecords = false;
$scope.norecords = false;
$scope.init = function(){
refreshleavePlan();

};

function refreshleavePlan(){
var fromdate = "";
var todate = "";
$scope.url = AmsConstants.url_hrms_lms +"myTeamPlan?reportingto="+AmsValues.HRMS__id+'&fdate='+fromdate+'&tdate='+todate+'&role='+AmsValues.HRMS_role;
$scope.loader = true;
setTimeout(function(){
ConnectivityService.PostData($scope.url)
.then(function(response) {
    //console.log(response);

    if(response == 'No leaves found'){
        $scope.showrecords = false;
        $scope.norecords = true;
        $('.norecords').html('<center><p>No records found</p></center>');
    }
    else{
    $scope.leavePlan = response;
    $scope.showrecords = true;
    $scope.norecords = false;
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
           //console.log("internet is there..");
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
                    refreshleavePlan();
                  //Stop the ion-refresher from spinning
                  $scope.$broadcast('scroll.refreshComplete');

                }, 100);

              };



});

