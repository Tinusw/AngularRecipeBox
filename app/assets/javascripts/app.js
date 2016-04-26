// Ang Module
var app = angular.module('angRec',['templates', 'ngRoute', 'ngResource', 'controllers']);

app.config([
  '$routeProvider', function($routeProvider) {
    return $routeProvider.when('/', {
      templateUrl: "index.html",
      controller: 'RecipesController'
    });
  }
]);


// Canned Recipe List
recipes = [
  {
  	id: 1,
  	name: 'Baked Potato w/ Cheese'
  },
  {
  	id: 2,
  	name: 'Garlic Mashed Potatoes'
  },
  {
  	id: 3,
  	name: 'Potatoes Au Gratin'
  },
  {
  	id: 4,
  	name: 'Baked Brussel Sprouts'
  }
 ];

controllers = angular.module('controllers', []);

controllers.controller("RecipesController", ['$scope', '$routeParams','$location', '$resource', function($scope, $routeParams, $location){
	  var keywords;

	  //Search Function
	  $scope.search = function(keywords) {
	  	return $location.path("/").search('keywords', keywords);
	  };

    Recipe = $resource('/recipes/:recipeId', { recipeId: "@id", format: 'json' });

	  if ($routeParams.keywords) {
      Recipe.query(keywords: $routeParams.keywords, results(function(){
        $scope.recipes = results;
      });
	  } else {
	  	return $scope.recipes = [];
	  }
  }
]);