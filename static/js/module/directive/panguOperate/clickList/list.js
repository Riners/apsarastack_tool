myApp.directive('clickList', function() {
	return {
		restrict: 'AE',
		scope: {
		  listData:'=',
		  dirClickFunc:'&clickFunc',
		},
		replace: true,
		templateUrl:"/static/js/module/directive/panguOperate/clickList/list.html",
		link:function(scope, element, parent) {
			scope.$watchGroup(["tabListData"], function (newValue, oldValue){
	          if (newValue) {
	          	//检查数据是否有变化，若数据改变则重新赋值.
	          	
				
	          }
	        },true);

	        scope.clickList=function(name){
		      for(var i in scope.listData){
		        if(scope.listData[i].key==name){
		          scope.listData[i].color="blue"
		        }else{
		          scope.listData[i].color="none"
		        }
		      }
		      scope.dirClickFunc({"name":name})
		    }
	        // scope.msHostList=[{"name":"聚合","show":true}]
	    	// scope.listData=[{"name":"聚合1","color":"blue"},{"name":"聚合2","color":"none"},
	    	// {"name":"聚合3","color":"none"}];
        }
	}
})

