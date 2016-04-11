describe("RecipesController", function() {
  var ctrl, location, resource, routeParams, scope, setupController;

  scope = null;
  ctrl = null;
  location = null;
  routeParams = null;
  resource = null;

  // access injected service later
  httpBackend = null;

	setupController= function(keywords,results) {
		return inject( function($location, $routeParams, $rootScope, $resource, $httpBackend, $controller) {
			scope       = $rootScope.$new();
			location    = $location;
			resource    = $resource;
			routeParams = $routeParams;
			routeParams.keywords = keywords;

			// capture injected http service
			httpBackend = $httpBackend;

			if (results) {
				request = new RegExp("\/recipes.*keywords=" + keywords);
				  httpBackend.expectGET(request).respond(results);
			}
			return ctrl = $controller('RecipesController', {
				$scope: scope,
				$location: location
			});
		});
	};
  
  beforeEach(module('angRec'));

	afterEach(function(){
  	httpBackend.verifyNoOutStandingExpectation();
  	return httpBackend.verifyNoOutStandingRequest();
  });
  
  // Init Test
  describe('controller initialization', function(){
  	return describe('when no keywords present', function(){
  	  beforeEach(setupController());
  		return it('defaults to no recipes', function(){
  			return expect(scope.recipes).toEqualData([]);
  		});
  	});
  });
  
  // Backend Test
  describe('with keywords', function(){
  	return keywords = 'foo';
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
			return expect(scope.recipes).toEqualData(recipes);
  	});
  });

  // Test Search
  describe('search()', function(){
  	beforeEach(function(){
  		return setupController();
  	});
  	return it('redirects to itself with a keyword param', function(){
  		keywords = 'foo';
  		scope.search(keywords);
  		expect(location.path()).toBe('/');
  		return expect(location.search()).toEqualData({
  			keywords: keywords
  		});
  	});
  });


  beforeEach(setupController());
  
});