//var myApp = angular.module('myApp', []);
myApp.controller('indexCtrl', function($scope, $http, panguService, $uibModal,panguDashboardService) {
	$scope.mapsParam=get_pangu_urlParameter(window.location.href);
  
  // projectDiskUtilData get_project_disk_util_summary
  // 获取磁盘使用率
  $scope.diskUtilTitle = '获取磁盘使用率';
  $scope.isShowDiskUtilTable = false;
  $scope.isShowDiskUtilInfo = function() {
    $scope.isShowDiskUtilTable = !$scope.isShowDiskUtilTable;
  };
  function getProjectDiskUtil() {
      return $http({
        method: 'GET',
        url:'/api/v1/get_project_disk_util_summary'
    }).then(function(data,status){
      dealProjectDiskUtilData(data.data);
      console.log("success");
    }).catch(function(data,status){
      console.log("error");
    })
  };
  getProjectDiskUtil();
  //处理获得的数据
  var initDiskUtilTableThdata=[
    {"showName":"应用线","tbodyKey":"app","width":"100px"},
    {"showName":"Disk util(PanguChunkserver)","tbodyKey":"disk_util_cs","width":"200px"},
    {"showName":"Top Cluster(PanguChunkserver)","tbodyKey":"top_cluster_cs","width":"200px"},
    {"showName":"Disk util(PanguMaster)","tbodyKey":"disk_util_ms","width":"200px"},
    {"showName":"Top Cluster(PanguMaster)","tbodyKey":"top_cluster_ms","width":"200px"},
  ];
  function dealProjectDiskUtilData(data){
    var initTableData=[];
    data.map(function(item, index){
      var thbodyObj={};
      thbodyObj.app=dealTablebodyObj(item.project_name);
      thbodyObj.disk_util_cs=dealTablebodyObj(item.PanguChunkserver.util);
      var topClusterCs=item.PanguChunkserver.top_cluster+":"+item.PanguChunkserver.top_cluster_util
      thbodyObj.top_cluster_cs=dealTablebodyObj(topClusterCs);
      thbodyObj.disk_util_ms=dealTablebodyObj(item.PanguMaster.util);
      var topClusterMs=item.PanguMaster.top_cluster+":"+item.PanguMaster.top_cluster_util
      thbodyObj.top_cluster_ms=dealTablebodyObj(topClusterMs);
      initTableData.push(thbodyObj);
    });
    $scope.projectDiskUtilData={
      // "title":title,
      "theadData":initDiskUtilTableThdata,
      "tbodyData":initTableData,
      "closeSelectInput":true,
      "closePagination":true
    };
  };
  $scope.openDiskUtilDetail=function(){
    window.location.href="/project_disk_util_detail";
  }
  //
  //	$scope.baseInfoTitle = '关键汇总数据';
	$scope.isShowBaseInfoTable = false;
	$scope.isShowBaseInfo = function() {
		$scope.isShowBaseInfoTable = !$scope.isShowBaseInfoTable;
	}
	function disClusterAllData(data){
      // var groupList = 0
      // if(data.groups) {
      // 	for(var i in data.groups) {
      // 		groupList++;
      // 	}
      // 	groupList = manageNum(groupList,0);
      // }
      var group_count=manageNum(data.group_count?data.group_count:0,0);
      var total_size=manageNum(data.total_size,3)+" TB";
      var used_percent=manageNum(data.used_percent,3)+"%";
      var abn_disk_percent=manageNum(data.abn_disk_count/data.total_disk_count,5)+"%";
      var total_cluster_count=manageNum(data.total_cluster_count,0);
      var total_file_count=manageNum(data.total_file_count,0); 
      var machine_count=manageNum(data.total_machine_count,0);
      var total_dir_count=manageNum(data.total_dir_count-data.total_file_count,0);
      var ms_count=manageNum(data.total_ms_count,0);  
      var abn_cs_count=manageNum(data.abn_cs_count,0);  
      var total_disk_count=manageNum(data.total_disk_count,0);  
      var abn_disk_count=manageNum(data.abn_disk_count,0); 
      // var all_fatal_count=manageNum(data.tianji_monitor_count.all_fatal_count,0);  
      // var all_error_count=manageNum(data.tianji_monitor_count.all_error_count,0);  
      // var all_warning_count=manageNum(data.tianji_monitor_count.all_warning_count,0);
      // var new_clusters_count= manageNum(data.new_clusters_count,0);
      var all_fatal_count=manageNum(data.alert_fatal,0);  
      var all_error_count=manageNum(data.alert_error,0);  
      var all_warning_count=manageNum(data.alert_warning,0);
      var new_clusters_count= manageNum(data.new_cluster_count,0);
      var obj={};
      obj.thData=["关键汇总数据","每日动态数据","风险预测"];
      obj.tdData=[];
      // 手动划分表格信息
      var tdArr1=[];
      var tdArr2=[];
      var tdArr3=[];
      var tdArr4=[];
      var tdArr5=[];
      tdArr1.push({"name":"应用线总数:","color":""});
      tdArr1.push({"name":group_count,"color":"panguOverviewBlue","url":'/group_summary'}); 
      tdArr1.push({"name":"存储使用比例:","color":""});
      tdArr1.push({"name":used_percent,"color":"panguOverviewBlue"});
      tdArr1.push({"name":"坏盘率:","color":""});
      tdArr1.push({"name":abn_disk_percent,"color":"panguOverviewBlue"});  
    
      tdArr2.push({"name":"集群总数:","color":""});
      tdArr2.push({"name":total_cluster_count,"color":"panguOverviewBlue"});
      tdArr2.push({"name":"文件总数:","color":""});
      tdArr2.push({"name":total_file_count,"color":"panguOverviewBlue"});
      tdArr2.push({"name":"报警-FATAL:","color":""});
      tdArr2.push({"name":all_fatal_count,"color":"panguOverviewRed","url":'/monitor_summary'});

      tdArr3.push({"name":"机器总数:","color":""});
      tdArr3.push({"name":machine_count,"color":"panguOverviewBlue"});
      tdArr3.push({"name":"目录总数:","color":""});
      tdArr3.push({"name":total_dir_count,"color":"panguOverviewBlue"});
      tdArr3.push({"name":"报警-ERROR:","color":""});
      tdArr3.push({"name":all_error_count,"color":"panguOverviewPink","url":'/monitor_summary'});

      tdArr4.push({"name":"磁盘总数:","color":""});
      tdArr4.push({"name":total_disk_count,"color":"panguOverviewBlue"});
      tdArr4.push({"name":"总存储量:","color":""});
      tdArr4.push({"name":total_size,"color":"panguOverviewBlue"});
      tdArr4.push({"name":"报警WARNING:","color":""});
      tdArr4.push({"name":all_warning_count,"color":"panguOverviewOrange","url":'/monitor_summary'});

     tdArr5.push({"name":"最近一个月新增集群:","color":""});
     tdArr5.push({"name":new_clusters_count,"color":"panguOverviewBlue","url":'/monitor_summary_newcluster'});
     tdArr5.push({"name":"","color":""});
     tdArr5.push({"name":"","color":""});
     tdArr5.push({"name":"","color":""});
     tdArr5.push({"name":"","color":""});
      obj.tdData.push(tdArr1);
      obj.tdData.push(tdArr2);
      obj.tdData.push(tdArr3);
      obj.tdData.push(tdArr4);
      obj.tdData.push(tdArr5);  
      $scope.panguOverviewTableDataGroup = obj;
    }
	$scope.requestClusterBasic = function() {
        return $http({
	        method: 'GET',
	        url:'/api/v1/global_basic?option=index'
	    }).then(function(data,status){
	    	$scope.baseInfoTitle = '关键汇总数据 (更新时间:' + data.data.update_date + ')';
	        disClusterAllData(data.data);    //处理基础数据
	        // disTreeMapData3(data.data.groups);
	        // $scope.getVerList(data.data.build_id_detail);//all_version_json
	      //  handleVersionInfo(data.data.build_id_detail);
	     //   handleGroupAllInfo(data.data.groups);
	    }).catch(function(data,status){
	        console.log("error");
	    })
    }
	$scope.requestClusterBasic();
  function requestClusterBasic() {
        return $http({
          method: 'GET',
          url:'/api/v1/global_health'
      }).then(function(data,status){
        // $scope.baseInfoTitle = '关键汇总数据 (更新时间:' + data.data.update_date + ')';
          // disClusterAllData(data.data);    //处理基础数据
          disTreeMapData3(data.data);
          // $scope.getVerList(data.data.build_id_detail);
        //  handleVersionInfo(data.data.build_id_detail);
       //   handleGroupAllInfo(data.data.groups);
      }).catch(function(data,status){
          console.log("error");
      })
    }
 requestClusterBasic();
  function getGlobalVer(){
    panguDashboardService.getGlobalPanguVer().then(function(data){
      $scope.getVerList(data);
      
    },function(data){
      console.log("err:",data)
    })
  };
  getGlobalVer()
	//健康热力图
	$scope.showTreeMapChartLoading = true;
	$scope.healthChartTitle = '健康热力图';
	$scope.healthChartIsShow = false;
	$scope.healthChartShow = function() {
		$scope.healthChartIsShow = !$scope.healthChartIsShow;
	}
	$scope.clusterTreemapData={};
	$scope.getHealthTreeData = function() {
		
	}
	$scope.getHealthTreeData;
    //处理 cluster 请求获得的数据 --> 处理热力图数据
	function disTreeMapData3(data){
		var clusterChart=[];
		var regionChart={}; 
		for(var i in data){
		    //计算集群健康度图表数据
		    var region_p={};
		    region_p = {
		       id: i,
		       name: i,
		       color: "#FFFFFF"
		    };
		    clusterChart.push(region_p);
        for(var key in data[i]) {
          var color_cluster_p="";
          var cluster_p={};
          if(data[i][key].score==0){
            color_cluster_p="#090"
          }else if(data[i][key].score<100)
          {
            color_cluster_p="#F90"
          }else if(data[i][key].score<10000){
            color_cluster_p="#F4F"
          }else{
            color_cluster_p="#F00"
          }
          cluster_p = {
              id: i+key,
              name: key,
              parent: i,
              value: 1,
              color: color_cluster_p,
              events:{
                click:function(e){  //点击事件  
                  window.open("/health?type=cluster&cluster="+e.point.name+"&group="+e.point.parent);
                }
              }
            }
            clusterChart.push(cluster_p);
        };
		   	// for(var key in data[i].health_map_score) {
		   	// 	var color_cluster_p="";
		   	// 	var cluster_p={};
		   	// 	if(data[i].health_map_score[key]==0){
			   //    color_cluster_p="#090"
			   //  }else if(data[i].health_map_score[key]<100)
			   //  {
			   //    color_cluster_p="#F90"
			   //  }else if(data[i].health_map_score[key]<10000){
			   //    color_cluster_p="#F4F"
			   //  }else{
			   //    color_cluster_p="#F00"
			   //  }
			   //  cluster_p = {
			   //      id: i+key,
			   //      name: key,
			   //      parent: i,
			   //      value: 1,
			   //      color: color_cluster_p,
			   //      events:{
			   //        click:function(e){  //点击事件  
			   //          window.open("/health?type=cluster&cluster="+e.point.name+"&group="+e.point.parent);
			   //        }
			   //      }
		    //     }
		    //     clusterChart.push(cluster_p);
		    // };
		}
	    $scope.panguTreemapData = {
	      "id":"indexClusterTreemap",
	      "seriesData":clusterChart
	    };
	    $scope.showTreeMapChartLoading = false;
	}
	//sla
	// 点击展开大图
    $scope.showBigChart=function(data,param){
       console.log(data, 'data')
      data.param=param;
      data.group=$scope.mapsParam.group;
      data.refresh=$scope.mapsParam.refresh;
      var modalInstance = $uibModal.open({
           templateUrl: '/static/js/module/clickUibModal/showBigChart.html',
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
    
	$scope.slaTitle = '关键实时数据';
	$scope.isShowSlaChart = false;
	$scope.showSlaChart = function() {
		$scope.isShowSlaChart = !$scope.isShowSlaChart;
	}
	$scope.allChartDetailyDatas=[];
	$scope.top5TableConfig=[];
    var btime=dealTimeFormat(0.5);
    var etime=dealTimeFormat(0);
    $scope.initTime=0.5;
    function getConfigFileData(){
      panguService.getportalConfig().then(function (data) {
        $scope.allChartDetailyDatas=data.data.line;
        $scope.top5TableConfig=data.data.table;
        $scope.refreshTargetData($scope.initTime);
        getTop5Data($scope.initTime);
        console.log("get dashboard_config success");
      },function(data){
        //处理响应失败
        console.log("get dashboard_config error");
      }).catch(function(data){
        //处理数据 异常捕获
        console.log("processing dashboard_config data catch");
      })
    }
    getConfigFileData();
    
    $scope.showClusterHr=function(cluster_name,click_name,group){
      var obj={};
      for(var i in $scope.top5TableConfig){
        if(click_name==$scope.top5TableConfig[i].id){
          obj=$scope.top5TableConfig[i];
        }
      }
      btime=dealTimeFormat($scope.initTime);
      etime=dealTimeFormat(0);
      var host="-1";
      var cluster=cluster_name;
      var urlStr1=obj.group_hr;
      // var urlStr1=obj.param_plus;
      var urlStr2=urlStr1.replace(/\$CLUSTER/g,cluster);
      var urlStr3=urlStr2.replace(/\$HOST/g,host);
      var urlStr4=urlStr3.replace(/\$BTIME/g,btime);
      var urlStr5=urlStr4.replace(/\$ETIME/g,etime);
      var urlStr6=urlStr5.replace(/\$GROUP/g,group);
      window.open(urlStr6);
    }
    // 获取所有基线配置数据
    $scope.baselineConfigdata={};
    function getBaselineConfig(){
      var postData={};
      postData.html="new_index";
      postData.page=window.location.href;
      panguService.postBaselineConfig(postData).then(function (data) {
        $scope.baselineConfigdata=data.data;
      },function(data){
        //处理响应失败
      }).catch(function(data){
        //处理数据 异常捕获
      })
    };
    getBaselineConfig();
    //  获取 chart 
    $scope.mapTargetData={}; //接收返回数据结构    
    function getTargetData(begin_time,end_time,matrix,param_plus,id){
        var delurl=param_plus+'&btime='+begin_time+'&etime='+end_time;
        return $http({
	        method: 'GET',
	        url:delurl
        }).then(function(data,status){
	        for(var i in $scope.allChartDetailyDatas){
	            for(var j in $scope.allChartDetailyDatas[i].metrics){
		            if($scope.allChartDetailyDatas[i].metrics[j].id==id){
		                $scope.allChartDetailyDatas[i].metrics[j].showChartloading=false;
		            }
	            }
	        }
	        // disTargetData(data.data,matrix,id);
          $scope.mapTargetData[id]=disTargetData(data.data,matrix,id,$scope.baselineConfigdata);
	        console.log("success");
        }).catch(function(data,status){
            console.log(" error");
        })
    };
    
    
    // function disTargetData(data,matrix,id){
    //   var obj={};
    //   obj.seriesData=[];
    //   obj.title=matrix;
    //   obj.id=id;
    //   for(var i in data){
    //     var seriesobj={};
    //     if(i=="time"){
    //       // obj.xAxis=data.time;
    //       continue;
    //     };
    //     seriesobj.pointStart=data["time"][0]*1000+8*60*60*1000;
    //     seriesobj.pointInterval=data["time"][1]*1000-data["time"][0]*1000;
    //     seriesobj.name=i;
    //     seriesobj.marker={};
    //     seriesobj.marker.enabled=false;
    //     seriesobj.data=data[i];
    //     obj.seriesData.push(seriesobj);
    //   }
    //   $scope.mapTargetData[id]=obj;
    // }
    
    var refStartStr = true;
    $scope.refreshTargetData=function(num){
      $scope.refreshDuration = num;
      $scope.initTime=num;
      var begin_time=dealTimeFormat(num);
      var end_time=dealTimeFormat(0);
      btime=begin_time;
      etime=end_time;
      for(var i in $scope.allChartDetailyDatas){
        for(var j in $scope.allChartDetailyDatas[i].metrics){
          //showchart
          $scope.allChartDetailyDatas[i].metrics[j].showChartloading=refStartStr;
          var tarname=$scope.allChartDetailyDatas[i].metrics[j].name;
          var tarparam=$scope.allChartDetailyDatas[i].metrics[j].param_plus;
          var tarId=$scope.allChartDetailyDatas[i].metrics[j].id;
          getTargetData(begin_time,end_time,tarname,tarparam,tarId);
        }
      }
    };
    
    $scope.selectCheckbox=false;
    var refreshChartTime;
    $scope.refreshChart=function(){
      var refreshTime=60*1000;
      if($scope.mapsParam.refresh){
        refreshTime=parseInt($scope.mapsParam.refresh)*1000;
      }
      if($scope.selectCheckbox==true){
//        getTop5Data($scope.initTime)
        $scope.refreshTargetData($scope.initTime);
         refreshChartTime = setInterval(function() {
//          getTop5Data($scope.initTime)
          $scope.refreshTargetData($scope.initTime);
        }, refreshTime);
      }else{
        clearInterval(refreshChartTime);
      }
    }
	//top10
	$scope.topTenTitle = "TOP10数据(采集时间："+ btime+" -- "+ etime+ ")";
	$scope.isShowTopTen = false;
	$scope.showTopTen = function() {
		$scope.isShowTopTen = !$scope.isShowTopTen;
	}
	    //top5 请求
  function requestTop5Data(begin_time,end_time,counter,id,starturl,func){
    var delurl = '';
    if($scope.mapsParam.group) {
    	delurl=starturl+'group='+$scope.mapsParam.group+'&btime='+begin_time+'&etime='+end_time;
    }else{
    	delurl=starturl+'&btime='+begin_time+'&etime='+end_time;
    }  
    if($scope.mapsParam.clusters){
      delurl=delurl+"&clusters="+$scope.mapsParam.clusters
    }
    
    return $http({
        method: 'GET',
        url:delurl
    }).then(function(data,status){
      for(var i in $scope.top5TableConfig){
        if($scope.top5TableConfig[i].id==id){
          $scope.top5TableConfig[i].showTableloading=false;
        }
      }
      $scope.showTop5Data[id]=disTop5Data(data.data,counter,id,func,$scope.baselineConfigdata[counter]);
      console.log("success");
    }).catch(function(data,status){
      console.log(" error");
    })
  };
  //循环同步 发送请求
  function getTop5Data(num){
    var begin_time=dealTimeFormat(num);
    var end_time=dealTimeFormat(0);
    btime=begin_time;
    etime=end_time;
    for(var i in $scope.top5TableConfig){
      $scope.top5TableConfig[i].showTableloading=refStartStr;
      var obj=$scope.top5TableConfig[i];
      counter=obj.counter;
      id=obj.id;
      starturl=obj.param_plus
      func=obj.func
      requestTop5Data(begin_time,end_time,counter,id,starturl,func);
    }
    refStartStr=false;
  };
    // getTop5Data($scope.initTime);
   // $scope.top5Title="TOP5数据(采集时间："+ btime+" -- "+ etime+ ")"
    // refreshTargetData
    $scope.showTop5Data={};
    // function disTop5Data(data,counter,id,func){
    //   var obj={};
    //   obj.id=id;
    //   obj.data=[];
    //   for(var i in data){
    //     var digObj={};
    //     digObj.key=data[i].key;
    //     digObj.group=data[i].group;
    //     if(func=="manageNum6"){
    //       digObj.val=manageNum(data[i].val,6);
    //     }
    //     if(func=="manageNum3"){
    //       digObj.val=manageNum(data[i].val,3);
    //     }
    //     if(func=="toMB"){
    //       digObj.val=manageNum(data[i].val/1024/1024,3);
    //     }
    //     obj.data.push(digObj);
    //   }
    //   $scope.showTop5Data[id]=obj;
    // }
	//版本信息汇总
	$scope.versionTitle = '版本信息汇总';
	$scope.isShowVersionTitle = false;
	$scope.showVersionTitle = function() {
		$scope.isShowVersionTitle = !$scope.isShowVersionTitle;
	}
	$scope.portal_version_info = {};
	var versionInfo = [];
	//获取版本信息
	$scope.getVerList = function(data1) {
		var Url = '/api/v1/pangu_ver_list?detail=0'
		if($scope.mapsParam && $scope.mapsParam.index) {
			Url = '/api/v1/pangu_ver_list1?detail=0'
		}
		return $http({
	        method: 'GET',
	        url: Url
       }).then(function(data,status){
	       if(!data.data.err) {
	       	  $scope.pangu_ver_list = data.data;
	       	  //handleVersionInfo(data1, data.data);
	       	  $scope.portal_version_info = {
	       	  	    "theadData":[
				         {"showName":"build id","tbodyKey":"buildId","width":""},
				         {"showName":"版本","tbodyKey":"ver","width":""},
				         {"showName":"已发布业务线","tbodyKey":"groupStr","width":""},
				         {"showName":"发布时间","tbodyKey":"time","width":""},
				         {"showName":"已发布集群数","tbodyKey":"clusterNum","width":""},
				         {"showName":"注册状态","tbodyKey":"registatus","width":""}
			        ],
			       "tbodyData":handleVersionInfo(data1, data.data)
	       	  }
	       }
        }).catch(function(data,status){
            console.log(" error");
        })
	}
    $scope.getBuildid_details = function(data) {
    	var build_id = data.action;
    	$scope.openBuild_datails(build_id);
    }
    function handleVersionInfo(data, pangu_ver_list) {
    	var result = []
    	for(var key in data) {
    		var registatus = '未注册';
    		if(pangu_ver_list && pangu_ver_list.length) {
    			pangu_ver_list.map(function(item) {
    				if(item === key) {
    					registatus = '已注册'
    				}
    			})
    		}
    		var groupStr = '';
    		var groupArr = [];
    		if(data[key].group){
    			for(var i in data[key].group) {
    				groupArr.push(i);
    			}
    		}
    		groupStr = groupArr.join(',');
    		var clusters = [];
    		if(data[key].mod) {
    			for(var j in data[key].mod) {
    				clusters.push(Number(data[key].mod[j]));
    			}
    		}
    		result.push({
    			"buildId":{
    				// "button":[key]
            'name' :key,
            'click':key
    			},
    			"ver":{
    			    'name':data[key].apsara_ver
    			},
    			"groupStr":{
    				'name':groupStr
    			},
    			"time":{
    				'name':data[key].build_create_time
    			},
    			"clusterNum":{
    				'name':clusters.sort()[clusters.length-1],
    			    "url":"/pangu_ver_detail?build_id="+key
    			},
    			"registatus":{
    				'name':registatus
    			}
    		})
    	}
    	return result.sort(compare);
    }
    function compare(x, y) {
    	if (x['clusterNum'].name > y['clusterNum'].name)
    	{
    		return -1;
    	}
    	if (x['clusterNum'].name < y['clusterNum'].name)
    	{
    		return 1;
    	}
    	return 0;
    }

    //获取双11 大盘相关数据
    $scope.openHistory1111Data={
      "group":$scope.mapsParam.group,
      "cluster":$scope.mapsParam.cluster
    };
    //版本信息汇总，点击build_id,打开弹窗
    $scope.openBuild_datails = function(build_id) {
		var modalInstance = $uibModal.open({
	         templateUrl:'/static/js/common/build_id_details.html',
	         controller: 'ModalBuildIdCtrl',
	         backdrop: "static",
             //size: size,
             resolve:{
                items1: function () {
                    return {
                    	'build_id':build_id,
                    	'scope':$scope
                    }
                }
             }
        });
	}
})

myApp.controller('ModalBuildIdCtrl',function($scope, $uibModalInstance, items1, $http){
	 var build_id = items1.build_id;
     var screenHeight = document.documentElement.clientHeight;
     setTimeout(function(){
         var myModal = document.querySelector('.modal-content');
	     myModal.style.top = 150 + 'px';
	     myModal.style.width = 500 + 'px';
     },100)
     //请求数据得到groupList
     $scope.getGroupList = function() {
     	  	return $http({
	            method: 'get',
	            url:'/api/v1/get_apsara_ver_by_fastwork?build_id='+build_id
	        }).then(function(data,status){
	        	if(data.data) {
	        		$scope.build_id_details = data.data.message.split("\n");
	        	}
	        })
     }
     $scope.getGroupList();
     $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
     };
});
