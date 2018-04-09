

Module_training.controller('lessonPage_controller', function($scope,AmsValues,AmsConstants,MenuList,StoreResponse, $mdSidenav,$ionicPopup,$state,$http,$window,$mdDialog,$ionicViewSwitcher,ConnectivityService) {

$scope.showcomplete = false;
$scope.checkBTN = true;
var HideBTN;
var LessonStart = JSON.parse( $window.localStorage.getItem("LessonPlan") );

var completedCourse = JSON.parse($window.localStorage.getItem("CompletedCourse") );
console.log(completedCourse);
var trackerList = completedCourse.trainings;
angular.forEach(trackerList,function(valueCC,keyCC){
console.log(valueCC.tracker.length);
if(valueCC.tracker.length == 0){
$scope.checkBTN = false;
}
else{
angular.forEach(valueCC.tracker,function(value,key){
  console.log(value +"=="+ LessonStart._id);
  if(LessonStart._id == value){
      //alert("completed");
      $scope.checkBTN = true;
      HideBTN = "YES";
      $scope.showcomplete = false;

      }
      else{
      $scope.checkBTN = false;
      HideBTN = "NO";
      // $scope.showcomplete = true;
      //return false;
      }
  });
}


});
$scope.init = function(){

console.log(LessonStart);
$scope.module_name = LessonStart.module_name;
$scope.module_summary = LessonStart.module_summary;

};

$scope.close = function(){
$window.screen.orientation.lock('portrait');
$ionicViewSwitcher.nextTransition('none');
$state.go("curriculum");
};


$scope.openPDF = function(){
//window.open('https://media.pragprog.com/titles/tbajs/intro.pdf','_self');
//window.open('http://media.pragprog.com/titles/tbajs/intro.pdf', '_blank', 'location=yes');
//alert(HideBTN);
if(HideBTN == "YES"){

$scope.showcomplete = false;
}
else{
$scope.showcomplete = true;
}
$scope.urlstart = AmsConstants.url_hrms_training2+'startLesson';
var envelope = {
"e" : AmsValues.HRMS_email, //email_id
"o" : AmsValues.HRMS_orgId,//org_id
"c" :  $window.localStorage.getItem("CourseID"),//course_id
"l": LessonStart._id ,//lesson_id
"d":new Date()
};
$scope.loader = true;
setTimeout(function(){
ConnectivityService.PostData_post($scope.urlstart,envelope)
.then(function(response) {
    //console.log(response);
    if(LessonStart.content_type == "VIDEO-Link"){

    $scope.anotherGoodOne = LessonStart.content_data;
    window.open($scope.anotherGoodOne+'?rel=0', '_blank', 'location=no');
    $window.screen.orientation.lock('landscape');

    if(HideBTN == "YES"){

    $scope.showcomplete = false;
    }
    else{
    $scope.showcomplete = true;
    }


    }

    else{

    var lessonLink = LessonStart.content_data;
    window.open(lessonLink, '_blank', 'location=no');
    $window.screen.orientation.lock('portrait');

    if(HideBTN == "YES"){

    $scope.showcomplete = false;
    }
    else{
    $scope.showcomplete = true;
    }
    }
    $scope.loader = false;

},
function(data,status) {
 //$scope.norecords = true;
 //$('#norecords').html("Please check your internet connection.");
   $scope.loader = false;
 });

},200);




};

$scope.CompletedL = function(){
$scope.url = AmsConstants.url_hrms_training2+'endlesson';
var envelope = {
"e" : AmsValues.HRMS_email, //email_id
"o" : AmsValues.HRMS_orgId,//org_id
"c" :  $window.localStorage.getItem("CourseID"),//course_id
"l": LessonStart._id ,//lesson_id
"d":new Date()
};
$scope.loader = true;
setTimeout(function(){
ConnectivityService.PostData_post($scope.url,envelope)
.then(function(response) {
    console.log(response);
    if(response.message == "DONE"){
    window.plugins.toast.showLongBottom('Lesson completed.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
    $scope.checkBTN = true;
    $window.screen.orientation.lock('portrait');
    $scope.loader = false;
    }

},
function(data,status) {
 //$scope.norecords = true;
 //$('#norecords').html("Please check your internet connection.");
   $scope.loader = false;
 });

},200);
};





});

