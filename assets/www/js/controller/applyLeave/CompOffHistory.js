

Module_applyLeave.controller('CompHistory_controller', function($scope,MenuList,StoreResponse,$timeout, $mdSidenav,$ionicPopup,$state,$http,$window,$mdDialog,$ionicViewSwitcher,AmsConstants,AmsValues,ConnectivityService) {
$scope.close = function(){
$ionicViewSwitcher.nextTransition('none');
$state.go("applyLeave");
};
$scope.showrecords = false;
$scope.norecords = false;

$scope.init = function(){
refreshComOffHistory();
};

function refreshComOffHistory(){

$scope.loader = true;

$scope.url = AmsConstants.url_hrms_lms+'getCompoffHistory?org='+AmsValues.HRMS_orgId+'&uid='+AmsValues.HRMS__id;
setTimeout(function(){
   ConnectivityService.PostData($scope.url)
   .then(function(response) {
   //console.log(response);
    if(response.length){
    $scope.C_history = response;
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
                    refreshComOffHistory();
                  //Stop the ion-refresher from spinning
                  $scope.$broadcast('scroll.refreshComplete');

                }, 100);

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




