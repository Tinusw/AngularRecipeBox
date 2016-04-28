// Ang Module
var app = angular.module('angRec',['templates', 'ngRoute', 'ngResource', 'controllers', 'angular-flash.service', 'angular-flash.flash-alert-directive']);

app.config([
  '$routeProvider', function($routeProvider) {
    return $routeProvider.when('/', {
      templateUrl: "index.html",
      controller: 'RecipesController'
    }).when('/recipes/:recipeId', {
      templateUrl: "show.html",
      controller: 'RecipeController'
    });
  }
]);

controllers = angular.module('controllers', []);

