

Module_training.controller('training_controller', function($scope,$mdBottomSheet,$compile,AmsValues,AmsConstants,MenuList,StoreResponse, $mdSidenav,$ionicPopup,$state,$http,$window,$mdDialog,$ionicViewSwitcher,$timeout,ConnectivityService) {

//$scope.CheckADM = false;
//$scope.CheckUser = false;
$scope.norecords = false;
//$scope.hrmsLogo = 'img/HRMS_LOGO_old.png';
$scope.OrganizationName = AmsValues.HRMS_orgName;
if(AmsValues.HRMS_orgLogo != ""){
 $scope.OrganisationLogo = AmsConstants.url_notify_web+AmsValues.HRMS_orgLogo;
}
else{
 $scope.OrganisationLogo = "img/brand_logo.png";
}
$scope.all_Courses = false;
$scope.my_Courses = false;
$scope.menuItem=MenuList.get();

  $scope.loggedInUserName = AmsValues.HRMS_name;
  $scope.toggleLeft = function(menuId) {
      $mdSidenav(menuId).toggle();
  };
$scope.goToMenuItem = function(menuitem){
var page = StoreResponse.goToMenuItemPage(menuitem);
$mdSidenav('leftTR').close()
.then(function () {

            $ionicViewSwitcher.nextTransition('none');
            $state.go(page);

 });
};
var Enroll = [];

$scope.organization = AmsValues.HRMS_orgName;

var AUTH_TOKEN = $window.localStorage.getItem("AuthToken");
$scope.init = function(){
if(AmsValues.HRMS_ProfilePic_thumbnail == "" || AmsValues.HRMS_ProfilePic_thumbnail == undefined){
    $scope.myface =  'img/ic_face_Profile.png';
}
else{
   $scope.myface =  AmsConstants.url_onBoard+AmsValues.HRMS_ProfilePic_thumbnail;
}
refeshtraining();

};
var notEnroll = [];var myCourseLength = [];var result = [];var EnrollCourse = [];
var i = 0;
function refeshtraining(){
Enroll.length = 0;notEnroll.length = 0;myCourseLength.length = 0;result.length = 0;EnrollCourse.length = 0;
$scope.url = AmsConstants.url_hrms_training+'getTrainingCourse?org='+AmsValues.HRMS_orgId;
$scope.url_getCompletedCourse = AmsConstants.url_hrms_training2+'getTraining/'+AUTH_TOKEN+'/'+AmsValues.HRMS_orgId;
$scope.loader = true;
setTimeout(function(){
ConnectivityService.PostData($scope.url) //all courses
.then(function(response) {
    console.log(response);
    $scope.CourseP = response;
    if(response.length != 0){
    $scope.all_Courses = true;
    $scope.my_Courses = false;
    $scope.norecords = false;

    ConnectivityService.PostData($scope.url_getCompletedCourse) //enrolled courses
        .then(function(response) {
        $scope.myCourse = "";
            //console.log(response);
            $window.localStorage.setItem("CompletedCourse",JSON.stringify(response));
            $scope.myCourse = response;console.log($scope.myCourse);


            console.log(response.trainings);
            angular.forEach($scope.CourseP,function(valueAC,keyAC){
            notEnroll.push(valueAC._id);
                angular.forEach($scope.myCourse.trainings,function(valueMC,keyMC){
                //console.log(valueMC.course);
                    myCourseLength.push(valueMC.tracker);
                    $window.localStorage.setItem("CourseID",valueAC._id);

                    if(valueAC._id === valueMC.course._id){
                        Enroll.push(valueMC);
                        result.push(valueMC.course._id);

                    }

                });
            });

            if(Enroll.length == 0){

            }
            else{
            $scope.mycourseL = Enroll;console.log(Enroll);


            }
            if(notEnroll.length == 0){
            console.log("courses are enrolled.");
            }
            else{
             $.grep(notEnroll, function(el) {

                    if ($.inArray(el, result) == -1) EnrollCourse.push(el);

                });
                $scope.notenrolled = EnrollCourse;
                //console.log($scope.notenrolled);
            }
            $scope.loader = false;
            },
            function(data) {
              $scope.loader = false;
            });


    }
    else{
    $scope.all_Courses = false;
    $scope.my_Courses = false;
    $scope.norecords = true;
    $('.norecords').html("<center><p>No records found.</p></center>");
    }

$scope.loader = false;

},
function(data,status) {
 //$scope.norecords = true;
 //$('#norecords').html("Please check your internet connection.");
   $scope.loader = false;
   var status = navigator.onLine;
   if (status) {
      $scope.all_Courses = true;
      $scope.my_Courses = false;
      $scope.norecords = false;
      $('.norecords').html("");
      console.log("internet is there..");
   }
   else{
   $scope.all_Courses = false;
   $scope.my_Courses = false;
     $scope.norecords = true;
     $('.norecords').html("<center><p>Please check your internet connection.</p><p>Pull to refresh.</p></center>");
   }
 });

},200);

}

$scope.allCourses = function(){
console.log($scope.CourseP);

if($scope.CourseP.length == 0){
$scope.all_Courses = false;
$scope.my_Courses = false;
$scope.norecords = true;
$('.norecords').html("<center><p>No records found.</p></center>");
}
else{
$scope.all_Courses = true;
$scope.my_Courses = false;
$scope.norecords = false;
$('.norecords').html("");
}
};

$scope.myCourses = function(){
if(Enroll.length == 0){
$scope.all_Courses = false;
$scope.my_Courses = false;
$scope.norecords = true;
$('.norecords').html("<center><p>No records found.</p></center>");
}
else{
$scope.all_Courses = false;
$scope.my_Courses = true;
$scope.norecords = false;
$('.norecords').html("");
}

};

$scope.myDraft = function(){
$scope.all_Courses = false;
$scope.my_Courses = false;
$scope.my_Draft = true;

};

$scope.getCuriculum = function(list){
$window.localStorage.setItem("LessonsR",JSON.stringify(list));
console.log(list);
setTimeout(function(){
$mdDialog.show({
      controller: "aboutCourse_controller",
      templateUrl: 'templates/training/aboutCourse.html',
      parent: angular.element(document.body),
      //targetEvent: ev,
      clickOutsideToClose:false,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    })
    .then(function(answer) {

      //$scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      //$scope.status = 'You cancelled the dialog.';
    });
},0);

};

$scope.enrollCourse = function(id){
$scope.today = new Date();
$scope.url = AmsConstants.url_hrms_training2+'enroll';
var envelope = { "token" : AUTH_TOKEN , "course" :id ,"enrollment_date" : $scope.today };
$scope.loader = true;
setTimeout(function(){
ConnectivityService.PostData_post($scope.url,envelope)
.then(function(response) {
    console.log(response);

    window.plugins.toast.showLongBottom('Course enrolled.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
    refeshtraining();
    $scope.loader = false;

},
function(data,status) {
 //$scope.norecords = true;
 //$('#norecords').html("Please check your internet connection.");
   $scope.loader = false;
 });

},200);
};
$scope.filterFunction = function(element) {
     return element.name.match(/^Ma/) ? true : false;
 };
 
$scope.EditMyProfile = function(){
$ionicViewSwitcher.nextTransition('none');
$state.go("myProfileEdit");
}; 

 $scope.doRefresh = function() {

                 console.log('Refreshing!');
                 $timeout( function() {
                   //simulate async response
             $scope.loader = false;
                     refeshtraining();
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


});

