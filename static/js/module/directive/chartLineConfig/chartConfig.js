myApp.directive('chartLineconfig', function(apis,panguService,$uibModal){
	return {
	    restrict: 'EC',
	    scope: {
	        lineconfigData:"=",
	    },
	    templateUrl:'/static/js/module/directive/chartLineConfig/chartConfig.html',
	    link: function (scope,element, attr) {
	      	
	      	// 监控 lineconfigData 的变化刷新指令数据
	      	scope.$watchGroup(['tableData'], function (newValue, oldValue){
			  if (newValue) {
			  	// getChartlineConfig();
			  }
	      	},true);

	      	// 获取chart图配置文件信息
	      	function getChartlineConfig(){
		      var data={};
		      data.group=scope.lineconfigData.group?scope.lineconfigData.group:"";
		      data.type=scope.lineconfigData.type?scope.lineconfigData.type:"";
		      panguService.getLineConfig(data).then(function (data) {
		        //接口返回数据成功
		        if(data.data.line){
		        	dealChartlineConfig(data.data.line);
		        };
		      },function(data){
		        //处理响应失败
		      }).catch(function(data){
		        //处理数据 异常捕获
		      })
		    };
		    getChartlineConfig();
		    // 处理chart图数据
		    scope.chartDashConfData=[];
		    function dealChartlineConfig(data){
		    	scope.chartDashConfData=[];
		    	
		    	if(scope.lineconfigData.initmatrix){
		    		for(var i in data){
		    			if(data[i].target==scope.lineconfigData.initmatrix){
		    				scope.chartDashConfData.push(data[i]);
		    				break;
		    			}
		    		}
		    	}else{
		    		scope.chartDashConfData=data;
		    	};
		    	for(var i in scope.chartDashConfData){
		    		for(var j in scope.chartDashConfData[i].metrics){
		    			scope.chartDashConfData[i].metrics[j].showChartloading=false;
		    			var inNextData={};
		    			inNextData.matrix=scope.chartDashConfData[i].metrics[j].name;
		    			inNextData.id=scope.chartDashConfData[i].metrics[j].id;
		    			inNextData.param_plus=scope.chartDashConfData[i].metrics[j].param_plus;
		    			getLineChartData(inNextData)
		    		}
		    	}
		    };
		    var refStartStr="str"+(new Date()).getTime();
		    //获取单个chart数据
		    scope.mapTargetData={};
		    function getLineChartData(data){
		    	var matrix=data.matrix;
		    	var id=data.id;
		    	var getUrlData={}
		    	// url_param_plus,group,btime,etime,clusters
		    	getUrlData.param_plus=data.param_plus
		    	getUrlData.btime=scope.lineconfigData.group?scope.lineconfigData.group:"";
		    	getUrlData.btime=scope.lineconfigData.btime?scope.lineconfigData.btime:"";
		    	getUrlData.etime=scope.lineconfigData.etime?scope.lineconfigData.etime:"";
		    	getUrlData.clusters=scope.lineconfigData.clusters?scope.lineconfigData.clusters:"";
		    	var returnRefStartStr=refStartStr;
		    	panguService.getUrlFunc(getUrlData).then(function(data,status){
		    		for(var i in scope.chartDashConfData){
			          for(var j in scope.chartDashConfData[i].metrics){
			            if(scope.chartDashConfData[i].metrics[j].id==id){
			              scope.chartDashConfData[i].metrics[j].showChartloading=false;
			            }
			          }
			        }
			        if(returnRefStartStr==refStartStr){
			          scope.mapTargetData[id]=disTargetData(data.data,matrix,id,scope.chartDashConfData);
			          console.log("success");
			        }
		    	}).catch(function(data,status){
		        	console.log("error");
		      })
		    };
		    // 点击展开大图
		    scope.showBigChart=function(data,param){
		      data.param=param;
		      data.group=scope.lineconfigData.group?scope.lineconfigData.group:"";
		      data.hideTimeList=scope.lineconfigData.hideTimeList?scope.lineconfigData.hideTimeList:"";
		      // data.refresh=$scope.mapsParam.refresh;
		      // if($scope.clickCluster!=$scope.tabData[0]){
		      //   data.clusters=$scope.clickCluster;
		      // }else{
		      //   data.clusters=$scope.tabData.slice(1,$scope.tabData.length).join();
		      // }
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
		    scope.isShowChartConfTitle=scope.lineconfigData.title?scope.lineconfigData.title:"展开/收起";
		    scope.isShowChartConf = false;
		    scope.clickShowChartConf = function() {
		    	scope.isShowChartConf = !scope.isShowChartConf;
		    }


	      }
	    }
  	})
