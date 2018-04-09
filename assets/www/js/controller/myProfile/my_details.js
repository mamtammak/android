

Module_myProfile.controller('myDetails_controller', function($scope,MenuList,AmsValues,AmsConstants,$timeout,$ionicPopup,$state,$http,DetailValues,$window,$mdDialog,$ionicViewSwitcher,ConnectivityService) {


$scope.EMP_TYPE = MenuList.getEMP_TYPE();
var joiningDT;
$scope.goBack = function(){
$ionicViewSwitcher.nextTransition('none');
$state.go("myProfileEdit");
};

var url_supervisors = AmsConstants.url_hrms+'getSupervisors?org='+AmsValues.HRMS_orgId;
$scope.supervisor = [];$scope.supervisor.length;
var reportTOManager;
var SKILLS = MenuList.skills();
  $scope.skill_set = SKILLS;

//console.log(DetailValues.joining_date);
  if(DetailValues.joining_date == 'undefined'){
  joiningDT = "";
  }
  else{
  joiningDT = new Date(DetailValues.joining_date);
  }
  if(DetailValues.reporting_to.name == 'undefined' || DetailValues.reporting_to.name == null || DetailValues.reporting_to.name == ""){
  reportTOManager = 'NA';
  }
  else{
    reportTOManager = DetailValues.reporting_to.name;
  }

  $scope.project = {
  fname: DetailValues.name,
  myemailID: DetailValues.email,
  EMP_TYPE:DetailValues.employee_type,
  reportingto:reportTOManager,
  //bio:DetailValues.bio,
  skillset:SKILLS,
  joiningDT:joiningDT,
  designation:DetailValues.job_title.name,
  status:DetailValues.employee_status,
  Branch:DetailValues.branch_name,
  Shift : DetailValues.workingHoursShift.desc

  };
if(DetailValues.bio != "" || DetailValues.bio == 'undefined'){
var text = $.parseHTML(DetailValues.bio); 
if(text[0].innerText == 'undefined'){
$scope.project.bio = DetailValues.bio;
}
else{
$scope.project.bio = text[0].innerText;
}


}
else{$scope.project.bio = "";}

if(DetailValues.hr_manager == null){
$scope.project.HR_Manager = '';
}
else{
$scope.project.HR_Manager = DetailValues.hr_manager.name;
}
//console.log(DetailValues.hr_manager);
$scope.init = function(){
 $scope.loader = true;
 setTimeout(function(){
   ConnectivityService.PostData(url_supervisors)
   .then(function(response) {
   console.log(response);
   angular.forEach(response, function(value, key){
   var tmpSup = {
              "name":value.name,
              "nameCode":value.employee_code
  };
  $scope.supervisor.push(tmpSup);
});
$scope.loader = false;
},
function(data) {
    console.log("error");
    $scope.loader = false;
 });
 },200);
};


$scope.UpdateProfile = function(){

$scope.url = AmsConstants.url_hrms +"updateProfile";
var skillsetArray = [];skillsetArray.length=0;
var fname = ($scope.project.fname).split(" ");
var myemailID = $scope.project.myemailID ;
var joiningDT = moment($scope.project.joiningDT).format("YYYY-MM-DD");
var designation = $scope.project.designation ;
var status = $scope.project.status ;
var emp_type = $scope.project.emp_type;
var reportingto = DetailValues.reporting_to._id;
var bio = $scope.project.bio ;
var skillset = $scope.project.skillset;
if(skillset != ""){
skillsetArray.push(skillset);
}
else{skillsetArray.push('NA');}

$scope.envelope = {"email":AmsValues.HRMS_email,"reporting_to":DetailValues.reporting_to._id,"hr_manager":DetailValues.hr_manager._id,"first_name":fname[0],"last_name":fname[1],"employee_type":emp_type,"employee_status":status,"bio":bio,"skill_set":skillsetArray,"wd":DetailValues.workingDays._id,"wh":DetailValues.workingHours._id,"job_title":DetailValues.job_title._id,"dcode":DetailValues.department};
            $scope.loader = true;
            setTimeout(function(){
            ConnectivityService.PostData_post($scope.url,$scope.envelope)
                                        .then(function(response) {
                                        console.log(response);
                                       $scope.URL = AmsConstants.url_hrms +"getProfile/"+AmsValues.HRMS_email;
                                                                                           //$scope.loader = true;
                                                                                           setTimeout(function(){
                                                                                               ConnectivityService.PostData($scope.URL)
                                                                                               .then(function(response) {
                                                                                               $scope.emp_p = response;console.log($scope.emp_p);
                                                                                               angular.forEach($scope.emp_p, function(value, key){
                                                                                               //if(value.emergency_info != null){
                                                                                               DetailValues.name = value.name;
                                                                                                                DetailValues.job_title = value.job_title;
                                                                                                                DetailValues.email = value.email;
                                                                                                                DetailValues.joining_date = value.joining_date;
                                                                                                                DetailValues.reporting_to = value.reporting_to;
                                                                                                                DetailValues.employee_status = value.employee_status;
                                                                                                                DetailValues.employee_type = value.employee_type;
                                                                                                                DetailValues.bio = value.bio;
                                                                                                                $window.localStorage.setItem("Skills",value.skill_set);
                                                                                                                //}
                                                                                               });
                                                                                               window.plugins.toast.showLongBottom('Employee details updated.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
                                                                                               $state.reload();
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

};

});




