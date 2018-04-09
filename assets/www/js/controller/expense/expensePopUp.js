

Module_expense.controller('expensePopUp', function($scope,Upload,AmsConstants,AmsValues,MenuList,StoreResponse,$timeout,$q, $mdSidenav,$ionicPopup,$state,$http,$window,$mdDialog,$ionicViewSwitcher,ConnectivityService,$rootScope,$compile,$ionicHistory) {


$scope.project = {};
$scope.initMyExpenseD = function(){
$scope.MyExpenseDetails = JSON.parse(localStorage.getItem("ExpenseDetails"));console.log($scope.MyExpenseDetails);
$scope.ExpenseID = $scope.MyExpenseDetails._id;
$scope.project.Username = $scope.MyExpenseDetails.user.name;
$scope.project.Merchant = $scope.MyExpenseDetails.merchant;
$scope.project.Date = new Date($scope.MyExpenseDetails.expense_date);

$scope.project.advpay = $scope.MyExpenseDetails.advance_amount;
$scope.project.Currency = $scope.MyExpenseDetails.currency;
$scope.project.Amount = $scope.MyExpenseDetails.amount;
$scope.project.Description = $scope.MyExpenseDetails.description;
$scope.project.Reference = $scope.MyExpenseDetails.reference;
$scope.project.report = $scope.MyExpenseDetails.report_addition;
$scope.ExpenseStatus = StoreResponse.expenseStatus($scope.MyExpenseDetails.status);

if($scope.MyExpenseDetails.user._id == AmsValues.HRMS__id){

if($scope.ExpenseStatus == 'Cancelled' || $scope.ExpenseStatus == 'Final Approved' || $scope.ExpenseStatus == 'Rejected by Manager' || $scope.ExpenseStatus == 'Reverted by manager' || $scope.ExpenseStatus == 'Rejected by accountant'){
$scope.disableExpenseStatus = false;
$scope.disableInput = true;
$scope.showDateNonEditable = true;
$scope.showDateEditable = false;
$scope.project.Category = $scope.MyExpenseDetails.category.name;
}

else{
$scope.disableExpenseStatus = true;
$scope.disableInput = false;
$scope.showDateNonEditable = false;
$scope.showDateEditable = true;
$scope.ex_category = $scope.MyExpenseDetails.category._id;
$scope.Category = JSON.parse(localStorage.getItem("ExpenseCat"));
}
}
else{
$scope.disableExpenseStatus = false;
$scope.disableInput = true;
$scope.showDateNonEditable = true;
$scope.showDateEditable = false;
$scope.project.Category = $scope.MyExpenseDetails.category.name;
}

if($scope.MyExpenseDetails.expense_documents != undefined){
$scope.defaultfiles = $scope.MyExpenseDetails.expense_documents;
}
};

$scope.initMyAdvPaymentD = function(){
$scope.MyAdvPayDetails = JSON.parse(localStorage.getItem("AdvPayDetails"));
console.log($scope.MyAdvPayDetails);

$scope.project.Date = new Date($scope.MyAdvPayDetails.payment_date);
$scope.project.Currency = $scope.MyAdvPayDetails.currency;
$scope.project.Amount = $scope.MyAdvPayDetails.amount;
$scope.project.Reference = $scope.MyAdvPayDetails.reference;
$scope.project.report = $scope.MyAdvPayDetails.report_addition;


$scope.pay_mode = JSON.parse(localStorage.getItem("paymentMode"));
$scope.supervisors = JSON.parse(localStorage.getItem("Supervisors"));
//console.log($scope.pay_mode);
$scope.PaidMODE = $scope.MyAdvPayDetails.payment_mode._id;
$scope.project.Username = $scope.MyAdvPayDetails.user;
};
$scope.close = function(){
$ionicHistory.goBack();
};

$scope.Filename = function(name){
var Fname = name.substr(name.lastIndexOf('/')+1);
return Fname;
};

var CollectionFiles = [];CollectionFiles.length = 0;
$scope.uploadFiles = function(files) {
if(files[0] != undefined){
CollectionFiles.push(files[0]);
console.log(CollectionFiles);
$scope.files = CollectionFiles;
}
else{
console.log(files[0]);
}
}

$scope.removeDefaultFile = function(obj){
angular.forEach($scope.MyExpenseDetails.expense_documents,function(v,k){
if(obj == v){
$scope.defaultfiles.splice(k,1);
}
})
}

$scope.removeFile= function(obj){
console.log(obj)
angular.forEach(CollectionFiles,function(v,k){
if(obj.lastModified == v.lastModified){
$scope.files.splice(k,1);
}
})
}

var UploadeFiles = [] ;

$scope.editExpense = function(){
UploadeFiles.length = 0;
if($scope.project.Date == ""){
window.plugins.toast.showLongBottom('Please add expense claiming date.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
$("#expenseDT").focus();
return false;
}
else if($scope.project.Merchant == ""){
window.plugins.toast.showLongBottom('Please add merchant.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
$("#Merchant").focus();
return false;
}
else if($scope.project.Category == ""){
window.plugins.toast.showLongBottom('Please add category.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
return false;
}
else if($scope.project.Amount == ""){
window.plugins.toast.showLongBottom('Please add amount.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
$("#Amount").focus();
return false;
}

else{
$scope.Expdate = moment($scope.project.Date).format("YYYY-MM-DD");

if ($scope.files != undefined) {
$scope.loader = true;
    setTimeout(function(){
angular.forEach($scope.files, function(file) {
                Upload.upload({
                    url: AmsConstants.url_onBoard+'fileupload/uploadExpenseDocs',
                    fields: {
                        'idfolder': AmsValues.HRMS_email
                    },
                    file: file
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    $scope.log = 'progress: ' + progressPercentage + '% ' +
                                evt.config.file.name + '\n' + $scope.log;
                }).success(function (data, status, headers, config) {
                    $timeout(function() {
                        angular.forEach(data,function(v,k){
                        var tmp = AmsValues.HRMS_email+"/"+v.filename;
                        UploadeFiles.push(tmp);
                        uploadExpense();
                        })
                    });
                });
            });
    },100);
}
else{
var envelope = {
"_id" : $scope.MyExpenseDetails._id,
"organization":AmsValues.HRMS_orgId,
"merchant":$scope.project.Merchant,
"expense_date":$scope.Expdate,
"category":$scope.project.Category,
"user":AmsValues.HRMS__id,
"currency":$scope.CurrencyCode,
"amount":$scope.project.Amount,
"description":$scope.project.Description,
"reference":$scope.project.Reference,
"report_addition":$scope.project.addReport,
"app":AmsValues.HRMS__a,
"expense_documents":$scope.MyExpenseDetails.expense_documents
};
UploadNewExpense(envelope);
}

}


};

function uploadExpense(){
if(UploadeFiles.length == $scope.files.length){
var envelope = {
"_id" : $scope.MyExpenseDetails._id,
"organization":AmsValues.HRMS_orgId,
"merchant":$scope.project.Merchant,
"expense_date":$scope.Expdate,
"category":$scope.project.Category,
"user":AmsValues.HRMS__id,
"currency":$scope.CurrencyCode,
"amount":$scope.project.Amount,
"description":$scope.project.Description,
"reference":$scope.project.Reference,
"report_addition":$scope.project.addReport,
"app":AmsValues.HRMS__a,
"expense_documents":UploadeFiles.concat($scope.MyExpenseDetails.expense_documents)
};
UploadNewExpense(envelope);
}
else{
console.log("error");
}
}

function UploadNewExpense(envelope){
if($scope.files != undefined){
$scope.files.length = 0;
}

$scope.url_addexpense = AmsConstants.url_onBoard+'expenses/updateExpense';
$scope.loader = true;
    setTimeout(function(){


    ConnectivityService.PostData_post($scope.url_addexpense,envelope)
      .then(function(response) {
      console.log(response);

      window.plugins.toast.showLongBottom('Expense updated successfully.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
          $scope.loader = false;
         $rootScope.$emit("CallExpenseHistory", function(){
                              //alert("done");
         });
         $ionicViewSwitcher.nextTransition('none');
         $state.go("expense");
      },
      function(data) {
        $scope.loader = false;

      });
   },200);
}

$scope.deleteExpense = function(){
var confirmPopup = $ionicPopup.confirm({
   title: '',
   template: 'Are you sure, you want to cancel this expense.'
});
confirmPopup.then(function (res) {
  if (res) {
  $scope.url_delExpense = AmsConstants.url_onBoard+'Expenses/withdrawExpense?expenseid='+$scope.MyExpenseDetails._id+'&app='+AmsValues.HRMS__a;
  $scope.loader = true;
      setTimeout(function(){

      ConnectivityService.PostData($scope.url_delExpense)
        .then(function(response) {
        console.log(response);
        window.plugins.toast.showLongBottom('Expense cancelled.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
        $scope.loader = false;
        $rootScope.$emit("CallExpenseHistory", function(){});
        $ionicViewSwitcher.nextTransition('none');
        $state.go("expense");
        },
        function(data) {
          $scope.loader = false;

        });
     },200);
  }

});

}

/* Advance payment */

$scope.editAdvPay = function(){

if($scope.project.Date == ""){
window.plugins.toast.showLongBottom('Please add payment date.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
//$("#paymentDT").focus();
return false;
}
else if($scope.project.Username == ""){
window.plugins.toast.showLongBottom('Please select user.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
return false;
}
else if($scope.project.PaymentThrough == ""){
window.plugins.toast.showLongBottom('Please add payment mode.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
return false;
}
else if($scope.project.Amount == ""){
window.plugins.toast.showLongBottom('Please add amount.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
//$("#ADVAmount").focus();
return false;
}
/*else if($scope.project.Reference == ""){
window.plugins.toast.showLongBottom('Please add reference.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
$("#ADVReference").focus();
return false;
}*/
else{
//console.log($scope.project.pay_mode);
$scope.ADVExpdate = moment($scope.project.Date).format("YYYY-MM-DD");
var envelope = {
"_id":$scope.MyAdvPayDetails._id,
//"organization":AmsValues.HRMS_orgId,
"payment_date":$scope.ADVExpdate,
"payment_mode":$scope.project.pay_mode._id,
"user":$scope.project.Username._id,
"currency":$scope.CurrencyCode,
"amount":$scope.project.Amount,
"fromemp":AmsValues.HRMS__id,
"reference":$scope.project.Reference,
"notes":$scope.project.report,
"app":AmsValues.HRMS__a
};
$scope.url_addpayment = AmsConstants.url_onBoard+'advance_payments/updatePayment';
$scope.loader = true;
    setTimeout(function(){
    ConnectivityService.PostData_post($scope.url_addpayment,envelope)
      .then(function(response) {
      $scope.loader = false;
      window.plugins.toast.showLongBottom('Advance payment updated successfully.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
      $rootScope.$emit("CallPaymentHistory", function(){
                     //alert("done");
      });
      $ionicViewSwitcher.nextTransition('none');
      $state.go("expense");

      },
      function(data) {
        $scope.loader = false;
        window.plugins.toast.showLongBottom('Failed to update advance payment.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});

      });
   },200);
}


};

$scope.deleteAdvPay = function(){

var confirmPopup = $ionicPopup.confirm({
   title: '',
   template: 'Are you sure, you want to delete this advance payment.'
});
confirmPopup.then(function (res) {
  if (res) {
  $scope.url_deleteAdvPay = AmsConstants.url_onBoard+'advance_payments/deletePayment?_id='+$scope.MyAdvPayDetails._id+'&app='+AmsValues.HRMS__a;
  $scope.loader = true;
      setTimeout(function(){

      ConnectivityService.PostData($scope.url_deleteAdvPay)
        .then(function(response) {
        console.log(response);
        window.plugins.toast.showLongBottom('Advance payment deleted.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
            $scope.loader = false;
            $rootScope.$emit("CallPaymentHistory", function(){
                                 //alert("done");
                  });
                  $ionicViewSwitcher.nextTransition('none');
                  $state.go("expense");
        },
        function(data) {
          $scope.loader = false;
          //window.plugins.toast.showLongBottom('Failed to add expense.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});

        });
     },200);
  }

});

}

$scope.view = function(file_doc){
//console.log(file_doc);
var url = AmsConstants.url_onBoard+file_doc;
if(file_doc == undefined){
var alertPopup = $ionicPopup.alert({
      title: "Download",
      template: "No attachment found to download."
    });
    alertPopup.then(function(res) {
      console.log('ionic alert');
    });
}
else{
//window.open(url,"_system","location=yes,enableViewportScale=yes,hidden=no");
//window.open("https://docs.google.com/viewerng/viewer?url="+url);
var mime_type = file_doc.substr(file_doc.lastIndexOf('.')+1);
if(mime_type == 'pdf'){
window.open("http://docs.google.com/gview?url="+url);
}
else{
window.open(url);
}
}
};

});

Module_expense.directive('awLimitLength', function () {
  return {
    restrict: "A",
    require: 'ngModel',
    link: function (scope, element, attrs, ngModel) {
      attrs.$set("ngTrim", "false");
      var limitLength = parseInt(attrs.awLimitLength, 10);// console.log(attrs);
      scope.$watch(attrs.ngModel, function(newValue) {
      //alert(ngModel.$viewValue);
      if(ngModel.$viewValue == "" || ngModel.$viewValue == undefined){
      console.log("oooooo");
      }
      else{
      //console.log(ngModel.$viewValue);
            if(ngModel.$viewValue.length > limitLength){
                      ngModel.$setViewValue( ngModel.$viewValue.substring(0, limitLength ) );
                      ngModel.$render();
                    }
      }

      });
    }
  };
});


