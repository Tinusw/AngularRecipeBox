describe("RecipesController", function() {
	var ctrl, location, resource, routeParams, scope, setupController;

	ctrl  = null;
	location = null;
	routeParams = null;
	scope = null;
	resource = null;
	setupController = function(keywords) {
		return inject(function($location, $routeParams, $rootScope, $resource, $controller){
			scope = $rootScope.new();

			location = $location;
			routeParams = $routeParams;
			routeParams.keywords = keywords;
			resource = $resource;

			return ctrl = $controller('RecipesController', {
				$scope: scope,
				$location: location
			});
		});
	};

	beforeEach(angular.mock.module("angRec"));

	beforeEach(setupController());
	return it('defaults to no recipes', function() {
		return expect(scope.recipes).toEqualData([]);
	});
});