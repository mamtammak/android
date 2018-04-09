

Module_training.controller('forgetPassword_controller', function($scope,AmsValues,AmsConstants,MenuList,StoreResponse, $mdSidenav,$ionicPopup,$state,$http,$window,$mdDialog,$ionicViewSwitcher,ConnectivityService) {

$scope.cancel = function(){
$mdDialog.cancel();
};
$scope.resetPassword = function(){
var reset_email = $("#reset_email").val();
var x = $('#reset_email').val();
var atpos = x.indexOf("@");
var dotpos = x.lastIndexOf(".");
if(reset_email == ""){
window.plugins.toast.showLongBottom('Please enter email id.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
return false;
}
else if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length) {
 window.plugins.toast.showLongBottom('Please enter valid email id.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
 return false;
}
else{
$scope.ResetPassUrl = AmsConstants.url+"forgot";
$scope.envelopeResetp = {"email":reset_email};
$scope.loader = true;
setTimeout(function(){
$http.post($scope.ResetPassUrl, $scope.envelopeResetp)
  .success(function (response, status, headers, config) {
  console.log(response);
  $mdDialog.cancel();
  window.plugins.toast.showLongBottom(response, function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
  $scope.loader = false;
  })
  .error(function (response) {
  console.log(response);
  window.plugins.toast.showLongBottom(response, function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
  $scope.loader = false;
  });
},200);
}

};

});

