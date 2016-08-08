var ticketModule = angular.module('ticketsapp.ticket', []);

// ticket module master file
ticketModule.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) { 
    $stateProvider
    .state('create-ticket', {
      url: '/create-ticket',
      templateUrl: '/component/ticket/template/create.html',
      controller: 'TicketCreateController'
    })
    .state('view-ticket', {
      url: '/view-ticket/{id}',
      templateUrl: '/component/ticket/template/view.html',
      controller: 'TicketViewController'
    })
    .state('home', {
      url: '/home',
      templateUrl: '/component/ticket/template/home.html',
      controller: 'TicketListController'
    });
    
    $urlRouterProvider.otherwise('home');
}]);