angular
	//declaring a module named OWMApp and injecting ngRoute as a dependency
	.module('OWMApp', ['ngRoute'])
	//$routeProvider is used to set URL routing rules
	.config(['$routeProvider', function($routeProvider){
		//$routeProvider.when() is used to specify that when users request the root url, 
		$routeProvider.when('/', {
			//the app should respond with the home.html template and the home controller
			templateUrl : 'home.html',
			controller : 'HomeCtrl'
		//another route for viewing the details of weather in a particular city
		}).when('/city', {
			templateUrl : 'city.html',
			controller : 'CityCtrl'
		});
	}])
	//controller is defined as HomeCtrl
	.controller('HomeCtrl', function($scope){

	})
	.controller('CityCtrl', function($scope, $routeParams){
		//$routeParams prevent scope variable from being too specific (NY)
		//will render info specific to the route based off of data that was passed to the URL
		$scope.city = $routeParams.city;
	})