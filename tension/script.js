var app = angular.module('tensionApp', ["ngRoute","firebase"]); 

// for ngRoute
app.run(["$rootScope", "$location", function($rootScope, $location) {
  $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
    // We can catch the error thrown when the $requireSignIn promise is rejected
    // and redirect the user back to the home page
    if (error === "AUTH_REQUIRED") {
      $location.path("/login");
    }
  });
}]);


app.config(function($routeProvider) {
	$routeProvider.when('/', {
		controller: 'listCtrl',
		templateUrl: 'templates/home.html',
		resolve: {
			 "currentAuth": function($firebaseAuth) {
              	return $firebaseAuth().$requireSignIn();
            }
		}
	})
	$routeProvider.when('/channel/:channelId',{
		controller:'channelCtrl',
		templateUrl:'templates/general.html'
	})                                           
	$routeProvider.when('/signup',{
		controller:'signupCtrl',
		templateUrl:'templates/signup.html',
		resolve: {
            "currentAuth": function($firebaseAuth) {
                return $firebaseAuth().$waitForSignIn();
            }
        }
	})
	$routeProvider.when('/login',{
		controller:'LoginCtrl',
		templateUrl:'templates/login.html'
	})
});

app.controller('listCtrl', function($scope, $http, $firebaseObject, $firebaseArray,$firebaseAuth, $currentAuth) {
	var ref = firebase.database().ref().child("msgs");
	$scope.msgs= $firebaseArray(ref);

	$scope.addMessage = function() {
	    $scope.msgs.$add({
	    	sender: $scope.userName,
	    	text: $scope.newMessage	    
	    });
	    $scope.newMessage="";
  	};

  	$scope.signout = function() {
  		$scope.authObj = $firebaseAuth();
  		$scope.authObj.$signOut();
  		console.log("signed out");
  	};

  	$scope.getUser = function() {
  		var firebaseUser = $scope.authObj.$getAuth();
		if (firebaseUser) {
		  console.log("Signed in as:", firebaseUser.uid);
		} else {
		  console.log("Signed out");
		}
  	}

});

app.controller('channelCtrl', function($scope, $firebaseObject, $firebaseArray, $routeParams) {
	var ref = firebase.database().ref().child("messages").child($routeParams.channelId);
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

	$scope.isError=false;

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
			$scope.user.name=$scope.name;
			$scope.user.uid= firebaseUser.uid;
			$scope.user.email= $scope.email;
			$scope.user.password= $scope.password;
			$scope.user.$save().then(function(ref) {
				console.log($scope.user);
				ref.key === firebaseUser.uid;
			}, function (error) {
				$scope.isError= true;
				console.log("Error:",error);
			});
		    console.log("User " + firebaseUser.uid + " created successfully!");
		    console.log($scope.user);
		    }).catch(function(error) {
		    	console.error("Error: ", error);
		    	$scope.isError= true;
		    	$scope.errormsg=error.message;
		  	})

	}


});

app.controller('LoginCtrl', function($scope, $routeParams, $firebaseObject, $firebaseAuth) {
    $scope.authObj = $firebaseAuth();

    $scope.login = function() {
        console.log($scope.email);
        console.log($scope.password);

        $scope.authObj.$signInWithEmailAndPassword($scope.email, $scope.password)
        .then(function(firebaseUser) {
            console.log("Signed in as:", firebaseUser.uid);
            window.location.assign('http://localhost:8000/#/channel/General');

        }).catch(function(error) {
             console.error("Authentication failed:", error);
        })

    }
});


// $scope.channels.$loaded().then(function() {
// 		$scope.channels.general= {name: "General", description:"general"};
// 		$scope.channels.$save();
// });

// .directive("fileread", [function () {
//     return {
//         scope: {
//             fileread: "="   //two way binding
//         },
//         link: function (scope, element, attributes) {
//             element.bind("change", function (changeEvent) {
//                 scope.$apply(function () {
//                     scope.fileread = changeEvent.target.files[0];
//                     // or all selected files:
//                     // scope.fileread = changeEvent.target.files;
//                 });
//             });
//         }
//     }
// }]);