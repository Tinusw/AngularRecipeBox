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

