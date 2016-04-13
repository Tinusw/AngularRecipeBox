var controllers;

controllers = angular.module('controllers');

controllers.controller("RecipeController", ['$scope', '$routeParams', '$resource', function($scope, $routeParams, $resource){
    Recipe = $resource('/recipes/:recipeId', { 
    	recipeId: "@id", 
    	format: 'json'
    });
  }
]);