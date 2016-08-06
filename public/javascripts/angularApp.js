var app = angular.module('ticketsapp', ['ui.router']);


app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('user', {
      url: '/user',
      templateUrl: '/templates/user-template.html',
      controller: 'UserController'
    })
    .state('edit-ticket', {
      url: '/edit-ticket',
      templateUrl: '/templates/edit-ticket.html',
      controller: 'TicketController'
    })
    .state('home', {
      url: '/home',
      templateUrl: '/templates/home.html',
      controller: 'TicketController'
    });
    
    $urlRouterProvider.otherwise('home');
}]);


app.controller('TicketController', [
      '$scope',
      function($scope){
      }
    ]);

app.controller('UserController', [
      '$scope',
      function($scope){
        $scope.userTypes = ['Customer', 'Admin'];

      $scope.createUser = function() {
        console.log("Create New User");
        console.log($scope.name);
        console.log($scope.email);
        console.log($scope.type);
      };
    }]);