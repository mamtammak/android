// Ionic Starter App


//var AMS_Module = angular.module('starter', ['ionic','ngMaterial','starter.controllers',
 //'starter.EnvelopeServices','starter.ConnectivityService','starter.valueconstants','ngMessages'])
var Module_payroll = angular.module('starter.payroll', ['ionic','ngMaterial','ngMessages','ui.router','ngAnimate','starter.valueconstants','starter.ListServices','starter.ConnectivityService']);



Module_payroll.config(function($stateProvider, $urlRouterProvider,$httpProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js


  // setup an abstract state for the tabs directive

  // Each tab has its own nav history stack:

  $stateProvider
  .state('payroll', {
    //url: '/employees',
    templateUrl: 'templates/payroll/payroll.html',
    controller: 'payroll_controller'

  })

  .state('detail_Sal_Struct', {
      url: '/payroll/detail_Sal_Struct/:data',
      templateUrl: 'templates/payroll/detail_Salary_Struct.html',
      controller: 'detail_Salary_Struct'

    })
  .state('detail_investment', {
          url: '/payroll/detail_investment/:data',
          templateUrl: 'templates/payroll/detail_investment.html',
          controller: 'detail_investment'

  })

  .state('AddNewInvestment', {
     // url: '/employee_profile',
      templateUrl: 'templates/payroll/AddNewInvestment.html',
      controller: 'AddNewInvestment'

  })

  .state('Payslip', {
     url: '/payroll/Payslip/:data',
     templateUrl: 'templates/payroll/detail_Payslip.html',
     controller: 'Payslip'

  })

  .state('AddSalStructure', {
       // url: '/employee_profile',
       templateUrl: 'templates/payroll/AddSalStructure.html',
       controller: 'AddSalStructure'

  });

 /* .state('ConfirmTask', {
         // url: '/employee_profile',
         templateUrl: 'templates/task/confirmTask.html',
         controller: 'ConfirmL_controller'

  })

  .state('ConfirmCompOffDetails', {
         // url: '/employee_profile',
         templateUrl: 'templates/task/confirmCompOffDetails.html',
         controller: 'ConfirmCO_controller'

    })

    .state('ConfirmTaskDetails', {
           // url: '/employee_profile',
           templateUrl: 'templates/task/confirmTaskDetails.html',
           controller: 'ConfirmL_controller'

    })


  .state('taskdescription', {
          templateUrl: 'templates/task/taskDescribtion.html',
          controller: 'taskDesp_controller'

  })

  .state('comments', {
              templateUrl: 'templates/task/comments.html',
              controller: 'comments_controller'

   })
  .state('completeTaskPopUP', {
              templateUrl: 'templates/task/completed_popUP.html',
              controller: 'completedpopUP_controller'

  })
  .state('taskPopUp', {
              templateUrl: 'templates/task/taskPopUp.html',
              controller: 'completedpopUP_controller'

  })

  .state('updateTask', {
            templateUrl: 'templates/task/editTask.html',
            controller: 'editTask_controller'

   });*/






  // if none of the above states are matched, use this as the fallback


});
