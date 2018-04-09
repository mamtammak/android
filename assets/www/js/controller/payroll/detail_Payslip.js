

Module_payroll.controller('Payslip', function($scope,$stateParams,AmsConstants,AmsValues,MenuList,StoreResponse,$timeout,$q, $mdSidenav,$ionicPopup,$state,$http,$window,$mdDialog,$ionicViewSwitcher,ConnectivityService,$rootScope,$ionicHistory) {
var detailSEarnings = [];var detailSDeduction = [];var detailSTotal = [];
var detail_payslip = JSON.parse($stateParams.data);console.log(detail_payslip);
$scope.close = function(){
$ionicHistory.goBack();
};
var countTDeduction = 0;
$scope.init = function(){
try{
detailSEarnings.length = 0 ; detailSDeduction.length = 0;detailSTotal.length = 0;
$scope.Organization = detail_payslip.organization;
$scope.MONTH = detail_payslip.month;
$scope.YEAR = detail_payslip.year;
$scope.FinancialYear = detail_payslip.financial_year;
$scope.Emplyoee_name = detail_payslip.forEmployee.name;

if(detail_payslip.forEmployee.job_title.name != undefined){
$scope.Designation = detail_payslip.forEmployee.job_title.name;
}
else{
$scope.Designation = "";
}
if(detail_payslip.forEmployee.department != undefined){
$scope.Department = detail_payslip.forEmployee.department.name;
}
else{
$scope.Department = "";
}
if(detail_payslip.forEmployee.employee_code != undefined){
$scope.emp_code = detail_payslip.forEmployee.employee_code;
}
else{$scope.emp_code = "";}

if(detail_payslip.forEmployee.bank_info.pan_number != undefined){
$scope.PAN = detail_payslip.forEmployee.bank_info.pan_number;
}
else{$scope.PAN = "";}

if(detail_payslip.details.lop != undefined){
$scope.Unpaid_Leaves = detail_payslip.details.lop;
}
else{
$scope.Unpaid_Leaves = 0;
}

$scope.PAYSLIP_STRUC = detail_payslip.structured_used.details;
$scope.Income_Tax = detail_payslip.details.taxes;
$scope.Professional_Tax = detail_payslip.details.professional_tax;
$scope.Monthlysalary = detail_payslip.structured_used.Monthlysalary;
if($scope.Unpaid_Leaves == 0){
console.log("no lop");
}
else{
var month = parseInt(detail_payslip.month) + 1;
var monthv = (month < 10 ? '0' + month : '' + month);//alert(monthv);
var NumOfdays = moment(detail_payslip.year +"-"+monthv, "YYYY-MM").daysInMonth();
console.log(NumOfdays);
if(detail_payslip.lop_cal == 'Monthly Salary'){
$scope.Sal_LOP = (( $scope.Monthlysalary / NumOfdays ) * $scope.Unpaid_Leaves).toFixed(2);
//console.log($scope.Sal_LOP);
}
else{
$scope.Sal_LOP = (( (detail_payslip.structured_used.ctc_annual / 12) / NumOfdays ) * $scope.Unpaid_Leaves).toFixed(2);
}

}

angular.forEach($scope.PAYSLIP_STRUC,function(v,k){
if(v.group == 'Statutory Component'){
countTDeduction += v.monthly;
}
});
if($scope.Unpaid_Leaves == 0){
$scope.TotalDeduction = countTDeduction + $scope.Income_Tax + $scope.Professional_Tax;
}
else{
$scope.TotalDeduction = countTDeduction + $scope.Income_Tax + $scope.Professional_Tax + parseFloat($scope.Sal_LOP);
}

}
catch(err){
console.log(err.message);
}
//alert(moment("2", "MM").daysInMonth());

};

$scope.checkforEmployer = function(comp){
var m = "(Employer)" , compShow;
if(comp.indexOf(m) == -1){
compShow = true;
}
else{
compShow = false;
}
return compShow;
}

});
Module_payroll.filter('monthName', [function() {
    return function (monthNumber) { //1 = January
        var monthNames = [ 'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December' ];
        return monthNames[monthNumber];
    }
}]);


