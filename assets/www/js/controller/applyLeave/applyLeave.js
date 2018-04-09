

Module_applyLeave.controller('applyLeave_controller', function($scope,LeaveSetting,AmsValues,Upload,$timeout,AmsConstants,MenuList,StoreResponse, $timeout,$mdSidenav,$ionicPopup,$state,$http,$window,$mdDialog,$ionicViewSwitcher,ConnectivityService,$mdDateLocale,$rootScope) {

$scope.loggedInUserName = AmsValues.HRMS_name;
$scope.hrmsLogo = 'img/HRMS_LOGO_old.png';
$scope.shortL = false;
$scope.OtherDAY = true;
$scope.LeaveHalfDayContainer = true;
$scope.ComOffHalfDayContainer = false;
$scope.halfDAYContainer = false;
var LeaveTypeByOrg = [], LeaveSelcompOFF = [];
$scope.toDate = true;
$scope.SelectedCompOff = false;
$scope.EnableAfterFromDT = true;
var shortLEAVE;var TODate;
var arrayLeaveTypes;
$scope.project = {emp_name:"",Email:"",CurrentDate:"",manager:"",leaveType:"",shortLeaveTyp:"",reasonFLeave:"",remainingL:"",compoL:"",noLeaves:"",HDleave:""};
$scope.data = {};
var dayDifference , days,type,typeofleaves,startDay,endDay,leaveTypeDaywise;

$scope.ShortLeavetyp = MenuList.getShortLType();

$scope.close = function(){
$ionicViewSwitcher.nextTransition('none');
$state.go("dashboard");
};

$scope.AddTask = function(){
$ionicViewSwitcher.nextTransition('none');
$state.go("AddTask");
};

$scope.CompletedTask = function(){

$ionicViewSwitcher.nextTransition('none');
$state.go("completed");
};

$scope.init = function(){

refreshApplyLeave();

};
$scope.myDate = new Date();
function refreshApplyLeave(){
LeaveTypeByOrg.length = 0;
$scope.project = {emp_name:"",Email:"",CurrentDate:"",leaveType:"",shortLeaveTyp:"",reasonFLeave:"",remainingL:"",compoL:"",noLeaves:"",startDate:"",endDate:""};
$scope.data.cb1 = false;
$scope.OtherDAY = true;
$scope.halfDAYContainer = false;
$scope.LeaveHalfDayContainer = true;
$scope.ComOffHalfDayContainer = false;
$scope.toDate = true;
arrayLeaveTypes = "";
$scope.url_profile = AmsConstants.url_hrms +"getProfile/"+AmsValues.HRMS_email;
$scope.url_gelLeaveAllotment = AmsConstants.url+'getleaveAllotment?org='+AmsValues.HRMS_orgId+'&userid='+AmsValues.HRMS__id;
$scope.url_getHDByOrg = AmsConstants.url_onBoard+'organizations/getOrganizationStatus?orgid='+AmsValues.HRMS_orgId;
$scope.url_getWorkingDays = AmsConstants.url_hrms_lms+'getWorkingDaysByUser?userid='+AmsValues.HRMS__id;

$scope.loader = true;
setTimeout(function(){
var response_getProfile = ConnectivityService.AjaxRequest($scope.url_profile);
if(response_getProfile != null && response_getProfile != "undefined"){
$scope.emp_p = response_getProfile;//console.log($scope.emp_p);
    angular.forEach($scope.emp_p, function(value, key){
    $scope.JOING_Date = value.joining_date;
    localStorage.setItem("JOINING_DATE",$scope.JOING_Date);
    if(value.workingDays != null || value.workingDays != 'undefined'){
    AmsValues.HRMS_workingdays = value.workingDays;
    }
    else{
    AmsValues.HRMS_workingdays = "";
    }
    if(!value.reporting_to){
    $scope.project.manager = 'NA';
    }
    else{
    $scope.project.manager = value.reporting_to.name;
    }
    if(!value.leaves){}
    else{arrayLeaveTypes = value.leaves;}


 });



}
var response_gelLeaveAllotment = ConnectivityService.AjaxRequest($scope.url_gelLeaveAllotment);
if(response_gelLeaveAllotment != null && response_gelLeaveAllotment != "undefined"){
 $scope.leaveAllotmentType = response_gelLeaveAllotment.leaves;
 $scope.LeaveType = response_gelLeaveAllotment.leaves;
}

$scope.response_gelWorkingDays = ConnectivityService.AjaxRequest($scope.url_getWorkingDays);
if($scope.response_gelWorkingDays != null && $scope.response_gelWorkingDays != "undefined"){
localStorage.setItem("getWorkingDays",JSON.stringify($scope.response_gelWorkingDays));

}


$scope.leavePolicyDetailsData = LeaveSetting.leaves_config;

if(LeaveSetting.backdated_leave == true){
if($scope.JOING_Date != undefined){
$scope.minDate = new Date($scope.JOING_Date);
}
else{
$scope.minDate = "";
}

}
else{

$scope.minDate = new Date(
$scope.myDate.getFullYear(),
$scope.myDate.getMonth(),
$scope.myDate.getDate()
);

}
ConnectivityService.PostData($scope.url_getHDByOrg)
    .then(function(response) {
      $scope.LeaveByOrg = response;

      $scope.loader = false;
    },function(error, status) {
    $scope.loader = false;
    });


$scope.loader = false;

},200);


function getWeek(date){
    return weekOfMonth = (0 | date.getDate() / 7)+1;
  }

$scope.workingDaysForApplyingLeaves=function(date){

var flexiIndex=$scope.leavePolicyDetailsData.isFlexi.indexOf(true);
  var flexiTypeName;
  if(flexiIndex!=-1){
    flexiTypeName=$scope.leavePolicyDetailsData.names[flexiIndex];
  }else{
    flexiTypeName=null;
  }
  if(flexiTypeName!=null && flexiTypeName==$scope.typel){
    if($scope.response_gelWorkingDays.holidays_list.length>0){
      var arr=$scope.response_gelWorkingDays.holidays_list;
    }else{
      var arr=[];
    }
    for(var i=0;i<arr.length;i++){
      if(moment(new Date(date)).format("YYYY-MM-DD")==moment(new Date(arr[i].hdate)).format("YYYY-MM-DD")
       && arr[i].flexible!=undefined && arr[i].flexible=="Yes"){
        return true;
      }
    }

  }else{
    if($scope.response_gelWorkingDays.holidays_list.length>0){
      var arr=$scope.response_gelWorkingDays.holidays_list;
    }else{
      var arr=[];
    }
    for(var i=0;i<arr.length;i++){
      if(moment(new Date(date)).format("YYYY-MM-DD")==moment(new Date(arr[i].hdate)).format("YYYY-MM-DD")){
        return false;
      }
    }
    if($scope.response_gelWorkingDays.workingDays.length>0){
      var weekSchema=$scope.response_gelWorkingDays.workingDays;
      var day = date.getDay();
      if(weekSchema[day].indexOf(getWeek(date))==-1){
       return false;
      }
      else{
       return true;
      }
    }else{
      var weekSchema=[];
      return true;
    }

  }



}

$scope.Leave = function(){

var url_CompOffList = AmsConstants.url_hrms_lms+"getUserUnusedCompoff?org="+AmsValues.HRMS_orgId+"&appid="+AmsValues.HRMS__a+"&uid="+AmsValues.HRMS__id;
$scope.project.startDate = "";
$scope.project.endDate = "";
$scope.project.remainingL = $scope.project.leaveType.count;
if($scope.project.leaveType.isCompOff == true){

$scope.loader = true;
  setTimeout(function(){
  ConnectivityService.PostData(url_CompOffList)
    .then(function(response) {
    if(response.length == 0){
    $scope.SelectedCompOff = false;
    var alertPopup = $ionicPopup.alert({
          title: 'No leave applicable',
          template: 'No remaining CompOff found.'
        });
        alertPopup.then(function(res) {
          console.log('Thank you');
        });
    }
    else{

    $scope.CompOFF_LIST = response;
    localStorage.setItem("AVAILCOMPOFF",JSON.stringify(response));
        $mdDialog.show({
              controller: "applyLeave_controller",
              templateUrl: 'templates/apply_leave/compOff_PopUp.html',
              parent: angular.element(document.body),
              clickOutsideToClose:false,
              fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
            })
            .then(function(answer) {
              //$scope.status = 'You said the information was "' + answer + '".';
            }, function() {
              //$scope.status = 'You cancelled the dialog.';
            });
    }

    $scope.loader = false;
  },
  function(data) {
    $scope.loader = false;
  });
  },200);
}
else{
$scope.LeaveHalfDayContainer = true;
$scope.ComOffHalfDayContainer = false;
$scope.SelectedCompOff = false;
$scope.toDate = true;
}
};

$rootScope.$on('CallParentCompOff', function(event, data) {
$scope.SelectedCompOff = true;LeaveSelcompOFF.length = 0;
var count_half_full_dy,count_fulldy = 0 , count_SCOff = 0;
var NewCompOff = JSON.parse(data.para1);
$scope.SetSelectedCompoff = NewCompOff;
angular.forEach(NewCompOff,function(value,key){
 if(value.compoff.compoff_type == "Half Day"){

 count_half_full_dy = 0.5;
 }
 else{

 count_half_full_dy = 1;
 }
 count_SCOff += count_half_full_dy;
});
if(count_SCOff == 0.5){
$scope.data = {
      group1 : 1
    };
$scope.LeaveHalfDayContainer = false;
$scope.ComOffHalfDayContainer = true;
$scope.halfDAYContainer = true;
$scope.toDate = false;
$scope.project.noLeaves = 0.5;
}
else{
$scope.toDate = true;
$scope.halfDAYContainer = false;
$scope.LeaveHalfDayContainer = false;
$scope.ComOffHalfDayContainer = false;
$scope.project.noLeaves = "";
}
$scope.project.selectedCLD = count_SCOff;
});


var d = new Date();
var month = d.getMonth()+1;
var day = d.getDate();
var output = d.getFullYear() + '-'+ ((''+day).length<2 ? '0' : '') + day +'-'+ ((''+month).length<2 ? '0' : '') + month;

$scope.project.CurrentDate = output;

$scope.project.emp_name = AmsValues.HRMS_name;

$scope.project.Email = AmsValues.HRMS_email;
}

$scope.SHortLeave = function(){

if($scope.project.leaveType == "Short Leave"){
$scope.shortL = true;
$scope.toDate = false;

}
else{
$scope.shortL = false;
$scope.toDate = true;

}
};

$scope.hideKeyBoard = function(){
Keyboard.hide();
}

$scope.getHalfDayCount = function(){
var startDay = moment($scope.project.startDate).format("YYYY-MM-DD");
var getleavesByMonth = AmsConstants.url_hrms_lms+'getleavesByMonth?org='+AmsValues.HRMS_orgId+'&userid='+AmsValues.HRMS__id+'&type_of_leave='+$scope.project.leaveType.leave_type+'&month='+startDay.split('-')[1]+'&year='+startDay.split('-')[0];
  ConnectivityService.PostData(getleavesByMonth)
  .then(function(response) {
    $scope.LeavesCount = response;
    $scope.loader = false;
  },
  function(data) {
    $scope.loader = false;
  });
}

$scope.getDAYSCount = function(){
var GetDaysCount = AmsConstants.url_hrms_lms+'getLeaveDuration';
var sandwichRule = AmsConstants.url_hrms_lms+'getSandwich';

if($scope.project.startDate == ""){
window.plugins.toast.showLongBottom('Please select start date.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
return false;
}
else if($scope.project.endDate == ""){
window.plugins.toast.showLongBottom('Please select end date.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
return false;
}
else{
var startDay = moment($scope.project.startDate).format("YYYY-MM-DD");
var endDay = moment($scope.project.endDate).format("YYYY-MM-DD");
var dayscount = {"o":AmsValues.HRMS_orgId,"s":startDay,"e":endDay,"b":AmsValues.HRMS_workingdays,"u":AmsValues.HRMS__id};
$scope.loader = true;
  setTimeout(function(){
  ConnectivityService.PostData_post(GetDaysCount,dayscount)

                     .then(function(response) {
                      if(response.error){
                      var alertPopup = $ionicPopup.alert({
                       title: '',
                       template: response.error
                       });
                       alertPopup.then(function(res) {
                         $scope.project.noLeaves = "";
                       });

                      }
                      else{
                      $scope.project.noLeaves = response.success;
                      $scope.countLeaves = response.success;
                      }
                         $scope.loader = false;
                     },
                     function(data) {
                     $scope.loader = false;

                     });
  if(LeaveSetting.sandwich_rule == true){
  var sandwichParam = {"s":startDay,"e":endDay,"wdid":AmsValues.HRMS_workingdays};
    ConnectivityService.PostData_post(sandwichRule,sandwichParam)

                         .then(function(response) {
                          $scope.project.noLeaves = $scope.countLeaves + response.success;
                             $scope.loader = false;
                         },
                         function(data) {
                         $scope.loader = false;

                         });
  }
  var getleavesByMonth = AmsConstants.url_hrms_lms+'getleavesByMonth?org='+AmsValues.HRMS_orgId+'&userid='+AmsValues.HRMS__id+'&type_of_leave='+$scope.project.leaveType.leave_type+'&month='+startDay.split('-')[1]+'&year='+startDay.split('-')[0];
  ConnectivityService.PostData(getleavesByMonth)
  .then(function(response) {
    $scope.LeavesCount = response;
    $scope.loader = false;
  },
  function(data) {
    $scope.loader = false;
  });
  },200);
}

};

$scope.emptyLeave = function(){
try{
$scope.project.leaveType = "";
$scope.project.remainingL = "";
$scope.project.selectedCLD = "";
}
catch(err){
console.log(err.message);
}
}


$scope.ApproveLeave = function(){


if($scope.project.leaveType == ""){
window.plugins.toast.showLongBottom('Please select leave type.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
return false;
}
else if($scope.project.startDate == ""){
window.plugins.toast.showLongBottom('Please provide date.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
return false;
}

else if($scope.project.reasonFLeave == ""){
window.plugins.toast.showLongBottom('Please enter reason for leave.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
return false;
}

else{
var Leave_reason = $scope.project.reasonFLeave;
var Leave_Type = $scope.project.leaveType.isCompOff;

 TODate = moment($scope.project.endDate).format("YYYY-MM-DD");
 var applyLeaveEnvelope;
if(Leave_Type == true){
if($scope.project.remainingL == 0){
var alertPopup = $ionicPopup.alert({
      title: 'No leave applicable',
      template: 'No remaining CompOff found.'
    });
    alertPopup.then(function(res) {
      console.log('Thank you');
    });
return false;
}
else if($scope.project.selectedCLD > $scope.project.noLeaves){
var alertPopup = $ionicPopup.alert({
      title: 'No leave applicable',
      template: 'You Can Not Apply More Than Available CompOff Leaves.'
    });
    alertPopup.then(function(res) {
      console.log('Thank you');
    });
return false;
}
else{
if($scope.project.selectedCLD == 0.5){
days = 0.5;
type = "half day";
startDay = moment($scope.project.startDate).format("YYYY-MM-DD");
endDay = moment($scope.project.startDate).format("YYYY-MM-DD");
typeofleaves = $scope.project.leaveType.leave_type;
leaveTypeDaywise = $scope.data.group1;
}
else{
days = $scope.project.selectedCLD;
type = "";
startDay = moment($scope.project.startDate).format("YYYY-MM-DD");
endDay = moment($scope.project.endDate).format("YYYY-MM-DD");
typeofleaves = $scope.project.leaveType.leave_type;
leaveTypeDaywise = 1;
}
$.each($scope.SetSelectedCompoff,function(i,e){

if ($.inArray(e.compoff._id, LeaveSelcompOFF) == -1){
var tmp = {
"cid":e._id,
"oid":e.compoff._id,
"usedStatus":$scope.project.selectedCLD
}
LeaveSelcompOFF.push(tmp)
}
});

applyLeaveEnvelope={
            "appid" : AmsValues.HRMS__a,
            "days":days,
            "leaveTypeDaywise":leaveTypeDaywise,
            "status":1,
            "fdate":startDay,
            "tdate":endDay,
            "ftime":"",
            "ttime":"",
            "org":AmsValues.HRMS_orgId,
            "path":"",
            "reason":Leave_reason,
            "type":type,
            "typeofleaves":typeofleaves,
            "userid":AmsValues.HRMS__id,
            "selectedCompoff":LeaveSelcompOFF
            };
applyLEAVE(applyLeaveEnvelope);

}

}
else {
if($scope.data.cb1 == true){
days = 0.5;
type = "half day";
startDay = moment($scope.project.startDate).format("YYYY-MM-DD");
endDay = moment($scope.project.startDate).format("YYYY-MM-DD");
typeofleaves = $scope.project.leaveType.leave_type;
leaveTypeDaywise = $scope.data.group1;
}
else{
days = $scope.project.noLeaves;
type = "";
 startDay = moment($scope.project.startDate).format("YYYY-MM-DD");//alert(startDay);
 endDay = moment($scope.project.endDate).format("YYYY-MM-DD");
typeofleaves = $scope.project.leaveType.leave_type;
leaveTypeDaywise=0;
}


angular.forEach($scope.LeaveByOrg,function(vL,kL){
if($scope.project.leaveType.description == vL.description){
$scope.MaxLeaveMonth = vL.MaxLeaveMonthly;
$scope.MaxLeaveYearly = vL.MaxLeave;
}
})

$scope.monthlyLeaveCount_tmp = $scope.project.noLeaves + $scope.LeavesCount.monthlyLeaveCount;//console.log($scope.monthlyLeaveCount_tmp);
$scope.yearlyLeaveCount_tmp = $scope.project.noLeaves + $scope.LeavesCount.yearlyLeaveCount;//console.log($scope.yearlyLeaveCount_tmp);
if( ($scope.monthlyLeaveCount_tmp > parseFloat($scope.MaxLeaveMonth)) && ($scope.yearlyLeaveCount_tmp <= parseFloat($scope.MaxLeaveYearly)) ){
applyLeaveEnvelope={
            "appid" : AmsValues.HRMS__a,
            "days":days,
            "leaveTypeDaywise":leaveTypeDaywise,
            "status":1,
            "fdate":startDay,
            "tdate":endDay,
            "ftime":"",
            "ttime":"",
            "org":AmsValues.HRMS_orgId,
            "path":"",
            "reason":Leave_reason,
            "type":type,
            "typeofleaves":typeofleaves,
            "userid":AmsValues.HRMS__id
            //"shortleave":shortLEAVE,
   };
   var confirmPopup = $ionicPopup.confirm({
          title: '',
          template: 'You can apply '+$scope.project.leaveType.leave_type+' maximum for '+$scope.MaxLeaveMonth+' days monthly,all remaining leaves will be unpaid.Do you want to continue.'

       });

       confirmPopup.then(function(res) {
         if(res) {
           applyLEAVE(applyLeaveEnvelope);
         }
       });
}
else if( $scope.yearlyLeaveCount_tmp > parseFloat($scope.MaxLeaveYearly) ){
applyLeaveEnvelope={
            "appid" : AmsValues.HRMS__a,
            "days":days,
            "leaveTypeDaywise":leaveTypeDaywise,
            "status":1,
            "fdate":startDay,
            "tdate":endDay,
            "ftime":"",
            "ttime":"",
            "org":AmsValues.HRMS_orgId,
            "path":"",
            "reason":Leave_reason,
            "type":type,
            "typeofleaves":typeofleaves,
            "userid":AmsValues.HRMS__id
            //"shortleave":shortLEAVE,
   };
   var confirmPopup = $ionicPopup.confirm({
          title: '',
          template: 'You can apply '+$scope.project.leaveType.leave_type+' maximum for '+$scope.MaxLeaveYearly+' days monthly,all remaining leaves will be unpaid.Do you want to continue.'
       });

       confirmPopup.then(function(res) {
         if(res) {
           applyLEAVE(applyLeaveEnvelope);
         }
       });
}
else if($scope.project.remainingL < $scope.project.noLeaves){
applyLeaveEnvelope={
            "appid" : AmsValues.HRMS__a,
            "days":days,
            "leaveTypeDaywise":leaveTypeDaywise,
            "status":1,
            "fdate":startDay,
            "tdate":endDay,
            "ftime":"",
            "ttime":"",
            "org":AmsValues.HRMS_orgId,
            "path":"",
            "reason":Leave_reason,
            "type":type,
            "typeofleaves":typeofleaves,
            "userid":AmsValues.HRMS__id
            //"shortleave":shortLEAVE,
   };
   var confirmPopup = $ionicPopup.confirm({
       title: '',
       template: 'Your Leaves balance is low , all remaining leaves will be unpaid.Do you want to continue.'
    });

    confirmPopup.then(function(res) {
      if(res) {
        applyLEAVE(applyLeaveEnvelope);
      }
    });
}


else{
applyLeaveEnvelope={
            "appid" : AmsValues.HRMS__a,
            "days":days,
            "leaveTypeDaywise":leaveTypeDaywise,
            "status":1,
            "fdate":startDay,
            "tdate":endDay,
            "ftime":"",
            "ttime":"",
            "org":AmsValues.HRMS_orgId,
            "path":"",
            "reason":Leave_reason,
            "type":type,
            "typeofleaves":typeofleaves,
            "userid":AmsValues.HRMS__id
            };
 applyLEAVE(applyLeaveEnvelope);
 }

}
}

};
var halfdayLeave = [];
$scope.applyHalfDay = function(){
$scope.LeaveHalfDayContainer = true;
$scope.ComOffHalfDayContainer = false;
$scope.SelectedCompOff = false;
halfdayLeave.length = 0;
$scope.project.startDate = "";
$scope.project.endDate = "";
//console.log($scope.data.cb1);
if($scope.data.cb1 == false){
$scope.data = {
      group1 : 1
    };

      angular.forEach($scope.leaveAllotmentType,function(v,key){
                          if(v.enableHalfDay == true){

                              halfdayLeave.push(v);
                              }

                          });
            $scope.leaveAllotmentType = halfdayLeave;

$scope.project.noLeaves = 0.5;
$scope.toDate = false;
$scope.OtherDAY = false;
$scope.halfDAYContainer = true;
$scope.HalfDay = "active";
}
else{
$scope.leaveAllotmentType = $scope.LeaveType;
$scope.project.startDate = "";
$scope.project.endDate = "";
$scope.project.remainingL = "";
$scope.project.noLeaves = "";
$scope.toDate = true;
$scope.OtherDAY = true;
$scope.halfDAYContainer = false;
$scope.EnableAfterFromDT = true;
$scope.HalfDay = "Inactive";
}

};

$scope.isOpen = false;
$scope.selectedMode = 'md-scale';
$scope.selectedDirection = 'up';


$scope.Applycompoff = function(){
$ionicViewSwitcher.nextTransition('none');
$state.go("applyComOff");
};

$scope.LeaveHistory = function(){
$ionicViewSwitcher.nextTransition('none');
$state.go("LeaveHistory");
};

$scope.compHistory = function(){
$ionicViewSwitcher.nextTransition('none');
$state.go("CompOffHistory");
};

$scope.leavePlan = function(){
$ionicViewSwitcher.nextTransition('none');
$state.go("leavePlan");
};

$scope.FabSpeedBTN = function(){
$('#dim').css('display','block');
}

$scope.hideDIM = function(){
$('#dim').css('display','none');
}
$scope.EditMyProfile = function(){
$ionicViewSwitcher.nextTransition('none');
$state.go("myProfileEdit");
};

$scope.getEndMinDate = function(){
$scope.ToDate_minDate = new Date(moment($scope.project.startDate).format("YYYY-MM-DD"));
$scope.EnableAfterFromDT = false;
$scope.project.endDate = "";
};


function applyLEAVE(envelope){
var url_upload_Leave_docs = AmsConstants.url_hrms_training+"leaveUpload";
$scope.url = AmsConstants.url_hrms_lms+'applyLeave';
if($scope.files != undefined && $scope.files.length > 0){
$scope.loader = true;
setTimeout(function(){
Upload.upload({
              url: encodeURI(url_upload_Leave_docs),
              data: {file: $scope.files[0]}
          }).then(function (resp) {
                var envelope_wit_doc = {
                  "appid" : AmsValues.HRMS__a,
                  "days":days,
                  "leaveTypeDaywise":leaveTypeDaywise,
                  "status":1,
                  "fdate":startDay,
                  "tdate":endDay,
                  "ftime":"",
                  "ttime":"",
                  "org":AmsValues.HRMS_orgId,
                  "path":resp.data,
                  "reason":$scope.project.reasonFLeave,
                  "type":type,
                  "typeofleaves":typeofleaves,
                  "userid":AmsValues.HRMS__id
                };

                   ConnectivityService.PostData_post($scope.url,envelope_wit_doc)
                    .then(function(response) {
                    console.log(response);
                    window.plugins.toast.showLongBottom('Leave Applied Successfully.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
                    $scope.SelectedCompOff = false;
                    $scope.files.length = 0;
                    refreshApplyLeave();
                    $scope.loader = false;
                    },function(error, status) {
                    $scope.data.error = { message: error, status: status};
                    console.log($scope.data.error.status);
                    $scope.loader = false;
                   });

          }, function (resp) {
          console.log(resp);
          console.log(JSON.parse(resp));
              console.log('Error status: ' + resp);
              $scope.loader = false;
          }, function (evt) {
              var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
              console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
              $scope.loader = false;
          });
   },100);
}
else{
$scope.loader = true;
   setTimeout(function(){
   ConnectivityService.PostData_post($scope.url,envelope)
    .then(function(response) {
    console.log(response);
    window.plugins.toast.showLongBottom('Leave Applied Successfully.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
    $scope.SelectedCompOff = false;

    refreshApplyLeave();
    $scope.loader = false;
    },function(error, status) {
    console.log("error");
    $scope.loader = false;
   });
 },100);
}


}

$scope.uploadFiles = function(files) {
if(files[0] != undefined){
$scope.files = files;
}
else{
console.log(files[0]);
}
}

$scope.removeFile = function(obj){
angular.forEach($scope.files,function(v,k){
if(obj.lastModified == v.lastModified){
$scope.files.splice(k,1);
}
})
}

$scope.doRefresh = function() {
console.log('Refreshing!');
$timeout( function() {
 $scope.loader = false;
 refreshApplyLeave();
 $scope.$broadcast('scroll.refreshComplete');
 }, 100);
};

$scope.openDOC = function(f){
window.open(AmsConstants.url_onBoard+f);
}

});



