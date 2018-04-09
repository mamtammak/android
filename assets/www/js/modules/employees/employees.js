// Ionic Starter App


//var AMS_Module = angular.module('starter', ['ionic','ngMaterial','starter.controllers',
 //'starter.EnvelopeServices','starter.ConnectivityService','starter.valueconstants','ngMessages'])
var Module_employees = angular.module('starter.employees', ['ionic','ngMaterial','ngMessages','ui.router','ngAnimate','starter.valueconstants','starter.ListServices','starter.ConnectivityService']);



Module_employees.config(function($stateProvider, $urlRouterProvider,$httpProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js


  // setup an abstract state for the tabs directive

  // Each tab has its own nav history stack:


  $stateProvider
  .state('employees', {
    //url: '/employees',
    templateUrl: 'templates/employees/employees.html',
    controller: 'employee_controller'

  })

  .state('employee_profile', {
     // url: '/employee_profile',
      templateUrl: 'templates/employees/employees_profile.html',
      controller: 'employeeProfile_controller'

  })

  .state('employee_details', {
     // url: '/employee_profile',
     templateUrl: 'templates/employees/employee_details.html',
     controller: 'employeeDetails_controller'

  })

  .state('emp_personel_details', {
       // url: '/employee_profile',
       templateUrl: 'templates/employees/employee_personel_details.html',
       controller: 'employeePersonalDetails_controller'

  })

  .state('emp_contact', {
         // url: '/employee_profile',
         templateUrl: 'templates/employees/employee_contact.html',
         controller: 'employeeContact_controller'

  })

  .state('emp_account_info', {
        templateUrl: 'templates/employees/emp_accountInfo.html',
        controller: 'emp_acct_info_controller'

  })
  .state('onBoard', {
        templateUrl: 'templates/employees/onBoard.html',
        controller: 'onBoard_controller'

  })

  .state('Projects', {
          templateUrl: 'templates/employees/employee_projects.html',
          controller: 'empProjects_controller'

    });





  // if none of the above states are matched, use this as the fallback


});
