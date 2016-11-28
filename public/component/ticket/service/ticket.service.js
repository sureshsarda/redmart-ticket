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
	crud.getAll = function(filter) {
		return $http({
			method: 'GET',
			url: '/api/tickets?' + getObjectAsUrl(filter)
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

	function getObjectAsUrl(obj) {
		var str = Object.keys(obj).map(function(key){ 
  			return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]); 
		}).join('&');
		return str;
	}
	

	return crud;

}]);