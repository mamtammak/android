// Ionic Starter App


//var AMS_Module = angular.module('starter', ['ionic','ngMaterial','starter.controllers',
 //'starter.EnvelopeServices','starter.ConnectivityService','starter.valueconstants','ngMessages'])
var Module_expense = angular.module('starter.expense', ['ionic','ngMaterial','ngMessages','ui.router','ngAnimate','starter.valueconstants','starter.ListServices','starter.ConnectivityService']);



Module_expense.config(function($stateProvider, $urlRouterProvider,$httpProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js


  // setup an abstract state for the tabs directive

  // Each tab has its own nav history stack:

  $stateProvider
  .state('expense', {
    //url: '/employees',
    templateUrl: 'templates/expense/expense.html',
    controller: 'expense'

  })

  .state('expensePopUp', {
      //url: '/employees',
      templateUrl: 'templates/expense/ExpensePopUp.html',
      controller: 'expensePopUp'

  })
  .state('expenseFilter', {
     templateUrl: 'templates/expense/bottomFilter.html',
     controller: 'teamExpenseFilter'

  })
  .state('advPayPopUp', {
     //url: '/employees',
     templateUrl: 'templates/expense/AdvPaymentPopUp.html',
     controller: 'expensePopUp'

  });

 /* .state('AddNewInvestment', {
     // url: '/employee_profile',
      templateUrl: 'templates/payroll/AddNewInvestment.html',
      controller: 'AddNewInvestment'

  })

  .state('Payslip', {
     // url: '/employee_profile',
     templateUrl: 'templates/payroll/detail_Payslip.html',
     controller: 'Payslip'

  })*/


});
