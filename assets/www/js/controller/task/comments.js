

Module_task.controller('comments_controller', function($scope,AmsConstants,AmsValues,MenuList,$timeout,$state,$http,$window,$ionicViewSwitcher,ConnectivityService,$rootScope,$ionicPopup,$ionicHistory) {

$scope.project = {addComments:""};
$scope.commentUser = 'img/commentuser.png';
$scope.norecords = false;
$scope.showrecords = false;
$scope.init = function(){
refreshComments();
};

$scope.cancelComment = function(){
//$ionicViewSwitcher.nextTransition('none');
//$state.go("task");
$ionicHistory.goBack();
};
var taskID = $window.localStorage.getItem("CommentTaskID");
function refreshComments(){
$scope.project = {addComments:""};
var commentURL = AmsConstants.url_hrms_task+'getNotes?_id='+taskID;
$scope.loader = true;
setTimeout(function(){
ConnectivityService.PostData(commentURL)
   .then(function(response) {
   if(response.length == 0 || response[0].candidate_notes.length == 0){
      $scope.norecords = true;
      $scope.showrecords = false;
      $('.norecords').html("<center><p>No comments added.</p></center>");
   }
   else{
      $scope.comments = response[0].candidate_notes;
      console.log($scope.comments);
      $scope.norecords = false;
      $scope.showrecords = true;
      $('.norecords').html("");
   }
   $scope.loader = false;
   },
   function(jqxhr) {
      var status = navigator.onLine;
      console.log(status);
      if (status) {
          $scope.norecords = false;
          $scope.showrecords = true;
          $('.norecords').html("");

      }
      else{
         $scope.norecords = true;
         $scope.showrecords = false;
         $('.norecords').html("<center><p>Please check your internet connection.</p><p>Pull to refresh.</p></center>");
      }
      $scope.loader = false;
   });
   },200);


}

$scope.saveComment = function(){
var today = new Date();
var Today_mm = today.getMonth()+1;
var Today_yy = today.getFullYear();
var Today_dd = today.getDate();
var comments_date = Today_yy +'-'+Today_mm +'-'+Today_dd;
var saveCommentURL = AmsConstants.url_hrms_task+'addNotes';
var envelope = {"_id":taskID,"comments":$scope.project.addComments,"commented_by":AmsValues.HRMS__id,"comments_date":comments_date};
if($scope.project.addComments == ""){
window.plugins.toast.showLongBottom('Please add comments.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
return false
}
else{
$scope.loader = true;
setTimeout(function(){
ConnectivityService.PostData_post(saveCommentURL,envelope)
   .then(function(response) {
    if(response == 'Inserted Sucessfully'){
    window.plugins.toast.showLongBottom('Comments added.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
    refreshComments();
    }
   $scope.loader = false;
   },
   function(jqxhr) {

      $scope.loader = false;
   });
   },200);
}

};

$scope.removeComment = function(id){
var deleteCommentURL = AmsConstants.url_hrms_task+'deleteNotes?_id='+taskID+'&noteid='+id;
$scope.loader = true;
setTimeout(function(){
ConnectivityService.PostData(deleteCommentURL)
   .then(function(response) {
    window.plugins.toast.showLongBottom('Comments deleted.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
    refreshComments();
   $scope.loader = false;
   },
   function(jqxhr) {

      $scope.loader = false;
   });
   },200);
};

$scope.showComments = function(item){
//console.log(item);

var alertPopup = $ionicPopup.alert({
      title: "Comments",
      template: item.comments
    });
    alertPopup.then(function(res) {
      console.log('ionic alert');
    });
};

$scope.doRefresh = function() {

                console.log('Refreshing!');
                $timeout( function() {
                  //simulate async response
                    $scope.loader = false;
                   refreshComments();
                  //Stop the ion-refresher from spinning
                  $scope.$broadcast('scroll.refreshComplete');

                }, 100);

   };
});




