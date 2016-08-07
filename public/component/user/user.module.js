var userModule = angular.module('ticketsapp.user', ['ngResource']);

userModule.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('user', {
        url: '/user',
        templateUrl: '/component/user/user.html',
        controller: 'UserController'
    });
  }]);


userModule.controller('UserController', [
  '$scope', '$resource',
  function($scope, $resource) {
    $scope.userTypes = ['Customer', 'CSR'];

    var csrList = $resource('/api/users/csr', {isArray: true});
    csrList.query(function(data) {
      $scope.csrList = data;
    });

    var customerList = $resource('/api/users/customers', {isArray: true});
    customerList.query(function(data) {
      $scope.customerList = data;
    });

    // create user
    $scope.createUser = function() {
      var user = $resource('/api/users/');
      user.save($scope.user);
    };

  }
]);