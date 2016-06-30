angular
	//declaring a module named OWMApp and injecting ngRoute as a dependency
	.module('OWMApp', ['ngRoute'])
	//$routeProvider is used to set URL routing rules
	.config(['$routeProvider', function($routeProvider){
		$routeProvider.when('/', {
			templateUrl : 'home.html',
			controller : 'HomeCtrl'
		})
	}])
	.controller('HomeCtrl', function($scope){

	})