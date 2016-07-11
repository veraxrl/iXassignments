var app = angular.module('movieApp', ['ngRoute']); 

app.config(function($routeProvider) {
	$routeProvider.when('/', {
		controller: 'MainCtrl',
		templateUrl: 'templates/home.html',
	})
	$routeProvider.when('/movie/:movieId', {
		controller: 'MovieCtrl',
		templateUrl: 'templates/movie.html',
	})
});

app.controller('MainCtrl', function($scope, $http) {
	$scope.searchMovie = function (searchBar) {
		$http({
			url: "http://www.omdbapi.com/?",
			method: "GET",
			params: {
				s: searchBar
			}
		}).then(function(response) {
			$scope.movieArray = response.data.Search;
			console.log($scope.movieArray);
		})
	}
});

app.controller('MovieCtrl', function($scope, $http, $routeParams) {
	$http({
		url: "http://www.omdbapi.com/?i=" + 
			 $routeParams.movieId +".json",
		method: "GET"
	}).then(function(response) {
		console.log(response);
		//$scope.petition = response.data.results[0];
	})
});