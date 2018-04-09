

Module_payroll.controller('detail_investment', function($scope,$cordovaFileTransfer,$stateParams,AmsConstants,AmsValues,MenuList,StoreResponse,$timeout,$q,$mdSidenav,$ionicPopup,$state,$http,$window,$mdDialog,$ionicViewSwitcher,ConnectivityService,$rootScope,$compile,Upload,$ionicHistory) {
var detailINVESTMENT = JSON.parse($stateParams.data);
//console.log(detailINVESTMENT);
var temp_total;var temp_total_change;var val;var investment_desc_new = [];
$scope.double_down = true;
$scope.showInvestmentAMT = false;
$scope.close = function(){
$ionicHistory.goBack();
};
$scope.init = function(){
//var SumUP = 0;
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
$scope.Title = detailINVESTMENT.section.section;
$scope.investment_desc = detailINVESTMENT.investment_desc;
$scope.inves_documents = detailINVESTMENT.documents;

$scope.project = {financialY:detailINVESTMENT.financial_year};
$scope.investment_TYP = detailINVESTMENT.section.investment_desc;

$scope.project.investedamount = detailINVESTMENT.invested_amount;
$scope.project.deductedAmt = detailINVESTMENT.deduction;
$scope.MaxExempted = detailINVESTMENT.section.max_exemption;
$scope.exempPer = detailINVESTMENT.section.percent_exemption;
$scope.nonExempAmt = detailINVESTMENT.deduction;

};

$scope.getFileName = function(path){
var FileName = path.substr(path.lastIndexOf('/')+1);
return FileName;
}

$scope.downloadInvesFile = function(doc){
var file_path = doc.substr(doc.lastIndexOf('/')+1);
var DownloadURL = doc.split('employee_investments/')[1];
var uri = AmsConstants.url_onBoard+DownloadURL;
console.log(uri);
    var targetPath = cordova.file.documentsDirectory + file_path;
    var trustHosts = true;
    var options = {};

    $cordovaFileTransfer.download(uri, targetPath, options, trustHosts)
      .then(function(result) {
        // Success!
        console.log(result);
      }, function(err) {
        // Error
      }, function (progress) {
        $timeout(function () {
          $scope.downloadProgress = (progress.loaded / progress.total) * 100;
          console.log($scope.downloadProgress);
        });
      });

}
$scope.addInvestment = function(){
$scope.showInvestmentAMT = false;
val = Math.floor(1000 + Math.random() * 9000);
var ADD_Invsetment = $("<div layout='row' id='IN_"+val+"' class='mdcard_pg'>"
                    +"<div style='width:48%;'>"
                    +"<md-input-container style='margin:0;width:100%;'>"
                    +"<label>Select investment type</label>"
                    +"<md-select ng-change='getinvestmentSelector()' ng-model='model_"+val+"' name='selector'>"
                    +"<md-option><em>None</em></md-option>"
                    +"<md-option  ng-repeat='item in investment_TYP' value='{{item}}' id='Options_{{item}}'>"
                    +"{{item}}"
                    +"</md-option>"
                    +"</md-select>"
                    +"</md-input-container></div>"
                    +"<div layout='column' style='width:48%;'>"
                    +"<md-input-container style='margin:0;width:100%;' class='md-block'>"
                    +"<input required md-no-asterisk ng-focus='hideInV()' ng-model='investedAMT_"+val+"' id='investedAMT_"+val+"' type='number' pattern='[0-9]*' inputmode='numeric'>"
                    +"</md-input-container></div>"
                    +"<md-button ng-click='deleteCard("+val+")' class='md-icon-button' style='background-color:transparent;'>"
                    +"<i class='fa fa-times-circle' style='color:rgb(63,81,181);font-size:26px;'></i>"
                    +"</md-button>"
                    +"</div>");

                                                            ;
var $el = ADD_Invsetment.appendTo('#investm-card');
 $compile($el)($scope);
};
$scope.deleteCard = function(id){
$scope.showInvestmentAMT = false;
$('div#IN_'+id).animate({

           'font-size': "0px"
         }, 500, function() {

             $('div#IN_'+id).remove();

         });
};

$scope.showInV = function(){
var total = 0;
$scope.showInvestmentAMT = true;
$("md-card input[type=number]").each(function() {
      console.log( $(this).val() );
    if($(this).val() == ""){
    total += 0;
    }
    else{
    total += parseFloat($(this).val());
    }

    });
    //console.log(total);
$('#DTotal_InvestmentV').html(total);
$('#DdeductedAmount').html( Math.abs($scope.MaxExempted - total));
};

$scope.hideInV = function(){
$scope.showInvestmentAMT = false;
};



$scope.testfn = function(id){
     if($('#investedAMT_'+id).val() == ""){
     temp_total = 0 + $scope.total_investment;
     $scope.total_investment = temp_total;
     $scope.nonExempAmt = Math.abs(parseFloat($scope.MaxExempted) - $scope.total_investment);
     }
     else{
     temp_total = parseFloat($scope.total_investment) + parseFloat($('#investedAMT_'+id).val());
     $scope.total_investment = temp_total;
     $scope.nonExempAmt = Math.abs(parseFloat($scope.MaxExempted) - $scope.total_investment);
     }
};


$scope.saveInvestment = function(){
var type,TotalV,SumUP = 0,envelope;investment_desc_new.length = 0;
var url_uploadDoc = AmsConstants.url_onBoard+'fileupload/uploadInvestDocs';
var url_updateINV = AmsConstants.url_onBoard+'investment_declarations/updateMyInvestment';
$('#Detail_investment').find('option:checked').each(function(index1) {
type = $(this).val();
    $('#Detail_investment').find('input[type=number]').each(function(index2) {
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
 envelope = {
 "_id":detailINVESTMENT._id,
 "organization":AmsValues.HRMS_orgId,
 "section":detailINVESTMENT.section._id,
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


 ConnectivityService.PostData_post(url_updateINV,envelope)
      .then(function(response) {

      //console.log(response);
      $scope.loader = false;
      window.plugins.toast.showLongBottom('Investment added successfully.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
      $rootScope.$emit("CallParentMethodPayroll", function(){});

      $ionicViewSwitcher.nextTransition('none');
      $state.go("payroll");

      },
      function(data) {
      //console.log(data);
       $scope.loader = false;
       //console.log("error");
       window.plugins.toast.showLongBottom('Adding new investment failed.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
       $ionicViewSwitcher.nextTransition('none');

      });
},200);
};

$scope.deleteInvestment = function(){
var url_deleteInv = AmsConstants.url_onBoard+'investment_declarations/deleteMyInvestment?_id='+detailINVESTMENT._id;
var confirmPopup = $ionicPopup.confirm({
                title: 'Investment',
                template: 'Are you sure, you want to delete this investment.'
              });

confirmPopup.then(function (res) {
  if (res) {
      $scope.loader = true;
      setTimeout(function(){
      ConnectivityService.PostData(url_deleteInv)
            .then(function(response) {
            console.log(response);
            $scope.loader = false;
            window.plugins.toast.showLongBottom('Investment deleted.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
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
             window.plugins.toast.showLongBottom('Failed to delete investment.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
             $ionicViewSwitcher.nextTransition('none');

            });
      },200);
  }

});

};

});


