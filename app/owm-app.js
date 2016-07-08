angular
	//declaring a module named OWMApp and injecting ngRoute as a dependency
	.module('OWMApp', ['ngRoute'])
		.value('owmCities',
		 ['New York', 'Dallas', 'Chicago'])
	//$routeProvider is used to set URL routing rules
	.config(['$routeProvider', function($routeProvider){
		//$routeProvider.when() is used to specify that when users request the root url, 
		$routeProvider.when('/', {
			//the app should respond with the home.html template and the home controller
			templateUrl : 'home.html',
			controller : 'HomeCtrl as home',
			
		//another route for viewing the details of weather in a particular city
		//using the colon character tells $routeProvider to treat the URL as a dynamic value
		})
		.when('/cities/:city', {
			templateUrl : 'city.html',
			controller : 'CityCtrl as city',
			
			// resolve property will preload the city before the controller and template run so that when a user provide an input for an unsupported city, the city view would not be loaded
			//the view will not be rendered until the city dependency is resolved
			//resolvers act as a middleware before a view is rendered, a promise can be returned instead of an actual value if something asynchonous needs to be fetched
			//forces dependencies to resolve before the route is displayed.
			//resolve properties can be then injected into the controller
			resolve : {
				city: function(owmCities, $route, $location) {
					var city = $route.current.params.city;
					//check to see if there is a matching city
					if(owmCities.indexOf(city) == -1 ){
						//$location service will redirect to the error page when a matching city is not found
						//does the matching to change the URL 
						//reroutes user to an error page
						$location.path('/error'); 
						return;
					}
					return city;
				}
			}
		})
		// when error display template message
		.when('/error', {
			//this template property supplies an in-line template. This practice should be avoided because it mixes template and JS code 
			template : '<p>Error - Page Not Found</p>' 
		})
		//otherwise() is a fallback method to catch any routes that havent been specified
		.otherwise('/error');
	}])
	.run(['$rootScope', '$location', '$timeout', function($rootScope, $location, $timeout){
		//when there is a route change error, reroute the user to the error path
		$rootScope.$on('$routeChangeError', function(){
			$location.path('/error');
		});
		// when the route change starts, set the root scope 'isLoading' variable to true
		$rootScope.$on('$routeChangeStart', function(){
			$rootScope.isLoading = true;
		});
		//when route change succeeds, wait 1 sec and then set isLoading back to false
		$rootScope.$on('$routeChangeSuccess', function(){
			$timeout(function(){
				$rootScope.isLoading = false;
			}, 1000);
		});
	}])
	//controller is defined as HomeCtrl
	.controller('HomeCtrl', ['$scope', function($scope){
		var vm = this;
		vm.welcomeMessage = "Welcome Home";
	}])
	.controller('CityCtrl', ['city', function(city){
		var vm = this;
		//$routeParams prevent scope variable from being too specific (NY)
		//will render info specific to the route based off of data that was passed to the URL
		vm.city = city;
	}])