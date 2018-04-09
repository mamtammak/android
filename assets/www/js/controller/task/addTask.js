

Module_task.controller('addTask_controller', function($scope,AmsConstants,AmsValues,MenuList,StoreResponse,$timeout,$q, $mdSidenav,$ionicPopup,$state,$http,$window,$mdDialog,$ionicViewSwitcher,ConnectivityService,$rootScope,$compile,Upload,$ionicHistory) {


var project = {priority:""};
var TaskUploadFiles = [];
var subTaskArr = [];subTaskArr.length = 0;
    $scope.readonly = false;
    $scope.selectedItem = null;
    $scope.searchText = null;
    $scope.querySearch = querySearch;
    //$scope.vegetables = loadVegetables();
    $scope.selectedVegetables = [];
    $scope.numberChips = [];
    $scope.numberChips2 = [];
    $scope.numberBuffer = '';
    $scope.autocompleteDemoRequireMatch = false;
    $scope.transformChip = transformChip;

    $scope.notFound = function(key) {
        console.log("key", key);
        transformChip(key);
      }

    function transformChip(chip) {
      if (angular.isObject(chip)) {
        return chip;
      }

      return {
        name: chip,
        type: 'new'
      }
    }


    function querySearch(query) {
      var results = query ? $scope.vegetables.filter(createFilterFor(query)) : [];
      return results;
    }


    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(vegetable) {
        return (vegetable._lowername.indexOf(lowercaseQuery) === 0) ||
          (vegetable._lowertype.indexOf(lowercaseQuery) === 0);
      };

    }




$scope.loggedInUserName = AmsValues.HRMS_name;
$scope.project = {
    dueDate: new Date(),
    title : "",
    description : "",
    Assignedto : ""

  };

$scope.close = function(){
$ionicViewSwitcher.nextTransition('none');
$state.go("task");
};
var Assignedto_EMP = [];Assignedto_EMP.length = 0;var empDetailsArray = [];
$scope.init = function(){
empDetailsArray.length = 0;

$scope.todayDT = new Date();

  $scope.minDate = new Date(
    $scope.todayDT.getFullYear(),
    $scope.todayDT.getMonth(),
    $scope.todayDT.getDate()
  );
$scope.url = AmsConstants.url_hrms+'getEmployees?org='+AmsValues.HRMS_orgId;
                            console.log($scope.url);
                            $scope.loader = true;
                            setTimeout(function(){

                            ConnectivityService.PostData($scope.url)
                            .then(function(response) {

                            angular.forEach(response,function(value,key){

                            if(value.name != AmsValues.HRMS_name){
                            empDetailsArray.push(value);

                            }

                            });
                            $scope.emp_details = empDetailsArray;
                           // console.log(empDetailsArray);

                            $scope.loader = false;
                            },
                            function(jqxhr) {
                            //alert(jqxhr.responseText);
                              $scope.loader = false;

                            });
                            },200);
};


$scope.getEMPID = function(id){
if(id == null){
console.log("null data");
}
else{
Assignedto_EMP.push(id);
}

}

var subtaskArrayList = [];subtaskArrayList.length = 0;
$scope.titlet = false;
$scope.saveTask = function(project){

if($scope.project.title == ""){
$window.document.getElementById('title').focus();
return false;
}
else if($scope.project.description == ""){
$window.document.getElementById('description').focus();
return false;
}
else if($scope.project.Assignedto == ""){
return false;
}
else if($scope.project.dueDate == ""){
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

var url_upload = AmsConstants.url_hrms_training+"taskUpload";
var title = $window.document.getElementById("title").value;
var description = $window.document.getElementById("description").value;
$scope.project.dateString = moment($scope.project.dueDate).format("YYYY-MM-DD");
$scope.project.assignTO = Assignedto_EMP;

var d = new Date();
var month = d.getMonth()+1;
var day = d.getDate();
var output = d.getFullYear() + '-'+ ((''+month).length<2 ? '0' : '') + month +'-'+ ((''+day).length<2 ? '0' : '') + day ;
var envelope;

$scope.loader = true;

 setTimeout(function(){
 if($scope.files != undefined && $scope.files.length > 0){

Upload.upload({
              url: encodeURI(url_upload),
              data: {file: $scope.files[0]}
          }).then(function (resp) {
              console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
               envelope = {
                              "title" : title,
                              "description" : description,
                              "ddte" : $scope.project.dateString,
                              "createdby" : AmsValues.HRMS__id,
                              "assignedto" : Assignedto_EMP,
                              "assignedon" : output,
                              "org" : AmsValues.HRMS_orgId,
                              "userid" : Assignedto_EMP,
                              "type" : "task type",
                              "doc":resp.data,
                              "priority":$scope.project.priority,
                              "subtask":subtaskArrayList,
                              "appid":AmsValues.HRMS__a
                              };
               uploadTaskData(envelope);
          }, function (resp) {
              console.log('Error status: ' + resp);
              $scope.loader = false;
          }, function (evt) {
              var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
              console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
              $scope.loader = false;
          });
 }
 else{
 envelope = {
                 "title" : title,
                 "description" : description,
                 "ddte" : $scope.project.dateString,
                 "createdby" : AmsValues.HRMS__id,
                 "assignedto" : Assignedto_EMP,
                 "assignedon" : output,
                 "org" : AmsValues.HRMS_orgId,
                 "userid" : Assignedto_EMP,
                 "type" : "task type",
                 "priority":$scope.project.priority,
                 "subtask":subtaskArrayList,
                 "appid":AmsValues.HRMS__a
                 };
 uploadTaskData(envelope);

 }


 },200);
}


};


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
                           e.preventDefault();
                     } else {

                        return $scope.data.model;
                     }
                  }
            }
         ]
      });

      myPopup.then(function(res) {
      if(res == undefined || res == ""){console.log("empty result.");}
      else{
      var val = Math.floor(1000 + Math.random() * 9000);
      var tmp = {"s_id":val,"subtask":res};
      subTaskArr.push(tmp);

      }

      });
      $scope.subtask = subTaskArr;
};

$scope.deleteCard = function(obj){
angular.forEach(subTaskArr,function(v,k){
if(obj.s_id == v.s_id){
$scope.subtask.splice(k,1);
}
})
};

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

function uploadTaskData(envelope){
$scope.url = AmsConstants.url_hrms_task+"addTask";
setTimeout(function(){
ConnectivityService.PostData_post($scope.url,envelope)
       .then(function(response) {

       $scope.loader = false;
       window.plugins.toast.showLongBottom('Task added successfully.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
         $rootScope.$emit("CallParentMethod", function(){
         });

       $ionicViewSwitcher.nextTransition('none');
       $ionicHistory.clearCache().then(function(){ $state.go('task') })

       },
       function(data) {
         $scope.loader = false;
         console.log("error");
         window.plugins.toast.showLongBottom('Adding task failed.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
         $ionicViewSwitcher.nextTransition('none');
       });
  },200);
}

});



