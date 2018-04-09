// Ionic Starter App


//var AMS_Module = angular.module('starter', ['ionic','ngMaterial','starter.controllers',
 //'starter.EnvelopeServices','starter.ConnectivityService','starter.valueconstants','ngMessages'])
var Module_attendance = angular.module('starter.attendance', ['ionic','ngMaterial','ngMessages','ui.router','ngAnimate','starter.valueconstants','starter.ListServices','starter.ConnectivityService']);



Module_attendance.config(function($stateProvider, $urlRouterProvider,$httpProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js


  // setup an abstract state for the tabs directive

  // Each tab has its own nav history stack:


  $stateProvider
  .state('attendance', {
    //url: '/employees',
    templateUrl: 'templates/attendance/attendance.html',
    controller: 'attendance_controller'

  })

  .state('attendance_details', {
      url: '/attendance/attendance_details/:data',
      templateUrl: 'templates/attendance/attandance_details.html',
      controller: 'atten_detail_controller'

   })

  .state('attendance_filterForEmp', {
     templateUrl: 'templates/attendance/attendance_filterForEmp.html',
     controller: 'attendance_filterForEmp',
     params:{'data':null,'data1':null}

  })


   .state('attendance_report', {
               //url: '/employees',
               templateUrl: 'templates/attendance/attendance_report.html',
               controller: 'atten_report_controller'

    });




  // if none of the above states are matched, use this as the fallback


});
