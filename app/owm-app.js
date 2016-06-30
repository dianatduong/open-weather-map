angular
	//declaring a module named OWMApp and injecting ngRoute as a dependency
	.module('OWMApp', ['ngRoute'])
	//$routeProvider is used to set URL routing rules
	.config(['$routeProvider', function($routeProvider){
		//$routeProvider.when() is used to specify that when users request the root url, the app should respond with the home.html template and the home controller
		$routeProvider.when('/', {
			templateUrl : 'home.html',
			controller : 'HomeCtrl'
		})
	}])
	.controller('HomeCtrl', function($scope){

	})