var ticketController = angular.module('ticketsapp.ticket.controller');

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
        ticketCrudService.create($scope.ticket)
        .then(function() {
          $location.path('home');  
        });        
      }
}]);

