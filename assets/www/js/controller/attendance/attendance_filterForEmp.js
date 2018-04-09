

Module_attendance.controller('attendance_filterForEmp', function($scope,$ionicHistory,$stateParams,$timeout,AmsValues,AmsConstants,MenuList,StoreResponse, $mdSidenav,$ionicPopup,$state,$http,$window,$mdDialog,$ionicViewSwitcher,ConnectivityService,$rootScope) {

var from,to;
$scope.EmpReportDetails = JSON.parse($stateParams.data);console.log($scope.EmpReportDetails);
$scope.EmpName = $scope.EmpReportDetails.name;
$scope.data_Value1 = $stateParams.data1;
$scope.init = function(){
try{
$scope.split_Month_Year = $scope.data_Value1.split('-');
if($scope.split_Month_Year.length == 2){
from = new Date($scope.split_Month_Year[1], parseInt($scope.split_Month_Year[0])-1,1 ).toISOString();
to = new Date($scope.split_Month_Year[1], parseInt($scope.split_Month_Year[0]),0 ).toISOString();
}
else{
from = new Date(new Date($scope.split_Month_Year[2]+'-'+$scope.split_Month_Year[1]+'-'+$scope.split_Month_Year[0]).setHours(0,0,0,0)).toISOString();
to = new Date(new Date($scope.split_Month_Year[2]+'-'+$scope.split_Month_Year[1]+'-'+$scope.split_Month_Year[0]).setHours(23,59,59,999)).toISOString();
}
initializeAgain();
}
catch(er){
console.log(er.message);
}

};


function initializeAgain(){
$scope.url = AmsConstants.url_hrms_attendance+'myAttendance?uId='+$scope.EmpReportDetails._id+'&from='+from+'&to='+to;
$scope.loader = true;
 setTimeout(function(){
ConnectivityService.PostData($scope.url)
     .then(function(response) {
     if(response != undefined && response.length > 0){
     $scope.attendance = response;//console.log($scope.attendance);
     $scope.showrecords = true;
     $scope.norecords = false;
     $('.norecords').html("");
     }
     else{
     $scope.showrecords = false;
     $scope.norecords = true;
     $('.norecords').html('<center><h3>No records found.</h3></center>');
     }

     $scope.loader = false;
     },
     function(data) {
     console.log(data);
        $scope.loader = false;

        var status = navigator.onLine;
        if (status) {
            $scope.showrecords = true;
            $scope.norecords = false;
           console.log("internet is there..");
        }
        else{
            $scope.showrecords = false;
            $scope.norecords = true;
           $('.norecords').html("<center><p>Please check your internet connection.</p><p>Pull to refresh.</p></center>");
        }

     });



 },200);
};

$scope.getDetails = function(list){
var response = list;
var tmpdt = new Date(response.today);
var mm = tmpdt.getMonth();
var yy = tmpdt.getFullYear();
var dd = tmpdt.getDate();
//localStorage.setItem("ResponseDetails",JSON.stringify(response));
$ionicViewSwitcher.nextTransition('none');
$state.go("attendance_details",{data :JSON.stringify(list) });

};

$scope.close =function(){
$ionicHistory.goBack();
};


 $scope.doRefresh = function() {

                 console.log('Refreshing!');
                 $timeout( function() {
                   //simulate async response
             $scope.loader = false;
                     initializeAgain();
                   //Stop the ion-refresher from spinning
                   $scope.$broadcast('scroll.refreshComplete');

                 }, 100);

               };
});

//https://hrms.procfactory.com/attendances/myAttendance?uId=5911c9ccaa8f1f13f02acba7&from=2018-03-19T18:30:00.000Z&to=2018-03-20T18:29:59.999Z

//https://hrms.procfactory.com/attendances/myAttendance?uId=598175f41201fa7ef0b166c8&from=2018-03-19T18:30:00.000Z&to=2018-03-20T18:29:59.999Z