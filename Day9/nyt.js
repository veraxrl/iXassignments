var app = angular.module('nytApp', []);
var NY_TIMES_API_KEY = '9691d4b448c54e91bf359b9eaa898e6c';

app.controller('nytCtrl',function($scope, $http) {

	$scope.searchNYT = function (searchBar) {
		$http({
			url:"https://api.nytimes.com/svc/search/v2/articlesearch.json",
			method: 'GET',
			params: {
			'q':searchBar,
			'api-key':NY_TIMES_API_KEY
			}
		}).then(function(result) {
			$scope.articles= result.data.response.docs;
			console.log($scope.articles);
		});
	}

});

//run server on local host
//