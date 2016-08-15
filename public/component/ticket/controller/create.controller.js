var ticketController = angular.module('ticketsapp.ticket.controller');

// controller to manage ticket creation
ticketController
  .controller('TicketCreateController', [
    '$scope', 
    '$http', 
    '$location', 
    '$resource', 
    'usersService',
    'ticketMetadataService',
    'ticketCrudService',
    function($scope, $http, $location, $resource, usersService, ticketMetadataService, ticketCrudService) {

      // populate all predefined fields
      usersService.csrList.then(function(res) {
        $scope.csrList = res.data.users;  
      });

      usersService.customerList.then(function(res) {
        $scope.customerList = res.data.users;  
      });

      ticketMetadataService.area.then(function(res) {
        $scope.areaList = res.data.area;
      });

      // called when user clicks create button
      // creates a new ticket based on ticket in scope
      $scope.createTicket = function() {
        ticketCrudService.create($scope.ticket)
        .then(function() {
          $location.path('home');  
        });        
      }
}]);

