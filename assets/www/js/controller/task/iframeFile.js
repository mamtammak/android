

Module_task.controller('iframeFile', function($scope,AmsConstants,$sce,$ionicPopup,$state,$http,$window,$mdDialog,$ionicViewSwitcher) {

$scope.AMS_URL = AmsConstants.url_onBoard;
var FileSource = JSON.parse(localStorage.getItem("URLforiframe"));
$scope.initUploads = function(){
if(FileSource.mime_type == 'pdf'){
var tmp_frame = "http://docs.google.com/gview?url="+$scope.AMS_URL+FileSource.url+"&embedded=true";
$scope.iframeURL = $sce.trustAsResourceUrl(tmp_frame);
}
else{
$scope.iframeURL = $sce.trustAsResourceUrl($scope.AMS_URL + FileSource.url);
}
}

});



