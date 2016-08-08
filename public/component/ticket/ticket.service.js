var ticketMetaDataModule = angular.module('ticketsapp.tickets.service', ['ngResource']);

ticketMetaDataModule.factory('ticketMetadataService', ['$http', function($http) {
	
	var promises = {};

	promises.status = $http.get('/api/tickets/options/status');
    promises.area = $http.get('/api/tickets/options/area');

	return promises;

}]);