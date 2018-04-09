

Module_training.controller('curriculum_controller', function($scope,AmsValues,AmsConstants,MenuList,StoreResponse, $mdSidenav,$ionicPopup,$state,$http,$window,$mdDialog,$ionicViewSwitcher,ConnectivityService) {

$scope.close = function(){
$ionicViewSwitcher.nextTransition('none');
$state.go("training");
};
$scope.curriculum = 'img/curriculum.png';
$scope.init = function(){

var Lessons = JSON.parse($window.localStorage.getItem("LessonsR"));

$scope.course_description = Lessons.course.course_description;
$scope.lessonsValue = Lessons.course.task_list;
console.log($scope.lessonsValue);
var completedCourse = JSON.parse($window.localStorage.getItem("CompletedCourse") );
console.log(completedCourse.trainings);
angular.forEach(completedCourse.trainings,function(value,key){
        $scope.tracker = value.tracker;
});

console.log($scope.tracker);


};

$scope.describtion = function(){

/*var alertPopup = $ionicPopup.alert({
      title: title,
      template: description
    });
    alertPopup.then(function(res) {
      console.log('ionic alert');
    });*/
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

$scope.startLesson = function(list){
$window.localStorage.setItem("LessonPlan",JSON.stringify(list));
$ionicViewSwitcher.nextTransition('none');
$state.go("lessonPage");
};



});

