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
    .state('create-ticket', {
      url: '/create-ticket',
      templateUrl: '/templates/create-ticket.html',
      controller: 'TicketCreateController'
    })
    .state('home', {
      url: '/home',
      templateUrl: '/templates/home.html',
      controller: 'TicketController'
    });
    
    $urlRouterProvider.otherwise('home');
}]);


//
// TICKET RELATED CONTROLLERS
// 
app.controller('TicketController', ['$scope', '$http',
  function($scope, $http, ticketService) {
    $http.get('/api/tickets')
    .success(function(data) {
      $scope.tickets = data; 
    })
    .error(function(data) {
      console.log('Error: ' + data); 
    })

    $scope.deleteTicket = function() {
        $http({
          method: 'POST',
          url: '/api/tickets/delete',
          data: $scope.ticket
        })
        .then(function(res) {
          
        })
    }
  }
]);

app.controller('TicketCreateController', [
      '$scope',
      '$http',
      function($scope, $http) {
        $http.get('/api/users')
        .success(function(data) {
          $scope.users = data;
        })
        .error(function(data) {
          console.log('Error: ' + data);  
        });

        $scope.createTicket = function() {
          $http({
            method: 'POST',
            url: '/api/tickets',
            data: $scope.ticket
          })
          .then(function(response) {
            $scope.ticket.description = "";
          });
        }
    }]);

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
