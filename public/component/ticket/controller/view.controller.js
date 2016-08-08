var ticketController = angular.module('ticketsapp.ticket.controller');

ticketController
  .controller('TicketViewController', [
    '$scope', 
    '$stateParams' ,
    '$resource', 
    '$location', 
    '$http',
    'usersService',
    'ticketMetadataService',
    function($scope, $stateParams, $resource, $location, $http, usersService, ticketMetadataService) {

      usersService.csrList.then(function(res) {
        $scope.csrList = res.data;  
      });

      usersService.customerList.then(function(res) {
        $scope.customerList = res.data;  
      });

      ticketMetadataService.area.then(function(res) {
        $scope.areaList = res.data;
      });
      
      ticketMetadataService.status.then(function(res) {
        $scope.statusList = res.data;
      });

      
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
