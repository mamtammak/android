

Module_myProfile.controller('addProjects_controller', function($scope,AmsConstants,AmsValues,StoreResponse,ConnectivityService,$timeout,$ionicPopup,$state,$http,DetailValues,$window,$mdDialog,$ionicViewSwitcher,$rootScope) {

var arrayMembers = [];arrayMembers.length = 0;
var tmp_technology = []; tmp_technology.length = 0;
var emp_details = [] ; emp_details.length = 0;
$scope.close = function(){
$ionicViewSwitcher.nextTransition('none');
$state.go("myProjects");
};

var Projects = StoreResponse.get_projects();
if(Projects == "[]"){
   $scope.norecords = true;
}
else{
   $scope.emp_projects = JSON.parse(Projects);
}

$scope.project = {
PTitle: "",
technology:"",
pdescription:"",
presponsibility:"",
startDate :new Date(),
endDate:new Date()
};
$scope.init = function(){
$scope.url = AmsConstants.url_hrms+'getEmployees?org='+AmsValues.HRMS_orgId;
                            $scope.loader = true;
                            setTimeout(function(){

                            ConnectivityService.PostData($scope.url)
                            .then(function(response) {
                            angular.forEach(response,function(value,key){
                                var tmp = {
                                "name":value.name,
                                "email":value.email
                                }
                               emp_details.push(tmp);
                            })
                            $scope.Team_members = emp_details;
                            $scope.loader = false;
                            },
                            function(jqxhr) {
                              $scope.loader = false;

                            });
                            },200);
};

$scope.test = function(){
console.log($scope.project.Tmembers);
}
$scope.UpdateProfile = function(){

if($scope.project.PTitle == ""){
return false;
}
else if($scope.project.Tmembers = ""){
return false;
}
else if($scope.project.technology == ""){
return false;
}
else if($scope.project.pdescription == ""){
return false;
}
else if($scope.project.presponsibility == ""){
return false;
}
else if($scope.project.startDate == ""){
return false;
}
else if($scope.project.endDate == ""){
return false;
}
else{
$scope.url = AmsConstants.url_hrms +"updateProfile";

var title = $scope.project.PTitle;
var technology = $scope.project.technology ;
tmp_technology.push(technology);
var pdescription = $scope.project.pdescription;
var presponsibility = $scope.project.presponsibility ;
var startDate = moment($scope.project.startDate).format("YYYY-MM-DD") ;
var endDate = moment($scope.project.endDate).format("YYYY-MM-DD") ;

var new_project = {
"title" : title,
"start_date" : new Date(startDate),
"end_date" : new Date(endDate),
"members" :$scope.project.Multi_members,
"description":pdescription,
"responsibilities":presponsibility,
"technologies" : tmp_technology
};
$scope.emp_projects.push(new_project);
$scope.envelope = {"email":AmsValues.HRMS_email,"reporting_to":DetailValues.reporting_to._id,"hr_manager":DetailValues.hr_manager._id,"projects":$scope.emp_projects,"wd":DetailValues.workingDays._id,"wh":DetailValues.workingHours._id,"job_title":DetailValues.job_title._id,"dcode":DetailValues.department};
            $scope.loader = true;
            setTimeout(function(){
            ConnectivityService.PostData_post($scope.url,$scope.envelope)
            .then(function(response) {
                  console.log(response);
                  $scope.URL = AmsConstants.url_hrms +"getProfile/"+AmsValues.HRMS_email;
                  setTimeout(function(){
                        ConnectivityService.PostData($scope.URL)
                        .then(function(response) {
                               $scope.emp_p = response;console.log($scope.emp_p);
                               angular.forEach($scope.emp_p, function(value, key){
                                               if(value.projects != null){
                                                       StoreResponse.store_projects(value.projects);
                                                    }

                                                   if(value.skill_set != null){
                                                      $window.localStorage.setItem("Skills",value.skill_set);
                                                   }
                               });
                               window.plugins.toast.showLongBottom('Employee details updated.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});

                              $rootScope.$emit("CallParentProject", function(){
                                  console.log("CallParentProject..");
                               });
                              $ionicViewSwitcher.nextTransition('none');
                              $state.go("myProjects");
                               $scope.loader = false;
                        },
                        function(data) {
                              $scope.loader = false;
                        });
                  },200);
                  $scope.loader = false;
            },
            function(data) {
                  $scope.loader = false;
                  console.log("error");
            });
            },200);
}


};

});




