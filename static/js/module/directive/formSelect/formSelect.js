myApp.directive('formSelect', function() {
	return {
		restrict: 'AE',
		scope: {
			selectedList:'=?',
//			selectChange:'&selectChange',
//			step:"=?"
            optionList:'=?',
            checkData:'='
		},
		replace: true,
		controller: function($scope) {
           // $scope.chosedIndex = 0
        },
		templateUrl:"/static/js/module/directive/formSelect/formSelect.html",
		link:function(scope, element, parent) {
			scope.selectedList = scope.selectedList && scope.selectedList[0] !== null ? scope.selectedList : [];
            scope.$watchGroup(['optionList'], function (newValue, oldValue){
	      		if(newValue) {
	      	        scope.checkData = scope.selectedList;
//		            scope.selectChange = function(data) {
//		            	console.log(scope.step, data, 'scope.step')
//		            }
		            var selectedList = scope.selectedList && scope.selectedList[0] !== null ? scope.selectedList : [];
		            //select 多选项的增加和删除
					scope.selectChange = function(data) {
					 	if(selectedList.indexOf(data.data) == -1 && data.data) {
					 		selectedList.push(data.data);
					 	}
					 	scope.selectedList = selectedList;
					 	scope.checkData = selectedList;
					}
					scope.deletSelect = function(data) {
					 	var index = selectedList.indexOf(data.selected)
					 	selectedList.splice(index, 1);
					 	scope.selectedList = selectedList;
					 	scope.checkData = selectedList;
					}
	      		}
	      	},true)
        }
	}
})