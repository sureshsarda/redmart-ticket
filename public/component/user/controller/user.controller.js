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
var userController = angular.module('ticketsapp.user.controller', []);

// user controller manages all operations on user
// create, delete
userController
  .controller('UserController', [
    '$scope', 
    '$http',
    '$resource',
    'usersService',
    'userCrudService',
    function($scope, $http, $resource, usersService, userCrudService) {

      // populate predefined fields
      usersService.userType.then(function(response) {
        $scope.userType = response.data.types;
      });

      usersService.csrList.then(function(response) {
        $scope.csrList = response.data.users;
      });

      usersService.customerList.then(function(response) {
        $scope.customerList = response.data.users;
      });

      
      // create user
      // TODO show error when a repeat user is added
      $scope.createUser = function() {
        var userObject = JSON.parse(JSON.stringify($scope.user));
        userCrudService.create(userObject)
        .success(function() {
          clear();
            
          if ($scope.user.type == 'CSR') {
            $scope.csrList.push(userObject);
          }
          else {
            $scope.customerList.push(userObject); 
          }  
        })
        .catch(function() {
          alert('Operation Failed. Try refreshing the page.');
        });

        
      };

      // delete a user
      $scope.delete = function(id, index, type) {
          userCrudService.delete(id)
          .then(function(res) {
            if (type == 'CSR')
              $scope.csrList.splice(index, 1);
            else
              $scope.customerList.splice(index, 1);
          })
          .catch(function() {
            alert('Operation Failed. Try refreshing the page.');
          })
      }

      // clears the fields
      clear = function() {
        $scope.user.name = "";
        $scope.user.email = "";
      }

    }
]);