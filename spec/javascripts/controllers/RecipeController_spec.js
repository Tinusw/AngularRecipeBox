describe("RecipeController", function(){
	var scope, ctrl, routeParams, httpBackend, recipeId, fakeRecipe, setupController, flash, location;

	scope = null;
	ctrl = null;
	routeParams = null;
	httpBackend = null;
	flash = null;
  location = null;
	recipeId = 42;

	fakeRecipe = {
		id: recipeId,
		name: "Baked Potatoes",
		instructions: "Pierce potato with fork, nuke for 20 minutes"
	};

	setupController = function(recipeExists, recipeId) {
		if (recipeExists == null) {
			recipeExists = true;
		} 
    if (recipeId == null) {
      recipeId = 42;
    }
		return inject(function($location, $routeParams, $rootScope, $httpBackend, $controller, _flash_) {
			var location, request, results;
			scope = $rootScope.$new();
			location = $location;
			httpBackend = $httpBackend;
			routeParams = $routeParams;
      if (recipeId) {
        routeParams.recipeId = recipeId;
      }
			flash = _flash_;
      
      // Get Paths working
      if (recipeId) {
  			request = new RegExp("\/recipes/" + recipeId);
        results = recipeExists ? [200, fakeRecipe] : [404];
        httpBackend.expectGET(request).respond(results[0], results[1]);
      }

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
  
  // Tests
  describe('controller initialization', function() {
    describe('recipe is found', function() {
      beforeEach(setupController());
      return it('loads the given recipe', function() {
        httpBackend.flush();
        return expect(scope.recipe).toEqualData(fakeRecipe);
      });
    });
    return describe('recipe is not found', function() {
      beforeEach(setupController(false));
      return it('loads the given recipe', function() {
        httpBackend.flush();
        expect(scope.recipe).toBe(null);
        return expect(flash.error).toBe("There is no recipe with ID " + recipeId);
      });
    });
  });

  describe('create', function(){
    newRecipe = {
      id: 42,
      name: 'Toast', 
      instructions: 'put in toaster, push lever, add butter'
    };
    beforeEach(function() {
      var request;
      setupController(false, false);
        request = new RegExp("\/recipes");
        return httpBackend.expectPOST(request).respond(201, newRecipe);
    });
    return it('posts to the backend', function() {
      scope.recipe.name = newRecipe.name;
      scope.recipe.instructions = newRecipe.instructions;
      scope.save();
      httpBackend.flush();
      return expect(location.path()).toBe("/recipes/" + newRecipe.id);
    });
  });

  describe('update', function() {
    updateRecipe = {
      name: 'Toast',
      instructions: 'put in toaster, push lever, add butter'
    };
    beforeEach(function(){
      var updatedRecipe;
      setupController();
      httpBackend.flush();
      request = new RegExp("\/recipes");
      httpBackend.expectPUT(request).respond(204);
    });
    return it('posts to the backend', function() {
      scope.recipe.name = updatedRecipe.name;
      scope.recipe.instructions = updateRecipe.instructions;
      scope.save();
      httpBackend.flush();
      return expect(location.path()).toBe("/recipes/#{scope.recipe.id}");
    });
  });

  describe('delete', function() {
    beforeEach(function(){
      setupController();
      httpBackend.flush();
      request = new RegExp("\/recipes/#{scope.recipe.id}");
      httpBackend.expectDELETE(request).respond(204);
    });
    return it('posts to the backend', function(){
      scope.delete();
      httpBackend.flush();
      return expect(location.path()).toBe("/");
    });
  });
});