myApp.directive('dashboardBasicTable',['$filter', function($filter){
	return {
		restrict: 'EC',
	    scope: {
	        basicTableData:"="
	    },
	    templateUrl:'/static/js/module/dashboardBasicTable.html',
	    link: function (scope, element, attr) {
	      	scope.isShowBaseInfoTable = false;
		    scope.isShowBaseInfo = function() {
		    	scope.isShowBaseInfoTable = !scope.isShowBaseInfoTable;
		    }
		    scope.jsonTable={
	      		"title":"",
	      		"thData":["存储空间","相关机器信息","相关异常信息"],
	      		// "tdData":[{"总集群数:":"asdc","总机器数:":"hdxf","报警-FATAL:":"dsav"},
	      		// {"总容量:":"asdc","总Master机器数:":"hdxf","报警-ERROR:":"dsav"},
	      		// {"使用空间百分比:":"asdc","最大cs数:":"hdxf","报警-WARNING:":"dsav"}]
	      		"tdData":[["总集群数:","asdc","总机器数:","hdxf","报警-FATAL:","dsav"],
	      		["总容量:","asdc","总Master机器数:","hdxf","报警-ERROR:","dsav"],
	      		["使用空间百分比:","asdc","最大cs数:","hdxf","报警-WARNING:","dsav"],
	      		]
	      		
	      	};
	      	scope.$watchGroup(['basicTableData'], function (newValue, oldValue){
	          if (newValue) {
	          	//检查数据是否有变化，若数据改变则重新赋值.
	          	
	          }
	        },true);
	      	
	    }
	}
}])