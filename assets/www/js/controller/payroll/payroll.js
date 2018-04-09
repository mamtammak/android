

Module_payroll.controller('payroll_controller', function($scope,$mdToast,AmsValues,$timeout,AmsConstants,MenuList,StoreResponse, $mdSidenav,$ionicPopup,$state,$http,$window,$mdDialog,$ionicViewSwitcher,ConnectivityService,$rootScope,$ionicPlatform,$ionicPopup,$ionicHistory) {

$scope.showSearchbar = true;
$scope.hideSearchbar = false;
$scope.showSalaryS = true;
$scope.MyInvestmentBTN = false;
$scope.AddSalStructureBTN = false;
$scope.showMyInvestment = false;
$scope.loggedInUserName = AmsValues.HRMS_name;
$scope.USERID = AmsValues.HRMS__id;
$scope.USER_ROLE = AmsValues.HRMS_role;
//$scope.hrmsLogo = 'img/HRMS_LOGO_old.png';
$scope.OrganizationName = AmsValues.HRMS_orgName;
if(AmsValues.HRMS_orgLogo != ""){
 $scope.OrganisationLogo = AmsConstants.url_notify_web+AmsValues.HRMS_orgLogo;
}
else{
 $scope.OrganisationLogo = "img/brand_logo.png";
}
$scope.investmentIcon  = 'img/investmentIcon.png';
$scope.salaryStructIcon = 'img/salaryStructure.png'
$scope.selectedTabPayroll1 = 0;
var SalaryS = [];
//$scope.month = 0;
$scope.menuItem=MenuList.get();
$scope.LoggedinName = AmsValues.HRMS_name;
$scope.toggleLeft = function(menuId) {
$mdSidenav(menuId).toggle();
};
$scope.goToMenuItem = function(menuitem){
var page = StoreResponse.goToMenuItemPage(menuitem);
      $mdSidenav('leftPR').close()
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


$scope.init = function(){

if(AmsValues.HRMS_ProfilePic_thumbnail == "" || AmsValues.HRMS_ProfilePic_thumbnail == undefined){
    $scope.myface =  'img/ic_face_Profile.png';
}
else{
    $scope.myface =  AmsConstants.url_onBoard+AmsValues.HRMS_ProfilePic_thumbnail;
}
InitRefreshPayRoll();

};




function InitRefreshPayRoll(){
SalaryS.length = 0;
$scope.url_payroll = AmsConstants.url_payroll+'getStructures?org='+AmsValues.HRMS_orgId;

/*$scope.loader = true;
setTimeout(function(){
ConnectivityService.PostData($scope.url_payroll)
  .then(function(response) {
  console.log(response);*/


    if($scope.selectedTabPayroll1 == 0 || $scope.selectedTabPayroll1 == undefined){
    $scope.MyInvestmentBTN = false;
    $scope.loader = true;
    setTimeout(function(){
    ConnectivityService.PostData($scope.url_payroll)
      .then(function(response) {
      //console.log(response);
      //console.log("tab 1");
          if(AmsValues.HRMS_role == "HR" || AmsValues.HRMS_role == "ADM"){
          $scope.AddSalStructureBTN = true;
             $scope.salaryStructure = response;
             $scope.showSalaryS = true;
             $scope.showMyInvestment = false;
             $scope.norecords = false;

          }
          else{
          $scope.AddSalStructureBTN = false;
            angular.forEach(response,function(value,key){
            if(value.employee._id == AmsValues.HRMS__id){
              SalaryS.push(value);

            }
            else{
            console.log("no records found");
            }
            });
            if(SalaryS.length == 0){
            if(AmsValues.HRMS_role == "HR" || AmsValues.HRMS_role == "ADM"){
            $scope.AddSalStructureBTN = true;
            }
            else{
            $scope.AddSalStructureBTN = false;
            }
            $scope.norecords = true;
            $scope.showSalaryS = false;
            $scope.showMyInvestment = false;
            $('.norecords').html("<center><p>No records found.</p></center>");

            }
            else{
            $scope.salaryStructure = SalaryS;
            //console.log($scope.salaryStructure);
            $scope.norecords = false;
            $scope.showSalaryS = true;
            $scope.showMyInvestment = false;
            }

          }
          $scope.loader = false;
      },
      function(data) {
          $scope.loader = false;

      });
      },200);


    }

    else if($scope.selectedTabPayroll1 == 1){
    $scope.MyInvestmentBTN = true;
    $scope.AddSalStructureBTN = false;
    console.log("tab 2");
    myInvestmentG();
    }
    else{
    $scope.MyInvestmentBTN = false;
    $scope.AddSalStructureBTN = false;
    console.log("tab 3");
    }

  /*},
  function(data) {
    $scope.loader = false;

  });
  },200);*/
};

$scope.getStatus = function(status){
var STATUS;
if(status == false){STATUS = 'Inactive';}
else{STATUS = 'Active';}
return STATUS;
}
$scope.salary_struct = function(){
$scope.selectedTabPayroll1 == 0
if(AmsValues.HRMS_role == "HR" || AmsValues.HRMS_role == "ADM"){
  $scope.AddSalStructureBTN = true;
}
else{
 $scope.AddSalStructureBTN = false;
}
$scope.showSalaryS = true;
$scope.MyInvestmentBTN = false;
$scope.showMyInvestment = false;
$scope.showSalaryS = true;
console.log($scope.salaryStructure);

};

$scope.AddSalStructure = function(){
$ionicViewSwitcher.nextTransition('none');
$state.go("AddSalStructure");
};

$scope.investment = function(){
myInvestmentG();
};

$scope.payslip = function(){
//alert($scope.selectedTabPayroll1);
$scope.selectedTabPayroll1 = 2;
$scope.MyInvestmentBTN = false;
$scope.AddSalStructureBTN = false;
$scope.showSalaryS = false;
$scope.showMyInvestment = false;
//https://hrms.procfactory.com/payroll_details/getPayslip?employee=5926da9c54ca4d119879e333&status=done,done,done,done,done,done&org=adnateitsolutions
//https://hrms.procfactory.com/payroll_details/getPayslip?employee=all&status=done,done,done,done,done,done&org=adnate1
if(AmsValues.HRMS_role == 'ADM' || AmsValues.HRMS_role == 'HR'){
$scope.Url_PaySlip = AmsConstants.url_onBoard+'payroll_details/getPayslip?employee=all&status=done,done,done,done,done,done&org='+AmsValues.HRMS_orgId;
}
else{
$scope.Url_PaySlip = AmsConstants.url_onBoard+'payroll_details/getPayslip?employee='+AmsValues.HRMS__id+'&status=done,done,done,done,done,done&org='+AmsValues.HRMS_orgId;
}
//$scope.Url_PaySlip = AmsConstants.url_onBoard+'payroll_details/getPayslip?employee='+AmsValues.HRMS__id+'&status=done,done,done,done,done,done&org='+AmsValues.HRMS_orgId;
$scope.loader = true;
setTimeout(function(){
        ConnectivityService.PostData($scope.Url_PaySlip)
          .then(function(response) {
          console.log(response);
          if(response.length == 0){
            $scope.norecords = true;
            $('.norecords').html("<center><p>No records found.</p></center>");
            $scope.showSalaryS = false;
            $scope.showMyInvestment = false;
            $scope.showPayRoll = false;
          }
          else{
          $scope.payslip_value = response;
          $scope.showSalaryS = false;
          $scope.showMyInvestment = false;
          $scope.showPayRoll = true;
          }

            $scope.loader = false;
          },
          function(data) {
              $scope.loader = false;

        });
  },200);
};

$scope.DetailPayslip = function(list){
//console.log(list);
//localStorage.setItem("detailPayslip",JSON.stringify(list));
$ionicViewSwitcher.nextTransition('none');
$state.go("Payslip",{data: JSON.stringify(list)});
};

$scope.AddNewInvestment = function(){
$ionicViewSwitcher.nextTransition('none');
$state.go("AddNewInvestment");
};
$scope.DetailSalaryStruct = function(list){
//localStorage.setItem("detailSList",JSON.stringify(list));
$ionicViewSwitcher.nextTransition('none');
$state.go("detail_Sal_Struct",{data: JSON.stringify(list)});
};

$scope.DetailInvestment = function(list){
//localStorage.setItem("detailINList",JSON.stringify(list));
$ionicViewSwitcher.nextTransition('none');
$state.go("detail_investment",{data: JSON.stringify(list)});
};


function myInvestmentG(){
$scope.selectedTabPayroll1 = 1;
$scope.MyInvestmentBTN = true;
$scope.AddSalStructureBTN = false;
$scope.url_investment = AmsConstants.url_onBoard+'investment_declarations/getInvestmentDeclarations?employee='+AmsValues.HRMS__id;
$scope.loader = true;
setTimeout(function(){
        ConnectivityService.PostData($scope.url_investment)
          .then(function(response) {
          //console.log(response);
          if(response.length == 0){
          localStorage.setItem("MyInvestment",JSON.stringify(response));
            $scope.norecords = true;
            $('.norecords').html("<center><p>No records found.</p></center>");
            $scope.showSalaryS = false;
            $scope.showMyInvestment = false;
            $scope.showPayRoll = false;
          }
          else{
          $scope.investment_value = response;
          localStorage.setItem("MyInvestment",JSON.stringify(response));
          //console.log(response);
          $scope.showSalaryS = false;
          $scope.showMyInvestment = true;
          $scope.showPayRoll = false;
          }

            $scope.loader = false;
          },
          function(data) {
              $scope.loader = false;

          });
          },200);
}


$scope.filterFunction = function(element) {
     return element.name.match(/^Ma/) ? true : false;
 };
 $rootScope.$on("CallParentMethodPayroll", function(){
    myInvestmentG();
 });

 $rootScope.$on("CallParentMethodSalStructure", function(){
     InitRefreshPayRoll();
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

$scope.EditMyProfile = function(){
$ionicViewSwitcher.nextTransition('none');
$state.go("myProfileEdit");
};

$scope.getListHeight = function() {
                   return {height: '' + ($window.innerHeight - 72) + 'px'};
                 };
                 $window.addEventListener('resize', onResize);
                 function onResize() {
                   $scope.$digest();
                 }
                 $scope.$on('$destroy', function() {
                   $window.removeEventListener('resize', onResize);
                 });

});
Module_payroll.filter('monthName', [function() {
    return function (monthNumber) { //1 = January
        var monthNames = [ 'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December' ];
        return monthNames[monthNumber];
    }
}]);
