describe("RecipeController", function(){
	var scope, ctrl, routeParams, httpBackend, recipeId, fakeRecipe, setupController;

	scope = null;
	ctrl = null;
	routeParams = null;
	httpBackend = null;
	recipeId = 42;

	fakeRecipe = {
		id: recipeId,
		name: "Baked Potatoes",
		instructions: "Pierce potato with fork, nuke for 20 minutes"
	};

	setupController = function(recipeExists) {
		if (recipeExists == null) {
			recipeExists = true;
		}
		return inject(function($location, $routeParams, $rootScope, $httpBackend, $controller) {
			var location;
			scope = $rootScope.$new();
			location = $location;
			httpBackend = $httpBackend;
			routeParams = $routeParams;
			routeParams.rec = recipeId;
			return ctrl = $controller('RecipeController', {
				$scope: scope
			});
		});
	};
  
  beforeEach(module("angRec"));

  afterEach(function(){
  	httpBackend.verifyNoOutstandingExpectation();
  	httpBackend.verifyNoOutstandingRequest();
  });
});