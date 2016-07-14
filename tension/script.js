var app = angular.module('tensionApp', ["ngRoute","firebase"]); 

app.config(function($routeProvider) {
	$routeProvider.when('/', {
		controller: 'listCtrl',
		templateUrl: 'templates/home.html'
	})
	$routeProvider.when('/channel/:channelId',{
		controller:'channelCtrl',
		templateUrl:'templates/general.html'
	})
});

app.controller('listCtrl', function($scope, $http, $firebaseObject, $firebaseArray) {
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

app.controller('channelCtrl', function($scope, $http, $firebaseObject, $firebaseArray,$routeParams) {
	var ref = firebase.database().ref().child($routeParams.channelId).child("msgs");
	$scope.msgs= $firebaseArray(ref);

	$scope.addMessage = function() {
	    $scope.msgs.$add({
	    	sender: $scope.userName,
	    	text: $scope.newMessage	    
	    });
	    $scope.newMessage="";
  	};

});

// $scope.channels.$loaded().then(function() {
// 		$scope.channels.general= {name: "General", description:"general"};
// 		$scope.channels.$save();
// });


