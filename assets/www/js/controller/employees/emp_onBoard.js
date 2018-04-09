

Module_employees.controller('onBoard_controller', function($scope,$timeout,MenuList, $mdSidenav,$ionicPopup,$state,$http,AmsConstants,AmsValues,$window,$mdDialog,ConnectivityService,$ionicViewSwitcher) {
$scope.project = {
    date: "",
    birthdate:"",
    fname : "",
    lname : "",
    job_title :"",
    reportTo : "",
    emp_type : "",
    emailID : "",
    branch :"",
    empcode:"",
    workingShift:""

  };

$scope.EMP_TYPE = MenuList.getEMP_TYPE();
$scope.gender = MenuList.getGender();

var Branch_Shift = [];Branch_Shift.length = 0;
$scope.Branch_name = [];$scope.Branch_name.length = 0;
 $scope.Branch_Working_Shift = [];
var organizationDetails;


$scope.AddOnBoard = function(){
$scope.project = {
    date: new Date(),
    fname : "",
    lname : "",
    job_title :"",
    reportTo : "",
    emp_type : "",
    emailID : "",
    branch :"",
    empcode:"",
    workingShift:""

  };
$scope.url = AmsConstants.url_onBoard +AmsValues.HRMS_orgId+'/hrms/onboard';
var url_usersCount = AmsConstants.url_hrms+'getEmployeesCount?org='+AmsValues.HRMS_orgId;
var url_PlanPermit = AmsConstants.url+'planPermit';

var fname = $scope.project.fname;
var lname = $scope.project.lname;
var title = $scope.project.job_title;
var emailId = $scope.project.emailID;
var emp_code = $scope.project.empcode;
var user_role = AmsValues.HRMS_role;
var branch_code = $scope.project.branch;
var dt_joining = moment($scope.project.date).format("YYYY-MM-DD");
var reportTo = $scope.project.reportingto;
var emp_type = $scope.project.emp_type;
var workingShift = $scope.project.workingShift;
var onBoardEnvelope = [{"fname":fname,"lname":lname,"jtitle":title,"email":emailId,"ecode":emp_code,"role":user_role,"bcode":branch_code,"joining_date":dt_joining,"reporting_to":reportTo,"employee_type":emp_type,"organization":{"id":AmsValues.HRMS_orgId,"name":AmsValues.HRMS_orgName},"workShift":workingShift}];
console.log(onBoardEnvelope);

if(fname == "" || lname ==""){
window.plugins.toast.showLongBottom('Please enter name.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
return false;
}
else if(emailId == ""){
window.plugins.toast.showLongBottom('Please enter email id.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
return false;

}
else if(emp_code == ""){
window.plugins.toast.showLongBottom('Please enter employee code.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
return false;

}
else if(branch_code == ""){
window.plugins.toast.showLongBottom('Please enter branch code.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
return false;
}
else if(dt_joining == ""){
window.plugins.toast.showLongBottom('Please enter date of joining.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
return false;
}
else if(reportTo == ""){
window.plugins.toast.showLongBottom('Please enter reporting hr code.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
return false;
}
else if(emp_type == ""){
window.plugins.toast.showLongBottom('Please enter employee type.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
return false;
}
else if(workingShift == ""){
window.plugins.toast.showLongBottom('Please enter shift work.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
return false;
}
else{
$scope.loader = true;
 setTimeout(function(){

 ConnectivityService.PostData(url_usersCount)

                    .then(function(response) {

                     console.log(response);
                     var EMP_Count = response;
                     var envelop_PlanPermit = {"_t":window.btoa("users"),"org":AmsValues.HRMS_orgId,"_a":AmsValues.HRMS__a,"count":EMP_Count};

                      /* plan permit */
                     ConnectivityService.PostData_post(url_PlanPermit,envelop_PlanPermit)

                                         .then(function(response) {

                                            if(response == true){
                                                ConnectivityService.PostData_post($scope.url,onBoardEnvelope)

                                                                   .then(function(response) {
                                                                    $scope.loader = false;
                                                                    console.log(response);
                                                                    $ionicViewSwitcher.nextTransition('none');
                                                                    $state.go('employees');
                                                                    $state.reload();
                                                                    window.plugins.toast.showLongBottom('Employee is onboard.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});


                                                                   },
                                                                   function(data) {
                                                                   $scope.loader = false;
                                                                    console.log('albums retrieval failed.')
                                                                   });
                                            }
                                            else{
                                            $scope.loader = false;

                                            window.plugins.toast.showLongBottom('To onboard employees please renew your plan.',
                                            function(a){
                                            $ionicViewSwitcher.nextTransition('none');
                                            $state.go('employees');
                                            $state.reload();
                                            }, function(b){console.log('toast error: ' + b)});

                                            }


                                         },
                                         function(data) {
                                         $scope.loader = false;
                                          console.log('albums retrieval failed.')
                                         });
                       /* plan permit end*/

                    },
                    function(data) {
                    $scope.loader = false;
                     console.log('albums retrieval failed.')
                    });
               },200);

}
};

$scope.close = function(){
$ionicViewSwitcher.nextTransition("none");
$state.go("employees");
};

$scope.init = function(){
var url_supervisors = AmsConstants.url_hrms+'getSupervisors?org='+AmsValues.HRMS_orgId;
$scope.supervisor = [];$scope.supervisor.length = 0;
$scope.url = AmsConstants.url_organization+'getOrganizationDetails?_id='+AmsValues.HRMS_orgId;

 $scope.loader = true;
  setTimeout(function(){
  var response_supervisors = ConnectivityService.AjaxRequest(url_supervisors);
                  if(response_supervisors != null && response_supervisors != "undefined"){
                  console.log(response_supervisors);
                  angular.forEach(response_supervisors, function(value, key){
                                 var tmpSup = {
                                 "name":value.name,
                                 "nameCode":value.employee_code
                                 };
                                  $scope.supervisor.push(tmpSup);

                                  });
                    $window.localStorage.setItem("Supervisors",JSON.stringify($scope.supervisor));
                  }
  var response_OrgDetails = ConnectivityService.AjaxRequest($scope.url);
  if(response_OrgDetails != null && response_OrgDetails != "undefined"){
      console.log(response_OrgDetails);
      organizationDetails = "";
      organizationDetails = response_OrgDetails;
      $scope.jobTitle = response_OrgDetails[0].designations;
      $scope.branches = response_OrgDetails[0].branches;
      $scope.department = response_OrgDetails[0].departments;

   }

    $scope.loader = false;
  },200);


};

$scope.getBranchShift = function(){

console.log($scope.project.branch);
$scope.Branch_Working_Shift = $scope.project.branch.workingHours;
$scope.HrManager = $scope.project.branch.hr;

};

});




