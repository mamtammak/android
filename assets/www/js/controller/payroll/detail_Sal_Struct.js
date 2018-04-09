

Module_payroll.controller('detail_Salary_Struct', function($document,$scope,$stateParams,AmsConstants,AmsValues,MenuList,StoreResponse,$timeout,$q, $mdSidenav,$ionicPopup,$state,$http,$window,$mdDialog,$ionicViewSwitcher,ConnectivityService,$rootScope,$compile,Upload) {
var detailSEarnings = [],detailSDeduction = [],detailSTotal = [] , basic_hra = [];

var cal_array = [];cal_array.length = 0;var arr = [];arr.length = 0;
$scope.selectedTags = [];var grp1 = [] , grp2 = [];grp1.length = 0;grp2.length = 0;
$scope.project = {};
var list_Structure = JSON.parse($stateParams.data);//console.log(list_Structure);
$scope.init = function(){
$scope.Sal_Struct_Holder = list_Structure.employee.name;
//$scope.totalEarningsM = list_Structure.ctc_monthly;
//$scope.totalEarningsAN = list_Structure.ctc_annual;
/*if(AmsValues.HRMS_role == "HR" || AmsValues.HRMS_role == "ADM"){
$scope.showNonEditable = false;
$scope.showEditableDetails = true;
$scope.showEditable = true;
}
else{
$scope.showNonEditable = true;
$scope.showEditable = false;
$scope.showEditableDetails = false;
}*/
//console.log(list_Structure);

$scope.GROUP = list_Structure.details;
/*$scope.tempGP = list_Structure.details;

angular.forEach($scope.GROUP,function(v,k){
        angular.forEach($scope.tempGP,function(v1,k1){
            if(v.component == v1.name){
                var tmp = {
                "component":v.component,
                "annual":v.annual
                }
            }
        cal_array.push(v);
        })
    })
$scope.CalculateS = removeDuplicates(cal_array);*/
//console.log(removeDuplicates(cal_array));


};

/* Get able/disable value */
$scope.get_able_disable = function(caltype,v){
var Fixed_var;
if(caltype == 'Fixed'){
if(v == 'value'){
Fixed_var = false;
}
else{
Fixed_var = true;
}
}
else{
if(v == 'valueA'){
Fixed_var = false;
}
else{
Fixed_var = true;
}
}
return Fixed_var;

}
/* end */

$scope.changecolor = function(comp){
if(comp == 'CTC'){
var myobj = {
"background-color" : "#e6ecff"
}
return myobj;
}
else{
var myobj = {
"background-color" : "transparent"
}
return myobj;
}
}
function removeDuplicates(json_all) {
    var arr = [],
        collection = [];

    $.each(json_all, function (index, value) {
        if ($.inArray(value.component, arr) == -1) {
            arr.push(value.component);
            collection.push(value);
        }
    });
    return collection;
}


$scope.close = function(){
$ionicViewSwitcher.nextTransition('none');
$state.go("payroll");
};

$scope.delete_Sal_Structure = function(){
var url_deleteStructure = AmsConstants.url_onBoard+'payroll_structures/deleteStructure?_id='+list_Structure._id;
var confirmPopup = $ionicPopup.confirm({
                title: 'Salary Structure',
                template: 'Are you sure, you want to delete this salary structure.'
              });

              confirmPopup.then(function (res) {
                if (res) {
                $scope.loader = true;
                  setTimeout(function(){
                      ConnectivityService.PostData(url_deleteStructure)
                      .then(function(response) {
                          $scope.loader = false;
                          window.plugins.toast.showLongBottom('Salary Structure deleted successfully.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
                        $rootScope.$emit("CallParentMethodSalStructure", function(){
                          //alert("done");
                        });

                        $ionicViewSwitcher.nextTransition('none');
                        $state.go("payroll");
                      },
                      function(jqxhr) {
                        $scope.loader = false;
                        window.plugins.toast.showLongBottom('Failed to delete salary structure.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
                      });
                   },200);
                }

              });

};
var ArraySalTemp = [] ,SaveStruct = [];
$scope.Update_Sal_Structure = function(){
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
SaveStruct.push( JSON.parse( $(this).attr('name') ) );
}
});

console.log(SaveStruct);
var temp=[];
SaveStruct=SaveStruct.filter((x, i)=> {
  if (temp.indexOf(x.component) < 0) {
    temp.push(x.component);
    return true;
  }
  return false;
})
console.log(SaveStruct);
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
var envelope = {
"organization":list_Structure.organization,
"_id":list_Structure._id,
"details":ArraySalTemp,
"name":list_Structure.name,
"salary_template":list_Structure.salary_template,
"employee": list_Structure.employee._id,
"ctc_annual":ctc_annual,
"ctc_monthly":ctc_monthly,
"Monthlysalary":Monthlysalary,
"ctc_taxable":taxable
};
var url_addStructure = AmsConstants.url_onBoard+'payroll_structures/updateStructure';
$scope.loader = true;
setTimeout(function(){
    ConnectivityService.PostData_post(url_addStructure,envelope)
    .then(function(response) {
        $scope.loader = false;
        window.plugins.toast.showLongBottom('Salary Structure updated successfully.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
      $rootScope.$emit("CallParentMethodSalStructure", function(){
        //alert("done");
      });

      $ionicViewSwitcher.nextTransition('none');
      $state.go("payroll");
    },
    function(jqxhr) {
      $scope.loader = false;
      window.plugins.toast.showLongBottom('Failed to update salary structure.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
    });
 },200);
 }
};


$scope.addToSelectedTags = function(index) {
 var selectedtag = $scope.GROUP[index];
 $scope.selectedTags.push(selectedtag);
 //setTimeout(function(){
 $scope.$watch('selectedTags[' + ($scope.selectedTags.length - 1)+ ']', function(newval, oldval){
 //console.log(newval);
 if(newval.calctype == 'Fixed'){
 $scope.GROUP[index].annual = newval.valuenum;
 $scope.GROUP[index].monthly = ( newval.valuenum / 12 ).toFixed(2);
 }
 else{
 $scope.GROUP[index].annual = newval.annual;
 $scope.GROUP[index].monthly = newval.monthly;

 }


setTimeout(function(){
//if(newval.calctype == 'Fixed'){
if($scope.GROUP[index].annual == newval.valuenum){
$scope.GROUP[index].annual = newval.valuenum;
 $scope.GROUP[index].monthly = ( newval.valuenum / 12 ).toFixed(2);

$scope.temp_Ch1 = $scope.GROUP;
//console.log($scope.temp_Ch1);
    angular.forEach($scope.GROUP,function(v,k){
            angular.forEach($scope.temp_Ch1,function(v1,k1){
                if(v.component == v1.name){
                    var tmp = {
                    "component":v.component,
                    "annual":v.annual
                    }
                    grp2.push(tmp);
                }

            })
        })
    $scope.CalculateS = removeDuplicates(grp2);console.log($scope.CalculateS);
}
else{
$scope.GROUP[index].annual = newval.annual;
 $scope.GROUP[index].monthly = newval.monthly;

$scope.temp_Ch1 = $scope.GROUP;
//console.log($scope.temp_Ch1);
    angular.forEach($scope.GROUP,function(v,k){
            angular.forEach($scope.temp_Ch1,function(v1,k1){
                if(v.component == v1.name){
                    var tmp = {
                    "component":v.component,
                    "annual":v.annual
                    }
                    grp2.push(tmp);
                }

            })
        })
    $scope.CalculateS = removeDuplicates(grp2);
}
//}

/* for total calculation */
/* end */

},100);

 },true);
 //},1000);
};




});



