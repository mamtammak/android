

Module_payroll.controller('AddSalStructure', function($scope,AmsConstants,AmsValues,MenuList,StoreResponse,$timeout,$q, $mdSidenav,$ionicPopup,$state,$http,$window,$mdDialog,$ionicViewSwitcher,ConnectivityService,$rootScope,$compile,Upload,$ionicHistory,$document) {
var detailSEarnings = [],detailSDeduction = [],detailSTotal = [] , basic_hra = [] , SaveStruct = [];
$scope.project = {ctc_model:"",supervisors:""};
var ArraySalTemp = [];
$scope.ShowTemplateV = false;
$scope.init = function(){
$scope.urlSupervisors = AmsConstants.url_hrms+'getSupervisors?org='+AmsValues.HRMS_orgId;

$scope.urlTemplate = AmsConstants.url_onBoard+'payroll_templates/getTemplates?org='+AmsValues.HRMS_orgId;
setTimeout(function(){
    ConnectivityService.PostData($scope.urlSupervisors)
    .then(function(response) {
    $scope.supervisors = response;
        $scope.loader = false;

        ConnectivityService.PostData($scope.urlTemplate)
            .then(function(response2) {
            //console.log(response2);
            $scope.Sal_Template = response2;
                $scope.loader = false;
            },
            function(jqxhr) {
              $scope.loader = false;
            });
    },
    function(jqxhr) {
      $scope.loader = false;
    });
 },200);
};

$scope.getTemplateOfEmployee = function(){
detailSEarnings.length = 0;detailSDeduction.length = 0;detailSTotal.length = 0 , basic_hra.length = 0;
$scope.ShowTemplateV = true;
//console.log($scope.project.Sal_Template);
angular.forEach($scope.project.Sal_Template.details,function(value,key){
if(value.group == 'Addition'){

//console.log(detailSEarnings);
if(value.component == 'Basic'){
basic_hra.push(value);
$scope.project.basicValue = value.value;
}
if(value.component == 'HRA'){
basic_hra.push(value);
$scope.project.hraValue = value.value;
}
detailSEarnings.push(value);

}
else if(value.group == 'Deduction'){

detailSDeduction.push(value);
}
else{
detailSTotal.push(value);
}
});
$scope.DetailBasicHra = basic_hra;
$scope.Earnings = detailSEarnings;
$scope.Deduction = detailSDeduction;
$scope.Group = detailSTotal;
//console.log(basic_hra);
angular.forEach(detailSTotal,function(value,key){
$scope.project.ctc_model = value.valuenum;
});

};

$scope.SumEarnings = function(){

var dtotal = 0;var dtotalY = 0;
var mtotal = 0;var mtotalY = 0;

$('.EARNINGS .monthly_total h4').each(function(){
if(isNaN(parseFloat($(this).text()))){
console.log("not a number");
}
else{
mtotal += parseFloat($(this).text());
}

});
$('.EARNINGS .annual_total h4').each(function(){
if(isNaN(parseFloat($(this).text()))){
console.log("not a number");
}
else{
mtotalY += parseFloat($(this).text());
}

});
//alert(mtotalY);
$('#DEDUCTION .monthly_total h4').each(function(){
if(isNaN(parseFloat($(this).text()))){
console.log("not a number");
}
else{
dtotal += parseFloat($(this).text());
}

});
$('#DEDUCTION .annual_total h4').each(function(){
if(isNaN(parseFloat($(this).text()))){
console.log("not a number");
}
else{
dtotalY += parseFloat($(this).text());
}

});
//alert(dtotalY);
var monthlyT = mtotal + dtotal;
var yearlyT = mtotalY + dtotalY;
$('#Total_M').html("");$('#Total_Y').html("");
$('#Total_M').html(monthlyT);//alert(monthlyT +"monthly");
$('#Total_Y').html(yearlyT);//alert(yearlyT +"yearly");
};

$scope.close = function(){
$ionicViewSwitcher.nextTransition('none');
$state.go("payroll");
};

$scope.saveNewStructure = function(){
ArraySalTemp.length = 0;SaveStruct.length = 0;
var taxable = 0;
if(parseFloat($scope.project.ctc_model) != parseFloat($('#Total_Y').text())){
window.plugins.toast.showLongBottom('CTC do not match to total CTC payable.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
return false;
}
else{
$('.EARNINGS input[type=number]').each(function(){
if($(this).attr('name') == undefined){
console.log("undefined");
}
else{
SaveStruct.push(JSON.parse($(this).attr('name')));
}

});

$('#DEDUCTION input[type=number]').each(function(){
if($(this).attr('name') == undefined){
console.log("undefined");
}
else{
SaveStruct.push(JSON.parse($(this).attr('name')));
}
});

$('.group input[type=number]').each(function(){
if($(this).attr('name') == undefined){
console.log("undefined");
}
else{
SaveStruct.push(JSON.parse($(this).attr('name')));
}
});

var temp=[];
SaveStruct=SaveStruct.filter((x, i)=> {
  if (temp.indexOf(x.component) < 0) {
    temp.push(x.component);
    return true;
  }
  return false;
});
$.each(SaveStruct,function(key,value){
var tmp ,annual,monthly;
if(value.component == 'Basic'){
annual = $('#basicAnnual').text();
monthly = $('#basicMonthly').text();

}

else if(value.component == 'HRA'){
annual = $('#HraAnnual').text() ;
monthly = $('#HraMonthly').text() ;

}
else if(value.component == 'CTC'){
annual = parseFloat($scope.project.ctc_model);
monthly = (parseFloat($scope.project.ctc_model) / 12).toFixed(2) ;

}

else if(value.calctype == 'Fixed'){

annual = parseFloat(value.valuenum);
monthly = (parseFloat(value.valuenum) / 12).toFixed(2) ;
}

else{
console.log("no result");
}

if(value.tax_status == 'Taxable'){
if(value.component == 'CTC'){console.log("taxable amount");}
else{
taxable += parseFloat(annual);
}
}

tmp = {
group : value.group,
component : value.component,
tax_status : value.tax_status,
calctype : value.calctype,
value : value.value,
name : value.name,
_id : value._id,
valuenum : value.valuenum,
annual : annual,
monthly : monthly
};

ArraySalTemp.push(tmp);
});

var ctc_annual = $('#Total_Y').text();
var ctc_monthly = $('#Total_M').text();
var Monthlysalary = parseFloat(ctc_annual) - parseFloat(ctc_monthly);
var envelope = {"organization":$scope.project.Sal_Template.organization,
"details":ArraySalTemp,
"name":$scope.project.Sal_Template.name,
"salary_template":$scope.project.Sal_Template._id,
"employee": $scope.project.supervisors,
"ctc_annual":ctc_annual,
"ctc_monthly":ctc_monthly,
"Monthlysalary":Monthlysalary,
"ctc_taxable":taxable
};
var url_addStructure = AmsConstants.url_onBoard+'payroll_structures/addStructure';
$scope.loader = true;
setTimeout(function(){
    ConnectivityService.PostData_post(url_addStructure,envelope)
    .then(function(response) {
        $scope.loader = false;
        window.plugins.toast.showLongBottom('Salary Structure added successfully.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
      $rootScope.$emit("CallParentMethodSalStructure", function(){});
      $ionicViewSwitcher.nextTransition('none');
      $state.go("payroll");
    },
    function(jqxhr) {
      $scope.loader = false;
      window.plugins.toast.showLongBottom('Failed to add salary structure.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
    });
 },200);
}

};
});

