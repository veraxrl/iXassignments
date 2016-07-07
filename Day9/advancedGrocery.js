var app = angular.module('groceryApp', []);

app.controller('groceryCtrl',function($scope) {
	$scope.mylist = [];
	$scope.repeat=false;

	$scope.addToList = function() {
		var newItem = {
			"name":$scope.name.toLowerCase(),
			"number":$scope.quantity,
			"isEditing": false
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
		if (one.number <= 0) $scope.deleteItem(one);
	}

	$scope.deleteItem = function(one) {
		var index=$scope.mylist.indexOf(one);
		if (index > -1){
			$scope.mylist.splice(index,1); //remove 1 at index position
		}
	}

	$scope.emptyList = function() {
		$scope.mylist=[];

	}
});