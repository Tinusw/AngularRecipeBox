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
});