myApp.directive('refreshList', function() {
	return {
		restrict: 'AE',
		scope: {
		  listData:'=',
		  dirClickFunc:'&clickFunc',
		  selectCheckbox:'=',
		},
		replace: true,
		templateUrl:"/static/js/module/directive/panguOperate/refresh/ref.html",
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
		      };
		      scope.dirClickFunc({"name":name})
		    }
		    scope.selectCheckbox=false;
		    scope.refreshChart=function(){
		      scope.dirClickFunc({"name":0.5})
		    }
	    	// scope.listData=[{"name":"30分钟","color":"blue","key":0.5},
	    	// {"name":"1小时","color":"none","key":1},
	    	// {"name":"2小时","color":"none","key":2}];
        }
	}
})

