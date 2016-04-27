controllers = angular.module('controllers');

controllers.controller("RecipeController", ['$scope', '$routeParams', '$resource', function( $scope, $routeParams, $resource) {
	var Recipe;
	Recipe = $resource('/recipes/:recipeId', {
		recipeId: "@id",
		format: 'json'
	});
  
  // Making http calls out to tests
	return Recipe.get({
		recipeId: $routeParams.recipeId
	}, (function(recipe) {
		return $scope.recipe = recipe;
	}), (function(httpResponse){
		return $scope.recipe = null;
	}));
}]);