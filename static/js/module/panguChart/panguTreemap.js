myApp.directive('panguTreemapChart', function(apis){
	return {
	    restrict: 'EC',
	    scope: {
	        panguTreemapData:"="
	    },
	      // templateUrl:'/static/js/module/panguChart/panguTreemap.html',
	    link: function (scope, element, attr) {
	      	
			var test=apis.initPageSize;
	      	scope.jsonChart={
	      		"title":"",
	      		"seriesData":[],
	      		"height":300
	      	}; 	
	      	//监控
	        scope.$watchGroup(['panguTreemapData'], function (newValue, oldValue){
	          if (newValue) {
	          	//检查数据是否有变化，若数据改变则重新赋值
	          	if(!scope.panguTreemapData){
	          		return
	          	}
	        	scope.jsonChart.id=scope.panguTreemapData.id?scope.panguTreemapData.id:scope.jsonChart.id;
	        	scope.jsonChart.title=scope.panguTreemapData.title?scope.panguTreemapData.title:scope.jsonChart.title;
	      		scope.jsonChart.seriesData=scope.panguTreemapData.seriesData?scope.panguTreemapData.seriesData:scope.jsonChart.seriesData;
	      		scope.jsonChart.height=scope.panguTreemapData.height?scope.panguTreemapData.height:scope.jsonChart.height;
	      		//highcharts数据结构
		    	var clustercharts = {
		          title: {
		                text: scope.jsonChart.title//指定图表标题
		          },
		          credits: {enabled: false},
		          chart: {
		            height:scope.jsonChart.height
		          },
		          plotOptions: {
			        series: {
			            animation: false
			        }
			      },
		          exporting: { enabled: false },  
		          series: [{
		              type: "treemap",
		              cursor:'pointer',
		              layoutAlgorithm: 'squarified',
		              allowDrillToNode: true,
		              dataLabels: {
		                enabled: false
		              },
		              borderWidth:1, //边线宽度
		              levelIsConstant: false,
		              levels: [{
		                level: 1,
		                dataLabels: {
		                  enabled: true
		                },
		                borderWidth: 3
		              }],
		              data:scope.jsonChart.seriesData
		            }
		          ]
			    };
		    	$('#'+scope.jsonChart.id).highcharts(clustercharts);
		    	
	          }
	        });
	      }
	    }
  	})


// <button ng-click="testloading()">jsdhfasdhj</button>
//       <div style="position:relative;width: 1000px;height:350px;border: green solid 1px;">
//         <pangu-loading ng-if="showtestloading"></pangu-loading>
//         <div id="testpanguTreemapData" ng-if="!showtestloading">
//           <pangu-treemap-chart pangu-treemap-data="panguTreemapData" ></pangu-treemap-chart>
//         </div> 
//       </div>