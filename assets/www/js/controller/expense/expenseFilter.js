

Module_expense.controller('teamExpenseFilter', function($scope,AmsConstants,AmsValues,$ionicPopup,$state,$http,$window,$mdDialog,$ionicViewSwitcher,ConnectivityService,$rootScope,$ionicHistory,$mdBottomSheet) {

var selectEmp,whichExp;
$scope.project = {};
$scope.EnableAfterFromDT = true;
if(AmsValues.HRMS_role != 'generic'){
$scope.showToAdmin = true;
}
else{
$scope.showToAdmin = false;
}
$scope.init = function(){
$scope.urlSupervisors = AmsConstants.url_hrms+'getEmployees?org='+AmsValues.HRMS_orgId;
$scope.loader = true;
setTimeout(function(){
    ConnectivityService.PostData($scope.urlSupervisors)
    .then(function(response) {
    $scope.showAdvancePayment = true;
    $scope.supervisors = response;
    $scope.loader = false;

    },
    function(jqxhr) {
      $scope.loader = false;
    });
   },100);
}

$scope.getEndMinDate = function(){
$scope.ToDate_minDate = new Date(moment($scope.project.fromdt).format("YYYY-MM-DD"));
$scope.EnableAfterFromDT = false;
};

$scope.teamExpense = function(){
var fromDate = moment($scope.project.fromdt).format("YYYY-MM-DD");
var toDate = moment($scope.project.todt).format("YYYY-MM-DD");
if($scope.project.fromdt == undefined || $scope.project.fromdt == ""){
window.plugins.toast.showLongBottom('Please select from date.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
return false;
}
else if($scope.project.todt == undefined || $scope.project.todt == ""){
window.plugins.toast.showLongBottom('Please select to date.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
return false;
}
else{
if($scope.project.employee == undefined || $scope.project.employee == 'None'){
selectEmp = 'null';whichExp = 2;
}
else if($scope.project.employee == "all"){
whichExp = 1;selectEmp = 'null';
}
else{
selectEmp = $scope.project.employee;whichExp = 2;
}
var url_teamExpenseHistory = AmsConstants.url_onBoard+'expenses/getExpenseByRole?org='+AmsValues.HRMS_orgId+'&user='+AmsValues.HRMS__id+'&role='+AmsValues.HRMS_role+'&appid='+AmsValues.HRMS__a+"&whichExp="+whichExp+"&fdate="+fromDate+"&tdate="+toDate+"&selectEmp="+selectEmp;
$scope.loader = true;
    setTimeout(function(){
    ConnectivityService.PostData(url_teamExpenseHistory)
      .then(function(response) {
      if(response.expenses.length !=0){
      $rootScope.$emit("CallMyTeamExpense",{para1 :JSON.stringify(response.expenses)});
      $mdBottomSheet.hide();
      }

      else{
        window.plugins.toast.showLongBottom('No records found.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
        $mdBottomSheet.hide();
        return false;
      }

        $mdBottomSheet.hide();
          $scope.loader = false;
      },
      function(data) {
          $scope.loader = false;
          $mdBottomSheet.hide();
      });

      },200);
}

}
});

