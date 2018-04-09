

Module_applyLeave.controller('CompList_controller', function($scope,MenuList,StoreResponse,$timeout, $mdSidenav,$ionicPopup,$state,$http,$window,$mdDialog,$ionicViewSwitcher,AmsConstants,AmsValues,ConnectivityService,$rootScope) {

var compOffArray = [];
$scope.data = {};
$scope.InitCompOFFLIST = function(){
$scope.compOffList = JSON.parse(localStorage.getItem("AVAILCOMPOFF"));
};

$scope.checkStuff = function(check,value){
var Change_compOffList = [];Change_compOffList.length = 0;
$scope.result = JSON.parse(localStorage.getItem("AVAILCOMPOFF")).concat(Change_compOffList);
console.log(value);
angular.forEach($scope.result,function(v,k){
if(v.compoff._id == check){
$scope.result[k].compoff.compoff_type = value;
}
})
}
$scope.getDaysDate = function(date){
var currentDate = new Date(date);
currentDate.setDate(currentDate.getDate() + parseInt(60));
return currentDate;
};

$scope.close = function(){
$mdDialog.cancel();
};

$scope.NextCompOff = function(){

var checked = $("#CompOffList input:checked").length > 0;
   if (!checked){
       alert("Please select one or more compoff");
       return false;
   }
   else{
   compOffArray.length = 0;
   if($scope.result == undefined){
   var text =  $('#CompOffList input:checked').each(function () {
        compOffArray.push( JSON.parse( $(this).attr('value') ) );

      });
   }
   else{
   compOffArray.length = 0;
   var text =  $('#CompOffList input:checked').each(function () {
        var tmp = JSON.parse( $(this).attr('value') );
        angular.forEach($scope.result,function(v,k){
           if(v.compoff._id == tmp.compoff._id){
           compOffArray.push(v);
           }
        })



   });

   }


      $rootScope.$broadcast('CallParentCompOff',{para1 :JSON.stringify(compOffArray)});
      $ionicViewSwitcher.nextTransition('none');
      $mdDialog.cancel();
}
}
});




