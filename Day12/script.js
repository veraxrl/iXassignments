var app = angular.module('chommieApp', ['ngRoute']); 

app.config(function($routeProvider) {
	$routeProvider.when('/', {
		controller: 'FeedCtrl',
		templateUrl: 'templates/home.html'
	})
	$routeProvider.when('/me', {
		controller: 'MeCtrl',
		templateUrl: 'templates/me.html'
	})
});

app.controller('FeedCtrl', function($scope, $http) {

	$scope.loadData = function () {
		$scope.msg="";
		$http({
			url: "http://ixchommies.herokuapp.com/props",
			method: "GET",
			params: {
				token:"d6c9dc17998de36035c962093502dc68",
			}
		}).then(function(response) {
			$scope.props=response.data;
		})

		$http({
			url: "http://ixchommies.herokuapp.com/brus",
			method: "GET",
			params: {
				token:"d6c9dc17998de36035c962093502dc68",
			}
		}).then(function(response) {
			console.log(response);
			$scope.brus=response.data;
		})
	}

	$scope.loadData();

    $scope.sendProps= function () {
		console.log($scope.selectedBru);
		console.log($scope.newPropsValue);
		$http({
			url: "http://ixchommies.herokuapp.com/props",
			method: "POST",
			params: {
				token:"d6c9dc17998de36035c962093502dc68",
			},
			data: {
				"for":$scope.selectedBru.id,
				"props":$scope.newPropsValue,
			}
		}).then(function(response) {
			console.log(response);
			$scope.props=response.data;
			$scope.newPropsValue="";
		}).catch(function(error) {
			console.log(error);
			$scope.msg=error.data.message;
		})
	}

});

app.controller('MeCtrl', function($scope, $http, $routeParams) {
	$http({
			url: "http://ixchommies.herokuapp.com/props/me",
			method: "GET",
			params: {
				token:"d6c9dc17998de36035c962093502dc68",
			}
	}).then(function(response) {
			console.log(response);
			$scope.myProps=response.data;
	})

});



