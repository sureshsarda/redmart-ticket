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

