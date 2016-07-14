var app = angular.module('tensionApp', ["ngRoute","firebase"]); 

app.config(function($routeProvider) {
	$routeProvider.when('/', {
		controller: 'channelCtrl',
		templateUrl: 'templates/home.html'
	})
});

app.controller('channelCtrl', function($scope, $http, $firebaseObject, $firebaseArray) {
	var ref = firebase.database().ref().child("msgs");
	$scope.msgs= $firebaseArray(ref);

	$scope.addMessage = function() {
	    $scope.msgs.$add({
	    	sender: $scope.userName,
	    	text: $scope.newMessage	    
	    });
	    $scope.newMessage="";
  	};

});



