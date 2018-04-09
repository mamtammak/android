

Module_holidays.controller('holidays_controller', function($scope,$rootScope,$timeout,$mdBottomSheet,AmsValues,AmsConstants,MenuList,StoreResponse, $mdSidenav,$ionicPopup,$state,$http,$mdDialog,$ionicViewSwitcher,ConnectivityService) {


$scope.holidayShow = false;
$scope.norecords = false;
$scope.isOpen = false;
$scope.selectedMode = 'md-scale';
$scope.selectedDirection = 'up';
$scope.OrganizationName = AmsValues.HRMS_orgName;
if(AmsValues.HRMS_orgLogo != ""){
 $scope.OrganisationLogo = AmsConstants.url_notify_web+AmsValues.HRMS_orgLogo;
}
else{
 $scope.OrganisationLogo = "img/brand_logo.png";
}
var d = new Date();
var year = d.getFullYear();
$scope.project = {YEARHL : year};

$scope.menuItem=MenuList.get();
$scope.loggedInUserName = AmsValues.HRMS_name;
$scope.toggleLeft = function(menuId) {
$mdSidenav(menuId).toggle();
};
$scope.goToMenuItem = function(menuitem){
var page = StoreResponse.goToMenuItemPage(menuitem);
$mdSidenav('leftH').close()
   .then(function () {
    $ionicViewSwitcher.nextTransition('none');
    $state.go(page);

});

};
$scope.init = function(){

HolidaysForYear(year);

}

function refreshHolidays(){
HolidaysForYear(year);
}


$scope.showFilterBySearch = function(){
$mdBottomSheet.show({
  templateUrl: 'templates/holidays/bottomFilter.html',
  controller: 'HolidayFilter'
}).then(function(clickedItem) {
 }).catch(function(error) {
  // User clicked outside or hit escape
 });
};


var HolidaysForYear = function(holidayYear){
$scope.Year_name = holidayYear;
$scope.loader = true;

$scope.url_holiday = AmsConstants.url_hrms_lms+'getHolidays?year='+holidayYear+'&org='+AmsValues.HRMS_orgId;

setTimeout(function(){
ConnectivityService.PostData($scope.url_holiday)
.then(function(response) {
if(response != null){
    console.log(response);
    $scope.holidayShow = true;
    $scope.norecords = false;
    $('.norecords').html("");
    $scope.holidayList = response;
}
else{
$scope.holidayShow = false;
    $scope.norecords = true;
    $('.norecords').html("<center>No records found.</center>");
}

$scope.loader = false;
},
function(data) {

   $scope.loader = false;
   var status = navigator.onLine;
   if (status) {
       $scope.holidayShow = true;
       $scope.norecords = false;
       $('.nodata').html("");
       console.log("internet is there..");
   }
   else{
      $scope.holidayShow = false;
      $scope.norecords = true;
      $('.norecords').html("<center><p>Please check your internet connection.</p><p>Pull to refresh.</p></center>");
   }
 });
 },200);
};

$scope.filterFunction = function(element) {
     return element.name.match(/^Ma/) ? true : false;
 };

 $scope.doRefresh = function() {

                  console.log('Refreshing!');
                  $timeout( function() {
                    //simulate async response
              $scope.loader = false;
                      refreshHolidays();
                    //Stop the ion-refresher from spinning
                    $scope.$broadcast('scroll.refreshComplete');

                  }, 100);

                };
$scope.showSearchbar = true;
               $scope.hideSearchbar = false;

               $scope.showSearch = function(){
                       $scope.showSearchbar = false;
                       $scope.hideSearchbar = true;

                  };
                  $scope.hideSearch = function(){
                       $scope.showSearchbar = true;
                       $scope.hideSearchbar = false;
                       //cordova.plugins.Keyboard.disableScroll(false);
                       $ionicViewSwitcher.nextTransition('none');
                       $state.reload();
                  };

$rootScope.$on('CallFilterHolidayByYear',function(event,data){
HolidaysForYear(data.data1);
});

});

