var ticketController = angular.module('ticketsapp.ticket.controller');

// controller to manage edit of tickets
// ticket information and comments can be modified
ticketController
  .controller('TicketViewController', [
    '$scope', 
    '$stateParams' ,
    '$resource', 
    '$location', 
    '$http',
    'usersService',
    'ticketMetadataService',
    'ticketCrudService',
    function($scope, $stateParams, $resource, $location, $http, usersService, ticketMetadataService, ticketCrudService) {

      // populate predefined fields
      usersService.csrList.then(function(res) {
        $scope.csrList = res.data.users;  
      });

      usersService.customerList.then(function(res) {
        $scope.customerList = res.data.users;  
      });

      ticketMetadataService.area.then(function(res) {
        $scope.areaList = res.data;
      });
      
      ticketMetadataService.status.then(function(res) {
        $scope.statusList = res.data;
      });

      // load the ticket by id
      ticketCrudService.get($stateParams.id)
      .then(function(response) {
        $scope.ticket = response.data;
        $scope.disabled = ('Closed' == response.data.status);
      });
      
      // add a new comment
      $scope.addComment = function() {
        var newComment = {description: $scope.newComment.description, dateCreated: Date.now()};
        
        ticketCrudService.comment($scope.ticket._id, newComment)
        .then(function(response) {
          $scope.ticket.comments.push(newComment);
          $scope.newComment.description = "";  
        })
        .catch(function(res) {
          alert('Failed to add comment' + res);
        })        
    	}

      // update ticket
      // this function updates the ticket based on the ticket_id
      $scope.updateTicket = function() {
        
        ticketCrudService.update($scope.ticket)
        .then(function(response) {
          $location.path('home');
        })
        .catch(function() {
          alert('Failed to update. Please retry');
        })
      }
    }
]);
