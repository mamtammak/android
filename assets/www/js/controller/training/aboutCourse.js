

Module_training.controller('aboutCourse_controller', function($scope,AmsValues,AmsConstants,MenuList,StoreResponse, $mdSidenav,$ionicPopup,$state,$http,$window,$mdDialog,$ionicViewSwitcher,ConnectivityService) {

//$scope.skip_cancel_btn = false;
//$scope.cancel_btn = false;

$scope.cancel = function(){
$mdDialog.cancel();
};

$scope.Lessons = function(){
$mdDialog.cancel();
$ionicViewSwitcher.nextTransition('none');
$state.go("curriculum");
};

$scope.init = function(){

var describtion = JSON.parse( $window.localStorage.getItem("LessonsR") );
$scope.course_desb = describtion.course.course_description;
 $scope.Prerequisites = describtion.course.Prerequisites ;

};


});

