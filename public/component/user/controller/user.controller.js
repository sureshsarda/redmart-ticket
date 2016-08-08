var userController = angular.module('ticketsapp.user.controller', []);


userController
  .controller('UserController', [
    '$scope', 
    '$http',
    '$resource',
    'usersService',
    function($scope, $http, $resource, usersService) {

      usersService.userType.then(function(response) {
        $scope.userType = response.data;
      });

      usersService.csrList.then(function(response) {
        $scope.csrList = response.data;
      });

      usersService.customerList.then(function(response) {
        $scope.customerList = response.data;
      });

      
      // create user
      // TODO show error when a repeat user is added
      $scope.createUser = function() {
        var userObject = JSON.parse(JSON.stringify($scope.user));
        var user = $resource('/api/users/');
        user.save(userObject);

        clear();
          
        if ($scope.user.type == 'CSR') {
          $scope.csrList.push(userObject);
        }
        else {
          $scope.customerList.push(userObject); 
        }
      };

      $scope.delete = function(id, index, type) {
          var endpoint = '/api/users/' + id;
          
          $http({
            method: 'DELETE',
            url: endpoint,
          })
          .then(function(res) {
            if (type == 'CSR')
              $scope.csrList.splice(index, 1);
            else
              $scope.customerList.splice(index, 1);
          });
      }

      // clears the fields
      clear = function() {
        $scope.user.name = "";
        $scope.user.email = "";
      }

    }
]);