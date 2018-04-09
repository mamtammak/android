

Module_attendance.controller('attendance_controller', function($scope,$timeout,AmsValues,AmsConstants,MenuList,StoreResponse, $mdSidenav,$ionicPopup,$state,$http,$window,$mdDialog,$ionicViewSwitcher,ConnectivityService,$rootScope) {

$scope.loggedInUserName = AmsValues.HRMS_name;
$scope.OrganizationName = AmsValues.HRMS_orgName;

if(AmsValues.HRMS_orgLogo != ""){
 $scope.OrganisationLogo = AmsConstants.url_notify_web+AmsValues.HRMS_orgLogo;
}
else{
 $scope.OrganisationLogo = "img/brand_logo.png";
}
$scope.isOpen = false;
$scope.selectedMode = 'md-scale';
$scope.selectedDirection = 'up';
$scope.showrecords = false;
$scope.norecords = false;
$scope.Attendance_BTN = false;
$scope.disablemodel = false;
$scope.menuItem=MenuList.get();

                         $scope.LoggedinName = AmsValues.HRMS_name;
                         $scope.toggleLeft = function(menuId) {
                             $mdSidenav(menuId).toggle();
                           };
$scope.goToMenuItem = function(menuitem){
var page = StoreResponse.goToMenuItemPage(menuitem);
$mdSidenav('leftAT').close()
.then(function () {
$ionicViewSwitcher.nextTransition('none');
$state.go(page);
});

};

$rootScope.$on("CallParentMethodAttendance", function(event,stateChange){
   initializeAgain();
});

$scope.init = function(){
if(AmsValues.HRMS_role == "HR" || AmsValues.HRMS_role == "ADM"){
   $scope.Attendance_BTN = true;
}
else{
  $scope.Attendance_BTN = false;
}
if(AmsValues.HRMS_ProfilePic_thumbnail == "" || AmsValues.HRMS_ProfilePic_thumbnail == undefined){
$scope.myface =  'img/ic_face_Profile.png';
}
else{
  $scope.myface =  AmsConstants.url_onBoard+AmsValues.HRMS_ProfilePic_thumbnail;
}

initializeAgain();

};


function initializeAgain(){
$scope.url = AmsConstants.url_hrms_attendance+'myAttendance?uId='+AmsValues.HRMS__id;

$scope.loader = true;
 setTimeout(function(){
ConnectivityService.PostData($scope.url)
     .then(function(response) {
     $scope.attendance = "";
     $scope.attendance = response;
     $scope.loader = false;
     $scope.showrecords = true;
     $scope.norecords = false;

     },
     function(data) {
     console.log(data);
        $scope.loader = false;

        var status = navigator.onLine;
        if (status) {
            $scope.showrecords = true;
            $scope.norecords = false;
           console.log("internet is there..");
        }
        else{
            $scope.showrecords = false;
            $scope.norecords = true;
           $('.norecords').html("<center><p>Please check your internet connection.</p><p>Pull to refresh.</p></center>");
        }

     });

 },200);
};

$scope.getDetails = function(list){
var response = list;
var tmpdt = new Date(response.today);
var mm = tmpdt.getMonth();
var yy = tmpdt.getFullYear();
var dd = tmpdt.getDate();
$ionicViewSwitcher.nextTransition('none');
$state.go("attendance_details",{data :JSON.stringify(list) });

};

$scope.empAttendance = function(){
$ionicViewSwitcher.nextTransition('none');
$state.go("emp_attendance");
};
$scope.EditMyProfile = function(){
$ionicViewSwitcher.nextTransition('none');
$state.go("myProfileEdit");
};

$scope.attendanceReport = function(){
$ionicViewSwitcher.nextTransition('none');
$state.go("attendance_report");
};
$scope.FabSpeedBTNAttD = function(){
$('#dimATTD').css('display','block');
};
$scope.hideDIMAttd = function(){
$('#dimATTD').css('display','none');
};
 $scope.doRefresh = function() {

                 console.log('Refreshing!');
                 $timeout( function() {
                   //simulate async response
             $scope.loader = false;
                     initializeAgain();
                   //Stop the ion-refresher from spinning
                   $scope.$broadcast('scroll.refreshComplete');

                 }, 100);

               };
});

