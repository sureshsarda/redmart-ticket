var ticketMetaDataModule = angular.module('ticketsapp.ticket.service', ['ngResource']);

ticketMetaDataModule.factory('ticketMetadataService', ['$http', function($http) {
	
	var promises = {};

	promises.status = $http.get('/api/tickets/options/status');
    promises.area = $http.get('/api/tickets/options/area');

	return promises;

}]);

ticketMetaDataModule.factory('ticketCrudService', ['$http', function($http) {
	
	var crud = {}

	crud.create = function(ticket) {
		return $http({
            method: 'POST',
            url: '/api/tickets/',
            data: ticket
        });
	}

	crud.delete = function(id) {
		var endpoint = '/api/tickets/' + id;
      
        return $http({
            method: 'DELETE',
            url: endpoint
        });
	}

	crud.update = function(ticket) {
		return $http({
        	method: 'PUT',
        	url: '/api/tickets/' + ticket._id,
        	data: ticket
        });
	}

	crud.getAll = function() {
		return $http({
			method: 'GET',
			url: '/api/tickets/'
		});
	}

	crud.get = function(id) {
		return $http({
			method: 'GET',
			url: '/api/tickets/' + id
		});
	}

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