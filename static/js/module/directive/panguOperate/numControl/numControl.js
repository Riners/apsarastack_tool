myApp.directive('numControl', function(apis){
	return {
	    restrict: 'EC',
	    scope: {
		  numData:'=',
		},
	    templateUrl:'/static/js/module/directive/panguOperate/numControl/numControl.html',
	    link: function (scope, element, attr) {
	      	
	      	
	      	scope.$watchGroup(["numData"], function (newValue, oldValue){
	          if (newValue) {
	          	// if(scope.numData){
	          	//   scope.loadData.width=scope.loadingData.width?scope.loadingData.width:scope.loadData.width;
	          	//   scope.loadData.height=scope.loadingData.height?scope.loadingData.height:scope.loadData.height;
	          	// }
	          }
	        },true);
			scope.clickUp=function(){
				scope.numData++;
	      	};
	      	scope.tip=""
	      	scope.clickDown=function(){
				if(scope.numData>0){
					scope.numData--;
				}else{
					scope.tip="不能小于0"
				}
				

	      	}
		}
	}
})
