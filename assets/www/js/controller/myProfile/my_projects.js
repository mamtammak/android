

Module_myProfile.controller('myProjects_controller', function($scope,StoreResponse,$timeout, $mdSidenav,$ionicPopup,$state,$http,$window,$mdDialog,$ionicViewSwitcher,$rootScope) {

var emp_members_list = [];emp_members_list.length = 0;
$scope.init = function(){
refreshProjects();
};

function refreshProjects(){
var Projects = StoreResponse.get_projects();
console.log(JSON.parse(Projects));
if(Projects == "[]"){
   $scope.norecords = true;
}
else{
   $scope.emp_projects = JSON.parse(Projects);
   angular.forEach($scope.emp_projects.members,function(value,key){
   emp_members_list.push(value.name);
   });

}
}

$rootScope.$on("CallParentProject", function(){
  refreshProjects();
});

$scope.goBack = function(){
$ionicViewSwitcher.nextTransition('none');
$state.go("myProfileEdit");
};

$scope.addProjects = function(){
$ionicViewSwitcher.nextTransition('none');
$state.go("addNewProject");
};

$scope.getMembersList = function(member){
var listV = [];listV.length = 0;
$.each(member,function(key,value){
listV.push(value.name);
})
return listV.toString();
}

});




