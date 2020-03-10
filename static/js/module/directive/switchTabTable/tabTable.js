myApp.directive('tabTable', function() {
	return {
		restrict: 'AE',
		scope: {
		  tabListData:'=',
		  tabClickFunc:'&clickFunc',
		},
		replace: true,
		templateUrl:"/static/js/module/directive/switchTabTable/tabTable.html",
		link:function(scope, element, parent) {
			scope.$watchGroup(["tabListData"], function (newValue, oldValue){
	          if (newValue) {
	          	//检查数据是否有变化，若数据改变则重新赋值.
	          	
				
	          }
	        },true);
	    	
        }
	}
})

