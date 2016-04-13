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
		if (recipeExists === null) {
			recipeExists - true;
		}
		return inject(function($location, $routeParams, $rootScope, $httpBackend, $controller) {
			var location;

			scope = $rootScope.new();
			location = $location;
			httpBackend = $httpBackend;
			routeParams = $routeParams;
			routeParams.recipeId = recipeId;

			request = new RegExp("\/recipes/#{recipeId}");
			results = recipeExists ? [200, fakeRecipe] :[404];
			httpBackend.expectGet(request).respond(results[0], results[1]);

			return ctrl = $controller('RecipeController', {
				$scope: scope
			});
		});
	};

	beforeEach(module("angRec"));

	afterEach(function(){
		httpBackend.verifyNoOutstandingExpectation();
		return httpBackend.verifyNoOutstandingRequest();
	});

	describe('controller intialization', function() {
    describe('recipe is found', function() {
    	beforeEach(setupController());
    	return it('loads the given recipe', function(){
    		httpBackend.flush();
    		return expect(scope.recipe).toEqualData(fakeRecipe);
    	});
    });
    describe('recipe is not found', function(){
    	beforeEach(setupController(false));
    	return it('loads the given recipe', function(){
    		httpBackend.flush();
    		return expect(scope.recipe).toBe(null);
    	});
    });
	});
});