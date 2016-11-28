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