


//angular.module('starter.controllers', ['ngMaterial', 'ngMessages'])


//HRMS_Module.controller('login_controllers',function($scope,$ionicPopup,$state,$http,Envelope_Factory,ConnectivityService,AmsConstants,AmsValues,$window,$mdDialog) {

HRMS_Module.controller('forgotPass_controllers',function($scope,$ionicPopup,$state,$http,$window,$mdDialog,$ionicViewSwitcher) {

            $scope.imagePath = 'img/HRMS_LOGO.png';
            $scope.IsVisible = false;
            $scope.onKeyPressResult = "";

          /*  $scope.data = {
            "username": "",
            "password": ""
            };*/

            $scope.back = function(){
            $scope.new_password = "";
            $scope.confirm_password = "";
            $ionicViewSwitcher.nextTransition('none');
            $state.go("login");
            }

            //$scope.login = function(){
           /* $scope.url = AmsConstants.url;
            
            $scope.getLoginEnvelope = Envelope_Factory.Login_Factory($scope.data.username,$scope.data.password);
            $scope.name = $window.document.getElementById('username');
            $scope.pass = $window.document.getElementById('password');
            if ($scope.data.username == "" || $scope.data.username == undefined) {
            $scope.name.focus();
            return false;
            } else if ($scope.data.password == "" || $scope.data.password == undefined) {
            $scope.pass.focus();
            return false;
            //showToast.showLongBottom(NTGIonicSeedConstants.errorMessage.noPassword);
            } else {
            //$scope.isLoading = true;
            $http.post($scope.url, $scope.getLoginEnvelope, AmsConstants.headers)
            .success(function (response, status, headers, config) {
                     console.log(response);
                     $scope.response = $.parseXML(response);
                     //$scope.isLoading = false;
                     //localStorage.setItem("amsLoginUsername",JSON.stringify(name));
                     //localStorage.setItem("amsLoginPassword",JSON.stringify(pass));
                     AmsValues.AMSUserName = $scope.name.value;
                     AmsValues.AMSUserPassword = $scope.pass.value;
                     
                     
                     $scope.value= $($scope.response).find( "AssertionArtifact" ).text();
                     AmsValues.AssertionArtifact = $scope.value;
                     
                     
                     
                     //localStorage.setItem("RAssertionToken",JSON.stringify($scope.value));
                     $state.go('dash');
                     })
            .error(function (response, status, header, config) {
            console.log(status);
                   console.log(response);
                   if(status == "500" && response !== null){
                   var parseFault = $.parseXML(response);
                   var errorValue = $(parseFault).find("faultstring").text();
                   $mdDialog.show(
                                  $mdDialog.alert()
                                  .parent(angular.element(document.querySelector('#popupContainer')))
                                  .clickOutsideToClose(false)
                                  //.title('This is an alert title')
                                  .textContent(errorValue)
                                  .ariaLabel('Alert Dialog Demo')
                                  .ok('OK')
                                  //.targetEvent(ev)
                                  );
                                  name.value = "";
                                  pass.value = "";
                   
                   }
                   
                   else if(status == -1){
                   $mdDialog.show(
                                  $mdDialog.alert()
                                  .parent(angular.element(document.querySelector('#popupContainer')))
                                  .clickOutsideToClose(false)
                                  //.title('This is an alert title')
                                  .textContent("Please check your internet connection.")
                                  .ariaLabel('Alert Dialog Demo')
                                  .ok('OK')
                                  //.targetEvent(ev)
                                  );
                   }
                   else{
                   $mdDialog.show(
                                  $mdDialog.alert()
                                  .parent(angular.element(document.querySelector('#popupContainer')))
                                  .clickOutsideToClose(false)
                                  //.title('This is an alert title')
                                  .textContent("Something went wrong , please try again later.")
                                  .ariaLabel('Alert Dialog Demo')
                                  .ok('OK')
                                  //.targetEvent(ev)
                                  );
                   }
                   
                   }); 
                   
            }*/
                
             
          //  }
            });


 /* HRMS_Module.directive('backImg', function(){
                  return function(scope, element, attrs){
                      var url = attrs.backImg;console.log(url);
                      element.css({
                          'background-image': 'url(' + url +') no-repeat center center fixed',
                          '-webkit-background-size': 'cover',
                              '-moz-background-size': 'cover',
                              '-o-background-size': 'cover',
                              'background-size': 'cover',
                              'background-color': 'white'

                      });
                  };
              });*/
          




