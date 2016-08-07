var ticketModule = angular.module('ticketsapp.ticket', []);

ticketModule.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) { 
    $stateProvider
    .state('create-ticket', {
      url: '/create-ticket',
      templateUrl: '/component/ticket/create-ticket.html',
      controller: 'TicketCreateController'
    })
    .state('view-ticket', {
      url: '/view-ticket/{id}',
      templateUrl: '/component/ticket/view-ticket.html',
    })
    .state('home', {
      url: '/home',
      templateUrl: '/component/ticket/home.html',
      controller: 'TicketController'
    });
    
    $urlRouterProvider.otherwise('home');
}]);


ticketModule.controller('TicketViewController', ['$scope', '$stateParams' ,'$http', '$location',
  function($scope, $stateParams, $http, $location) {
    
    $scope.commentList = [];

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
      var ticket = $scope.ticket;
      $http({
        method: 'PUT',
        url: '/api/tickets/' + ticket._id,
        data: ticket
      })
      .then(function(response) {
        $location.path('home');
      });   
    }
  }
]);

ticketModule.controller('TicketController', ['$scope', '$http',
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

ticketModule.controller('TicketCreateController', ['$scope', '$http', '$location',
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

