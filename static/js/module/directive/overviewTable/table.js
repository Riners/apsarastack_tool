myApp.directive('panguOverviewTable', function(){
		return {
	      restrict: 'EC',
	      scope: {
	        panguOverviewTableData:"="
	      },
	      templateUrl:'/static/js/module/directive/overviewTable/table.html',
	      link: function (scope, element, attr) {	
	      	//监控
	      	// scope.testArr={
	      	// 	"thData":["存储空间","机器信息","异常信息"],
	      	// 	"tdData":[
	      	// 	[{"name":"总集群数:","color":""},
	      	// 	{"name":3,"color":"panguOverviewBlue"},
	      	// 	{"name":"总机器数","color":""},
	      	// 	{"name":77,"color":"panguOverviewBlue"},
	      	// 	{"name":"报警-FATAL:","color":""},
	      	// 	{"name":0,"color":"panguOverviewRed"}],

	      	// 	[{"name":"总容量:","color":""},
	      	// 	{"name":3,"color":"panguOverviewBlue"},
	      	// 	{"name":"总MASTER机器数","color":""},
	      	// 	{"name":77,"color":"panguOverviewBlue"},
	      	// 	{"name":"报警-ERROR:","color":""},
	      	// 	{"name":0,"color":"panguOverviewPink"}],

	      	// 	[{"name":"使用空间百分比:","color":""},
	      	// 	{"name":3,"color":"panguOverviewBlue"},
	      	// 	{"name":"最大集群规模","color":""},
	      	// 	{"name":77,"color":"panguOverviewBlue"},
	      	// 	{"name":"报警-WARNING:","color":""},
	      	// 	{"name":0,"color":"panguOverviewOrange"}],

	      	// 	[{"name":"总文件数:","color":""},
	      	// 	{"name":322,"color":"panguOverviewBlue"},
	      	// 	{"name":"","color":""},
	      	// 	{"name":"","color":""},
	      	// 	{"name":"","color":""},
	      	// 	{"name":"","color":""}]
	      	// 	]
	      	// }
	      	
	        scope.$watchGroup(['panguOverviewTableData'], function (newValue, oldValue){
	          if (newValue) {
	          	//检查数据是否有变化，若数据改变则重新赋值
	          	if(!scope.panguOverviewTableData){
	          		return
	          	}
	          	scope.tableArr=scope.panguOverviewTableData
	          }
	        });
	      }
	    }
  	})
