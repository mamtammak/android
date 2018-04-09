//angular.module('starter.controllers', ['ngMaterial', 'ngMessages'])
//color code #145c96
//HRMS_Module.controller('login_controllers',function($scope,$ionicPopup,$state,$http,Envelope_Factory,ConnectivityService,AmsConstants,AmsValues,$window,$mdDialog) {
HRMS_Module.controller('login_controllers', function($scope, $ionicPopup, $state, $http, $window, $mdDialog, $ionicViewSwitcher, AmsConstants, AmsValues, $timeout, StoreResponse, $ionicScrollDelegate) {


    $scope.loader = false;
    $scope.imagePath = 'img/HRMS_LOGO_old.png';
    $scope.inputType = 'password';


    $scope.init = function() {
        //$scope.data = {username:"yadnikanchan@gmail.com",password:"K@nchan1"};
        $scope.data = {
            username: "",
            password: ""
        };
    }
    $scope.login = function() {

        var networkState = navigator.connection.type;
        var states = {};
        $scope.name = $window.document.getElementById('username');
        $scope.pass = $window.document.getElementById('password');
        var x = $('#username').val();
        var atpos = x.indexOf("@");
        var dotpos = x.lastIndexOf(".");
        $scope.envelope = {
            "email": angular.lowercase($scope.data.username),
            "password": $scope.data.password,
            "app": "HRMS"
        };

        $scope.url = AmsConstants.url + 'mlogin';
        console.log($scope.envelope);


        if (networkState == 'none') {
            window.plugins.toast.showLongBottom('Please check your internet connection.', function(a) {
                console.log('toast success: ' + a)
            }, function(b) {
                console.log('toast error: ' + b)
            });
            return false;
        } else if ($('#username').val() == "") {
            $('#username').focus();
            window.plugins.toast.showLongBottom('Please enter valid email id.', function(a) {
                console.log('toast success: ' + a)
            }, function(b) {
                console.log('toast error: ' + b)
            });
            return false;
        } else if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= x.length) {
            window.plugins.toast.showLongBottom('Please enter valid email id.', function(a) {
                console.log('toast success: ' + a)
            }, function(b) {
                console.log('toast error: ' + b)
            });
            return false;
        } else if ($('#password').val() == "") {
            $('#password').focus();
            window.plugins.toast.showLongBottom('Please enter valid password.', function(a) {
                console.log('toast success: ' + a)
            }, function(b) {
                console.log('toast error: ' + b)
            });
            return false;
        } else {
            $scope.loader = true;
            setTimeout(function() {

                $http.post($scope.url, $scope.envelope)
                    .success(function(response, status, headers, config) {
                        var LoginResponse = "";
                        LoginResponse = response;
                        $window.localStorage.setItem("USERNAME", $scope.data.username);
                        $window.localStorage.setItem("PASSWORD", $scope.data.password);
                        $window.localStorage.setItem("AuthToken", LoginResponse.token);
                        localStorage.setItem("response_token", JSON.stringify(LoginResponse));
                        var pFactory_token = (response.token).split(".");
                        var decode_token = window.atob(pFactory_token[1]);
                        var parse_decode_token = JSON.parse(decode_token);
                        var tmpEXP = new Date(parse_decode_token._expireAt);
                        var today = moment(new Date()).format("YYYY-MM-DD");
                        var expiryDate = moment(tmpEXP).format("YYYY-MM-DD");
                        if(today == expiryDate){
                           var alertPopup = $ionicPopup.alert({
                            title: '',
                            template: "Your Plan is expired , please renew the same."
                           });
                           alertPopup.then(function(res) {
                           console.log("plan expired..");
                           });
                           return false;
                        }
                        else{
                        $ionicViewSwitcher.nextTransition('none');
                        $state.go('dashboard');
                        }

                        $scope.loader = false;

                    })
                    .error(function(response, status, header, config) {
                        console.log(status);
                        $scope.loader = false;
                        if (status == "401") {
                            var alertPopup = $ionicPopup.alert({
                                title: '',
                                template: response.message
                            });
                            alertPopup.then(function(res) {
                                //$scope.name.value = "";
                                $scope.pass.value = "";
                            });
                            return false;
                        } else if (status == -1) {

                            var alertPopup = $ionicPopup.alert({
                                title: '',
                                template: 'Please check your internet connection.'
                            });
                            alertPopup.then(function(res) {
                                console.log("alert");
                            });
                            return false;
                        } else {

                            var alertPopup = $ionicPopup.alert({
                                title: '',
                                template: response.message
                            });
                            alertPopup.then(function(res) {
                                console.log("alert");
                            });
                            return false;
                        }

                    });
            }, 200);


        }



    };

    $scope.hideShowPassword = function() {
        if ($scope.inputType == 'password')
            $scope.inputType = 'text';
        else
            $scope.inputType = 'password';
    };
    $scope.forgetPassword = function() {
        setTimeout(function() {
            $mdDialog.show({
                    controller: "forgetPassword_controller",
                    templateUrl: 'templates/forgetPassword.html',
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

});
/*.run(function($ionicPlatform) {
              $ionicPlatform.ready(function() {
                setTimeout(function() {
                    navigator.splashscreen.hide();
                }, 0);
             });
             });*/


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
