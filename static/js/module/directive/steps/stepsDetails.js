myApp.directive('stepsDetails', function() {
	return {
		restrict: 'AE',
		scope: {
			stepsDetailsData:'=',
			handleTableExpand:'&handleTableExpand',
			switchMa:'&switchMa',
			showInfo:'&showInfo',
			showErrorReason:'&showErrorReason',
			showDetailsMsg:'&showDetailsMsg',
			showDetailsErrMsg:'&showDetailsErrMsg'
		},
		replace: true,
		controller: function($scope) {
           // $scope.chosedIndex = 0
        },
		templateUrl:"/static/js/module/directive/steps/stepsDetails.html",
		link:function(scope, element, parent) {
//          scope.showGroupTitle = function() {
//				scope.showCollapse = !scope.showCollapse;
//			}
        }
	}
})

