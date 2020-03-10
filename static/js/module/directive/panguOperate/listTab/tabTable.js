myApp.directive('listTab', function() {
	return {
		restrict: 'AE',
		scope: {
		  tabListData:'=',
		  tabClickFunc:'&clickFunc',
		  tabConfig:'=',
		},
		replace: true,
		templateUrl:"/static/js/module/directive/panguOperate/listTab/tabTable.html",
		link:function(scope, element, parent) {
			scope.showTabListData=[];
			scope.$watchGroup(["tabListData"], function (newValue, oldValue){
	          if (newValue) {
	          	scope.showTabListData=scope.tabListData;
	          	//检查数据是否有变化，若数据改变则重新赋值.
	          	if(scope.tabListData.length>0&&scope.tabConfig){
	          		scope.showTabListData=scope.tabListData.slice(0,scope.tabConfig.showTabNum)
	          	}
				
	          }
	        },true);

	        // tabConfig
	    	scope.$watchGroup(["tabConfig"], function (newValue, oldValue){
	          if (newValue) {
	          	//检查数据是否有变化，若数据改变则重新赋值.
	          	
				
	          }
	        },true);

	    	// 点击左侧或右侧按钮时，调用相关方法
	        scope.cutLeftNum=0;
	        var cutRightNum=scope.tabConfig?scope.tabConfig.showTabNum:0;
	        scope.clickTabBtn=function(str){
	        	if(str=="left"){
	        		if(scope.cutLeftNum>0){
	        			scope.showTabListData=scope.tabListData.slice(scope.cutLeftNum-1,cutRightNum-1)
	        			scope.cutLeftNum--;
	        			cutRightNum--;
	        		}
	        	}else{
	        		if(cutRightNum<scope.tabListData.length){
	        			scope.showTabListData=scope.tabListData.slice(scope.cutLeftNum+1,cutRightNum+1)
	        			scope.cutLeftNum++;
	        			cutRightNum++;
	        		}
	        	};
	        };


        }
	}
})

