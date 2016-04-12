var app = angular.module('angRec',['templates', 'ngRoute','ngResource', 'controllers'
	]);

// Route Config
app.config(['$routeProvider', function($routeProvider){
	return $routeProvider.when('/', {
	  templateUrl: "index.html",
	  controller: 'RecipesController'
    });
  }
]);

controllers = angular.module('controllers', []);

controllers.controller("RecipesController", ['$scope', '$routeParams', '$location', '$resource', function($scope, $routeParams, $location, $resource) {

	  var keywords;
	  $scope.search = function(keywords){
	  	return $location.path("/").search('keywords', keywords);
	  };
    
    // using $resource to send http requests to rspec tests
	  var Recipe;
	  Recipe= $resource('/recipes/:recipeId', {
	  	recipeId: "@id", format: 'json'
	  });

	  if ($routeParams.keywords) {
	  	Recipe.query({
	  		keywords: $routeParams.keywords
	  	}, function(results){
	  		return $scope.recipes = results;
	  	});
	  } else {
	  	return $scope.recipes = [];
	  }
	}
]);