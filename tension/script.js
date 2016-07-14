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
	$routeProvider.when('/signup',{
		controller:'signupCtrl',
		templateUrl:'templates/signup.html'
	})
	$routeProvider.when('/login',{
		controller:'loginCtrl',
		templateUrl:'templates/login.html'
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

app.controller('signupCtrl', function($scope, $http, $firebaseObject, $firebaseArray,$routeParams,$firebaseAuth) {

	$scope.show = function() {
		console.log($scope.name);
		console.log($scope.email);
		console.log($scope.password);
	}

	$scope.createUser = function() {
		$scope.authObj = $firebaseAuth();
		$scope.authObj.$createUserWithEmailAndPassword($scope.email,$scope.password)
		.then(function(firebaseUser) {
			//add user for printout:
			var ref = firebase.database().ref().child("users").child(firebaseUser.uid);
			$scope.user= $firebaseObject(ref);
			$scope.user.$save().then(function(ref) {
				ref.key == firebaseUser.uid;
			}, function (error) {
				console.log("Error:",error);
			});
		    console.log("User " + firebaseUser.uid + " created successfully!");
		    console.log($scope.user);
		    }).catch(function(error) {
		    	console.error("Error: ", error);
		  	})
	}

});

app.controller('loginCtrl', function($scope, $http, $firebaseObject, $firebaseArray,$routeParams,$firebaseAuth) {
	$scope.authObj= $firebaseAuth();
	$scope.signinUser = function() {
		$scope.authObj.$signInWithEmailAndPassword($scope.email, $scope.password).then(function(firebaseUser) {
	  		console.log("Signed in as:", firebaseUser.uid);
		}).catch(function(error) {
	  		console.error("Authentication failed:", error);
		})
	}

	// $scope.authObj.$signInWithRedirect("google").then(function() {
 //  	// Never called because of page redirect
	// }).catch(function(error) {
	//   console.error("Authentication failed:", error);
	// });

});



// $scope.channels.$loaded().then(function() {
// 		$scope.channels.general= {name: "General", description:"general"};
// 		$scope.channels.$save();
// });


