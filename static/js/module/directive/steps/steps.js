myApp.directive('steps', function() {
	return {
		restrict: 'AE',
		scope: {
			stepData:'=',
			jump:'&jump',
			again:'&again',
			cancel:'&cancel'
		},
		replace: true,
		controller: function($scope) {
           // $scope.chosedIndex = 0
        },
		templateUrl:"/static/js/module/directive/steps/steps.html",
		link:function(scope, element, parent) {
            scope.showGroupTitle = function() {
				scope.showCollapse = !scope.showCollapse;
			}
        }
	}
})

//竖着的步骤条
myApp.directive('stepsVertical', function() {
	return {
		restrict: 'AE',
		scope: {
			stepVerticalData:'='
		},
		replace: true,
		controller: function($scope) {
           // $scope.chosedIndex = 0
        },
		templateUrl:"/static/js/module/directive/steps/stepsVertical.html",
		link:function(scope, element, parent) {
//          scope.showGroupTitle = function() {
//				scope.showCollapse = !scope.showCollapse;
//			}
        }
	}
})
