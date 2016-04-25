// Ang Module
var app = angular.module('angRec',['templates', 'ngRoute', 'controllers']);

app.config([
  '$routeProvider', function($routeProvider) {
    return $routeProvider.when('/', {
      templateUrl: "index.html",
      controller: 'RecipesController'
    });
  }
]);

controllers = angular.module('controllers', []);

controllers.controller("RecipesController", ['$scope', function($scope) {}]);