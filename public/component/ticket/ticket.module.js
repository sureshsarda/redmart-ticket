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