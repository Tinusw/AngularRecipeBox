controllers = angular.module('controllers');

controllers.controller("RecipesController", ['$scope', '$routeParams','$location', '$resource', function($scope, $routeParams, $location, $resource) {
		var Recipe;
		var keywords;

	  //Search Function
	  $scope.search = function(keywords) {
	  	return $location.path("/").search('keywords', keywords);
	  };

    Recipe = $resource('/recipes/:recipeId', {
	    recipeId: "@id", 
	    format: 'json' 
	  });

	  if ($routeParams.keywords) {
      Recipe.query({
        keywords: $routeParams.keywords
      }, function(results) {
        return $scope.recipes = results;
      });
    } else {
      return $scope.recipes = [];
    }

    return $scope.view = function(recipeId) {
    	return $location.path("/recipes/" + recipeId);
    };
  }
]);