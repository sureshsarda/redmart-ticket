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
    .state('view-ticket', {
      url: '/view-ticket/{id}',
      templateUrl: '/templates/view-ticket.html',
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

app.controller('TicketViewController', ['$scope', '$stateParams' ,'$http', '$location',
  function($scope, $stateParams, $http, $location) {
    
    $scope.commentList = [];
    $scope.ticket = '';

    $http.get('/api/users')
    .success(function(data) {
      $scope.users = data;
    })
    .error(function(data) {
      console.log('Error: ' + data);  
    });

    $http.get('/api/tickets/' + $stateParams.id)
    .success(function(data) {
      $scope.ticket = data;
      $scope.commentList = data.comments;
      
      if (data.status === 'Closed') {
        $scope.isDisabled = true;
      }
      else {
        $scope.isDisabled = false; 
      }
    })

    $scope.addComment = function() {
      var ticket = $scope.ticket;
      var newComment = $scope.newComment;

      // return if comment already present
      if ($scope.commentList.indexOf(newComment) > 0) {
        return;  
      }
      
      var apiEndPoint = '/api/tickets/' + ticket._id + '/comment/';

      $http({
        method: 'POST',
        url: apiEndPoint,
        data: newComment
      })
      .then(function(res) {
        $scope.commentList.push(newComment); 
        console.log($scope.commentList);      
        $scope.newComment.description = "";  
      })
    }

    $scope.updateTicket = function() {
      $location.path('home');   
    }
  }
]);

app.controller('TicketController', ['$scope', '$http',
  function($scope, $http) {
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

app.controller('TicketCreateController', ['$scope', '$http', '$location',
  function($scope, $http, $location) {
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
        $location.path('home');
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
