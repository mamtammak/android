

Module_task.controller('taskExpense', function($scope,AmsValues,AmsConstants,MenuList,StoreResponse, $mdSidenav,$ionicPopup,$state,$http,$window,$mdDialog,$ionicViewSwitcher,ConnectivityService,$rootScope,$ionicHistory) {

var ExpenseID = JSON.parse(localStorage.getItem("expenseR"));
//console.log(ExpenseID);
$scope.project = {
empName:"",
mangerName:"",
Merchant:"",
Date:"",
balance:"",
Category:"",
Currency:"",
Amount:"",
Description:"",
Reference:"",
report:"",
remarksByAcctn:"",
remarksByManager:"",
expenseAction:""
};
$scope.DownURL = AmsConstants.url_onBoard;

$scope.close = function(){
$ionicHistory.goBack();
};
//alert(ExpenseID.waiting_for);
//if(ExpenseID.waiting_for == null){
if(localStorage.getItem("STATUS_NOTIFY") != undefined){
$scope.checkExpenseStatus = localStorage.getItem("STATUS_NOTIFY");
//alert($scope.checkExpenseStatus);
}
//}

$scope.init = function(){
//alert(ExpenseID.user.name);
console.log(ExpenseID);
$scope.name = ExpenseID._id;
$scope.project.Category = ExpenseID.category.name;
$scope.project.Currency = ExpenseID.currency;
$scope.project.Amount = ExpenseID.amount;
$scope.project.Description = ExpenseID.description
$scope.project.Date = ExpenseID.expense_date;
if(ExpenseID.accountant_comment != undefined){
$scope.project.remarksByAcctn = ExpenseID.accountant_comment;
}
else{$scope.project.remarksByAcctn = "";}

//alert(ExpenseID.manager_action.length);
if(ExpenseID.manager_action.length != 0){
$scope.project.remarksByManager = ExpenseID.manager_action[0].manager_comment;
$scope.project.mangerName = ExpenseID.manager_action[0].managerid.name;
if(ExpenseID.accountant_action == false){
$scope.RemarksByMng = false;
$scope.RemarksByAcctn = true;
$scope.showAcctn = false; // hide expense action

}
else{
$scope.RemarksByAcctn = false;
$scope.RemarksByMng = true;
$scope.showAcctn = true; // show expense action by manager
$scope.project.expenseAction = StoreResponse.expenseStatus(ExpenseID.manager_action[0].actionTaken);

}
}
else{
$scope.project.remarksByManager = "";
$scope.project.mangerName = "NA";
$scope.RemarksByAcctn = false;
$scope.RemarksByMng = true;
$scope.showAcctn = false; // show expense action by manager
//$scope.project.expenseAction = StoreResponse.expenseStatus(ExpenseID.manager_action[0].actionTaken);
}




$scope.project.Merchant = ExpenseID.merchant;
$scope.project.Reference = ExpenseID.reference;
$scope.project.report = ExpenseID.report_addition;
$scope.project.balance = ExpenseID.advance_amount;
$scope.project.empName = ExpenseID.user.name;
$scope.document = ExpenseID.expense_documents;
var getProfile = AmsConstants.url_hrms +"getProfile/"+ExpenseID.user.email;
$scope.loader = true;
 setTimeout(function(){

 ConnectivityService.PostData(getProfile)
     .then(function(response) {
     $scope.project.balance = response.account_balance;
     $scope.loader = false;
     },
     function(data) {
       $scope.loader = false;
       console.log("error");
     });
 },200);
};

$scope.view = function(file_doc){
var url = AmsConstants.url_onBoard+file_doc;//console.log(url);
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
/*var tmp = {
"url" : file_doc,
"mime_type" : mime_type
}
localStorage.setItem("URLforiframe",JSON.stringify(tmp));
$mdDialog.show({
 controller: "iframeFile",
 templateUrl: 'templates/task/iframeFile.html',
 parent: angular.element(document.body),
 clickOutsideToClose: false,
 fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
 })
 .then(function(answer) {

  }, function() {
  });*/
}

};

$scope.download = function(file_doc){
var fileTransfer = new FileTransfer();
var url = encodeURI(AmsConstants.url_onBoard+file_doc);
  $scope.loader = true;
  setTimeout(function(){
  fileTransfer.download(
            url,
            cordova.file.externalDataDirectory + file_doc.substr(file_doc.lastIndexOf("/") + 1),

            function(entry) {
            //$scope.loader = false;
            window.plugins.toast.showLongBottom('Attachment downloaded.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
            $scope.loader = false;
              //console.log('download complete: ' + entry.toURL());
            },
            function(error) {
            $scope.loader = false;
            window.plugins.toast.showLongBottom('Failed to download attachment, please try again later.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});

              console.log('download error source ' + error.source);
              console.log('download error target ' + error.target);
              console.log('upload error code is ' + error);
            });
  },0);
  /*window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory, function(fileSystem) {
              console.log("Root = " + cordova.file.externalRootDirectory);
              var download_link = encodeURI(URL);
              fileSystem.getDirectory("ProcessPeople", {create: true, exclusive: false},onDirectorySuccess, onDirectoryFail);
         }, function (error) {
                 alert(error.code);
         });*/
}



$scope.filename = function(filename){
return filename.substr(filename.lastIndexOf('/')+1);
}

$scope.ExpenseAction = function(obj){
$scope.url = AmsConstants.url_onBoard+'expenses/ExpenseAction';
var target = angular.element(obj.currentTarget);
var status = target.attr('id');//alert(status);
var d = new Date(),remarks;
if(ExpenseID.manager_action.length == 0){
remarks = $scope.project.remarksByAcctn;
}
else{
if(ExpenseID.accountant_action == false){
remarks = $scope.project.remarksByManager;
}
else{
remarks = $scope.project.remarksByAcctn;
}
}

var envelope;

envelope = {
"app":AmsValues.HRMS__a,
"id": ExpenseID._id,
"mngrcomment":remarks,
"mngrdate": d,
"status" : status,
};


 console.log(envelope);
$scope.loader = true;
 setTimeout(function(){

 ConnectivityService.PostData_post($scope.url,envelope)
     .then(function(response) {
     console.log(response);
            if(status == 3){
            window.plugins.toast.showLongBottom('Expense approved.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});

            }
            else{
            window.plugins.toast.showLongBottom('Expense rejected.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});

            }
             $rootScope.$emit("CallParentMethod", function(){
                                 //alert("done");
              });
             $ionicViewSwitcher.nextTransition('none');
             $state.go("task");
             $scope.loader = false;
          //}

     },
     function(data) {
                    $scope.loader = false;
                    console.log("error");

     });
 },200);
};


});



//file:///storage/emulated/0/
//file:///storage/emulated/0/
