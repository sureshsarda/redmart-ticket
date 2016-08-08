var userServicesModule = angular.module('ticketsapp.user.service', ['ngResource']);

userServicesModule.factory('usersProvider', ['$http', function($http) {
	
	$http.get('/api/users/csr').then(function(response) {this.csrList = response.data;})
    $http.get('/api/users/customers').then(function(response) {this.customerList = response.data;})

    return {
    	'csrList' : csrList,
    	'customerList': customerList
    }

}]);