var app = angular.module('calculatorApp', []);

app.controller('CalculatorCtrl',function($scope) {
	
	$scope.name="gabe";
	$scope.foo="Type you name";

	$scope.doAdd = function() {
		var numX= parseInt($scope.x);
		var numY= parseInt($scope.y);
		console.log(numX+numY);
		$scope.result=numX+numY;
	}

	$scope.multiply = function() {
		var numX= parseInt($scope.x);
		var numY= parseInt($scope.y);
		console.log(numX*numY);
		$scope.result2=numX*numY;
	}
});