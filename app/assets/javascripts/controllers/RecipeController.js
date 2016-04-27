controllers = angular.module('controllers');

controllers.controller("RecipeController", ['$scope', '$routeParams', '$resource', function( $scope, $routeParams, $resource) {
	var Recipe;
	Recipe = $resource('/recipes/:recipeId', {
		recipeId: "@id",
		format: 'json'
	});
}]);