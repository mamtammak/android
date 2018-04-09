

Module_task.controller('completedpopUP_controller', function($scope,AmsConstants,Upload,AmsValues,MenuList,StoreResponse,$timeout,$q, $mdSidenav,$ionicPopup,$state,$http,$window,$mdDialog,$ionicViewSwitcher,ConnectivityService,$rootScope,$compile,$ionicHistory) {

var CompletedTaskR = JSON.parse(localStorage.getItem("completedTaskR"));
$scope.checkCompleted = CompletedTaskR.completed;
$scope.PriorityArr = [{"value":'High',"index":3},{"value":'Medium',"index":2},{"value":'Low',"index":1}];
$scope.taskSetPriority = CompletedTaskR.priority;
var subTaskArr = [];subTaskArr.length = 0;
var subtaskArrayList = [];subtaskArrayList.length = 0;
$scope.documents = [];$scope.documents.length = 0;
var assignto = [];assignto.length = 0;
$scope.Rating_BTN = false;
$scope.MyAccountName = AmsValues.HRMS_name;//alert($scope.MyAccountName);
$scope.CreatedBy = CompletedTaskR.created_by.name;//alert($scope.CreatedBy);
$scope.AssignedTo = CompletedTaskR.assigned_to;//alert($scope.AssignedTo);

$scope.startedValue = CompletedTaskR.started;
$scope.TaskID = CompletedTaskR._id;
if($scope.checkCompleted == false){
    if($scope.CreatedBy == $scope.MyAccountName){
    $scope.allowFileUpload = true;
    }
    else{
    $scope.allowFileUpload = false;
    }

}
else{
$scope.allowFileUpload = false;
}
var PriorityValue;
$scope.init = function(){

if(AmsValues.HRMS_email == CompletedTaskR.created_by.email ){
$scope.Rating_BTN = true;
}
else{
$scope.Rating_BTN = false;
}

if(CompletedTaskR.priority == 1){
PriorityValue = {"value":'Low',"index":1};
}
else if(CompletedTaskR.priority == 2){
PriorityValue = {"value":'Medium',"index":2};
}
else if(CompletedTaskR.priority == 3){
PriorityValue = {"value":'High',"index":3};
}
else{
PriorityValue = "";
console.log("no priority added.");
}
$scope.TaskTitle = CompletedTaskR.title;
$scope.project = {
task_des :CompletedTaskR.description,
dueDate : new Date(CompletedTaskR.due_date),
assigned_on:CompletedTaskR.assigned_on.split('T')[0],
Priority : PriorityValue,
rating3 : CompletedTaskR.rating
};
if(CompletedTaskR.subtask == "undefined" || CompletedTaskR.subtask == null){
}
else{
$scope.subtaskList = CompletedTaskR.subtask;
console.log($scope.subtaskList);
}
if(CompletedTaskR.doc != undefined && CompletedTaskR.doc.length > 0){
$scope.documents.push(CompletedTaskR.doc);
$scope.tmp_docs = $scope.documents;
}

$scope.project.createdBy = $scope.CreatedBy;
angular.forEach(CompletedTaskR.assigned_to,function(value,key){
assignto.push(value.name);
});
$scope.project.assignTO = assignto;
};

$scope.SaveReport = function(){
//alert($scope.project.rating3);
$scope.url = AmsConstants.url_hrms_task+"updateTaskStatus";

var envelope = {"_id":CompletedTaskR._id,"rating":$scope.project.rating3};
console.log(envelope);
$scope.loader = true;
 setTimeout(function(){

 ConnectivityService.PostData_post($scope.url,envelope)
     .then(function(response) {
     console.log(response);
     $scope.loader = false;
     window.plugins.toast.showLongBottom('Task rating updated successfully.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
     $rootScope.$emit("CallParentMethod", function(){
     });
     $ionicHistory.clearCache().then(function(){ $state.go('task') })

     },
     function(data) {
                    $scope.loader = false;
                    console.log("error");

     });
 },200);
};

$scope.saveTask = function(){
var envelope;
var url_upload = AmsConstants.url_hrms_training+"taskUpload";
if($scope.project.task_des == ""){
window.plugins.toast.showLongBottom('Please enter description.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
return false;
}

else if($scope.project.dueDate == ""){
window.plugins.toast.showLongBottom('Please enter due date.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
return false;
}
else{

if(subTaskArr.length == 0 || subTaskArr.length == null){
subtaskArrayList.length = 0;
}
else{
angular.forEach(subTaskArr,function(vs,ks){
var tempSub = {
            todo : vs.subtask,
            status :'false'
            };
  subtaskArrayList.push(tempSub);
})

}
if(CompletedTaskR.subtask != undefined){
$scope.SubtaskListadded = subtaskArrayList.concat(CompletedTaskR.subtask);
}
else{
$scope.SubtaskListadded = subtaskArrayList;
}
//alert($scope.files);console.log($scope.files.length);
if($scope.files != undefined && $scope.files.length > 0){
 setTimeout(function(){
 Upload.upload({
   url: encodeURI(url_upload),
   data: {file: $scope.files[0]}
 }).then(function (resp) {
   console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
   envelope = {
      "_id" : CompletedTaskR._id,
      "description":$scope.project.task_des,
      "duedate":moment($scope.project.dueDate).format("YYYY-MM-DD"),
      "priority":$scope.project.Priority,
      "subtask":$scope.SubtaskListadded,
      "appid":AmsValues.HRMS__a,
      "doc": [resp.data]
   };
 updateTask(envelope);
 }, function (resp) {
   console.log(resp);
   $scope.loader = false;
 }, function (evt) {
  var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
  console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
  $scope.loader = false;
  });

  },200);
}
else{

envelope = {
                "_id" : CompletedTaskR._id,
                "description":$scope.project.task_des,
                "duedate":moment($scope.project.dueDate).format("YYYY-MM-DD"),
                "priority":$scope.project.Priority,
                "subtask":$scope.SubtaskListadded,
                "appid":AmsValues.HRMS__a,
                "doc": $scope.documents

                };
    updateTask(envelope);


}

}
};

$scope.deleteTask = function(){

$scope.url = AmsConstants.url_hrms_task+'deleteTask?_id=';
var TASK_ID = CompletedTaskR._id;
$scope.loader = true;
setTimeout(function(){
   ConnectivityService.PostData($scope.url+TASK_ID)
   .then(function(response) {
   console.log(response);

      window.plugins.toast.showLongBottom('You have deleted task.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
      $rootScope.$emit("CallParentMethod", function(){
      });
      $ionicHistory.clearCache().then(function(){ $state.go('task') })
      $scope.loader = false;
   },
   function(data) {
                  $scope.loader = false;
                  console.log("error");
                  //$scope.emp_list = false;
                  //$scope.norecords = true;
                });
                },200);
};

$scope.completeTask = function(){
var started = CompletedTaskR.started;
var id = CompletedTaskR._id;

if(CompletedTaskR.subtask.length > 0){
var checked = $("#subtaskMDList input:checked").length > 0;
if (checked == false){

var alertPopup = $ionicPopup.alert({
      title: "Subtask",
      template: "Please complete subtask."
    });
    alertPopup.then(function(res) {
      console.log('ionic alert');
    });
return false;
}
else{

var confirmPopup = $ionicPopup.confirm({
  title: '',
  template: 'Do you want to mark this task completed and notify to manager ?'
});

confirmPopup.then(function(res) {
  if(res) {
  $scope.url = AmsConstants.url_hrms_task+'endTask';
  var TASK_ID = {"taskid" : id,"cmpltdby":AmsValues.HRMS__id,"cmpltdusr":AmsValues.HRMS_name};
  $scope.loader = true;
  setTimeout(function(){
  ConnectivityService.PostData_post($scope.url,TASK_ID)
  .then(function(response) {
       console.log(response);
       window.plugins.toast.showLongBottom('Task completed.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
       $rootScope.$emit("CallParentMethod", function(){
       });
       $ionicHistory.clearCache().then(function(){ $state.go('task') })
       $scope.loader = false;
  },
  function(data) {
      $scope.loader = false;
      console.log("error");
      });
  },200);
  } else {
    console.log('exit canceled !');
  }
  });
}
}

else{

var confirmPopup = $ionicPopup.confirm({
 title: '',
 template: 'Do you want to mark this task completed and notify to manager ?'
});

confirmPopup.then(function(res) {
  if(res) {
  $scope.url = AmsConstants.url_hrms_task+'endTask';
  var TASK_ID = {"taskid" : id,"cmpltdby":AmsValues.HRMS__id,"cmpltdusr":AmsValues.HRMS_name};
  $scope.loader = true;
  setTimeout(function(){
  ConnectivityService.PostData_post($scope.url,TASK_ID)
  .then(function(response) {
       console.log(response);
       window.plugins.toast.showLongBottom('Task completed.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
       $rootScope.$emit("CallParentMethod", function(){
       });
       $ionicHistory.clearCache().then(function(){ $state.go('task') })
       $scope.loader = false;
  },
  function(data) {
      $scope.loader = false;
      console.log("error");
      });
  },200);
  } else {
    console.log('exit canceled !');
  }
  });

}

};

$scope.startTask = function(){
var started = CompletedTaskR.started;
var id = CompletedTaskR._id;
if(started == true){
window.plugins.toast.showLongBottom('Task cannot start again.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
$('#startColor').css('color','#9E9E9E');
return false;
}
else{
var d = new Date();
var month = d.getMonth()+1;
var day = d.getDate();
var output = d.getFullYear() + '-'+ ((''+month).length<2 ? '0' : '') + month +'-'+ ((''+day).length<2 ? '0' : '') + day;

var confirmPopup = $ionicPopup.confirm({
                         title: '',
                         template: 'Do you want to start task ?'
                       });

                       confirmPopup.then(function(res) {
                         if(res) {
                         $scope.url = AmsConstants.url_hrms_task+'startTask';

                              var envelope = {
                                             "taskid" :  id,
                                             "startdate" :output,
                                             "lts": true
                                             };
                              $scope.loader = true;
                              setTimeout(function(){
                                 ConnectivityService.PostData_post($scope.url,envelope)
                                 .then(function(response) {
                                 console.log(response);
                                 window.plugins.toast.showLongBottom('You have started task.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
                                 $rootScope.$emit("CallParentMethod", function(){
                                        //alert("done");
                                 });
                                 $ionicHistory.clearCache().then(function(){ $state.go('task') })
                                 $scope.loader = false;
                                 },
                                 function(data) {
                                    $scope.loader = false;
                                    console.log("error");

                                    });
                                 },200);

                         } else {
                           console.log('canceled !');
                         }
                       });

}

};

$scope.EndSubtask = function(id){

var started = CompletedTaskR.started;
var id = CompletedTaskR._id;
if(started == false){
if($('#'+id). prop("checked") == true){
$('#'+id).attr('checked', false);

}
window.plugins.toast.showLongBottom('Please start you task.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});

return false;
}
else{
var sub_envelope;var data;var newSubtask = [];newSubtask.length = 0;
if($('#'+id). prop("checked") == true){
//alert("Checkbox is checked." );
sub_envelope = {"status":true,"_id":id};

}
else{
//alert("Checkbox is unchecked." );
sub_envelope = {"status":false,"_id":id};

}

$("#subtaskMDList").find("checkbox").each(function(){
    console.log($(this).attr('value'));
    var id_Checkbox = ($(this).attr('value')).split('_id_')[1];
    var Status_Checkbox = ($(this).attr('value')).split('_id_')[0];
    if(id_Checkbox == id){
    console.log("pop this record.");
    }
    else{
    var tmpSubTaskID = {
    'status':Status_Checkbox,
    "_id":id_Checkbox
    };
    newSubtask.push(tmpSubTaskID);
    }
});
newSubtask.push(sub_envelope);
console.log(newSubtask);
data = {
"_id":CompletedTaskR._id,
"subtask":newSubtask
};
var urlSubT = AmsConstants.url_hrms_task+'updateTaskStatus';
$scope.loader = true;
setTimeout(function(){
ConnectivityService.PostData_post(urlSubT,data)
.then(function(response) {
  console.log(response);
  //window.plugins.toast.showLongBottom('You have completed subtask.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
  var refreshSubtask = AmsConstants.url_hrms_task+'getTask/'+CompletedTaskR._id;
  var ResponseRefreshSubTASK = ConnectivityService.AjaxRequest(refreshSubtask);
  console.log(ResponseRefreshSubTASK);
  if(ResponseRefreshSubTASK != null && ResponseRefreshSubTASK != "undefined"){

  }
  $scope.loader = false;
  },
  function(data) {
    $scope.loader = false;
    window.plugins.toast.showLongBottom('Subtask completion failed,try again.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});

  });
  },100);
}



};

$scope.deleteFile = function(f){
$scope.documents.length = 0;
if($scope.files != undefined){
$scope.files.length = 0;
}
}

$scope.uploadFiles = function(files) {
if($scope.documents != undefined){
$scope.documents.length = 0;
}
//$scope.files.length = 0;
if(files[0] != undefined){
$scope.files = files;
}
else{
console.log(files[0]);
}
}

$scope.addSubTask = function(){
$scope.data = {}

      // Custom popup
      var myPopup = $ionicPopup.show({
         template: '<input type = "text" ng-model = "data.model">',
         title: 'Add Subtask',
         subTitle: '',
         scope: $scope,

         buttons: [
            { text: 'Cancel' }, {
               text: '<b>Save</b>',
               type: 'button-positive',
                  onTap: function(e) {

                     if (!$scope.data.model) {
                        //don't allow the user to close unless he enters model...
                           e.preventDefault();
                     } else {

                        return $scope.data.model;
                     }
                  }
            }
         ]
      });

      myPopup.then(function(res) {
      //alert(res);
      if(res == undefined || res == ""){console.log("empty result.");}
      else{
      var val = Math.floor(1000 + Math.random() * 9000);
      var tmp = {"s_id":val,"subtask":res};
      subTaskArr.push(tmp);

      }

      });
      $scope.subtask = subTaskArr;
};

function updateTask(envelope){
$scope.url_UpdateTask = AmsConstants.url_hrms_task+"updateTaskStatus";
$scope.loader = true;
setTimeout(function(){
ConnectivityService.PostData_post($scope.url_UpdateTask,envelope)
       .then(function(response) {
       $scope.loader = false;
       window.plugins.toast.showLongBottom('Task updated successfully.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
       $rootScope.$emit("CallParentMethod", function(){
              //alert("done");
       });
       $ionicViewSwitcher.nextTransition('none');
       $state.go('task')
       //$ionicHistory.clearCache().then(function(){ $state.go('task') })

       },
       function(data) {
          $scope.loader = false;
          console.log("error");

       });
},100)
}

$scope.deleteCardDefault = function(obj){
angular.forEach($scope.subtaskList,function(vs,ks){
if(vs._id == obj._id){
$scope.subtaskList.splice(ks,1);
}
})
}

$scope.deleteCardNew = function(obj){
angular.forEach(subTaskArr,function(v,k){
if(obj.s_id == v.s_id){
$scope.subtask.splice(k,1);
}
})
}
$scope.downloadDOC = function(d){
window.open(AmsConstants.url_onBoard+d,"_system","location=yes,enableViewportScale=yes,hidden=no");
}

$scope.close = function(){
$ionicHistory.goBack();
};


});




