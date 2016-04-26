describe("RecipesController", function() {
  var ctrl, httpBackend, location, resource, routeParams, scope, setupController;

  scope = null;
  ctrl = null;
  location = null;
  routeParams = null;
  resource = null;

  httpBackend = null;

  setupController = function(keywords, results) {
    return inject(function($location, $routeParams, $rootScope, $resource, $httpBackend, $controller) {
      var request;
      scope = $rootScope.$new();
      location = $location;
      resource = $resource;
      routeParams = $routeParams;
      routeParams.keywords = keywords;

      // Capture Injected Service
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

  beforeEach(module("angRec"));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    return httpBackend.verifyNoOutstandingRequest();
  });

  // Test 1 - Controller Initialization

  describe('controller initialization', function() {
    describe('when no keywords present', function() {
      beforeEach(setupController());
      return it('defaults to no recipes', function() {
        return expect(scope.recipes).toEqualData([]);
      });
    });
    // Test 2 - BackEnd Test
    return describe('with keywords', function() {
      var keywords, recipes;
      keywords = 'foo';
      recipes = [
        {
          id: 2,
          name: 'Baked Potatoes'
        }, {
          id: 4,
          name: 'Potatoes Au Gratin'
        }
      ];
      beforeEach(function() {
        setupController(keywords, recipes);
        return httpBackend.flush();
      });
      return it('calls the back-end', function() {
        return expect(scope.recipes).toEqualData(recipes);
      });
    });
  });

  // Test 3 - Search returns URL correctly
  return describe('search()', function() {
    beforeEach(function() {
      return setupController();
    });
    return it('redirects to itself with a keyword param', function() {
      var keywords;
      keywords = 'foo';
      scope.search(keywords);
      expect(location.path()).toBe("/");
      return expect(location.search()).toEqualData({
        keywords: keywords
      });
    });
  });
});