// Ionic Starter App


//var AMS_Module = angular.module('starter', ['ionic','ngMaterial','starter.controllers',
 //'starter.EnvelopeServices','starter.ConnectivityService','starter.valueconstants','ngMessages'])
var Module_timesheet = angular.module('starter.timesheet', ['ionic','ngMaterial','ngMessages','ui.router','ngAnimate','starter.valueconstants','starter.ListServices','starter.ConnectivityService']);



Module_timesheet.config(function($stateProvider, $urlRouterProvider,$httpProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js


  // setup an abstract state for the tabs directive

  // Each tab has its own nav history stack:


  $stateProvider
  .state('timesheet', {
    //url: '/employees',
    templateUrl: 'templates/timesheet/timesheet.html',
    controller: 'timesheet_controller'

  })

  .state('timesheetEvents', {
     // url: '/timesheet/timesheetEvents/:data',
      templateUrl: 'templates/timesheet/TimesheetEvents.html',
      controller: 'TimesheetEvents_controller',
      params: {
          'data1': null,
          'data2': null,
          'data3':null
      }

  })

  .state('EMP_timesheet', {
      //url: '/employees',
      templateUrl: 'templates/timesheet/EMP_timesheet.html',
      controller: 'EMP_timesheet_controller',
      params:{
      "data":null
      }

  })
  .state('EMP_timesheet_Events', {
        //url: '/employees',
        templateUrl: 'templates/timesheet/EmpTimesheetEvents.html',
        controller: 'EMP_timesheet_events',
        params:{
        data:null
        }

   })
  .state('addEvent', {
      //url: '/employees',
      templateUrl: 'templates/timesheet/addevent.html',
      controller: 'Addevent_controller'

  })

  .state('updateEvent', {
    templateUrl: 'templates/timesheet/updateEvent.html',
    controller: 'updateEvent_controller'

  })
  .state('shareTimesheet', {
    templateUrl: 'templates/timesheet/shareTimesheet.html',
    controller: 'shareTimesheet_controller'

  });




  // if none of the above states are matched, use this as the fallback


});
