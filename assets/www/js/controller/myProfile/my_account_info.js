

Module_myProfile.controller('my_acct_info_controller', function($scope,MenuList,BankValues,DetailValues, $mdSidenav,$ionicPopup,$state,$http,AmsConstants,AmsValues,$window,$mdDialog,ConnectivityService,$ionicViewSwitcher) {

$scope.Account_TYPE = MenuList.getAccountTYPE();
$scope.goBack = function(){
$ionicViewSwitcher.nextTransition('none');
$state.go("myProfileEdit");
};
$scope.project = {
Bname: BankValues.name,
accountType:BankValues.account_type,
accno:BankValues.account_number,
ifsc:BankValues.ifsc
};
$scope.init = function(){

};

$scope.UpdateProfile = function(){

$scope.url = AmsConstants.url_hrms +"updateProfile";

var Bname = $scope.project.Bname;
var accountType = $scope.project.accountType ;
var accno = $scope.project.accno;
var ifsc = $scope.project.ifsc ;
var bank_envelope = {
bank_name : Bname,
account_type : accountType,
account_number : accno,
IFSC : ifsc
};

$scope.envelope = {"email":AmsValues.HRMS_email,"reporting_to":DetailValues.reporting_to._id,"hr_manager":DetailValues.hr_manager._id,"bank_info":bank_envelope,"wd":DetailValues.workingDays._id,"wh":DetailValues.workingHours._id,"job_title":DetailValues.job_title._id,"dcode":DetailValues.department};
            $scope.loader = true;
            setTimeout(function(){
            ConnectivityService.PostData_post($scope.url,$scope.envelope)
                                        .then(function(response) {
                                        console.log(response);
                                        $scope.URL = AmsConstants.url_hrms +"getProfile/"+AmsValues.HRMS_email;
                                                    //$scope.loader = true;
                                                    setTimeout(function(){
                                                        ConnectivityService.PostData($scope.URL)
                                                        .then(function(response) {
                                                        $scope.emp_p = response;console.log($scope.emp_p);
                                                        angular.forEach($scope.emp_p, function(value, key){
                                                        //if(value.emergency_info != null){
                                                        BankValues.ifsc = value.bank_info.IFSC;
                                                        BankValues.account_number = value.bank_info.account_number;
                                                        BankValues.account_type = value.bank_info.account_type;
                                                        BankValues.name = value.bank_info.bank_name;
                                                                         //}
                                                        });
                                                        window.plugins.toast.showLongBottom('Employee details updated.', function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
                                                        $state.reload();
                                                        $scope.loader = false;

                                                                        },
                                                                        function(data) {
                                                                            $scope.loader = false;

                                                                        });
                                                                        },200);
                                                        //}

                                        $scope.loader = false;
                                        },
                                        function(data) {
                                        $scope.loader = false;
                                          console.log("error");
                                        });
            },200);

};



});




