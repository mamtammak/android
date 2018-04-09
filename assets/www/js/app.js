// Ionic Starter App


//var AMS_Module = angular.module('starter', ['ionic','ngMaterial','starter.controllers',
 //'starter.EnvelopeServices','starter.ConnectivityService','starter.valueconstants','ngMessages'])
var HRMS_Module = angular.module('starter', ['ionic','ngMaterial','ngCordova','ngMessages','ui.router','ngAnimate','starter.valueconstants','starter.ListServices','starter.employees','starter.myProfile','starter.task','starter.applyLeave','starter.timesheet','starter.holidays','starter.training','starter.attendance','starter.payroll','starter.expense','ngFileUpload','ngRateIt','720kb.tooltips']);

HRMS_Module.run(function($ionicPlatform,$mdDialog,$ionicPopup,$state,$ionicHistory,$mdBottomSheet) {

  $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      navigator.splashscreen.hide();
      window.screen.orientation.lock('portrait');

      //navigator.splashscreen.show();
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
        //cordova.plugins.Keyboard.disableScroll(true);

      }
      if(window.MobileAccessibility){
        window.MobileAccessibility.usePreferredTextZoom(false);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }

      cordova.dialogGPS("Your GPS is Disabled, this app needs to be enable to mark your attendance.",//message
                                 "Use GPS,Wi-Fi and mobile network for location.",//description
                                 function(buttonIndex){//callback
                                    switch(buttonIndex) {
                                    case 0: break;//cancel
                                    //case 1: break;//neutro option
                                    case 1: break;//user go to configuration
                                 }},
                                 "Please Turn on GPS",//title
                                 ["No","Yes"]);//buttons

      //cordova.plugins.locationAccuracy.request(successCallback, errorCallback);
      $ionicPlatform.registerBackButtonAction(function (event) {
              event.preventDefault();
              //alert($state.current.name);
              //$ionicHistory.nextViewOptions({ disableBack: true });
              if ($state.current.name == "dashboard" || $state.current.name == "login") {
              navigator.app.exitApp();

              }
              else if($state.current.name == "timesheet" || $state.current.name == "expense" || $state.current.name == "EMP_timesheet"){
              $mdBottomSheet.hide();
              $ionicHistory.nextViewOptions({ disableBack: false });
              $ionicHistory.goBack();
              }

               else {
              //alert($state.current.name);
                $ionicHistory.nextViewOptions({ disableBack: false });
                $ionicHistory.goBack();

              }
            }, 800);
            //registerBackButton

        var pushNotification = window.plugins.pushNotification;
        pushNotification.register(successHandler, errorHandler,{"senderID":"190260068326","ecb":"onNotificationGCM"});
    });




  });
  function successCallback (){
  console.log("success location accuracy.");
  }
  function errorCallback(){
  console.log("error.");
  }
  var onSuccess = function(position) {
  console.log(position.coords.latitude);
  }
  function onError(error) {
   console.log('code: '    + error.code    + '\n' +'message: ' + error.message + '\n');
  }

  function successHandler(result) {
              console.log('Callback Success! Result = '+result)
          }
       function errorHandler(error) {
              alert(error);
          }
        function onNotificationGCM(e) {
                  switch( e.event )
                  {
                      case 'registered':
                          if ( e.regid.length > 0 )
                          {
                              var registrationID;
                              setTimeout(function(){
                              registrationID = e.regid;
                              alert(registrationID);
                              localStorage.setItem("PushToken",registrationID);
                              },0);

                          }
                      break;

                      case 'message':
                        window.plugins.toast.showLongBottom(e.message, function(a){console.log('toast success: ' + a)}, function(b){console.log('toast error: ' + b)});
                      break;

                      case 'error':
                        alert('GCM error = '+e.msg);
                      break;

                      default:
                        alert('An unknown GCM event has occurred');
                        break;
                  }
              }



  HRMS_Module.config(function($stateProvider,$urlRouterProvider,$httpProvider,$mdDateLocaleProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js

    $stateProvider
     .state('login', {
          url: '/login',
          templateUrl: 'templates/login.html',
          controller: 'login_controllers'
     })
     .state('forgetPassword', {
        //url: '/employees',
        templateUrl: 'templates/forgetPassword.html',
        controller: 'forgetPassword_controller'

     })
     .state('notify', {
       templateUrl: 'templates/notifyList.html',
       controller: 'notify'

     })


.state('graph', {
          templateUrl: 'templates/graph.html',
          controller: 'events'
    })
    .state('dashboard', {
      url: '/dashboard',
      templateUrl: 'templates/menu-dashboard.html',
      controller: 'menu_dashboard'

    })
    .state('events', {
       templateUrl: 'templates/eventsPopUp.html',
       controller: 'events'

    })
    .state('to_do_list', {
        templateUrl: 'templates/to_do_list.html',
        controller: 'to_do_list'

    })
    .state('Add_to_do_list', {
         templateUrl: 'templates/Add_to_do_list.html',
         controller: 'to_do_list'

    })
    .state('Update_to_do_list', {
       templateUrl: 'templates/Update_to_do_list.html',
       controller: 'to_do_list'

    });

  $mdDateLocaleProvider.formatDate = function(date) {
    return date ? moment(date).format('DD-MM-YYYY') : '';
  };



     if(!localStorage.getItem("USERNAME")){
          localStorage.clear();
          $urlRouterProvider.otherwise('/login');

    }
    else{

      $urlRouterProvider.otherwise('/dashboard');

    }

  });


