var C_SERVICES = angular.module('starter.ConnectivityService', ['ngMaterial', 'ngMessages']);
C_SERVICES.factory('ConnectivityService', function($http,$q,$mdToast,$ionicPopup) {

                   return {
                   PostData: function (URL) {
                   var deferred = $q.defer();
                   $http({
                         url: URL,
                         method: "GET",
                         timeout:30000,
                         async : false,
                         headers: {
                         'Content-Type' : 'application/json',

                         'Accept' : 'application/json'
                         }

                         }).success(function (data) {
                                    deferred.resolve(data);
                                    }).catch(function onError(response) {
                                        var data = response.data;
                                        var status = response.status;
                                        var statusText = response.statusText;
                                        var headers = response.headers;
                                        var config = response.config;
                                        console.log(status);
                                        $('#loader').css('display','none');
                                        if(status == -1){
                                            var alertPopup = $ionicPopup.alert({
                                              title: '',
                                              template: "Please check your internet connection."
                                            });
                                            alertPopup.then(function(res) {
                                              console.log('Thank you');
                                            });
                                        }
                                        else if(status == 0){
                                          console.log("server error.");
                                        }
                                        else if(statusText == ""){
                                           var alertPopup = $ionicPopup.alert({
                                              title: '',
                                              template: "Something went wrong , please try again later."
                                           });
                                           alertPopup.then(function(res) {
                                             console.log('Thank you');
                                           });
                                        }
                                        else{
                                           if(status == 500 && response.data.message != undefined){
                                           var alertPopup = $ionicPopup.alert({
                                              title: '',
                                              template: response.data.message
                                           });
                                           alertPopup.then(function(res) {
                                             console.log('Thank you');
                                           });
                                           }
                                           if(status == 400 && response.data.message != undefined){
                                            var alertPopup = $ionicPopup.alert({
                                               title: '',
                                               template: response.data.message
                                            });
                                            alertPopup.then(function(res) {
                                              console.log('Thank you');
                                            });
                                           }
                                        }
                                        deferred.reject();
                                    });

                   return deferred.promise;
                   },

                   PostData_post: function (URL, param) {
                   var deferred2 = $q.defer();
                   $http({
                         url: URL,
                         method: "POST",
                         async : false,
                         timeout:30000,
                         data: param, //Data sent to server
                         headers: {
                           'Content-Type' : 'application/json',
                           'Accept' : 'application/json'
                         }
                         }).success(function (data) {
                               deferred2.resolve(data);
                         }).catch(function onError(response) {
                                // Handle error
                                var data = response.data;
                                var status = response.status;
                                var statusText = response.statusText;
                                var headers = response.headers;
                                var config = response.config;
                                console.log(status);
                                $('#loader').css('display','none');
                                if(status == -1){
                                 var alertPopup = $ionicPopup.alert({
                                    title: '',
                                    template: "Please check your internet connection."
                                   });
                                 alertPopup.then(function(res) {
                                   console.log('Thank you');
                                 });
                                }
                                else if(status == 0){
                                console.log("server error.");
                                }
                                else if(statusText == ""){
                                  var alertPopup = $ionicPopup.alert({
                                      title: '',
                                      template: "Something went wrong , please try again later."
                                    });
                                  alertPopup.then(function(res) {
                                    console.log('Thank you');
                                  });
                                }
                                else{
                                if(response.data.message != undefined){
                                var alertPopup = $ionicPopup.alert({
                                    title: '',
                                    template: response.data.message
                                   });
                                   alertPopup.then(function(res) {
                                     console.log('Thank you');
                                   });
                                }
                                else{
                                var alertPopup = $ionicPopup.alert({
                                   title: '',
                                   template: "Something went wrong , please try again later."
                                   });
                                   alertPopup.then(function(res) {
                                     console.log('Thank you');
                                   });
                                }

                                }
                                deferred2.reject();
                              });


                         return deferred2.promise;
                   },
                   AjaxRequest : function(url){
                   var result;
                   $.ajax({
                                         type: "GET",
                                         url: url,
                                         async : false,
                                         dataType: "json",
                                         timeout:30000,
                                         success: function (data) {
                                         result = data;

                                         },
                                         error: function(msg,textStatus) {
                                         console.log(msg.statusText);
                                         if(msg.status == -1){
                                           $mdToast.show($mdToast.simple().content("Please check your internet connection.").position('bottom').hideDelay(2000));
                                         }
                                         else if(msg.status == 0){
                                            console.log("server error");
                                         }
                                         else if(msg.statusText == ""){
                                            $mdToast.show($mdToast.simple().content("Something went wrong , please try again later.").position('bottom').hideDelay(2000));
                                         }
                                         else{
                                            if(msg.status == 500 && msg.statusText != ""){
                                            $mdToast.show($mdToast.simple().content(statusText).position('bottom').hideDelay(2000));
                                            }
                                         }

                                         $('#loader').css('display','none');

                                        }
                                  });
                                  return result;
                   },
                   AjaxRequest_post : function(url,envelope){
                                      var result;
                                      $.ajax({
                                                type: "POST",
                                                url: url,
                                                data: envelope,
                                                async : false,
                                                dataType: "json",
                                                contentType:"json",
                                                timeout:30000,
                                                success: function (data) {
                                                result = data;
                                                },
                                                error: function(msg,textStatus) {

                                                   if(textStatus === 'timeout')
                                                   {
                                                      alert('Failed from timeout');

                                                   }
                                                   $('#loader').css('display','none');
                                                   return false;

                                                    }
                                                 });
                                                return result;
                                      },



                   }

         });





