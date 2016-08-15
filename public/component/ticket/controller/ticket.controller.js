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

