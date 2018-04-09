

Module_attendance.controller('emp_attd_controller', function($scope,AmsValues,AmsConstants,MenuList,StoreResponse, $mdSidenav,$ionicPopup,$state,$http,$window,$mdDialog,$ionicViewSwitcher,ConnectivityService) {

$scope.close = function(){
$ionicViewSwitcher.nextTransition('none');
$state.go("attendance");
};

var presentArray = [];var JSON_ARRAY = [];
$scope.init = function(){
$scope.url = AmsConstants.url_hrms+'getEmployees?org='+AmsValues.HRMS_orgId;
 console.log($scope.url);
 $scope.loader = true;
 setTimeout(function(){

     ConnectivityService.PostData($scope.url)
     .then(function(response) {
     console.log(response);
     $scope.emp_details = response;
     $scope.loader = false;
     },
     function(jqxhr) {
      $scope.loader = false;
      });
  },200);
};



$scope.markPresent = function(){

$scope.url = AmsConstants.url_hrms_attendance+'attendance';
var checked = $("#emp_checkbox input:checked").length > 0;
      if (!checked){
           alert("Please select one or more employees");
            return false;
          }

      else
         {
          var text =  $('#emp_checkbox input:checked').each(function () {
            presentArray.push( $(this).attr('value') );
          });

          angular.forEach(presentArray,function(value,key){
          var envelopeJson = value.split('_id_');
          var today = new Date();
          var tmp = {"user":envelopeJson[1],"action":"In","organization":"adnate","branch":envelopeJson[0],"timestamp":today,"flag":"0"}
          JSON_ARRAY.push(tmp);
          });

          var envelope = {"user_records":JSON_ARRAY};
          console.log(envelope);
          $scope.loader = true;
                       setTimeout(function(){

                       ConnectivityService.PostData_post($scope.url,envelope)
                           .then(function(response) {
                           console.log(response);
                            window.plugins.toast.showLongBottom('Employee marked as present.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});

                            $scope.loader = false;
                           },
                           function(data) {
                           console.log(data);
                              $scope.loader = false;

                           });
                       },200);


          }



};
var clicked = false;
$scope.markall = function(){
$(".checkhour").prop("checked", !clicked);
  clicked = !clicked;

};


});

