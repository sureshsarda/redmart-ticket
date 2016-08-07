var ticketModule = angular.module('ticketsapp.ticket', []);

ticketModule.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) { 
    $stateProvider
    .state('create-ticket', {
      url: '/create-ticket',
      templateUrl: '/component/ticket/create-ticket.html',
      controller: 'TicketCreateController'
    })
    .state('view-ticket', {
      url: '/view-ticket/{id}',
      templateUrl: '/component/ticket/view-ticket.html',
    })
    .state('home', {
      url: '/home',
      templateUrl: '/component/ticket/home.html',
      controller: 'TicketController'
    });
    
    $urlRouterProvider.otherwise('home');
}]);