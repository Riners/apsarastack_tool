myApp.directive('collapse', function() {
	return {
		restrict: 'AE',
		scope: {
          showCollapse:'=',
          collapseTitle:'=',
          collapseClick:'&collapseClick',
          collapseUrl:'='
		},
		replace: true,
		controller: function($scope) {
           // $scope.chosedIndex = 0
        },
		templateUrl:"/static/js/module/directive/panguCollapse/panguCollapse.html",
		link:function(scope, element, parent) {
            scope.showGroupTitle = function() {
				scope.showCollapse = !scope.showCollapse;
			}
        }
	}
})

