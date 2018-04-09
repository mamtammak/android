// Ionic Starter App


//var AMS_Module = angular.module('starter', ['ionic','ngMaterial','starter.controllers',
 //'starter.EnvelopeServices','starter.ConnectivityService','starter.valueconstants','ngMessages'])
var Module_task = angular.module('starter.task', ['ionic','ngMaterial','ngMessages','ui.router','ngAnimate','starter.valueconstants','starter.ListServices','starter.ConnectivityService']);



Module_task.config(function($stateProvider, $urlRouterProvider,$httpProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js


  // setup an abstract state for the tabs directive

  // Each tab has its own nav history stack:

  $stateProvider
  .state('task', {
    //url: '/employees',
    templateUrl: 'templates/task/task.html',
    controller: 'task_controller'
    /*views: {
      'menuContent': {
        templateUrl: 'templates/menu-dashboard.html',
        controller: 'menu_dashboard'
      }
    }*/
  })
  
  .state('taskExpense', {
      //url: '/employees',
      templateUrl: 'templates/task/expense.html',
      controller: 'taskExpense'

    })

  .state('taskFilter', {
      //url: '/employees',
      templateUrl: 'templates/task/taskFilter.html',
      controller: 'taskFilter_controller'

    })
    .state('taskFilterComplete', {
          //url: '/employees',
          templateUrl: 'templates/task/taskFilterComplete.html',
          controller: 'task_controller'

        })

  .state('AddTask', {
     // url: '/employee_profile',
      templateUrl: 'templates/task/addTask.html',
      controller: 'addTask_controller'

  })


  .state('ConfirmCompOff', {
       // url: '/employee_profile',
       templateUrl: 'templates/task/confirmCompOff.html',
       controller: 'ConfirmCO_controller'

  })

  .state('ConfirmTask', {
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

   });






  // if none of the above states are matched, use this as the fallback


});
