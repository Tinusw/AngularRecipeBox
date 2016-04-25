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

controllers.controller("RecipesController", ['$scope', '$routeParams','$location', function($scope, $routeParams, $location){
	  var keywords;

	  //Search Function
	  $scope.search = function(keywords) {
	  	return $location.path("/").search('keywords', keywords);
	  };

	  if ($routeParams.keywords) {
	  	keywords = $routeParams.keywords.toLowerCase();
	  	return $scope.recipes = recipes.filter(function(recipe) {
	  		return recipe.name.toLowerCase().indexOf(keywords) !== -1;
	  	});
	  } else {
	  	return $scope.recipes = [];
	  }
  }
]);