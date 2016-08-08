var userModule = angular.module('ticketsapp.user', ['ngResource']);

userModule
  .config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('user', {
          url: '/user',
          templateUrl: '/component/user/template/user.html',
          controller: 'UserController'
        });
    }
  ]);
