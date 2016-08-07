var ticketController = angular.module('ticketsapp.ticket.controller', []);


ticketController.controller('TicketViewController', ['$scope', '$stateParams' ,'$resource', '$location', '$http',
  function($scope, $stateParams, $resource, $location, $http) {
    
    $scope.statusList = ["New", "Open", "Closed"];

    var csrList = $resource('/api/users/csr', {isArray: true});
    csrList.query(function(data) {
      $scope.csrList = data;
    });

    var customerList = $resource('/api/users/customers', {isArray: true});
    customerList.query(function(data) {
      $scope.customerList = data;
    });

    var ticket = $resource('/api/tickets/:ticket_id', {ticket_id: $stateParams.id});
    ticket.get(function(data) {
    	$scope.ticket = data;
	   	$scope.commentList = data.comments;
	   	$scope.disabled = ('Closed' == data.status);
    });

    $scope.addComment = function() {
      var ticket = $scope.ticket;
     
      var comment = $resource('/api/tickets/:ticket_id/comment', {ticket_id: ticket._id});
      comment.save($scope.newComment);
  	}


    $scope.updateTicket = function() {
      // var ticket = $resource('/api/tickets/:ticket_id', null,{method: 'PUT'});
      // ticket.get()
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

ticketController.controller('TicketController', ['$scope', '$resource', '$http',
  function($scope, $resource, $http) {

  	var alltickets = $resource('/api/tickets');
  	alltickets.query(function(data) {
  		$scope.tickets = data;
  	});

    $scope.deleteTicket = function() {
        alert('Not implemented in this demo');
        // $http({
        //   method: 'DELETE',
        //   url: '/api/tickets/delete',
        //   data: $scope.ticket
        // })
        // .then(function(res) {
        // 	$location.path('home');
        // })
    }
  }
]);

ticketController
.controller('TicketCreateController', ['$scope', '$http', '$location', '$resource', 
  function($scope, $http, $location, $resource) {

	var csrList = $resource('/api/users/csr', {isArray: true});
    csrList.query(function(data) {
      $scope.csrList = data;
    });

    var customerList = $resource('/api/users/customers', {isArray: true});
    customerList.query(function(data) {
      $scope.customerList = data;
    });

    $scope.createTicket = function() {
    	var newTicket = $resource('/api/tickets');
    	newTicket.save($scope.ticket);
		// redirect if success 
		// do this only if it succeeds 
        $location.path('home');
    }
}]);

