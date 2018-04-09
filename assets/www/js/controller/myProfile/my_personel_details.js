

Module_myProfile.controller('myPersonalDetails_controller', function($scope, PersonelValues,DetailValues,MenuList,$timeout, $mdSidenav,$ionicPopup,$state,$http,AmsConstants,AmsValues,$window,$mdDialog,ConnectivityService,$ionicViewSwitcher) {


$scope.marital = MenuList.getMaritalStatus();

$scope.gender = MenuList.getGender();
$scope.goBack = function(){
$ionicViewSwitcher.nextTransition('none');
$state.go("myProfileEdit");
};

$scope.project = {
myDate:new Date(PersonelValues.dob),
mobno: PersonelValues.mobile,
landlineno : Number(PersonelValues.landline),
mStatus:PersonelValues.marital_status,
gender : PersonelValues.gender,
city:PersonelValues.city,
state:PersonelValues.state,
country:PersonelValues.country,
postcode:PersonelValues.postal_code,
address:PersonelValues.address
};

$scope.init = function(){


};

$scope.UpdateProfile = function(){

$scope.url = AmsConstants.url_hrms +"updateProfile";

var date = moment($scope.project.myDate).format("YYYY-MM-DD");
var mobno = $scope.project.mobno ;
var landlineno = $scope.project.landlineno;
var mStatus = $scope.project.mStatus ;
var gender = $scope.project.gender ;
var city = $scope.project.city;
var state = $scope.project.state;
var country = $scope.project.country ;
var postcode = $scope.project.postcode;
var address = $scope.project.address;

var personel_value = {
address :address,
city : city,
country :country,
postal_code :postcode,
dob:date,
gender : gender,
landline : landlineno,
marital_status :mStatus,
state:state,
mobile : mobno
};
$scope.envelope = {"email":AmsValues.HRMS_email,"reporting_to":DetailValues.reporting_to._id,"hr_manager":DetailValues.hr_manager._id,"personal_info":personel_value,"wd":DetailValues.workingDays._id,"wh":DetailValues.workingHours._id,"job_title":DetailValues.job_title._id,"dcode":DetailValues.department};
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
                                                                                                PersonelValues.address = value.personal_info.address;
                                                                                                                 PersonelValues.city = value.personal_info.city;
                                                                                                                 PersonelValues.country = value.personal_info.country;
                                                                                                                 PersonelValues.postal_code = value.personal_info.postal_code;
                                                                                                                 PersonelValues.dob = value.personal_info.dob;
                                                                                                                 PersonelValues.gender = value.personal_info.gender;
                                                                                                                 PersonelValues.landline = value.personal_info.landline;
                                                                                                                 PersonelValues.marital_status = value.personal_info.marital_status;
                                                                                                                 PersonelValues.state = value.personal_info.state;
                                                                                                                 PersonelValues.mobile = value.personal_info.mobile;
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
                                        $scope.loader = false;
                                        },
                                        function(data) {
                                        $scope.loader = false;
                                          console.log("error");
                                        });
            },200);

};



});




