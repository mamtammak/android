

Module_applyLeave.controller('reApplyLeave_controller', function($scope,AmsValues,AmsConstants,MenuList,StoreResponse, $mdSidenav,$ionicPopup,$state,$http,$window,$mdDialog,$ionicViewSwitcher,ConnectivityService) {

$scope.project = {emp_name:"",unpaid:"",remarks:"",Email:"",CurrentDate:"",manager:"",leaveType:"",shortLeaveTyp:"",startDate: new Date(),endDate: new Date(),reasonFLeave:"",remainingL:"",compoL:""};
var shortLEAVE;var TODate;
$scope.ShortLeavetyp = MenuList.getShortLType();

$scope.leaveTYPE = MenuList.getLeaveType();
var Response = JSON.parse($window.localStorage.getItem("itemIndex"));

$scope.close = function(){
$ionicViewSwitcher.nextTransition('none');
$state.go("LeaveHistory");
};
$scope.init = function(){
console.log(Response);
$scope.project.emp_name = Response.userid.name;
$scope.project.Email = AmsValues.HRMS_email;
$scope.project.CurrentDate = Response.leaveApplied_date.split('T')[0];
$scope.project.manager = Response.waiting_for.name;
$scope.project.remainingL = Response.userid.leaves.remaining_leaves;
$scope.project.compoL = Response.userid.leaves.comp_off;
$scope.project.unpaid = Response.userid.leaves.unpaid_leaves;

$scope.project.reasonFLeave = Response.reason;
$scope.project.leaveType = Response.type_of_leave;

if(Response.type_of_leave == "Short Leave"){
$scope.shortL = true;
$scope.toDate = false;
}
else{
$scope.shortL = false;
$scope.toDate = true;
}

};

$scope.SHortLeave = function(){

if($scope.project.leaveType == "Short Leave"){
$scope.shortL = true;
$scope.toDate = false;

}
else{
console.log($scope.project.leaveType);
$scope.shortL = false;
$scope.toDate = true;

}
};

$scope.ReSubmitLeave = function(){
 $scope.project.dateStringFrom = moment($scope.project.startDate).format("YYYY-MM-DD");

 var Leave_reason = $scope.project.reasonFLeave;
 console.log(Leave_reason);
 $scope.url = 'http://192.168.100.40:1339/lms/applyLeave';

 if($scope.project.leaveType == "Short Leave"){
 shortLEAVE = $scope.project.shortLeaveTyp;
 TODate = "";
 }
 else{
 shortLEAVE = "";
 TODate = moment($scope.project.endDate).format("YYYY-MM-DD");
 }



  var applyLeave={
          "leaveid":Response._id,
          "fdate":$scope.project.dateStringFrom,
          "tdate":TODate,
          "ftime":"",
          "ttime":"",
          "status":"8",
          "typeofleave":$scope.project.leaveType,
          "shortleave":shortLEAVE

 };
 //console.log($scope.url);
  setTimeout(function(){
  ConnectivityService.PostData_post($scope.url,applyLeave)

                     .then(function(response) {

                      //console.log(response);

                     window.plugins.toast.showLongBottom('Leave Applied Successfully.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});

                     },
                     function(data) {
                      console.log('albums retrieval failed.')
                     });
  },200);
};

});

