// Ionic Starter App


//var AMS_Module = angular.module('starter', ['ionic','ngMaterial','starter.controllers',
 //'starter.EnvelopeServices','starter.ConnectivityService','starter.valueconstants','ngMessages'])
var Module_myProfile = angular.module('starter.myProfile', ['ionic','ngMaterial','ngMessages','ui.router','ngAnimate','starter.valueconstants','starter.ListServices','starter.ConnectivityService']);



Module_myProfile.config(function($stateProvider, $urlRouterProvider,$httpProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js


  // setup an abstract state for the tabs directive

  // Each tab has its own nav history stack:


  $stateProvider
  .state('myProfileEdit', {
      templateUrl: 'templates/myprofile/my_profile_edit.html',
      controller: 'myprofile_edit'
  })
  /*.state('myProfile', {
    //url: '/employees',
    templateUrl: 'templates/myprofile/my_profile.html',
    controller: 'myProfile_controller'

  })*/

  .state('myDetails', {
     // url: '/employee_profile',
      templateUrl: 'templates/myprofile/myDetails.html',
      controller: 'myDetails_controller'

  })

  .state('myPersonalDetails', {
     // url: '/employee_profile',
     templateUrl: 'templates/myprofile/myPersonalDetails.html',
     controller: 'myPersonalDetails_controller'

  })

  .state('myContact', {
       // url: '/employee_profile',
       templateUrl: 'templates/myprofile/myContact.html',
       controller: 'myContact_controller'

  })

  .state('my_acct_info', {
         // url: '/employee_profile',
         templateUrl: 'templates/myprofile/my_acct_info.html',
         controller: 'my_acct_info_controller'

  })


  .state('myProjects', {
          templateUrl: 'templates/myprofile/myProjects.html',
          controller: 'myProjects_controller'

    })

  .state('addNewProject', {
            templateUrl: 'templates/myprofile/AddProjects.html',
            controller: 'addProjects_controller'

   });





  // if none of the above states are matched, use this as the fallback


});
