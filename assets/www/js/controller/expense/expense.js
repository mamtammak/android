

Module_expense.controller('expense', function($scope,$mdToast,$mdBottomSheet,Upload,DetailValues,AmsValues,$timeout,AmsConstants,MenuList,StoreResponse, $mdSidenav,$ionicPopup,$state,$http,$window,$mdDialog,$ionicViewSwitcher,ConnectivityService,$rootScope,$ionicPlatform,$ionicPopup,$ionicHistory) {

$scope.showSearchbar = true;
$scope.hideSearchbar = false;
$scope.searchICON = false;
$scope.FilterICON = false;
$scope.AddExpenseBTN = true;
$scope.ShowToADM_AdvPay = false;
$scope.showExpenseHistory = false;
$scope.showAdvancePH = false;
$scope.showTeamExpenseHistory = false;
$scope.Role = AmsValues.HRMS_role;
var CollectionFiles = [];CollectionFiles.length = 0;
$scope.OrganizationName = AmsValues.HRMS_orgName;
if(AmsValues.HRMS_orgLogo != ""){
 $scope.OrganisationLogo = AmsConstants.url_notify_web+AmsValues.HRMS_orgLogo;
}
else{
 $scope.OrganisationLogo = "img/brand_logo.png";
}
$scope.selectedTabExpense = 0;
$scope.menuItem=MenuList.get();
$scope.LoggedinName = AmsValues.HRMS_name;
$scope.toggleLeft = function(menuId) {
$mdSidenav(menuId).toggle();
};
$scope.goToMenuItem = function(menuitem){
var page = StoreResponse.goToMenuItemPage(menuitem);
      $mdSidenav('leftExp').close()
      .then(function () {
          $ionicViewSwitcher.nextTransition('none');
          $state.go(page);

      });

 };


$scope.init = function(){
$scope.maxDate = new Date();
InitRefreshExpense();

};

$scope.changeCategory = function(){
$scope.url_currency = AmsConstants.url_onBoard +"tax_templates/getCurrency?country="+AmsValues.HRMS_Country;
ConnectivityService.PostData($scope.url_currency)
      .then(function(response) {
        $scope.CurrencyCode = response[0].code;
      },
      function(data) {
          $scope.loader = false;

      });

    $scope.project.advpay = DetailValues.account_balance;
};

function addExpense(){
$scope.norecords = false;
$('.norecords').html("");
$scope.searchICON = false;
$scope.FilterICON = false;
$scope.AddExpenseBTN = true;
$scope.ShowToADM_AdvPay = false;
$scope.showAdvancePH = false;
$scope.showExpenseHistory = false;
$scope.showTeamExpenseHistory = false;
$scope.showAddExpense = true;
$scope.loader = true;
    setTimeout(function(){
    ConnectivityService.PostData($scope.url_expense)
      .then(function(response) {

      $scope.Category = response;
      localStorage.setItem("ExpenseCat",JSON.stringify(response));
      $scope.loader = false;
      },
      function(data) {
          $scope.loader = false;

      });
      },200);

}

function expenseHistory(){
$scope.AddExpenseBTN = false;
$scope.ShowToADM_AdvPay = false;
$scope.FilterICON = false;
$scope.showAdvancePH = false;
$scope.showAddExpense = false;
$scope.showAdvancePayment = false;
$scope.showTeamExpenseHistory = false;
var url_expenseHistory = AmsConstants.url_onBoard+'expenses/getExpenseByUser?org='+AmsValues.HRMS_orgId+'&user='+AmsValues.HRMS__id;
$scope.loader = true;
    setTimeout(function(){
    ConnectivityService.PostData(url_expenseHistory)
      .then(function(response) {
      if(response.length !=0){
      $scope.searchICON = true;
      $scope.showExpenseHistory = true;
      $scope.norecords = false;
      $scope.myExpenses = response;
      }
      else{
      $scope.showExpenseHistory = false;
      $scope.norecords = true;
      $('.norecords').html("<center><p>No records found</p></center>");
      }

          $scope.loader = false;
      },
      function(data) {
          $scope.loader = false;

      });
      },200);
}

$rootScope.$on("CallExpenseHistory", function(){
expenseHistory();
});

function teamExpenseHistory(){
var date = new Date(), y = date.getFullYear(), m = date.getMonth();
var firstDay = new Date(y, m, 1);
firstDay = moment(firstDay).format("YYYY-MM-DD");
var tillDay = moment(date).format("YYYY-MM-DD");
$scope.AddExpenseBTN = false;
$scope.FilterICON = true;
$scope.ShowToADM_AdvPay = false;
$scope.showAdvancePH = false;
$scope.showAddExpense = false;
$scope.showAdvancePayment = false;
$scope.showExpenseHistory = false;
var url_teamExpenseHistory = AmsConstants.url_onBoard+'expenses/getExpenseByRole?org='+AmsValues.HRMS_orgId+'&user='+AmsValues.HRMS__id+'&role='+AmsValues.HRMS_role+'&appid='+AmsValues.HRMS__a+"&whichExp=2&fdate="+firstDay+"&tdate="+tillDay+"&selectEmp=null";
$scope.loader = true;
    setTimeout(function(){
    ConnectivityService.PostData(url_teamExpenseHistory)
      .then(function(response) {
      if(response.expenses.length !=0){
      $scope.searchICON = true;
      $scope.showTeamExpenseHistory = true;
      $scope.norecords = false;
      $scope.myTeamExpenses = response.expenses;
      }
      else{
      $scope.showTeamExpenseHistory = false;
      $scope.norecords = true;
      $('.norecords').html("<center><p>No records found</p></center>");
      }


          $scope.loader = false;
      },
      function(data) {
          $scope.loader = false;

      });

      },200);
}

function advanceHistory(){
$scope.AddExpenseBTN = false;
$scope.ShowToADM_AdvPay = false;
$scope.FilterICON = false;
$scope.showExpenseHistory = false;
$scope.showAddExpense = false;
$scope.showAdvancePayment = false;
$scope.showTeamExpenseHistory = false;
var url_advPayHistory;
if(AmsValues.HRMS_role == "HR" || AmsValues.HRMS_role == "ADM"){
  url_advPayHistory = AmsConstants.url_onBoard+'advance_payments/getAllPayments?org='+AmsValues.HRMS_orgId;
}
else{
url_advPayHistory = AmsConstants.url_onBoard+'advance_payments/getPaymentsByUser?org='+AmsValues.HRMS_orgId+'&user='+AmsValues.HRMS__id;
}

$scope.loader = true;
    setTimeout(function(){
    ConnectivityService.PostData(url_advPayHistory)
      .then(function(response) {
      if(response.length !=0){
      $scope.searchICON = true;
      $scope.showAdvancePH = true;
      $scope.norecords = false;
      $scope.myAdvancePayHistory = response;
      }
      else{
      $scope.showAdvancePH = false;
      $scope.norecords = true;
      $('.norecords').html("<center><p>No records found</p></center>");
      }
      $scope.loader = false;
      },
      function(data) {
          $scope.loader = false;

      });
      },200);
}

$rootScope.$on("CallPaymentHistory", function(){
advanceHistory();
});
function MakeAdvancePayment(){
$scope.norecords = false;
$scope.AddExpenseBTN = false;
$scope.ShowToADM_AdvPay = true;
$scope.showAdvancePH = false;
$scope.FilterICON = false;
$scope.showAddExpense = false;
$scope.showTeamExpenseHistory = false;
$scope.urlSupervisors = AmsConstants.url_hrms+'getEmployees?org='+AmsValues.HRMS_orgId;
$scope.urlpaymentModes = AmsConstants.url_onBoard+'payment_modes/getModes?org='+AmsValues.HRMS_orgId;
$scope.loader = true;
setTimeout(function(){
    ConnectivityService.PostData($scope.urlSupervisors)
    .then(function(response) {
    $scope.showAdvancePayment = true;
    $scope.supervisors = response;
    localStorage.setItem("Supervisors",JSON.stringify(response));
    $scope.loader = false;

    },
    function(jqxhr) {
      $scope.loader = false;
    });
    ConnectivityService.PostData($scope.urlpaymentModes)
        .then(function(response) {
        $scope.pay_mode = response;
        localStorage.setItem("paymentMode",JSON.stringify(response));
        $scope.loader = false;

        },
        function(jqxhr) {
          $scope.loader = false;
        });
 },200);
}

$scope.OnChangeUser = function(empID){
$scope.urlModes = AmsConstants.url_onBoard+'payment_modes/getModes?org='+AmsValues.HRMS_orgId;
setTimeout(function(){
    ConnectivityService.PostData($scope.urlModes)
    .then(function(response) {
    $scope.pay_mode = response;
    $scope.loader = false;

    },
    function(jqxhr) {
      $scope.loader = false;
    });
 },200);
};
$scope.AdvancePayment = function(){
MakeAdvancePayment();
};

$scope.ExpenseHistory = function(){
expenseHistory();
};

$scope.MyTExpenseHistory = function(){
teamExpenseHistory();
};

$scope.AdvancePH = function(){
advanceHistory();
};

$scope.AddExpenseTab = function(){
addExpense();
};

$scope.ExpenseStatus = function(n){
var status = StoreResponse.expenseStatus(n);
return status;
};

$scope.CurrencySYM = function(code){
 var cur_code_sym;
 $scope.Currency = MenuList.currencySymbol();
 $.each($scope.Currency,function(key,value){
 if(code == value.code){
 cur_code_sym = value.symbol;
 }
 });
 return cur_code_sym;
};

$scope.format = function(n) {
    return n.toFixed(2).replace(/./g, function(c, i, a) {
        return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
    });
}

$scope.showMyExpDetail = function(list){
console.log(list);
localStorage.setItem("ExpenseDetails",JSON.stringify(list));
$ionicViewSwitcher.nextTransition('none');
$state.go("expensePopUp");
};


$scope.showMyAdvExpDetail = function(list){
console.log(list);
localStorage.setItem("AdvPayDetails",JSON.stringify(list));
$ionicViewSwitcher.nextTransition('none');
$state.go("advPayPopUp");
};

function InitRefreshExpense(){
$scope.project = {Merchant :"",Category:"",Amount:"",Description:"",Reference:"",addReport:""};
$scope.url_expense = AmsConstants.url_onBoard+'expense_categories/getCategories?org='+AmsValues.HRMS_orgId;

    if($scope.selectedTabExpense == 0 || $scope.selectedTabExpense == undefined){
        addExpense()
    }

    else if($scope.selectedTabExpense == 1){
        expenseHistory();
    }
    else if($scope.selectedTabExpense == 2){
         teamExpenseHistory();
    }
    else if($scope.selectedTabExpense == 3){
        advanceHistory();
    }
    else{
        MakeAdvancePayment();
    }

};

$scope.cancelExpense = function(){
$scope.CurrencyCode = "";
$scope.project = {Merchant :"",Category:"",Amount:"",Description:"",Reference:"",addReport:"",paymentDT:"",PaymentThrough:"",ADVAmount:"",Username:"",ADVReference:"",Notes:""};
$state.go($state.current, {}, {reload: true});
};

$scope.uploadFiles = function(files) {

if(files[0] != undefined){
CollectionFiles.push(files[0]);
$scope.files = CollectionFiles;
/*angular.forEach($scope.files,function(v,k){
console.log(/\s/g.test(v.name));
if(/\s/g.test(files[0].name) == true){

}
v.name = v.name.replace(/\s+/g, '');

});*/
}
else{
console.log(files[0]);
}
}

$scope.removeFile = function(obj){
//console.log(obj)
angular.forEach(CollectionFiles,function(v,k){
if(obj.lastModified == v.lastModified){
$scope.files.splice(k,1);
}
})
}
var UploadeFiles = [] ;
$scope.addNewExpense = function(){
UploadeFiles.length = 0;

if($scope.project.expenseDT == ""){
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
$scope.Expdate = moment($scope.project.expenseDT).format("YYYY-MM-DD");
//console.log(AmsValues.HRMS_email);
//$scope.files_tmp=[];
if ($scope.files != undefined && $scope.files.length > 0) {
$scope.loader = true;
setTimeout(function(){

angular.forEach($scope.files, function(file) {
                Upload.upload({
                    url: encodeURI(AmsConstants.url_onBoard+'fileupload/uploadExpenseDocs'),
                    fields: {
                        'idfolder': AmsValues.HRMS_email
                    },
                    file: file
                }).then(function (resp) {
                    //console.log(resp);
                    $timeout(function() {
                    angular.forEach(resp.data,function(v,k){
                      var tmp = AmsValues.HRMS_email+"/"+v.filename;
                      UploadeFiles.push(tmp);
                      uploadExpense();
                    })
                });
                }, function (resp) {
                $scope.loader = false;
                  console.log(resp);
                  if(resp.data == null){
                  //console.log(resp.config.file.name);
                  window.plugins.toast.showLongBottom(resp.config.file.name+" not found.", function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
                  }
                });/*, function (evt) {

                   var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                   console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                });*/

            });
    },100);
}
else{
var envelope = {
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
"expense_documents":[]
};
uploadNewExpense(envelope);
}

}


};

function uploadExpense(){
if(UploadeFiles.length == $scope.files.length){
var envelope = {
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
"expense_documents":UploadeFiles
};
uploadNewExpense(envelope);
}
else{
console.log("error");
}
}

function uploadNewExpense(envelope){
if($scope.files != undefined){
$scope.files.length = 0;
}
$scope.url_addexpense = AmsConstants.url_onBoard+'expenses/addExpense';
$scope.loader = true;
    setTimeout(function(){

    ConnectivityService.PostData_post($scope.url_addexpense,envelope)
      .then(function(response) {
      console.log(response);

      window.plugins.toast.showLongBottom('Expense added successfully.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
          $scope.loader = false;
          $scope.cancelExpense();
      },
      function(data) {
        $scope.loader = false;
        //window.plugins.toast.showLongBottom('Failed to add expense.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});

      });
   },200);
}
$scope.MakePayment = function(){

if($scope.project.paymentDT == ""){
window.plugins.toast.showLongBottom('Please add payment date.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
$("#paymentDT").focus();
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
else if($scope.project.ADVAmount == ""){
window.plugins.toast.showLongBottom('Please add amount.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
$("#ADVAmount").focus();
return false;
}
/*else if($scope.project.ADVReference == ""){
window.plugins.toast.showLongBottom('Please add reference.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
$("#ADVReference").focus();
return false;
}*/
else{
$scope.Expdate = moment($scope.project.paymentDT).format("YYYY-MM-DD");
var envelope = {
"organization":AmsValues.HRMS_orgId,
"payment_date":$scope.project.paymentDT,
"payment_mode":$scope.project.PaymentThrough,
"user":$scope.project.Username._id,
"currency":$scope.CurrencyCode,
"amount":$scope.project.ADVAmount,
"fromemp":AmsValues.HRMS__id,
"reference":$scope.project.ADVReference,
"notes":$scope.project.Notes,
"app":AmsValues.HRMS__a
};

$scope.url_addpayment = AmsConstants.url_onBoard+'advance_payments/addPayment';
$scope.loader = true;
    setTimeout(function(){
    ConnectivityService.PostData_post($scope.url_addpayment,envelope)
      .then(function(response) {
      console.log(response);
      window.plugins.toast.showLongBottom('Advance payment added successfully.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
          $scope.loader = false;
          $scope.cancelExpense();
      },
      function(data) {
        $scope.loader = false;
        window.plugins.toast.showLongBottom('Failed to add advance payment.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});

      });
   },200);
}


};


   $scope.showSearch = function(){
        $scope.showSearchbar = false;
        $scope.hideSearchbar = true;

   };
   $scope.hideSearch = function(){
        $scope.showSearchbar = true;
        $scope.hideSearchbar = false;
        //cordova.plugins.Keyboard.disableScroll(false);
        $ionicViewSwitcher.nextTransition('none');
        //$state.go('task');
        $state.reload();
   };

$scope.showBottomFilter = function(){
$mdBottomSheet.show({
            templateUrl: 'templates/expense/bottomFilter.html',
            controller: 'teamExpenseFilter'
        }).then(function(clickedItem) {
            //$scope.alert = clickedItem['name'] + ' clicked!';
            // alert("good");
        }).catch(function(error) {
            // User clicked outside or hit escape
        });
}

$rootScope.$on("CallMyTeamExpense",function(event,data){
$scope.AddExpenseBTN = false;
$scope.FilterICON = true;
$scope.ShowToADM_AdvPay = false;
$scope.showAdvancePH = false;
$scope.showAddExpense = false;
$scope.showAdvancePayment = false;
$scope.showExpenseHistory = false;
$scope.searchICON = true;
$scope.showTeamExpenseHistory = true;
$scope.norecords = false;
$scope.myTeamExpenses = JSON.parse(data.para1);
});

$scope.getListHeight = function() {
                   return {height: '' + ($window.innerHeight - 72) + 'px'};
                 };
                 $window.addEventListener('resize', onResize);
                 function onResize() {
                   $scope.$digest();
                 }
                 $scope.$on('$destroy', function() {
                   $window.removeEventListener('resize', onResize);
                 });

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
