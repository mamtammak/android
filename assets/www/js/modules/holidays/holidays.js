// Ionic Starter App


//var AMS_Module = angular.module('starter', ['ionic','ngMaterial','starter.controllers',
 //'starter.EnvelopeServices','starter.ConnectivityService','starter.valueconstants','ngMessages'])
var Module_holidays = angular.module('starter.holidays', ['ionic','ngMaterial','ngMessages','ui.router','ngAnimate','starter.valueconstants','starter.ListServices','starter.ConnectivityService']);



Module_holidays.config(function($stateProvider, $urlRouterProvider,$httpProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js


  // setup an abstract state for the tabs directive

  // Each tab has its own nav history stack:


  $stateProvider
  .state('holidays', {
    //url: '/employees',
    templateUrl: 'templates/holidays/holidays.html',
    controller: 'holidays_controller'

  });



});
