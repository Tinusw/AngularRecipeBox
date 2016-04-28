// Ang Module
var app = angular.module('angRec',['templates', 'ngRoute', 'ngResource', 'controllers', 'angular-flash.service', 'angular-flash.flash-alert-directive']);

app.config([
  '$routeProvider', 'flashProvider', function($routeProvider, flashProvider) {
    
    // exposing the various bootstrap alerts to angular-flash
    flashProvider.errorClassnames.push("alert-danger");
    flashProvider.errorClassnames.push("alert-warning");
    flashProvider.errorClassnames.push("alert-info");
    flashProvider.errorClassnames.push("alert-success");

    // routing
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

