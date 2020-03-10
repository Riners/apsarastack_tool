myApp.directive('chartLineshennong', function(apis,panguService,$uibModal){
	return {
	    restrict: 'EC',
	    scope: {
	        lineconfigData:"=",
	    },
	    templateUrl:'/static/js/module/directive/chartLineConfig/shennongChart/chartConfig.html',
	    link: function (scope,element, attr) {
	      	var refStartStr="";
	      	scope.defaultObj={
	      	}
	      	scope.defaultObj.width="30%";
	      	// 监控 lineconfigData 的变化刷新指令数据
	      	scope.$watchGroup(['lineconfigData'], function (newValue, oldValue){
			  if (newValue) {
			  	if(scope.lineconfigData){
			  		scope.chartDashConfData={};
			  		scope.mapTargetData={};
			  		if(scope.lineconfigData.width){
			  			scope.defaultObj.width=scope.lineconfigData.width;
			  		}
			  		// $scope.$digest();
			  		refStartStr="str"+(new Date()).getTime();
			  		scope.chartDashConfData=scope.lineconfigData.configData;
			  		dealChartlineConfig(scope.lineconfigData.configData);
			  		scope.isShowChartConfTitle=scope.lineconfigData?scope.lineconfigData.title:"展开/收起";
			  	}
			  	
			  }
	      	},true);

	      	// 获取chart图配置文件信息
	      	// scope.chartDashConfData={};
	      	// scope.mapTargetData={};//所有chart data数据
			// var refStartStr="str"+(new Date()).getTime();
			// if(!scope.lineconfigData){
			// 	return
			// }
			// scope.chartDashConfData=scope.lineconfigData.configData;
		    // var btime=dealTimeFormat(0.5);
    		var etime=dealTimeFormat(0);  
		    // 处理chart图数据
		    function dealChartlineConfig(data){
		    	for(var i in data.metrics){
		    		var inNextData={};
		    		inNextData.matrix=data.metrics[i].matrix;
		    		inNextData.id=data.metrics[i].id;
		    		inNextData.param_plus=data.metrics[i].param_plus;
		    		var btime=scope.lineconfigData.time?scope.lineconfigData.time:0.5;
		    		inNextData.btime=dealTimeFormat(btime);
		    		getLineChartData(inNextData);
		    	}
		    };
		    // dealChartlineConfig(scope.chartDashConfData);
		    
		    
		    //获取单个chart数据接口
		    function getLineChartData(data){
		    	var matrix=data.matrix;
		    	var id=data.id;
		    	// "param_plus":{"cmd":"avg","matrix":"disk_util1"}
		    	// 先集中获取需要的参数
		    	var param_plus=data.param_plus?data.param_plus:"";
		    	// var btime=btime?btime:"";
		    	// var etime=etime?etime:"";
		    	var group=scope.lineconfigData.group?scope.lineconfigData.group:"";
		    	var clusters=scope.lineconfigData.clusters?scope.lineconfigData.clusters:"";

		    	// cmd,matrix btime etime group clusters
		    	// 定义请求体参数
		    	var getUrlData={}
		    	getUrlData.param_plus=data.param_plus;
		    	getUrlData.group=group?group:"";
		    	getUrlData.btime=data.btime?data.btime:dealTimeFormat(0.5);
		    	getUrlData.etime=etime?etime:"";
		    	getUrlData.clusters=clusters?clusters:"";
		    	var returnRefStartStr=refStartStr;
		    	var btime=new Date(getUrlData.btime).getTime();
		    	panguService.getShennongApi(getUrlData).then(function(data,status){
		    	 //  var timename=setTimeout(function(){
				    // scope.$digest();
				    
		    		for(var i in scope.chartDashConfData.metrics){
			            if(scope.chartDashConfData.metrics[i].id==id){
			              scope.chartDashConfData.metrics[i].showChartloading=false;
			              break;
			            }
			        }
			        if(returnRefStartStr==refStartStr){
			          // scope.mapTargetData[id]={};
			          if(JSON.stringify(data.data)=="{}"){
			          	var interval=(scope.lineconfigData.time?scope.lineconfigData.time:0.5)*60*60*1000;
			          	var nonePointInterval=interval/4;
			          	var nonePointStart=btime+8*60*60*1000
			          	
			          	scope.mapTargetData[id]={
					      "id":id,
					      "title":matrix,
					      "seriesData":[{data:["","","",""],"name":matrix.toLowerCase(),"pointStart":nonePointStart,"pointInterval":nonePointInterval}]
					    };
			          }else{
			          	scope.mapTargetData[id]=disTargetData(data.data,matrix,id,scope.chartDashConfData);
			          }
			          
			        }

			      // },2000);//定时，测试使用
		    	}).catch(function(data,status){
		        	console.log("error");
		      })
		    };
		    // 点击展开大图
		    scope.showBigChart=function(data,param){
		      data.param=param;
		      data.group=scope.lineconfigData.group?scope.lineconfigData.group:"";
		      data.hideTimeList=scope.lineconfigData.hideTimeList?scope.lineconfigData.hideTimeList:"";
		      var modalInstance = $uibModal.open({
		           templateUrl:'/static/js/module/clickUibModal/showBigChart.html',
		           controller: 'showChartCtrl',
		           backdrop: "static",
		           size: "maxlg",
		           resolve: {
		               chartData: function () {
		                   return data;
		               }
		           }
		      });
		      modalInstance.result.then(function (selectedItem) {
		           
		      }, function () {
		           // console.log("")
		      });
		    };

		    //展开/收起
		    
		    scope.isShowChartConf = false;
		    scope.clickShowChartConf = function() {
		    	scope.isShowChartConf = !scope.isShowChartConf;
		    }


	      }
	    }
  	})
