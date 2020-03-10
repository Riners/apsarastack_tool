myApp.directive('antChart', function(){
		return {
	      restrict: 'EC',
	      scope: {
	        antChartData:"="
	      },
	      // templateUrl:'/static/js/module/directive/panguOperate/antChart/antChart.html',
	      link: function (scope, element, attr) {
	      	// scope.jsonChart={
	      	// 	"id":"test1"
	      		
	      	// }; 	
	      	//监控

	        scope.$watchGroup(['antChartData'], function (newValue, oldValue){
	          if (newValue) {
	          	//检查数据是否有变化，若数据改变则重新赋值
	          	if(!scope.antChartData){
	          		return
	          	};
	          	//id,position必需传进来
	          	var position=scope.antChartData.position;
	          	var width=scope.antChartData.width?scope.antChartData.width:600;
	          	var height=scope.antChartData.height?scope.antChartData.height:300;
	          	var data=scope.antChartData.data?scope.antChartData.data:[];
	          	var color=scope.antChartData.color?scope.antChartData.color:"genre";

	          	const drawChart = new G2.Chart({
				  container: scope.antChartData.id, // 指定图表容器 ID
				  width : width, // 指定图表宽度
				  height : height // 指定图表高度
				});
				
	          	drawChart.source(data);
	          	drawChart.scale('value', {
				  min: 0
				});
				drawChart.scale('year', {
				  range: [0, 1]
				});
				drawChart.tooltip({
				  crosshairs: {
				    type: 'line'
				  }
				});
				//genre sold对应data里的数据,展示x,y轴数据
				drawChart.line().position(position);
				drawChart.point().position(position).size(4).shape('circle').style({
				  stroke: '#fff',
				  lineWidth: 1
				});
				drawChart.render();

	          }
	        });
	        //
	        
	        //test
	        
	  //       const data = [
			//   { genre: 'Sports', sold: 275 },
			//   { genre: 'Strategy', sold: 115 },
			//   { genre: 'Action', sold: 120 },
			//   { genre: 'Shooter', sold: 350 },
			//   { genre: 'Other', sold: 150 }
			// ];
			// const chart1 = new G2.Chart({
			//   container: scope.jsonChart.id, // 指定图表容器 ID
			//   width : 600, // 指定图表宽度
			//   height : 300 // 指定图表高度
			// });
			// chart1.source(data);
			// //genre sold对应data里的数据,展示x,y轴数据
			// chart1.interval().position('genre*sold').color('genre');
			// chart1.render();



	      }
	    }
  	})
