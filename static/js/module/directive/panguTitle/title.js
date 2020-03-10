myApp.directive('panguTitle', function() {
	return {
		restrict: 'AE',
		scope: {
		  panguTitleData:'=',
		},
		replace: true,
		templateUrl:"/static/js/module/directive/panguTitle/title.html",
		link:function(scope, element, parent) {
			// scope.panguTitleData={
			// 	"titleStr":"FY18双11数据",
			// 	"type":"h2"
			// }
			scope.showTitle={"h2":false,"h3":false,"h4":false}
			scope.$watchGroup(['panguTitleData'], function (newValue, oldValue){
	          if (newValue) {
	          	//检查数据是否有变化，若数据改变则重新赋值.
	          	
				if(scope.panguTitleData&&scope.panguTitleData.type){
					scope.showTitle[scope.panguTitleData.type]=true;
				};
	          }
	        },true);
			
	    	
        }
	}
})

