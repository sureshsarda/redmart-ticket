var userServicesModule = angular.module('ticketsapp.user.service', ['ngResource']);

userServicesModule.factory('usersService', [
	'$http', 
	function($http) {
	
		var promises = {};

		promises.csrList = $http.get('/api/users/csrs');
		promises.customerList = $http.get('/api/users/customers');
		promises.userType = $http.get('/api/users/type');

		return promises;

	}
]);

// crud operation on user
// this service should be in a separate file of it;s own
userServicesModule.factory('userCrudService', [
	'$http', 
	function($http) {
	
		var crud = {}

		// create a new user based on object passed
		crud.create = function(user) {
			return $http({
				method: 'POST',
				url: '/api/users/',
				data: user
			})
		}

		// delete a user based on the id passed
		crud.delete = function(id) {
			var endpoint = '/api/users/' + id;
			return $http({
            	method: 'DELETE',
            	url: endpoint
          	})
		}
		return crud;
	}
]);