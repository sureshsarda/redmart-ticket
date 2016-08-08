var userServicesModule = angular.module('ticketsapp.user.service', ['ngResource']);

userServicesModule.factory('usersService', [
	'$http', 
	function($http) {
	
		var promises = {};

		promises.csrList = $http.get('/api/users/csr');
		promises.customerList = $http.get('/api/users/customers');
		promises.userType = $http.get('/api/users/type');

		return promises;

	}
]);