// Ionic Starter App


//var AMS_Module = angular.module('starter', ['ionic','ngMaterial','starter.controllers',
 //'starter.EnvelopeServices','starter.ConnectivityService','starter.valueconstants','ngMessages'])
var Module_training = angular.module('starter.training', ['ionic','ngMaterial','ngMessages','ui.router','ngAnimate','starter.valueconstants','starter.ListServices','starter.ConnectivityService']);



Module_training.config(function($stateProvider, $urlRouterProvider,$httpProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js


  // setup an abstract state for the tabs directive

  // Each tab has its own nav history stack:


  $stateProvider
  .state('training', {
    //url: '/employees',
    templateUrl: 'templates/training/training.html',
    controller: 'training_controller'

  })

  .state('curriculum', {
      //url: '/employees',
      templateUrl: 'templates/training/curriculum.html',
      controller: 'curriculum_controller'

   })

    .state('aboutCourse', {
          //url: '/employees',
          templateUrl: 'templates/training/aboutCourse.html',
          controller: 'aboutCourse_controller'

     })
    .state('lessonPage', {
               //url: '/employees',
               templateUrl: 'templates/training/lessonPage.html',
               controller: 'lessonPage_controller'

    });




  // if none of the above states are matched, use this as the fallback


});
