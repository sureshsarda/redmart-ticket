var ticketController = angular.module('ticketsapp.ticket.controller');

ticketController
  .controller('TicketCreateController', [
    '$scope', 
    '$http', 
    '$location', 
    '$resource', 
    'usersService',
    'ticketMetadataService',
    function($scope, $http, $location, $resource, usersService, ticketMetadataService) {

      usersService.csrList.then(function(res) {
        $scope.csrList = res.data;  
      });

      usersService.customerList.then(function(res) {
        $scope.customerList = res.data;  
      });

      ticketMetadataService.area.then(function(res) {
        $scope.areaList = res.data;
      });

      $scope.createTicket = function() {
      	var newTicket = $resource('/api/tickets');
      	newTicket.save($scope.ticket);
  		  // redirect if success 
  		  // do this only if it succeeds 
        $location.path('home');
      }
}]);

