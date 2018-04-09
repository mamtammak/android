
Module_holidays.controller('HolidayFilter', function($scope,$rootScope,$mdBottomSheet,$compile,AmsValues,AmsConstants,MenuList,StoreResponse, $mdSidenav,$ionicPopup,$state,$http,$window,$mdDialog,$ionicViewSwitcher,ConnectivityService) {

$scope.init = function(){
$scope.url_year = AmsConstants.url_hrms_lms+'getAllYears?&org='+AmsValues.HRMS_orgId;
$scope.loader = true;
setTimeout(function(){

 ConnectivityService.PostData($scope.url_year)
 .then(function(response) {
     $scope.Year = response;
     $scope.loader = false;
 },
 function(data) {
    $scope.loader = false;
  });
},200);
}

$scope.getHolidayList = function(){
var holidayYear = $scope.project.FilterByYear;
$mdBottomSheet.hide();
$rootScope.$emit('CallFilterHolidayByYear',{data1:holidayYear});
};

});

