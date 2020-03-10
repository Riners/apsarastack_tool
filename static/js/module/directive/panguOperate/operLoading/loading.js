myApp.directive('operLoading', function(apis){
	return {
	    restrict: 'EC',
	    scope: {
		  loadingData:'=',
		},
	    templateUrl:'/static/js/module/directive/panguOperate/operLoading/loading.html',
	    link: function (scope, element, attr) {
	      	
	      	scope.loadData={
	      		"width":"1140px",
	      		"height":"100%"
	      	}
	      	scope.$watchGroup(["loadingData"], function (newValue, oldValue){
	          if (newValue) {
	          	if(scope.loadingData){
	          	  scope.loadData.width=scope.loadingData.width?scope.loadingData.width:scope.loadData.width;
	          	  scope.loadData.height=scope.loadingData.height?scope.loadingData.height:scope.loadData.height;
	          	}
	          }
	        },true);
			
	      		
	      }
	    }
  	})
