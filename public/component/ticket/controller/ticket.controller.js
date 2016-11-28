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

            $scope.uiFilterObject = {};
            var filterObject = {};
            reloadData();

            function reloadData() {
                ticketCrudService.getAll(filterObject)
                .then(function(response) {
                    $scope.tickets = response.data.tickets;
                });    
            }
        

            // delete the ticket
            $scope.deleteTicket = function(id) {
                ticketCrudService.delete(id)
                    .then(function(res) {
                        $location.path('home');
                });
            }

            $scope.setFilter = function(key, value, displayName) {
                filterObject[key] = value;
                $scope.uiFilterObject[key] = displayName;
                reloadData();
            }

            $scope.unsetFilter = function(key) {
                filterObject[key] = '';
                $scope.uiFilterObject[key] = '';
                reloadData();
            }
    }
]);

