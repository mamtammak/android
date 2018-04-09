// Ionic Starter App


//var AMS_Module = angular.module('starter', ['ionic','ngMaterial','starter.controllers',
 //'starter.EnvelopeServices','starter.ConnectivityService','starter.valueconstants','ngMessages'])
var Module_applyLeave = angular.module('starter.applyLeave', ['ionic','ngMaterial','ngMessages','ui.router','ngAnimate','starter.valueconstants','starter.ListServices','starter.ConnectivityService']);



Module_applyLeave.config(function($stateProvider, $urlRouterProvider,$httpProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js


  // setup an abstract state for the tabs directive

  // Each tab has its own nav history stack:


  $stateProvider
  .state('applyLeave', {
    //url: '/employees',
    templateUrl: 'templates/apply_leave/applyLeave.html',
    controller: 'applyLeave_controller'
    /*views: {
      'menuContent': {
        templateUrl: 'templates/menu-dashboard.html',
        controller: 'menu_dashboard'
      }
    }*/
  })

  .state('CompOffList', {
      templateUrl: 'templates/apply_leave/compOff_PopUp.html',
      controller: 'CompList_controller'
  })

  .state('applyComOff', {
     // url: '/employee_profile',
      templateUrl: 'templates/apply_leave/applyComOff.html',
      controller: 'compOff_controller'

  })

  .state('LeaveHistory', {
     // url: '/employee_profile',
     templateUrl: 'templates/apply_leave/leaveHistory.html',
     controller: 'LeaveHistory_controller'

  })

  .state('reApplyLeave', {
       // url: '/employee_profile',
       templateUrl: 'templates/apply_leave/reApplyLeave.html',
       controller: 'reApplyLeave_controller'

  })

  .state('CompOffHistory', {
         // url: '/employee_profile',
         templateUrl: 'templates/apply_leave/CompOffHistory.html',
         controller: 'CompHistory_controller'

  })


  .state('leavePlan', {
          templateUrl: 'templates/apply_leave/leavePlan.html',
          controller: 'leavePlan_controller'

  });







  // if none of the above states are matched, use this as the fallback


});
