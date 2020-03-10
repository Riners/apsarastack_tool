myApp.directive('selectTime', function() {
	return {
		restrict: 'AE',
		scope: {
		  selectTimeData:'=',
		  selectindex:'=',
		  startTime:'=',
		  endTime:'=',
		},
		replace: true,
		templateUrl:"/static/js/module/directive/selectTime/selectTime.html",
		link:function(scope, element, parent) {
			function getShowTime(num){
		      var slatime=new Date();
		      var slatimeNum=slatime.getTime();
		      return new Date((parseInt((slatimeNum-num*60*60*1000)/1000))*1000);
		    };
		    if(scope.selectTimeData.showTime){
		    	scope.startTime=new Date(scope.selectTimeData.showTime[0]);
		    	scope.endTime=new Date(scope.selectTimeData.showTime[1]);
		    }else{
		    	scope.startTime=getShowTime(12);
		    	scope.endTime=getShowTime(0);
		    }
		    
		    scope.clickTime=function(x){
		      scope.startTime=getShowTime(x);
		      scope.endTime=getShowTime(0);
		    };
	    	
        }
	}
})

