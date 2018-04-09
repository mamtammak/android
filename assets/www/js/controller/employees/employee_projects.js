

Module_employees.controller('empProjects_controller', function($scope,StoreResponse,$timeout, $mdSidenav,$ionicPopup,$state,$http,$window,$mdDialog,$ionicViewSwitcher) {
var Projects = StoreResponse.get_projects();
if(Projects == "[]"){
$scope.norecords = true;

}
else{
$scope.emp_projects = JSON.parse(Projects);

}


var Members = StoreResponse.get_members();

if(Members == null){

$scope.Pmembers = "";


}
else{
var emp_members = JSON.parse(Members);
var emp_members_list = [];
angular.forEach(emp_members, function(value, key){
  emp_members_list.push(value.name);

});

$scope.Pmembers = emp_members_list.toString();
}


$scope.goBack = function(){
$ionicViewSwitcher.nextTransition('none');
$state.go("employee_profile");
};

});




