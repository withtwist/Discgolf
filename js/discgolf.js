var discApp = angular.module('discgolfApp', ['ngRoute', 'discgolfControllers']);
discApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/setupview.html',
        controller: 'setupCtrl',
        activetab: 'setup',
        resolve: setupController.resolve
      }).
      when('/game', {
        templateUrl: 'partials/gameview.html',
        controller: 'gameCtrl',
        activetab: 'game'
      }).
      otherwise({
        redirectTo: '/'
      });
  }
]);
