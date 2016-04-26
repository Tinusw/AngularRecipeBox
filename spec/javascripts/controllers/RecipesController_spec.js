describe("RecipesController", function() {
  var ctrl, location, resource, routeParams, scope, setupController, httpBackend;

  scope = null;
  ctrl = null;
  location = null;
  routeParams = null;
  resource = null;

  httpBackend = null;

	setupController= function(keywords) {
		return inject( function($location, $routeParams, $rootScope, $resource, $httpBackend, $controller) {
			scope       = $rootScope.$new();
			location    = $location;
			resource    = $resource;
			routeParams = $routeParams;
			routeParams.keywords = keywords;

			// capture injected service
			httpBackend = $httpBackend;

			if (results) {
				request = new RegExp("\/recipes.*keywords=" + keywords);
				httpBackend.expectGet(request).respond(results);
			}
			return ctrl = $controller('RecipesController', {
				$scope: scope,
				$location: location
			});
		});
	};

  beforeEach(module('angRec'));
  beforeEach(setupController());
  return it('defaults to no recipes', function() {
    return expect(scope.recipes).toEqualData([]);
  });

  afterEach(function(){
  	httpBackend.verifyNoOutstandingExpectatition();
  	return httpBackend.verifyNoOutstandingRequest();
  });

  // Test 1 - controller initialization

  describe('controller initialization', function() {
  return describe('when no keywords present', function() {
    beforeEach(setupController());
    return it('defaults to no recipes', function() {
      return expect(scope.recipes).toEqualData([]);
	    });
	  });
	});

	// Test 2 - Back-end test

	describe('with keywords', function(){
		var keywords, recipes;
		keywords = 'foo';
		recipes = [
		{
			id: 2,
			name: 'Baked Potatoes'
		},
		{
			id: 4,
			name: 'Potatoes Au Gratin'
		}
		];

		beforeEach(function(){
			setupController(keywords, recipes);
			return httpBackend.flush();
		});
		return it('calls the back-end', function(){
			return expect(scope.recipes.toEqualData(recipes));
		});
	});

	// Test 3 - Test Search returns URL correctly
	describe('search()', function(){
		beforeEach(function(){
			return setupController();
		});
		return it('redirects to itself with a keyword param', function(){
			var keywords;
			keywords = 'foo';
			scope.search(keywords);
			expect(location.path()).toBe('/');
			return expect(location.search()).toEqualData({keywords: keywords});
		});
	});
});