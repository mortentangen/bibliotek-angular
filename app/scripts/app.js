'use strict';

angular.module('bibliotekAngularApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap',
  'firebase'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/bok/:id', {
        templateUrl: 'views/bok.html',
        controller: 'VisBokCtrl'
      })
      .when('/bok/:id/edit', {
          templateUrl: 'views/bok.html',
          controller: 'EditerBokCtrl'
        })
      .when('/bok/', {
          templateUrl: 'views/bok.html',
          controller: 'NyBokCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
