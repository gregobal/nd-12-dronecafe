let droneCafe = angular.module('droneCafe', ['ngRoute', 'ngResource']);

droneCafe
  .config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
      //$locationProvider.html5Mode(true);
      $locationProvider.hashPrefix("");

      $routeProvider
        .when('/', {
          templateUrl: 'src/Customer/Customer.html',
          controller: 'CustomerCtrl'
        })
        .when('/kitchen', {
          templateUrl: 'src/Kitchen/Kitchen.html',
          controller: 'KitchenCtrl'
        })
        .otherwise({
          redirectTo: '/'
        });
    }]
  );