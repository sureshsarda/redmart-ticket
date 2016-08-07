var userModule = angular.module('ticketsapp.user', []);

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
      '$scope',
      function($scope){
        $scope.userTypes = ['Customer', 'Admin'];

        $scope.createUser = function() {
          console.log("Create New User");
          console.log($scope.name);
          console.log($scope.email);
          console.log($scope.type);
      };
    }]);