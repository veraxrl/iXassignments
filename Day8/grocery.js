var app = angular.module('groceryApp', []);

app.controller('groceryCtrl',function($scope) {
	$scope.mylist = [];
	$scope.repeat=false;

	$scope.addToList = function() {
		var newItem = {
			name:$scope.name,
			number:$scope.quantity
		};
		
		for (var i=0;i<$scope.mylist.length;i++) {
			if ($scope.mylist[i].name===newItem.name) {
				$scope.repeat=true;
				$scope.mylist[i].number=parseInt($scope.mylist[i].number)+parseInt(newItem.number);
			}
		}
		if ($scope.repeat===false) $scope.mylist.push(newItem);

		$scope.name="";
		$scope.quantity="";
	}

	$scope.increase = function(one) {
		one.number=parseInt(one.number);
		one.number += 1;
	}
	
	$scope.decrease = function(one) {
		one.number=parseInt(one.number);
		one.number -= 1;
	}
});