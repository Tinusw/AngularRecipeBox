describe("RecipeController", function() {
	var scope, fakeRecipe, ctrl, routeParams, httpBackend, recipeId, setupController;

	scope       = null;
	ctrl        = null;
	routeParams = null;
	httpBackend = null;
	recipeId    = 42;

	// Create Fake Test Recipe
	fakeRecipe = 
		{
	    id: recipeId,
	    name: "Baked Potatoes",
	    instruction: "You put a bunch of shit into a microwave basically"
		};

	setupController = function(recipeExists) {
		if (recipeExists == null) {
			recipeExists - true;
		}
		return inject(function($location, $routeParams, $rootScope, $httpBackend, $controller) {
			var location;

			scope = $rootScope.new();
			location = $location;
			httpBackend = $httpBackend;
			routeParams = $routeParams;
			routeParams.recipeId = recipeId;
			return ctrl = $controller('RecipeController', {
				$scope: scope
			});
		});
	};

	beforeEach(module("AngRec"));

	afterEach(function(){
		httpBackend.verifyNoOutstandingExpectation();
		httpBackend.verifyNoOutstandingRequest();
	});
});