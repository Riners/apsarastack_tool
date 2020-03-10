myApp.directive('fixedwidthHighchart', function(){
		return {
	      restrict: 'EC',
	      scope: {
	        fixedwidthHighchartData:"="
	      },
	      // templateUrl:'/static/js/module/panguHighchart.html',
	      link: function (scope, element, attr) {
	      	
			// scope.testid="chartConfig1";

	      	scope.jsonChart={
	      		"title":"指定图表标题",
	      		"xAxis":[],
	      		"seriesData":[]
	      	}; 	
	      	//监控

	        scope.$watchGroup(['fixedwidthHighchartData'], function (newValue, oldValue){
	          if (newValue) {
	          	//检查数据是否有变化，若数据改变则重新赋值
	          	if(!scope.fixedwidthHighchartData){
	          		return
	          	}
	          	scope.jsonChart.id=scope.fixedwidthHighchartData.id?scope.fixedwidthHighchartData.id:scope.jsonChart.id;
	            scope.jsonChart.title=scope.fixedwidthHighchartData.title?scope.fixedwidthHighchartData.title:scope.jsonChart.title;
	      		scope.jsonChart.xAxis=scope.fixedwidthHighchartData.xAxis?scope.fixedwidthHighchartData.xAxis:scope.jsonChart.xAxis;
	      		scope.jsonChart.seriesData=scope.fixedwidthHighchartData.seriesData?scope.fixedwidthHighchartData.seriesData:scope.jsonChart.seriesData;
	      		
	      		//highcharts数据结构
	      		scope.testchart = {
		            title: {
		            	text: scope.jsonChart.title//指定图表标题
		            },
		            chart: {
		              // renderTo:scope.jsonChart.id,
		              zoomType:"x",
		              width:270,
		              height:200
		            },
		            xAxis: {
		                  categories: scope.jsonChart.xAxis, //指定x轴标签
		                  labels : //定义x轴标签的样式
		                  {  
		                    fontStyle : '',
		                    style: {
		                        fontSize:'',
		                        fontFamily: '微软雅黑' 
		                    }
		                  }
		              },
		            yAxis: {
		              title: {
		                text: ''  //指定y轴标题
		              }
		            },
		            tooltip: {
		              valueSuffix: ''   //指定鼠标移动到某个点上的提示框单位
		            },
		            series: scope.jsonChart.seriesData
		    	};
		    	$(element).highcharts(scope.testchart);
	          }
	        });
	      }
	    }
  	})
/**
相关JS代码 调用该指令
<div>
  <div id="chartConfig1" style="float: left;width: 300px;border:1px solid #b8cdce;">
    <pangu-highchart  pangu-highchart-data="panguHighchartData1" style="margin-top:20px;"></pangu-highchart>
  </div>
  <div id="chartConfig2" style="float: left;width: 400px;border:1px solid #b8cdce;">
    <pangu-highchart  pangu-highchart-data="panguHighchartData2" style="margin-top:20px;"></pangu-highchart>
  </div>
  <div style="clear: both;"></div>
</div>
$scope.panguHighchartData1={
      "id":"chartConfig1",
      "title":"highcharts图表",
      "xAxis":[6,5,4,3,2,1],
      "seriesData":[{name:"nihao",data:[66,55,44,33,22,11]}]
    };
    $scope.panguHighchartData2={};
  var timer1=window.setTimeout(function(){
    $scope.panguHighchartData1={
      "id":"chartConfig1",
      "title":"highcharts图表",
      "xAxis":[1,2,3,4,5,6],
      "seriesData":[{name:"nihao",data:[11,22,22,33,44,55]},{name:"wobuhao",data:[11,22,22,33,44,44]}]
    };
    $scope.panguHighchartData2={
      "id":"chartConfig2",
      "title":"highcharts图表",
      "xAxis":[1,2,3,4,5,6],
      "seriesData":[{name:"wobuhao",data:[11,22,22,33,44,44]}]
    };
    $scope.$apply();
  },2000);
**/