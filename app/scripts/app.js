'use strict';

/**
 * @ngdoc overview
 * @name weatherCellApp
 * @description
 * # weatherCellApp
 *
 * Main module of the application.
 */
angular
    .module('weatherCellApp', [
    'ngRoute'
  ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: 'views/main.html',
                controller: 'LoginController'
            })
            .when('/home', {
                templateUrl: 'views/home.html',
                controller: 'HomeController'
            })
            .otherwise({
                redirectTo: '/login'
            });
    });