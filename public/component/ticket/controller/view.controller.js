/*
 * Copyright (C) 2016 Suresh Sarda
 * 
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the
 * Free Software Foundation; either version 3, or (at your option) any
 * later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program; see the file COPYING3.  If not see
 * <http://www.gnu.org/licenses/>.
 */
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
        $scope.areaList = res.data.area;
      });
      
      ticketMetadataService.status.then(function(res) {
        $scope.statusList = res.data.status;
      });

      // load the ticket by id
      ticketCrudService.get($stateParams.id)
      .then(function(response) {
        $scope.ticket = response.data.ticket;
        $scope.disabled = ('Closed' == response.data.ticket.status);
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
