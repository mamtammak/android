

Module_task.controller('task_controller', function($scope,$mdToast,AmsValues,$timeout,AmsConstants,MenuList,StoreResponse, $mdSidenav,$ionicPopup,$state,$http,$window,$mdDialog,$ionicViewSwitcher,ConnectivityService,$rootScope,$ionicPlatform,$ionicPopup,$ionicHistory) {

$scope.loggedInUserName = AmsValues.HRMS_name;
//$state.reload();
//$scope.url = AmsConstants.url_hrms_task+'getTasks?org=adnate';
$scope.selectedTab1 = 0;
//$scope.hrmsLogo = 'img/HRMS_LOGO_old.png';
$scope.OrganizationName = AmsValues.HRMS_orgName;
if(AmsValues.HRMS_orgLogo != ""){
 $scope.OrganisationLogo = AmsConstants.url_notify_web+AmsValues.HRMS_orgLogo;
}
else{
 $scope.OrganisationLogo = "img/brand_logo.png";
}
$scope.showTaskPending = false;
$scope.showTaskComplete = false;
$scope.showTaskTiles = false;
$scope.norecords = false;
$scope.ShowfilterTask = true;
$scope.ShowfilterComp = false;
$scope.showSearchbar = true;
$scope.hideSearchbar = false;
$scope.showbadgeInC = false;
$scope.showbadgeC = false;
$scope.MyAccountName = AmsValues.HRMS_name;
$scope.MyEmailId = AmsValues.HRMS_email;
$scope.URL_Download = AmsValues.url_onBoard;
$scope.completed = [];
var incomplete = [];
var filterarray = [];
var filterarrayC = [];
var taskRunning = [];
var taskCompleted = [];
var taskRunningFilter = [];
var taskCompletedFilter = [];

var taskFilter_response = [];taskFilter_response.length = 0;
$scope.project = {searchList:"",searchListC:"",selectedTab1:"",selectedTab2:"",NoRate:0};
$scope.AddTask = function(){
$ionicViewSwitcher.nextTransition('none');
$state.go("AddTask");
};
$scope.editTask = function(item){
localStorage.setItem("updateTask",JSON.stringify(item));
$ionicViewSwitcher.nextTransition('none');
$state.go("updateTask");
};


$scope.CompletedTask = function(){
console.log($scope.selectedTab1);
$scope.ShowfilterTask = false;
$scope.ShowfilterComp = true;
if(taskCompleted.length == 0){
InitRefreshTask();
}
else{
$scope.showTaskPending = false;
   $scope.showTaskComplete = true;
   $scope.showTaskTiles = false;
   $scope.showTaskCompleteTiles = false;
   $scope.norecords = false;
   $('.norecords').html("");
}


};
$scope.menuItem=MenuList.get();
$scope.LoggedinName = AmsValues.HRMS_name;
$scope.toggleLeft = function(menuId) {
$mdSidenav(menuId).toggle();
};
$scope.goToMenuItem = function(menuitem){
var page = StoreResponse.goToMenuItemPage(menuitem);
      $mdSidenav('leftTK').close()
      .then(function () {

          $ionicViewSwitcher.nextTransition('none');
          $state.go(page);

      });

 };

$scope.closeFilter = function(){
$scope.showSearchbarFilterOpen = false;
$scope.showSearchbar = true;
$scope.showFilterCategory = true;
$scope.showTaskTiles = false;
$scope.norecords = false;
$('.norecords').html("");
};
$scope.close = function(){

$ionicHistory.goBack();
};
$scope.OngoingTask = function(){
console.log($scope.selectedTab1);
$scope.ShowfilterTask = true;
$scope.ShowfilterComp = false;
//InitRefreshTask();
//$scope.task_detail_Running = taskRunning;
if(taskRunning.length == 0){
InitRefreshTask();
}
else{
$scope.showTaskPending = false;
   $scope.showTaskPending = true;
   $scope.showTaskComplete = false;
   $scope.showTaskTiles = false;
   $scope.showTaskCompleteTiles = false;
   $scope.norecords = false;
   $('.norecords').html("");
}

};

$scope.init = function(){

if(AmsValues.HRMS_ProfilePic_thumbnail == "" || AmsValues.HRMS_ProfilePic_thumbnail == undefined){
    $scope.myface =  'img/ic_face_Profile.png';
}
else{
    $scope.myface =  AmsConstants.url_onBoard+AmsValues.HRMS_ProfilePic_thumbnail;
}
//$scope.selectedTab1 == 0;
InitRefreshTask();

};


$scope.MarkIncomplete = function(id){
var taskID = id;


var confirmPopup = $ionicPopup.confirm({
                         title: '',
                         template: 'Do you want to mark this task incomplete again ?'
                       });

                       confirmPopup.then(function(res) {
                         if(res) {
                           $scope.url = AmsConstants.url_hrms_task+'updateTaskStatus';
                                var envelope = {"_id":taskID,"completed":false};
                                $scope.loader = true;
                                setTimeout(function(){
                                   ConnectivityService.PostData_post($scope.url,envelope)
                                   .then(function(response) {
                                   console.log(response);
                                   //refreshtask();
                                    InitRefreshTask();
                                   $scope.loader = false;
                                   },
                                   function(data) {
                                                  $scope.loader = false;
                                                  console.log("error");
                                                  window.plugins.toast.showLongBottom('Failed to mark this task incomplete.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});

                                                  //$scope.emp_list = false;
                                                  //$scope.norecords = true;
                                                });
                                   },200);
                         } else {
                           console.log('canceled !');
                         }
                       });



};

$scope.doRefresh = function() {

                console.log('Refreshing!');
                InitRefreshTask();
                /*$timeout( function() {

            $scope.loader = false;
                    InitRefreshTask();

                  $scope.$broadcast('scroll.refreshComplete');

                }, 100);*/

              };




$scope.showActionToast = function() {
    var toast = $mdToast.simple()
      .textContent('Marked as read')
      .action('UNDO')
      .highlightAction(true)
      .highlightClass('md-accent')// Accent is used by default, this just demonstrates the usage.
      .position(pinTo);

    $mdToast.show(toast).then(function(response) {
      if ( response == 'ok' ) {
        alert('You clicked the \'UNDO\' action.');
      }
    });
  };

$scope.CheckLeaveResponse = function(list){//,type,id,id_comoff,title,description
//console.log(list);
var type = list.type;
if(type == "task type"){
localStorage.setItem("completedTaskR",JSON.stringify(list));
$ionicViewSwitcher.nextTransition('none');
$state.go("taskPopUp");

}
else if(type == "Expense"){
var id = list.expenseid;
var url_getExpense = AmsConstants.url_onBoard +'expenses/getExpenseById?_id='+id;

$scope.loader = true;
 setTimeout(function(){

 ConnectivityService.PostData(url_getExpense)
     .then(function(response) {
     localStorage.setItem("STATUS_NOTIFY",list.status);
     localStorage.setItem("expenseR",JSON.stringify(response));
     $ionicViewSwitcher.nextTransition('none');
     $state.go("taskExpense");
     $scope.loader = false;

     },
     function(data) {
       $scope.loader = false;
       console.log("error");
     });
 },200);
}
else if(type == "Compoff"){
var id_comoff = list.compOffId;
var url_comoff = AmsConstants.url_hrms_lms+'getCompoffID?org='+AmsValues.HRMS_orgId+'&compOffid='+id_comoff ;

console.log($scope.url);
            $scope.loader = true;
            setTimeout(function(){
               ConnectivityService.PostData(url_comoff)
               .then(function(response) {
               console.log(response);
               $window.localStorage.setItem("CompOffResponse",JSON.stringify(response));
               $window.localStorage.setItem("CompOffID",JSON.stringify(id_comoff));
               if(response.length){
                $ionicViewSwitcher.nextTransition('none');
                $state.go("ConfirmCompOff");
                $scope.loader = false;
               }
               else{
               //alert("ComOff completed");
               $scope.loader = false;
               }
               },
               function(data) {
                              $scope.loader = false;
                              console.log("error");
                              return false;
                              //$scope.emp_list = false;
                              //$scope.norecords = true;
                            });
               },200);


}

//else(type.match(/\s/g)){
else{
var id = list.leaveid;
        //var titleLeave = type.split(" ")[0];
         $scope.url = AmsConstants.url_hrms_lms+'getLeaveByID?org='+AmsValues.HRMS_orgId+"&leaveid="+id;
            //$scope.url = 'http://192.168.100.40:1339/lms/getLeaveByID?org=adnate&leaveid='+id;
            console.log($scope.url);
            $scope.loader = true;
            setTimeout(function(){
               ConnectivityService.PostData($scope.url)
               .then(function(response) {
               console.log(response);
               $window.localStorage.setItem("leaveResponse",JSON.stringify(response));
               if(response.length != null || response.length == 'undefined'){
                $ionicViewSwitcher.nextTransition('none');
                $state.go("ConfirmTask");
                //$scope.loader = false;
               }
               $scope.loader = false;
               },
               function(data) {
                              $scope.loader = false;
                              console.log("error");
                              return false;
                              //$scope.emp_list = false;
                              //$scope.norecords = true;
                            });
               },200);


    }

};

function InitRefreshTask(){

var view = 0;
var sort = "lastModified";
var tasktype = 'All';
var priority = 'All';
var status = 'All';
//var perPage = 4;
//var page = 1;
var completed;
$scope.categoryCountINC = "";
$scope.categoryCountC = "";
if($scope.selectedTab1 == 1){

completed = 1;
}
else{
completed = 0;
}
refreshtask(view,sort,tasktype,priority,completed,status);//view,sort,tasktype,priority,perPage,page
};
var assign_members = [];

$scope.getMembersAssign = function(list){
assign_members.length = 0;
angular.forEach(list,function(value,key){
assign_members.push(value.name);
});
//alert(assign_members.toString());
return assign_members.toString();
}


function refreshtask(view,sort,tasktype,priority,completed,status){
incomplete.length = 0;$scope.completed.length = 0;taskCompleted.length = 0;taskRunning.length = 0;
$scope.url = AmsConstants.url_hrms_task+'getTasks?org='+AmsValues.HRMS_orgId+'&user='+AmsValues.HRMS__id+'&sortOrder=-1&view='+view+'&sort='+sort+'&tasktype='+tasktype+'&priority='+priority+'&completed='+completed;
                      $scope.loader = true;
                      setTimeout(function(){
                         ConnectivityService.PostData($scope.url)
                         .then(function(response) {
                         $scope.task_detail = response;
                         angular.forEach(response,function(value,key){
                         if(value.completed == false){
                         taskRunning.push(value);
                         }
                         else{
                         taskCompleted.push(value);
                         }


                         });
                         $window.localStorage.setItem("taskResponse",JSON.stringify(response));
                         taskFilter_response.push(response);
                         //$scope.noMoreItemsAvailable = false;
                         if($scope.selectedTab1 == 0 || $scope.selectedTab1 == undefined){
                         $scope.ShowfilterTask = true;
                         $scope.ShowfilterComp = false;
                         $scope.selectedTab1 == 0;
                         if(response.length == 0){
                            $scope.showTaskPending = false;
                            $scope.showTaskTiles = false;
                            $scope.showTaskCompleteTiles = false;
                            $scope.norecords = true;
                            $('.norecords').html("<center><p>No Task Pending.</p></center>");
                         }
                         else{

                           $scope.task_detail_Running = taskRunning;
                           //console.log($scope.task_detail_Running);
                            $scope.showTaskPending = true;
                            $scope.showTaskComplete = false;
                            $scope.showTaskTiles = false;
                            $scope.showTaskCompleteTiles = false;
                            $scope.norecords = false;
                            $('.norecords').html("");
                         }
                         }
                         else{
                            $scope.ShowfilterTask = false;
                            $scope.ShowfilterComp = true;
                            $scope.selectedTab1 == 1;
                            if(response.length == 0){
                                 $scope.showTaskPending = false;
                                 $scope.showTaskComplete = false;
                                 $scope.showTaskTiles = false;
                                 $scope.showTaskCompleteTiles = false;
                                 $scope.norecords = true;
                                 $('.norecords').html("<center><p>No Task Pending.</p></center>");
                            }
                            else{

                            $scope.task_detail_Completed = taskCompleted;
                           // console.log($scope.task_detail_Completed);
                              $scope.showTaskPending = false;
                              $scope.showTaskComplete = true;
                              $scope.showTaskCompleteTiles = false;
                              $scope.showTaskTiles = false;
                              $scope.norecords = false;
                              $('.norecords').html("");
                            }
                         }



                          $scope.loader = false;
                         },
                         function(data) {
                                        $scope.loader = false;

                                        var status = navigator.onLine;
                                         if (status) {
                                             console.log("internet is there..");
                                         }
                                         else{
                                              $scope.norecords = true;
                                              $('.norecords').html("<center><p>Please check your internet connection.</p><p>Click to refresh.</p></center>");
                                              return false;
                                         }

                         });
                                      },200);

};
/*$(window).scroll(function() {
       if($(window).scrollTop() + window.innerHeight == $(document).height()) {
           alert("bottom!");
       }
    });*/
/*$scope.swipeTask = function() {

if($(window).scrollTop() + window.innerHeight == $(document).height()) {
          setTimeout(function(){
          LoadMoreFromQuery();
          },2);

       }

  };
$scope.swipeFilterTask = function(last) {
var complete = 0;
   if($(window).scrollTop() + window.innerHeight == $(document).height()) {
            setTimeout(function(){
              LoadMoreFromFilterQuery(complete);
             },2);
          }

  };

$scope.swipeFilterComp = function(last) {
var complete = 1;
    if($(window).scrollTop() + window.innerHeight == $(document).height()) {
                setTimeout(function(){
                  LoadMoreFromFilterQuery(complete);
                 },2);
              }


  };*/

$scope.showFilterBySearch = function(){
localStorage.setItem("ActiveTab",0);
//alert($scope.categoryCountINC);
if($scope.categoryCountINC == ""){
localStorage.setItem("filtercount",0);
}
else{
localStorage.setItem("filtercount",1);
}
$ionicViewSwitcher.nextTransition('none');
$state.go("taskFilter");
};
/*$scope.showFilter = function(){
$scope.showFilterCategory = true;
$scope.showTaskTiles = false;
};

$scope.closeFilterBySearch = function(){

};*/
$scope.showFilterCompleted = function(){
localStorage.setItem("ActiveTab",1);
if($scope.categoryCountC == ""){
localStorage.setItem("filtercount",0);
}
else{
localStorage.setItem("filtercount",1);
}
$ionicViewSwitcher.nextTransition('none');
$state.go("taskFilter");
};
$scope.showFilterC = function(){
$scope.showFilterCategoryC = true;
$scope.showTaskCompleteTiles = false;
};
$scope.closeFilterComp = function(){

};



$scope.RatingPopUp = function(list){
//alert("rate it");
localStorage.setItem("listRating",list._id);
if(list.rating){$scope.project.PRating = list.rating;}
else{$scope.project.PRating = 0;}
   $('.dimRate').css("display","block");

};
$scope.closeRating = function(){
   $('.dimRate').css("display","none");
};




$scope.searchTaskComp = function(filterValue,Value){
$scope.showFilterCategoryC = false;
$scope.showTaskCompleteTiles = true;
localStorage.setItem("FilterText",filterValue);
localStorage.setItem("FilterValue",Value);
filterarray.length = 0;taskCompletedFilter.length = 0;
console.log(filterValue +"======="+ Value);
var view;
var sort;
var tasktype;
var priority;
var perPage = 4;
var page = 1;

if(filterValue == 'View' && Value == 1){
view = 1;sort = 'lastModified';tasktype = 'All';priority = 'All';
}
else if(filterValue == 'View' && Value == 2){
view = 2;sort = 'lastModified';tasktype = 'All';priority = 'All';
}
else if(filterValue == 'Sort' && Value=='duedate'){
  sort = 'duedate';view = 0;tasktype = 'All';priority = 'All';
}
else if(filterValue == 'task' && Value=='task'){
tasktype = 'task';view = 0;sort = 'lastModified';priority = 'All';
}
else if(filterValue == 'task' && Value=='leave'){
tasktype = 'leave';view = 0;sort = 'lastModified';priority = 'All';
}
else if(filterValue == 'task' && Value=='compoff'){
tasktype = 'compensatory';view = 0;sort = 'lastModified';priority = 'All';
}
else if(filterValue == 'priority' && Value=='High'){
priority = 'High';view = 0;sort = 'lastModified';tasktype = 'All';
}
else if(filterValue == 'priority' && Value=='Low'){
priority = 'Low';view = 0;sort = 'lastModified';tasktype = 'All';
}
else if(filterValue == 'priority' && Value=='Medium'){
priority = 'Medium';view = 0;sort = 'lastModified';tasktype = 'All';
}
else{
view = 0;sort = 'lastModified';tasktype = 'All';priority = 'All';
}
/*else{
view = '0';sort = 'lastModified';tasktype = 'All';priority = 'All';
}*/


/*else if(filterValue == 'assignon'){
sort = 'assignon';
}
else{
sort = 'sort';
}*/
var TaskCFilter_URL = $scope.url = AmsConstants.url_hrms_task+'getTasks?org='+AmsValues.HRMS_orgId+'&user='+AmsValues.HRMS__id+'&sortOrder=-1&view='+view+'&sort='+sort+'&tasktype='+tasktype+'&priority='+priority+'&completed=1';
console.log(TaskCFilter_URL);
$scope.loader = true;
setTimeout(function(){
ConnectivityService.PostData(TaskCFilter_URL)
 .then(function(response) {
 angular.forEach(response,function(value,key){
     taskCompletedFilter.push(value);
    });
  if(response.length == 0){
  $scope.showTaskCompleteTiles = false;
  $scope.norecords = true;
  $('.norecords').html("<center><p>No records found.</p></center>");
  $('#dimSeacrhComp').css("display","none");
  }
  else{
  $scope.task_Filter_Comp = taskCompletedFilter;
  $scope.showTaskCompleteTiles = true;
  $scope.norecords = false;
  $('.norecords').html("");
  $('#dimSeacrhComp').css("display","none");
  }
  $scope.loader = false;
 },
 function(jqxhr) {
    $scope.loader = false;
 });
 },200);

};

/*var IncreasePageCountFilter = 1;
$scope.loadMoreTaskWithFilter = function() {
 var view = 0;var sort = 'assignon';var tasktype = 'All';var priority = "";
 var perPage = 4;
 IncreasePageCountFilter = IncreasePageCountFilter + 1;//alert(IncreasePageCount);
LoadMoreFromQueryFilter(view,sort,tasktype,priority,perPage,IncreasePageCount);

};*/

$scope.cancel = function() {
      $mdDialog.cancel();
    };
$scope.filterFunction = function(element) {
     return element.name.match(/^Ma/) ? true : false;
 };
 $rootScope.$on("CallParentMethod", function(){
            //refreshtask();
            InitRefreshTask();
         });
 $rootScope.$on("CallParentfilterEmpty", function(event,data){
 console.log(data);
 if(data == 0){
 if(localStorage.getItem("ActiveTab") == 0){
 $scope.selectedTab1 = 0;
 $scope.categoryCountINC = "";
 InitRefreshTask();
  }
  else{
  $scope.selectedTab1 = 1;
$scope.categoryCountC = "";
InitRefreshTask();
  }
 }

 });


$rootScope.$on('CallParentfilter', function(event, data) {
    taskRunningFilter.length = 0;taskCompletedFilter.length=0;
    if(localStorage.getItem("ActiveTab") == 0){
    $scope.selectedTab1 = 0;
    $scope.categoryCountINC = data.para2;
    angular.forEach(data.para1,function(value,key){
        taskRunningFilter.push(value);
        });
        $scope.task_Filter_Running = taskRunningFilter;
        console.log($scope.task_Filter_Running);
        $scope.showTaskTiles = true;
        $scope.showTaskPending = false;
        $scope.showTaskComplete = false;
        $scope.norecords = false;
        $('.norecords').html("");
    }
    else{
    $scope.selectedTab1 = 1;
    $scope.categoryCountC = data.para2;
    angular.forEach(data.para1,function(value,key){
            taskCompletedFilter.push(value);
            });
            $scope.task_Filter_Comp = taskCompletedFilter;
            console.log($scope.task_Filter_Comp);
            $scope.showTaskCompleteTiles = true;
            $scope.showTaskTiles = false;
            $scope.showTaskPending = false;
            $scope.showTaskComplete = false;
            $scope.norecords = false;
            $('.norecords').html("");
    }


});
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

   $scope.comments = function(id){
   $window.localStorage.setItem("CommentTaskID",id);
   $ionicViewSwitcher.nextTransition('none');
   $state.go("comments");
   };
$scope.RatingSave = function(list){
//console.log(list);
if(list.type == 'task type'){
localStorage.setItem("completedTaskR",JSON.stringify(list));
$ionicViewSwitcher.nextTransition('none');
$state.go('completeTaskPopUP');
}
else if(list.type == "Compoff"){
var url_comoff = AmsConstants.url_hrms_lms+'getCompoffID?org='+AmsValues.HRMS_orgId+'&compOffid='+list.compOffId ;

            $scope.loader = true;
            setTimeout(function(){
               ConnectivityService.PostData(url_comoff)
               .then(function(response) {
               console.log(response);
               $window.localStorage.setItem("CompOffResponse",JSON.stringify(response));
               $window.localStorage.setItem("CompOffID",JSON.stringify(list.compOffId));
               if(response.length){
                $ionicViewSwitcher.nextTransition('none');
                $state.go('ConfirmCompOffDetails');
                $scope.loader = false;
               }
               else{
               //alert("ComOff completed");
               $scope.loader = false;
               }
               },
               function(data) {
                              $scope.loader = false;
                              console.log("error");
                              return false;
                              //$scope.emp_list = false;
                              //$scope.norecords = true;
                            });
               },200);

}
else if(list.type == 'Expense'){
$scope.urlExpense = AmsConstants.url_onBoard+'expenses/getExpenseById?_id='+list.expenseid;
            //$scope.url = 'http://192.168.100.40:1339/lms/getLeaveByID?org=adnate&leaveid='+id;
           // console.log($scope.url);
            $scope.loader = true;
            setTimeout(function(){
               ConnectivityService.PostData($scope.urlExpense)
               .then(function(response) {
               //console.log(response);
               localStorage.setItem("STATUS_NOTIFY",list.status);
               localStorage.setItem("expenseR",JSON.stringify(response));
               $ionicViewSwitcher.nextTransition('none');
               $state.go("taskExpense");

               $scope.loader = false;
               },
               function(data) {
                              $scope.loader = false;
                              console.log("error");
                              return false;
                              //$scope.emp_list = false;
                              //$scope.norecords = true;
                            });
               },200);
}

else{

$scope.url = AmsConstants.url_hrms_lms+'getLeaveByID?org='+AmsValues.HRMS_orgId+"&leaveid="+list.leaveid;
            //$scope.url = 'http://192.168.100.40:1339/lms/getLeaveByID?org=adnate&leaveid='+id;
            console.log($scope.url);
            $scope.loader = true;
            setTimeout(function(){
               ConnectivityService.PostData($scope.url)
               .then(function(response) {
               console.log(response);
               $window.localStorage.setItem("leaveResponse",JSON.stringify(response));
               if(response.length != null || response.length == 'undefined'){
                $ionicViewSwitcher.nextTransition('none');
                $state.go('ConfirmTaskDetails');
                //$scope.loader = false;
               }
               $scope.loader = false;
               },
               function(data) {
                              $scope.loader = false;
                              console.log("error");
                              return false;
                              //$scope.emp_list = false;
                              //$scope.norecords = true;
                            });
               },200);

}

};






$scope.saveRating = function(rating){
//alert(rating)
if(rating == 0){
var alertPopup = $ionicPopup.alert({
 title: "Rating",
 template: "Please select rating stars."
 });
 alertPopup.then(function(res) {
 console.log('ionic alert');
 });
}
else{
$('.dimRate').css("display","none");
                       $scope.url = AmsConstants.url_hrms_task+"updateTaskStatus";
                       var CompletedTaskR= localStorage.getItem("listRating");
                       var envelope = {"_id":CompletedTaskR,"rating":rating};
                       $scope.loader = true;
                       setTimeout(function(){
                                  ConnectivityService.PostData_post($scope.url,envelope)
                                  .then(function(response) {
                                        console.log(response);
                                        $scope.loader = false;
                                        window.plugins.toast.showLongBottom('Task rating updated successfully.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});

                                        $rootScope.$emit("CallParentMethod", function(){

                                         });
                                         //$ionicViewSwitcher.nextTransition('none');
                                         //$state.go("task");

                                        },
                                        function(data) {
                                        $scope.loader = false;
                                        console.log("error");

                                        });
                                  },200);
}

};


$scope.hovereffect = function(priority){
if(priority == 3){
$("#highP").css("display", "block");
$("#mediumP").css("display", "none");
$("#lowP").css("display", "none");
$scope.priorityV = "High priority";

}
else if(priority == 2){
$("#mediumP").css("display", "block");
$("#highP").css("display", "none");
$("#lowP").css("display", "none");
$scope.priorityV = "Medium priority";
}
else if(priority == 1){
$("#lowP").css("display", "block");
$("#mediumP").css("display", "none");
$("#highP").css("display", "none");
$scope.priorityV = "Low priority";
}
else{
$("#highP").css("display", "none");
$("#mediumP").css("display", "none");
$("#lowP").css("display", "none");
}

}
$scope.getListHeight = function() {
                   //console.log({height: '' + ($window.innerHeight - 130) + 'px'});
                   return {height: '' + ($window.innerHeight - 130) + 'px'};
                 };
                 $window.addEventListener('resize', onResize);
                 function onResize() {
                   $scope.$digest();
                 }
                 $scope.$on('$destroy', function() {
                   $window.removeEventListener('resize', onResize);
                 });

});

Module_task.controller('taskFilter_controller', function($scope,$mdToast,AmsValues,$timeout,AmsConstants,MenuList,StoreResponse, $mdSidenav,$ionicPopup,$state,$http,$window,$mdDialog,$ionicViewSwitcher,ConnectivityService,$rootScope,$ionicPlatform,$ionicPopup,$ionicHistory) {

var filterarray = [];
var category = [];
var taskRunningFilter = [];
var taskCompletedFilter = [];
$scope.initTaskFilter = function(){
$scope.showSearchbarFilterOpen = false;
$scope.showFilterCategory = true;
$scope.showFilterCategoryC = true;
$scope.showPlusV = true;
$scope.showMinusV = false;

$scope.showPlusS = true;
$scope.showMinusS = false;
$scope.showPlusT = true;
$scope.showMinusT = false;
$scope.showPlusST = true;
$scope.showMinusST = false;
$scope.showPlusP= true;
$scope.showMinusP = false;
$scope.showView = false;
$scope.showSortBy = false;
$scope.showTask = false;
$scope.showStatus = false;
$scope.showPriority = false;

if(localStorage.getItem("filtercount") == 0){
$(".checkFilterT").prop("checked", false);
$(".checkFilterV").prop("checked", false);
$(".checkFilterS").prop("checked", false);
$(".checkFilterST").prop("checked", false);
$(".checkFilterP").prop("checked", false);
}
else{
angular.forEach(JSON.parse(localStorage.getItem("categoryFilter")),function(value,key){
var checkBoxID = value.Value;
//$('.checkFilterT').not('#'+checkBoxID).prop('checked', false);
$('#'+checkBoxID).prop('checked', true);
});
}

};

$scope.clearALLFilter = function(){
$('.taskFilter').find('input[type=checkbox]:checked').removeAttr('checked');
}


$scope.searchTaskTiles = function(){
category.length = 0;
var view = 0;
var sort = 'lastModified';
var tasktype = 'All';
var priority = 'All';
var status = 'All';
var complete = localStorage.getItem("ActiveTab");
var checked = $(".taskFilter input:checked").length > 0;
  if (!checked){
  window.plugins.toast.showLongBottom("Please select one or more search category.", function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
      //alert("Please select one or more search category.");
      return false;
  }

  else
  {

     $('.taskFilter input:checked').each(function () {
       //presentArray.push( $(this).attr('value') );
       var tmpCat = {
       filterValue : $(this).attr('value'),
       Value : $(this).attr('id')
       };
       category.push(tmpCat);
     });

     filterarray.length = 0;taskRunningFilter.length = 0;taskCompletedFilter.length = 0;

     angular.forEach(category,function(value,key){
        if(value.filterValue == 'View'){
            if(value.Value == 1){
            view = 1;
            }
            else if(value.Value == 2){
            view = 2;
            }
            else{
            view = 0;
            }
        }

        if(value.filterValue == 'Sort'){
        if(value.Value == 'duedate'){
        sort = 'duedate';
          }
          else if(value.Value == 'lastModified'){
          sort = 'lastModified';
          }
          else if(value.Value == 'assignon'){
          sort = 'assignon';
          }
          else{
          sort = 'lastModified';
          }
        }

        if(value.filterValue == 'task'){
        if(value.Value == 'task'){
        tasktype = 'task';
        }
        else if(value.Value == 'leave'){
        tasktype = 'leave'
        }
        else if(value.Value == 'compoff'){
        tasktype = 'compensatory'
        }
        else{
        tasktype = 'All';
        }
        }
        if(value.filterValue == 'status'){
                if(value.Value == 'pending'){
                status = 'pending';
                }
                else if(value.Value == 'overdue'){
                status = 'overdue'
                }
                else if(value.Value == 'ongoing'){
                status = 'ongoing'
                }
                else{
                status = 'All';
                }
        }


        if(value.filterValue == 'priority'){
        if(value.Value == 'High'){
        priority = 'High';
        }
        else if(value.Value == 'Medium'){
        priority = 'Medium';
        }
        else if(value.Value == 'Low'){
        priority = 'Low';
        }
        }
     });


//$state.go('task').then(function() {
  var TaskFilter_URL = $scope.url = AmsConstants.url_hrms_task+'getTasks?org='+AmsValues.HRMS_orgId+'&user='+AmsValues.HRMS__id+'&sortOrder=-1&view='+view+'&sort='+sort+'&tasktype='+tasktype+'&priority='+priority+'&completed='+complete;
  console.log(TaskFilter_URL);
  $scope.loader = true;
  setTimeout(function(){
  ConnectivityService.PostData(TaskFilter_URL)
   .then(function(response) {
   angular.forEach(response,function(value,key){
   if(complete == 0){

   taskRunningFilter.push(value);
   }
   else if(complete == 1){
   //localStorage.setItem("categoryFilter",JSON.stringify(category));
    taskCompletedFilter.push(value);
   }
   else{
   console.log("no records..");
   }

      //taskCompletedFilter.push(value);
     });

    if(response.length == 0){
    $scope.loader = false;
    angular.forEach(category,function(value,key){
    var checkBoxID = value.Value;
    $('#'+checkBoxID).prop('checked', false);
    });
    window.plugins.toast.showLongBottom('No records found.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
    return false;
    }

    else{
    if(complete == 0){
    localStorage.setItem("categoryFilter",JSON.stringify(category));
    $rootScope.$broadcast('CallParentfilter',{para1 :taskRunningFilter ,para2 :category.length});
    $ionicViewSwitcher.nextTransition('none');
    $state.go("task");
    }
    else{
    localStorage.setItem("categoryFilter",JSON.stringify(category));
    $rootScope.$broadcast('CallParentfilter',{para1 :taskCompletedFilter ,para2 :category.length});
    $ionicViewSwitcher.nextTransition('none');
    $state.go("task");
    }
    $scope.loader = false;
    }
   $scope.loader = false;
    //$state.reload();
   },
   function(jqxhr) {
      $scope.loader = false;
   });
   },200);

 // });

}

};

$scope.closeFilter = function(){

var checked = $(".taskFilter input:checked").length > 0;
  if (!checked){
  $rootScope.$broadcast('CallParentfilterEmpty',0);
     $state.go("task");
  }
  else{

  $state.go("task");
  }

//$ionicHistory.goBack();
};

$scope.checkboxV = function(obj){
var target = angular.element(obj.currentTarget);
var checkBoxID = target.attr('id');
$('.checkFilterV').not('#'+checkBoxID).prop('checked', false);
};
$scope.checkboxS = function(obj){
var target = angular.element(obj.currentTarget);
var checkBoxID = target.attr('id');
$('.checkFilterS').not('#'+checkBoxID).prop('checked', false);
};
$scope.checkboxT = function(obj){
var target = angular.element(obj.currentTarget);
var checkBoxID = target.attr('id');
$('.checkFilterT').not('#'+checkBoxID).prop('checked', false);
};
$scope.checkboxST = function(obj){
var target = angular.element(obj.currentTarget);
var checkBoxID = target.attr('id');
$('.checkFilterST').not('#'+checkBoxID).prop('checked', false);
};

$scope.checkboxP = function(obj){
var target = angular.element(obj.currentTarget);
var checkBoxID = target.attr('id');
$('.checkFilterP').not('#'+checkBoxID).prop('checked', false);
};



});

