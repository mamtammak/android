

HRMS_Module.controller('to_do_list', function($scope,$timeout,$mdSidenav,$ionicPopup,$state,$http,AmsConstants,AmsValues,$window,$mdDialog,$ionicViewSwitcher,StoreResponse,ConnectivityService,StoreResponse,$ionicPlatform,$ionicHistory,$interval,$ionicPopover,$rootScope) {

$scope.selectedTab1 = 0;
$scope.initToDoList = function(){
//$scope.Title_to_do = 'Pending';
getToDoList()
};
$scope.pendingCount = 0;var Com_TaskMemo = [];var InCom_TaskMemo = [];
function getToDoList(){
Com_TaskMemo.length = 0;InCom_TaskMemo.length = 0;
$scope.urlToDoList = AmsConstants.url_onBoard+'todos/getTodo_list?org='+AmsValues.HRMS_orgId+'&createdby='+AmsValues.HRMS__id;
$scope.loader = true;
setTimeout(function(){
    ConnectivityService.PostData($scope.urlToDoList)
    .then(function(response) {
    console.log(response.length);
    if(response.length != undefined || response.length != null ){

    angular.forEach(response,function(value,key){
    if(value.completed == false){
    InCom_TaskMemo.push(value);
    }
    else{
    Com_TaskMemo.push(value);
    }
    });
    if($scope.selectedTab1 == 0){
    $scope.selectedTab1 = 0;
    if(InCom_TaskMemo.length == 0){
                $scope.pendingView = false;
                $scope.completedView = false;
                $scope.norecords = true;
                $('.norecords').html("<center><p style='padding-top:25px;'>No records found</p></center>");
            }
            else{
                $scope.pendingView = true;
                $scope.completedView = false;
                $scope.norecords = false;
                $('.norecords').html("");
                $scope.PendingTaskMemo = InCom_TaskMemo;
            }
    }
    else{
    $scope.selectedTab1 = 1;
    if(Com_TaskMemo.length == 0){
            $scope.pendingView = false;
            $scope.completedView = false;
            $scope.norecords = true;
            $('.norecords').html("<center><p style='padding-top:25px;'>No records found</p></center>");
        }
        else{
            $scope.pendingView = false;
            $scope.completedView = true;
            $scope.norecords = false;
            $('.norecords').html("");
            $scope.Comp_TaskMemo = Com_TaskMemo;
        }
    }


    }
    else{
      $scope.showrecordsPending = false;
      $scope.showrecordsCompleted = false;
      $scope.norecords = true;
      $('.norecords').html("<center><p style='padding-top:25px;'>No records found</p></center>");
    }

    $scope.loader = false;

    },
    function(jqxhr) {
      $scope.loader = false;
    });
 },200);
}

$scope.pending = function(){
if(InCom_TaskMemo.length == 0){
                $scope.pendingView = false;
                $scope.completedView = false;
                $scope.norecords = true;
                $('.norecords').html("<center><p style='padding-top:25px;'>No records found</p></center>");
            }
            else{
                $scope.pendingView = true;
                $scope.completedView = false;
                $scope.norecords = false;
                $('.norecords').html("");
                $scope.PendingTaskMemo = InCom_TaskMemo;
            }
}

$scope.completed = function(){
if(Com_TaskMemo.length == 0){
            $scope.pendingView = false;
            $scope.completedView = false;
            $scope.norecords = true;
            $('.norecords').html("<center><p style='padding-top:25px;'>No records found</p></center>");
        }
        else{
            $scope.pendingView = false;
            $scope.completedView = true;
            $scope.norecords = false;
            $('.norecords').html("");
            $scope.CompletedTaskMemo = Com_TaskMemo;
        }
}

/*$scope.Completed = function(){
$scope.pendingCount = 1;
$scope.Title_to_do = 'Completed';
$ionicViewSwitcher.nextTransition('none');
$ionicHistory.clearCache().then(function(){ $state.go('to_do_list') })
if(Com_TaskMemo.length == 0){
  $scope.showrecordsPending = false;
  $scope.showrecordsCompleted = true;
  $scope.norecords = true;
  $('.norecords').html("<center><p>No records found</p></center>");
}
else{
  $scope.showrecordsPending = false;
  $scope.showrecordsCompleted = true;
  $scope.norecords = false;
  $('.norecords').html("");
  $scope.Comp_TaskMemo = Com_TaskMemo;
}
 $scope.popover.hide();

};

$scope.Pending = function(){
$scope.pendingCount = 0;
$scope.Title_to_do = 'Pending';
$ionicViewSwitcher.nextTransition('none');
$ionicHistory.clearCache().then(function(){ $state.go('to_do_list') })
if(InCom_TaskMemo.length == 0){
  $scope.showrecordsPending = true;
  $scope.showrecordsCompleted = false;
  $scope.norecords = true;
  $('.norecords').html("<center><p>No records found</p></center>");
}
else{
  $scope.showrecordsPending = true;
  $scope.showrecordsCompleted = false;
  $scope.norecords = false;
  $('.norecords').html("");
  $scope.Pending_TaskMemo = InCom_TaskMemo;
 }
 $scope.popover.hide();
};*/
$scope.project = {textArea:"",duedate:new Date()};
$scope.initAddToDoList = function(){
$scope.minDate = new Date();
//cordova.plugins.Keyboard.show();
};
$scope.saveList = function(){
$scope.urlSaveToDoList = AmsConstants.url_onBoard+'todos/addToDo';
var DueDate = moment($scope.project.duedate).format("YYYY-MM-DD");
if(DueDate == ""){
window.plugins.toast.showLongBottom('Please add due date.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
return false;
}
else if($scope.project.textArea == ""){
window.plugins.toast.showLongBottom('Please add to-do list.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
return false;
}
else{
var envelope = {
"title":"to-do-list",
"description":$scope.project.textArea,
"ddte":DueDate,
"createdby":AmsValues.HRMS__id,
"org":AmsValues.HRMS_orgId
};
$scope.loader = true;
setTimeout(function(){
    ConnectivityService.PostData_post($scope.urlSaveToDoList,envelope)
    .then(function(response) {
    $rootScope.$emit("CallInitToDoList", function(){
           //alert("done");
    });
    $mdDialog.cancel();
    $scope.loader = false;

    },
    function(jqxhr) {
      $scope.loader = false;
    });
 },200);
}

};
$scope.BackHistory = function(){
$ionicHistory.goBack();
}
$scope.close = function(){
$mdDialog.cancel();
};
/*$scope.updateTo_do_list = function(item){
localStorage.setItem("UpdateToDoList",JSON.stringify(item));
$ionicViewSwitcher.nextTransition('none');
$state.go("Update_to_do_list");
};*/

$scope.UpdateTODOLIST = "";
$scope.UpdateTODOLIST = JSON.parse(localStorage.getItem("UpdateToDoList"));
console.log($scope.UpdateTODOLIST);
$scope.initUpdateToDoList = function(){
setTimeout(function(){

$scope.project = {};
$scope.project.duedateUpdate = new Date($scope.UpdateTODOLIST.due_date);
$scope.project.UpdateTextarea = $scope.UpdateTODOLIST.description;
$scope.last_modifiedDt = ($scope.UpdateTODOLIST.last_modified).split('T')[0];
//console.log($scope.last_modifiedDt);
},100);

};

$scope.UpdateList = function(){
$scope.project = {};
$scope.urlUpdateToDoList = AmsConstants.url_onBoard+'todos/updateTodo';
var DueDate = moment($scope.project.duedateUpdate).format("YYYY-MM-DD");
if(DueDate == ""){
window.plugins.toast.showLongBottom('Please add due date.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
return false;
}
else if($scope.project.UpdateTextarea == ""){
window.plugins.toast.showLongBottom('Please add to-do list.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
return false;
}
else{
var envelope = {
"_id" :$scope.UpdateTODOLIST._id,
"title":"to-do-list",
"description":$('#UpdateTextarea').val(),
"ddte":DueDate,
"createdby":AmsValues.HRMS__id,
"org":AmsValues.HRMS_orgId
};
console.log(envelope);
$scope.loader = true;
setTimeout(function(){
    ConnectivityService.PostData_post($scope.urlUpdateToDoList,envelope)
    .then(function(response) {
    $rootScope.$emit("CallInitToDoList", function(){
           //alert("done");
    });
    $mdDialog.cancel();
    $scope.loader = false;

    },
    function(jqxhr) {
      $scope.loader = false;
    });
 },200);
}
};

$scope.deleteList = function(){
var URL_delete = AmsConstants.url_onBoard+'todos/deleteTodo?_id='+$scope.UpdateTODOLIST._id;
$scope.loader = true;
setTimeout(function(){
    ConnectivityService.PostData(URL_delete)
    .then(function(response) {
    getToDoList();
    $mdDialog.cancel();
    $scope.loader = false;

    },
    function(jqxhr) {
      $scope.loader = false;
    });
 },200);

};

$scope.deleteListCompleted = function(id){
var URL_delete = AmsConstants.url_onBoard+'todos/deleteTodo?_id='+id;

var confirmPopup = $ionicPopup.confirm({
 title: '',
 template: 'Are you sure, you want to delete this task.'
});

confirmPopup.then(function(res) {
if (res) {
$scope.loader = true;
setTimeout(function(){
    ConnectivityService.PostData(URL_delete)
    .then(function(response) {
    getToDoList();
    //$mdDialog.cancel();
    $scope.loader = false;

    },
    function(jqxhr) {
      $scope.loader = false;
    });
 },200);
 }

});

};

$scope.CompleteToDo = function(id, completeStatus) {
        if (completeStatus == false) {
            var confirmPopup = $ionicPopup.confirm({
                title: '',
                template: 'Are you sure, you want to mark this task complete.'
            });

            confirmPopup.then(function(res) {
                if (res) {
                    $scope.urlCompleteToDoList = AmsConstants.url_onBoard + 'todos/updateTodo';
                    var envelope = {
                        "_id": id,
                        "completed": true
                    }
                    $scope.loader = true;
                    setTimeout(function() {
                        ConnectivityService.PostData_post($scope.urlCompleteToDoList, envelope)
                            .then(function(response) {
                                    $scope.initToDoList();
                                    $scope.loader = false;
                                },
                                function(jqxhr) {
                                    $scope.loader = false;
                                });
                    }, 200);
                }

            });
        } else {
            var confirmPopup = $ionicPopup.confirm({
                title: '',
                template: 'Are you sure, you want to mark this task incomplete.'
            });

            confirmPopup.then(function(res) {
                if (res) {
                    $scope.urlCompleteToDoList = AmsConstants.url_onBoard + 'todos/updateTodo';
                    var envelope = {
                        "_id": id,
                        "completed": false
                    }
                    $scope.loader = true;
                    setTimeout(function() {
                        ConnectivityService.PostData_post($scope.urlCompleteToDoList, envelope)
                            .then(function(response) {
                                    $scope.initToDoList();
                                    $scope.loader = false;

                                },
                                function(jqxhr) {
                                    $scope.loader = false;
                                });
                    }, 200);
                }

            });
        }


    };

    $scope.updateTo_do_list = function(item) {
        localStorage.setItem("UpdateToDoList", JSON.stringify(item));
        setTimeout(function() {
            $mdDialog.show({
                    controller: "to_do_list",
                    templateUrl: 'templates/Update_to_do_list.html',
                    parent: angular.element(document.body),
                    //scope: $scope,
                    clickOutsideToClose: false,
                    fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
                })
                .then(function(answer) {


                }, function() {
                    //$scope.status = 'You cancelled the dialog.';
                });
        }, 0);
    };
 $scope.Addmemo = function() {
    setTimeout(function() {
            $mdDialog.show({
                    controller: "to_do_list",
                    templateUrl: 'templates/Add_to_do_list.html',
                    parent: angular.element(document.body),
                    //targetEvent: ev,
                    clickOutsideToClose: false,
                    fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
                })
                .then(function(answer) {

                    //$scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    //$scope.status = 'You cancelled the dialog.';
                });
        }, 0);
    };

$rootScope.$on("CallInitToDoList", function() {
        getToDoList();
    });

});
