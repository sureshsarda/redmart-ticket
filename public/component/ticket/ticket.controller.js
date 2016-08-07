var ticketController = angular.module('ticketsapp.ticket.controller', []);


ticketController.controller('TicketViewController', ['$scope', '$stateParams' ,'$resource', '$location', '$http',
  function($scope, $stateParams, $resource, $location, $http) {
    
   // list of customer service representative(CSR)
    // a CSR is a regular user but of type 'CSR'
    // create a provider/service (whatever which suites) such that direct calls
    // can be avoided.
    var csrList = $resource('/api/users/csr', {isArray: true});
    csrList.query(function(data) {
      $scope.csrList = data;
    });

    // list of customers
    // to be refactored into a provider/service
    var customerList = $resource('/api/users/customers', {isArray: true});
    customerList.query(function(data) {
      $scope.customerList = data;
    });

    $http.get('/api/tickets/options/status').then(function(response) {$scope.statusList = response.data;})
    $http.get('/api/tickets/options/area').then(function(response) {$scope.areaList = response.data;})

    // this is the current ticket
    var ticket = $resource('/api/tickets/:ticket_id', {ticket_id: $stateParams.id});
    ticket.get(function(data) {
    	$scope.ticket = data;
	   	$scope.commentList = data.comments;
	   	$scope.disabled = ('Closed' == data.status);
    });

    // add comment
    // called when a new comment is added
    // this function pushes the comment to the comment list of the current ticket
    // in scope.

    // the following functionality breaks if a duplicate comment is added
    $scope.addComment = function() {
      var ticket = $scope.ticket;
      var newComment = {description: $scope.newComment.description, dateCreated: Date.now()};
     
      var comment = $resource('/api/tickets/:ticket_id/comment', {ticket_id: ticket._id});
      comment.save(newComment);
      $scope.commentList.push(newComment);
      $scope.ticket.comments.push(newComment);
      $scope.newComment.description = "";
  	}

    // update ticket
    // this function updates the ticket based on the ticket_id
    // it still uses $http service instead of resource (incomplete)
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

    $scope.deleteTicket = function(id) {
        var endpoint = '/api/tickets/' + id;
        // $resource.delete(endpoint);
        $http({
          method: 'DELETE',
          url: endpoint,
          data: $scope.ticket
        })
        .then(function(res) {
        	$location.path('home');
        });
    }
  }
]);

ticketController
.controller('TicketCreateController', ['$scope', '$http', '$location', '$resource', 
  function($scope, $http, $location, $resource) {

    $http.get('/api/users/csr').then(function(response) {$scope.csrList = response.data;})
    $http.get('/api/users/customers').then(function(response) {$scope.customerList = response.data;})
    $http.get('/api/tickets/options/status').then(function(response) {$scope.statusList = response.data;})
    $http.get('/api/tickets/options/area').then(function(response) {$scope.areaList = response.data;})

    $scope.createTicket = function() {
    	var newTicket = $resource('/api/tickets');
    	newTicket.save($scope.ticket);
		  // redirect if success 
		  // do this only if it succeeds 
      $location.path('home');
    }
}]);

