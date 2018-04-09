

Module_payroll.controller('AddNewInvestment', function($scope,AmsConstants,AmsValues,MenuList,StoreResponse,$timeout,$q, $mdSidenav,$ionicPopup,$state,$http,$window,$mdDialog,$ionicViewSwitcher,ConnectivityService,$rootScope,$compile,Upload,$ionicHistory,$document) {
$scope.project = {section:"",selector:"",investedamount:0};
$scope.investmentS = "";
var MYINVESTMENT_DATA = JSON.parse(localStorage.getItem("MyInvestment"));
console.log(MYINVESTMENT_DATA);
var detailList = [];var invTYPE = [];invTYPE.length = 0;
var investment_desc_new = [];var section = [];
var temp_total_change = 0,temp_total = 0;
$scope.double_down = true;
$scope.showInvestmentAMT = true;

$scope.close = function(){
$ionicHistory.goBack();
};

$scope.hideInV = function(){
$scope.showInvestmentAMT = false;
};

$scope.init = function(){
section.length = 0;
$scope.url_investment = AmsConstants.url_onBoard+'investments/getInvestments?org=adnateitsolutions';
$scope.loader = true;
setTimeout(function(){
        ConnectivityService.PostData($scope.url_investment)
          .then(function(response) {
          console.log(response);
          if(response.length != 0){
          angular.forEach(MYINVESTMENT_DATA,function(v,k){
           section.push(v.section.section);
          });
          $scope.INVESTMENT = response;
          $scope.investmentS = response.filter(function(x) {
              return section.indexOf(x.section) == -1; // checking if the both contain same ids
          }).map(function(x) {
              return x; // returns just the second element which is title
          });

          }

          $scope.loader = false;
          },
          function(data) {
              $scope.loader = false;

        });
 },200);
 $scope.total_investment = $scope.project.investedamount;
 $scope.nonExempAmt = 0;
};

$scope.getFinancialY = function(){
$scope.urlFinancialY = AmsConstants.url_onBoard+'investment_declarations/getFinancialYears?_id='+AmsValues.HRMS_orgId;
$scope.loader = true;
setTimeout(function(){
        ConnectivityService.PostData($scope.urlFinancialY)
          .then(function(response) {
          console.log(response);
          $scope.financialY = response;

            $scope.loader = false;
          },
          function(data) {
              $scope.loader = false;

        });
  },200);
};

$scope.getInvestmentTYP = function(){
detailList.length = 0;
var investTYP = $scope.project.section;
$scope.ID = investTYP._id;

angular.forEach($scope.investmentS,function(vI,kI){
if(investTYP.section == vI.section){
$scope.invetmentType = vI.investment_desc;
$scope.MaxExempted = vI.max_exemption;
$scope.exempPer = vI.percent_exemption;
}

});

};

$scope.getinvestmentSelector = function(){
 invTYPE.push($scope.project.selector);
};
var store_v;
$scope.testfn = function(id){

};

$scope.showInV = function(){
var total = 0;
$scope.showInvestmentAMT = true;
$("md-card input[type=number]").each(function() {
    if($(this).val() == ""){
    total += 0;
    }
    else{
    total += parseFloat($(this).val());
    }

    });
$('#Total_InvestmentV').html(total);
$('#deductedAmount').html( Math.abs($scope.MaxExempted - total));
};


var val;
$scope.addInvestment = function(){
val = Math.floor(1000 + Math.random() * 9000);
if($scope.project.investedamount == "0" || $scope.project.investedamount == ""){
window.plugins.toast.showLongBottom('Please enter investment amount.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
return false;
}

else if($('#investedAMT2_'+val).val() == ""){
window.plugins.toast.showLongBottom('Please enter investment amount.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
return false;
}
else if($scope.project.selector == ""){
window.plugins.toast.showLongBottom('Please select investment type.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
return false;
}
else{
$scope.showInvestmentAMT = false;

var ADD_Invsetment = $("<div layout='row' id='IN_"+val+"' class='mdcard_pg'>"
                    +"<div style='width:48%;'>"
                    +"<md-input-container style='margin:0;width:100%;'>"
                    +"<label>Select investment type</label>"
                    +"<md-select ng-change='getinvestmentSelector()' ng-model='model_"+val+"' name='selector'>"
                    +"<md-option><em>None</em></md-option>"
                    +"<md-option  ng-repeat='item in invetmentType' value='{{item}}' id='Options_{{item}}'>"
                    +"{{item}}"
                    +"</md-option>"
                    +"</md-select>"
                    +"</md-input-container></div>"
                    +"<div layout='column' style='width:48%;'>"
                    +"<md-input-container style='margin:0;width:100%;' class='md-block'>"
                    +"<input required md-no-asterisk ng-focus='hideInV()' ng-model='investedAMT_"+val+"' id='investedAMT2_"+val+"' type='number' pattern='[0-9]*' inputmode='numeric'>"
                    +"</md-input-container></div>"
                    //+"<div layout='row' style='margin-top:-18px;width:100%;'>"
                    +"<md-button ng-click='deleteCard("+val+")' class='md-icon-button' style='background-color:transparent;'>"
                    +"<i class='fa fa-times-circle' style='color:rgb(63,81,181);font-size:26px;'></i>"
                    +"</md-button>"
                    +"</div>");

var $el = ADD_Invsetment.appendTo('#investm-card');
 $compile($el)($scope);
}

};
$scope.deleteCard = function(id){
$scope.showInvestmentAMT = false;
$('div#IN_'+id).animate({

           'font-size': "0px"
         }, 500, function() {

             $('div#IN_'+id).remove();

         });
};

$scope.saveNewDeclaration = function(){
var type,TotalV,SumUP = 0,envelope;investment_desc_new.length = 0;
var url_uploadDoc = AmsConstants.url_onBoard+'fileupload/uploadInvestDocs';
var url_addNewInvestment = AmsConstants.url_onBoard+'investment_declarations/addInvestmentDeclaration';
$('#investment').find('option:checked').each(function(index1) {
type = $(this).val();
    $('#investment').find('input[type=number]').each(function(index2) {
    TotalV = $(this).val();

        if(index1 == index2){
        SumUP += parseFloat(TotalV);
        var tmp = {
            invetmentType : type,
            investedamount : TotalV
            };
          investment_desc_new.push(tmp);
        }
    });

  });
var DeductAmt = Math.abs(parseFloat($scope.MaxExempted) - SumUP);
$scope.loader = true;
setTimeout(function(){
 envelope = {"organization":AmsValues.HRMS_orgId,
 "section":$scope.ID,
 "investment_desc":investment_desc_new,
 "max_exemption":$scope.MaxExempted,
 "percent_exemption":$scope.exempPer,
 "invested_amount":SumUP,
 "deduction":DeductAmt,
 "financial_year":$scope.project.financialY,
 "employee":AmsValues.HRMS__id,
 "documents":[],
 "amount_exemption":SumUP
 };

 ConnectivityService.PostData_post(url_addNewInvestment,envelope)
      .then(function(response) {

      console.log(response);
      $scope.loader = false;
      window.plugins.toast.showLongBottom('Investment updated successfully.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
      $rootScope.$emit("CallParentMethodPayroll", function(){
        //alert("done");
      });

      $ionicViewSwitcher.nextTransition('none');
      $state.go("payroll");

      },
      function(data) {
      console.log(data);
       $scope.loader = false;
       console.log("error");
       window.plugins.toast.showLongBottom('Updating investment failed.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
       $ionicViewSwitcher.nextTransition('none');

      });
},200);



};


});


