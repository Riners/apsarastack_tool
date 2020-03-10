myApp.directive('panguHighchart', function(){
		return {
	      restrict: 'EC',
	      scope: {
	        panguHighchartData:"="
	      },
	      // templateUrl:'/static/js/module/panguHighchart.html',
	      link: function (scope, element, attr) {
	      	
			// scope.testid="chartConfig1";

	      	scope.jsonChart={
	      		// "id":scope.panguHighchartData.id,
	      		"title":"",
	      		"titleName":"",
	      		"xAxis":"",
	      		"seriesData":[],
	      		"type":"",
	      		"legend_verticalAlign":"bottom",
	      		"legend_align":"center",
	      		"legend_layout":"horizontal",
	      		"yAxis_min":"",
	      		"yAxis_max":""
	      	}; 	
	      	//监控

	        scope.$watchGroup(['panguHighchartData'], function (newValue, oldValue){
	          if (newValue) {
	          	//检查数据是否有变化，若数据改变则重新赋值
	          	if(!scope.panguHighchartData){
	          		return
	          	}
	          	scope.jsonChart.id=scope.panguHighchartData.id?scope.panguHighchartData.id:scope.jsonChart.id;
	            // scope.jsonChart.title=scope.panguHighchartData.title?scope.panguHighchartData.title:scope.jsonChart.title;
	      		scope.jsonChart.xAxis=scope.panguHighchartData.xAxis?scope.panguHighchartData.xAxis:scope.jsonChart.xAxis;
	      		scope.jsonChart.seriesData=scope.panguHighchartData.seriesData?scope.panguHighchartData.seriesData:scope.jsonChart.seriesData;
	      		scope.jsonChart.titleName=scope.panguHighchartData.titleName?scope.panguHighchartData.titleName:scope.jsonChart.titleName;
	      		scope.jsonChart.type=scope.panguHighchartData.type?scope.panguHighchartData.type:scope.jsonChart.type;
	      		scope.jsonChart.legend_verticalAlign=scope.panguHighchartData.legend_verticalAlign?scope.panguHighchartData.legend_verticalAlign:scope.jsonChart.legend_verticalAlign;
	      		scope.jsonChart.legend_align=scope.panguHighchartData.legend_align?scope.panguHighchartData.legend_align:scope.jsonChart.legend_align;
	      		scope.jsonChart.legend_layout=scope.panguHighchartData.legend_layout?scope.panguHighchartData.legend_layout:scope.jsonChart.legend_layout;
	      		scope.jsonChart.yAxis_min=scope.panguHighchartData.yAxis_min?scope.panguHighchartData.yAxis_min:scope.jsonChart.yAxis_min;
	      		scope.jsonChart.yAxis_max=scope.panguHighchartData.yAxis_max?scope.panguHighchartData.yAxis_max:scope.jsonChart.yAxis_max;
	      		//highcharts数据结构
	      		yAxisObj= {
	             	gridLineWidth: 1 ,//图形的背景线设置
		            gridLineColor:"#999999",
		            minorGridLineColor:"#dcd9d9",//次网格的颜色
		            minorTickInterval: 'auto',	
	                // min: 0,	
	                title: {
	                  text: ''  //指定y轴标题
	                }
	            };
	            if(!scope.jsonChart.yAxis_min){
	            	yAxisObj.min=0;
	            };
	            if(scope.jsonChart.yAxis_max){
	            	yAxisObj.max=scope.jsonChart.yAxis_max;
	            };
	      		scope.testchart = {
		            title: {
		            	text: scope.jsonChart.titleName//指定图表标题
		            },
		            credits: {
		                  enabled: false //版本信息
		            },
		            chart: {
		              zoomType:"x",
		              type:scope.jsonChart.type
		            },
		            exporting: {  
			            buttons:{
			            	contextButton:{
			            		enabled:false //图表导出菜单,
			            	}
			            } 
			        },
			        plotOptions: {
				        series: {
				            animation: false   //关闭数据加载时渲染动画
				        },
				        area: {            //面积堆叠图样式
			                stacking: 'percent',
			                lineColor: '#ffffff',
			                lineWidth: 1,
			                marker: {
			                    lineWidth: 1,
			                    lineColor: '#ffffff'
			                }
			            }
				    },
			        legend: {
				    	margin:0,
				    	itemMarginTop:0,
				    	symbolWidth:10,   //图例标识宽度
				    	symbolWidth:10,  //图例标识高度
				    	itemStyle:{
				    		fontSize: "12px",
				    	},
					// 　　align: "center",//程度标的目标地位
					// 　　verticalAlign: "bottom", //垂直标的目标地位
						align:scope.jsonChart.legend_align,
						verticalAlign:scope.jsonChart.legend_verticalAlign,
						layout:scope.jsonChart.legend_layout,// "horizontal" 或 "vertical" 即水平布局和垂直布局 默认是：horizontal.
					　　x: 0, //间隔x轴的间隔
					　　y: 0 //间隔Y轴的间隔
					},
		            xAxis: {
		            	tickWidth:0,
		            	gridLineWidth : 1,
				    	gridLineColor:"#999999",//网格线颜色
				    	minorTickInterval: 'auto',
				    	minorGridLineColor:"#dcd9d9",//次网格的颜色
		            	type: "datetime",
		            	gridLineWidth : 1,
		            	categories: scope.jsonChart.xAxis, 
		                // categories: scope.jsonChart.xAxis, //指定x轴标签
		                labels : //定义x轴标签的样式
		                {  
		                    fontStyle : '',
		                    style: {
		                        fontSize:'',
		                        fontFamily: '微软雅黑' 
		                    }
		                }
		            },
		            yAxis: yAxisObj,
		            tooltip: {
		              valueSuffix: ''   //指定鼠标移动到某个点上的提示框单位
		            },
		            series: scope.jsonChart.seriesData
		    	};
		    	$('#'+scope.jsonChart.id).highcharts(scope.testchart);
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