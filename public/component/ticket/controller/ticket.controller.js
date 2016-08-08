var ticketController = angular.module('ticketsapp.ticket.controller', []);

// this controller manages the home view
// list the tickets on load
// it has function to delete the tickets
ticketController
  .controller('TicketListController', [
    '$scope', 
    '$resource', 
    '$http',
    'ticketCrudService',
    function($scope, $resource, $http, ticketCrudService) {

      // populate the list of all tickets
      ticketCrudService.getAll()
      .then(function(response) {
    		$scope.tickets = response.data;
    	});

      // delete the ticket
      $scope.deleteTicket = function(id) {
        ticketCrudService.delete(id)
        .then(function(res) {
         	$location.path('home');
        });
      }
    }
]);

