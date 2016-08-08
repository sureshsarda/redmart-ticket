var ticketController = angular.module('ticketsapp.ticket.controller', []);


ticketController
  .controller('TicketListController', [
    '$scope', 
    '$resource', 
    '$http',
    function($scope, $resource, $http) {

      // populate the list of all tickets
    	var alltickets = $resource('/api/tickets');
    	alltickets.query(function(data) {
    		$scope.tickets = data;
    	});

      // delete the ticket
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

