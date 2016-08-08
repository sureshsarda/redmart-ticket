var ticketService = angular.module('ticketsapp.ticket.service', ['ngResource']);

ticketService.factory('ticketMetadataService', ['$http', function($http) {
	
	var promises = {};

	// status codes of ticket
	// typically - NEW OPEN CLOSE
	promises.status = $http.get('/api/tickets/options/status');

	// area/department of the ticket
    promises.area = $http.get('/api/tickets/options/area');

	return promises;

}]);


// this service should be in a separate file
// crud operations on ticket
ticketService.factory('ticketCrudService', ['$http', function($http) {
	
	var crud = {}

	// create a new ticket based on the object passed
	crud.create = function(ticket) {
		return $http({
            method: 'POST',
            url: '/api/tickets/',
            data: ticket
        });
	}

	// deletes a ticket based on the id passed
	crud.delete = function(id) {
		var endpoint = '/api/tickets/' + id;
      
        return $http({
            method: 'DELETE',
            url: endpoint
        });
	}

	// update the ticket based on the object passed
	// uses ticket id to update the ticket
	crud.update = function(ticket) {
		return $http({
        	method: 'PUT',
        	url: '/api/tickets/' + ticket._id,
        	data: ticket
        });
	}

	// fetches list of all tickets
	crud.getAll = function() {
		return $http({
			method: 'GET',
			url: '/api/tickets/'
		});
	}

	// get details about a ticket based on it's id
	crud.get = function(id) {
		return $http({
			method: 'GET',
			url: '/api/tickets/' + id
		});
	}

	// add comment to a ticket
	// id is the id of the ticket
	// comment is the new comment to add
	crud.comment = function(id, comment) {
		var endpoint = '/api/tickets/' + id + '/comment/';
		console.log(endpoint);
		return $http({
			method: 'POST',
			url: endpoint,
			data: comment
		});
	}

	return crud;

}]);