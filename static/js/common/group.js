var myApp=angular.module('myApp',[]);
		myApp.directive('highchart', function () {
        var seriesId = 0;
        var ensureIds = function (series) {
            // series.forEach(function (s) {
            //     if (!angular.isDefined(s.id)) {
            //         s.id = "series-" + seriesId++;
            //     }
            // });
        }
        var getMergedOptions = function (element, options, series) {
            var defaultOptions = {
                chart: {
                    renderTo: element[0]
                },
                title: {},
                series: []
            }
            var mergedOptions = {}
            if (options) {
                mergedOptions = $.extend(true, {}, defaultOptions, options);
            } else {
                mergedOptions = defaultOptions;
            }
            if(series) {
              mergedOptions.series = series
            }
            return mergedOptions
        }
        return {
            restrict: 'EC',
            replace: false,
            scope: {
                series: '=',
                options: '=',
                title: '='
            },
            link: function (scope, element, attrs) {

                var mergedOptions = getMergedOptions(element, scope.options, scope.series);
                var chart = new Highcharts.Chart(mergedOptions);

                scope.$watch("series", function (newSeries, oldSeries) {
                    //do nothing when called on registration
                    if (newSeries === oldSeries) return;
                    if (newSeries) {
                        ensureIds(newSeries);
                        var ids = []

                        //Find series to add or update
                        // newSeries.forEach(function (s) {
                        //   ids.push(s.id)
                        //   var chartSeries = chart.get(s.id);
                        //   if (chartSeries) {
                        //     chartSeries.update(angular.copy(s), false);
                        //   } else {
                        //     chart.addSeries(angular.copy(s), false)
                        //   }
                        // });
                        //Now remove any missing series
                        // chart.series.forEach(function (s) {
                        //   if (ids.indexOf(s.options.id) < 0) {
                        //     s.remove(false);
                        //   }
                        // });
                        chart.redraw();
                    }


                }, true);
                scope.$watch("title", function (newTitle) {
                    chart.setTitle(newTitle, true);
                }, true);
                scope.$watch("options", function (newOptions, oldOptions, scope) {
                    //do nothing when called on registration
                    if (newOptions === oldOptions) return;
                    chart.destroy()
                    var mergedOptions = getMergedOptions(element, newOptions);
                    chart = new Highcharts.Chart(mergedOptions);
                    chart.setTitle(scope.title, true);
                    ensureIds(scope.series);
                    // scope.series.forEach(function (s) {
                    //     chart.addSeries(angular.copy(s), false)
                    // });
                    chart.redraw()

                }, true);
            }
        }
    });  
    myApp.controller('personCtrl',function($scope,$http,$filter,){
      //集群总览 描述修改
      $scope.showCluDesc=true;
      $scope.clusterDesc="";
      $scope.changeShowCluDesc=function(val){
        $scope.showCluDesc=false;
        $scope.clusterDesc=val

      }
      $scope.cancelDesc=function(){
        $scope.showCluDesc=true;
        $scope.clusterDesc="";
      }
      $scope.okDesc=function(){
        console.log($scope.clusterDesc);
        
      }


      //testaddclass
      $scope.addClassFunc=function(){
        //doc-page-nav
        $(".doc-page-nav").addClass("testaddclass");
      }
      //点击TS图表跳转到相关页面
      $scope.openTsAg=function(name){
        window.open("/terminal_service?host="+name);
        // window.open("/testcluster");
      }
      //获取Url参数
      $scope.mapsParam={};
      $scope.getUrlPr=function(){
        var url=window.location.href;
        var arrUrl=url.split("?");
        var mapParam = {};
        if(arrUrl[1]){
          var groupUrl=arrUrl[1].split("&");
          for(var i=0;i<groupUrl.length;i++){
            lsParam = groupUrl[i].split("=");
            mapParam[lsParam[0]] = lsParam[1];
          }
        }
        $scope.mapsParam=mapParam;
      }
      $scope.getUrlPr();
      //图表标题
      $scope.groupHig=$scope.mapsParam.group+"-过去24小时SLA";
      $scope.groupInfo=$scope.mapsParam.group+"-汇总信息";
      $scope.groupVerInfo=$scope.mapsParam.group+"-版本汇总信息";
      $scope.groupCluster=$scope.mapsParam.group+"-集群概况";
      //集群概况 显示/不显示
      $scope.clusterInit="true";
      $scope.clusterSwitch= function(){
        $scope.clusterInit=!$scope.clusterInit;
      }
      //版本汇总 显示/不显示
      $scope.versionInit=true;
      $scope.versionSwitch= function(){
        $scope.versionInit=!$scope.versionInit;
      }
      //搜索
      $scope.searchStr="";
      $scope.changePager = function (searchName,data) {
        //oss汇总信息
        // var copeclusterInfo=$scope.allClusterInfo;
        // listCopeClusterInfo=$scope.allClusterInfo;
        if(data=="clusterName"){
          if(searchName){
            var filtered = $filter('filter')(listCopeClusterInfo, {cluster_name: searchName});
            $scope.allClusterInfo=filtered;   
          }else{
            $scope.allClusterInfo=listCopeClusterInfo;
          }
        };
        //oss版本汇总信息
        //listCopeGroupversion  versionInit
        if(data=="clusterId" && $scope.versionInit==true){
          if(searchName){
            var filtered = $filter('filter')(listCopeGroupversion.version,  searchName);
            $scope.getGroupSummaryData.version=filtered;   
          }else{
            $scope.getGroupSummaryData.version=listCopeGroupversion.version
          }
        };
        if(data=="clusterId" && $scope.versionInit==false){
          if(searchName){
            var filtered = $filter('filter')(listCopeGroupversion.versionState,{name:searchName});
            $scope.getGroupSummaryData.versionState=filtered;   
          }else{
            $scope.getGroupSummaryData.versionState=listCopeGroupversion.versionState
          }
        };
        // 集群概况 cluster_deploy.space_region
        if(data=="getGroupClusterData"){
          if(searchName){
            var filtered = $filter('filter')($scope.listGroupClusterData, {cluster_server_headle:searchName});
              $scope.getGroupClusterData=filtered;   
          }else{
            $scope.getGroupClusterData=$scope.listGroupClusterData
          }
        };
        //groupClusterDeploy  集群部署信息
        if(data=="groupClusterDeploy"){
          if(searchName){
            var filtered = $filter('filter')($scope.listReformClusterData.groupClusterDeploy, {space_region:searchName});
              $scope.reformClusterData.groupClusterDeploy=filtered;   
          }else{
            $scope.reformClusterData.groupClusterDeploy=$scope.listReformClusterData.groupClusterDeploy
          }
        };
        //集群容量信息 groupClusterVolume comp_num
        if(data=="groupClusterVolume"){
          if(searchName){
            var filtered = $filter('filter')($scope.listReformClusterData.groupClusterVolume, {comp_num:searchName});
              $scope.reformClusterData.groupClusterVolume=filtered;   
          }else{
            $scope.reformClusterData.groupClusterVolume=$scope.listReformClusterData .groupClusterVolume
          }
        };
        // groupClusterHardHeadle 集群硬件健康状态 abnormal_machine_num
        if(data=="groupClusterHardHeadle"){
          if(searchName){
            var filtered = $filter('filter')($scope.listReformClusterData.groupClusterHardHeadle, {abnormal_machine_num:searchName});
              $scope.reformClusterData.groupClusterHardHeadle=filtered;   
          }else{
            $scope.reformClusterData.groupClusterHardHeadle=$scope.listReformClusterData .groupClusterHardHeadle
          }
        };
        //groupClusterServerHeadle  集群服务健康状态 cluster_server_headle
        if(data=="groupClusterServerHeadle"){
          if(searchName){
            var filtered=$filter('filter')($scope.listReformClusterData.groupClusterServerHeadle,searchName);
            $scope.reformClusterData.groupClusterServerHeadle=filtered;   
          }else{
            $scope.reformClusterData.groupClusterServerHeadle=$scope.listReformClusterData .groupClusterServerHeadle
          }
        };
        // groupClusterDataHeadle 集群数据流健康状态 cluster_SLA
        if(data=="groupClusterDataHeadle"){
          if(searchName){
            var filtered = $filter('filter')($scope.listReformClusterData.groupClusterDataHeadle, {cluster_SLA:searchName});
              $scope.reformClusterData.groupClusterDataHeadle=filtered;   
          }else{
            $scope.reformClusterData.groupClusterDataHeadle=$scope.listReformClusterData .groupClusterDataHeadle
          }
        };
      };
      //方法 3位一个，号 保留小数点后2位 
      function manageNum(num){
        // var inputNum=parseInt(num);
        if(num=="none"){
          return "none";
        }
        var num1=parseFloat(num);
        var num2=num1.toFixed(3);
        var num3=parseFloat(num2).toLocaleString();
        return num3
      }
      //保留小数点后4位 
      function manageNum4(num){
        // var inputNum=parseInt(num);
        
        var num1=num.toFixed(4);
        var num2=num1*100+"%"
        return num2
      }
      //保留小数点后3位 
      function manageNum5(num){
        // var inputNum=parseInt(num);
        
        var num1=num.toFixed(3);
        
        return num1
      }
      //数组排序
      $scope.compareArr=function(grdate){
        grdate=grdate.sort();
      };
      //表格排序
      $scope.compareShowUpDown=true;
      $scope.compareTable=function(grdate,name){
          $scope.compareShowUpDown=false;
          grdate=grdate.sort(compareToDown(name));
      };
      $scope.compareTable1=function(grdate,name){
          $scope.compareShowUpDown=true;
          grdate=grdate.sort(compareToUp(name));
      };
      function compareToDown(name) {  
        return function(o, p) {  
            var a, b;  
            if (typeof o === "object" && typeof p === "object" && o && p) {
                a = o[name];  
                b = p[name];  
                if (a === b) {  
                    return 0;  
                }  
                if(!isNaN(a)&&!isNaN(b)){  
                    return parseInt(a) < parseInt(b) ? -1 : 1;  
                }  
                if (typeof a === typeof b) {  
                    return a < b ? -1 : 1;  
                }  
                return typeof a < typeof b ? -1 : 1;  
            }  
        };  
      }
      function compareToUp(name) {  
        return function(o, p) {  
            var a, b;  
            if (typeof o === "object" && typeof p === "object" && o && p) {
                a = o[name];  
                b = p[name];  
                if (a === b) {  
                    return 0;  
                }  
                if(!isNaN(a)&&!isNaN(b)){  
                    return parseInt(a) > parseInt(b) ? -1 : 1;  
                }  
                if (typeof a === typeof b) {  
                    return b < a ? -1 : 1;  
                }  
                return typeof b < typeof a ? -1 : 1;  
            }  
        };  
      }
      //获取-过去24小时SLA 图表数据
      $scope.getGroupSLAData=[];
      $scope.listGroupSLAData=[];
      $scope.getGroupSLA=function(){
        return $http({
            method: 'GET',
            url:'/api/v1/pangu_sla?group='+$scope.mapsParam.group
        }).then(function(data,status){
          console.log("success");
          $scope.getGroupSLAData=data.data.sla;
          $scope.listGroupSLAData=data.data.sla;
          $scope.getGroupClusterData.slaCluster=data.data;
          $scope.listGroupClusterData.slaCluster=data.data;
          $scope.getGroupCluster();
          showHIG();
        }).catch(function(data,status){
          console.log(" error");
        })
      }
      $scope.getGroupSLA();

    	//group_summary.json 
      //获取-汇总信息数据  tianji_monitor group_basic
      $scope.getGroupSummaryData={};
      var listCopeGroupversion={};
      $scope.listGroupSummaryData=[];
      $scope.getGroupSummary=function(){
        return $http({
            method: 'GET',
            url:'/api/v1/group_basic?group='+$scope.mapsParam.group
        }).then(function(data,status){
          console.log("success");
          //manageNum
          $scope.getGroupSummaryData.basic={};
          $scope.getGroupSummaryData.basic.total_cluster_count=manageNum(data.data.total_cluster_count);
          $scope.getGroupSummaryData.basic.total_machine_count=manageNum(data.data.total_machine_count);
          $scope.getGroupSummaryData.basic.total_ms_count=manageNum(data.data.total_ms_count);
          $scope.getGroupSummaryData.basic.max_ms_count=manageNum(data.data.max_ms_count);
          $scope.getGroupSummaryData.basic.total_cs_count=manageNum(data.data.total_cs_count);

          $scope.getGroupSummaryData.basic.max_cs_count=manageNum(data.data.max_cs_count);
          $scope.getGroupSummaryData.basic.total_size=manageNum(data.data.total_size)+"TB";
          $scope.getGroupSummaryData.basic.used_percent=data.data.used_percent.toFixed(3)+"%";
          $scope.getGroupSummaryData.basic.update_date=data.data.update_date;
          $scope.getGroupSummaryData.basic.total_machine_count=manageNum(data.data.total_machine_count);
          var sumVersion={};
          if(data.data.all_version_json!=""){
            sumVersion=JSON.parse(data.data.all_version_json);
          }else{
            // $scope.getGroupSummaryData.version=null;
            sumVersion=null;
          }
          var sumArr=[];
          for(var i in sumVersion){
            listSumVersion=i+""+sumVersion[i];
            var arr=[];
            for(var j in sumVersion[i]){
              var str=j+":"+sumVersion[i][j];
              arr.push(str);
            }
            var sumStr=i+":"+arr.join();
            sumArr.push(sumStr);
          }
          $scope.getGroupSummaryData.version=sumArr;

          listCopeGroupversion.version=sumArr;
          var statsVerArr=[];
          var count=1;
          for(var k in data.data.all_version_stats){
            var stats={};

            if(k.split('#')[0]=="TianjiMonData"){
              continue;
            }
            stats.name=k.split('#')[0];
            stats.id="statsVerId"+count;
            if(stats.name=="PanguMaster"){
              stats.classNav=true;
            }else{
              stats.classNav=false;
            }
            
            count++;
            stats.val=data.data.all_version_stats[k];
            // for(var l=0;l<data.data.all_version_stats[k].length;l++){
            //   var stats={};
            //   stats.name=data.data.all_version_stats[k][l].main_ver;
            //   stats.val=data.data.all_version_stats[k][l].sub_ver;
              
            // }
            statsVerArr.push(stats);
          }
          $scope.getGroupSummaryData.versionData=statsVerArr[0].val;
          $scope.getGroupSummaryData.versionState=statsVerArr;
          $scope.listGroupSummaryData.basic=data.data;
          listCopeGroupversion.versionState=statsVerArr;
          getGroupMonitor();
        }).catch(function(data,status){
          console.log(" error");
        })
      }
      $scope.getGroupSummary();
      //告警汇总
      function getGroupMonitor(){
        return $http({
            method: 'GET',
            url:'/api/v1/tianji_monitor?group='+$scope.mapsParam.group
        }).then(function(data,status){
          console.log("success");
          $scope.getGroupSummaryData.monitor=data.data;
          $scope.listGroupSummaryData.monitor=data.data;
        }).catch(function(data,status){
          console.log(" error");
        })
      }
      //group_version oss版本汇总信息
      $scope.getGroupVersionData=[];
      $scope.listGroupVersionData=[];
      $scope.getGroupVersion=function(){
        return $http({
            method: 'GET',
            url:'/api/v1/group_version?group='+$scope.mapsParam.group
        }).then(function(data,status){
          console.log("success");
          $scope.getGroupVersionData=data.data.data;
          $scope.listGroupVersionData=data.data.data;
          
        }).catch(function(data,status){
          console.log(" error");
        })
      }
      // $scope.getGroupVersion();

      //group_cluster 集群概况 list_cluster
      $scope.getGroupClusterData=[];
      $scope.listGroupClusterData=[];
      $scope.getGroupCluster=function(){
        return $http({
            method: 'GET',
            url:'/api/v1/list_cluster?group='+$scope.mapsParam.group+"&detail=0"
        }).then(function(data,status){
          console.log("success");
          $scope.getGroupClusterData.listCluster=data.data;
          $scope.listGroupClusterData.listCluster=data.data;
          
          // reformClusterData(data.data.data);
        }).catch(function(data,status){
          console.log("error");
        })
      }
      
      //重组集群概况数据方便查询和排序
      $scope.reformClusterData={};
      $scope.listReformClusterData={};
      //cluster_volume  cluster_hard_headle cluster_server_headle
      //cluster_data_headle
      function reformClusterData(data){
        //展示数据
        $scope.reformClusterData.groupClusterDeploy=[];
        $scope.reformClusterData.groupClusterVolume=[];
        $scope.reformClusterData.groupClusterHardHeadle=[];
        $scope.reformClusterData.groupClusterServerHeadle=[];
        $scope.reformClusterData.groupClusterDataHeadle=[];
        //备份数据
        $scope.listReformClusterData.groupClusterDeploy=[];
        $scope.listReformClusterData.groupClusterVolume=[];
        $scope.listReformClusterData.groupClusterHardHeadle=[];
        $scope.listReformClusterData.groupClusterServerHeadle=[];
        $scope.listReformClusterData.groupClusterDataHeadle=[];
        for(var i=0;i<data.length;i++){
          //展示数据赋值
          $scope.reformClusterData.groupClusterDeploy.push(data[i].cluster_deploy);
          $scope.reformClusterData.groupClusterVolume.push(data[i].cluster_volume);
          $scope.reformClusterData.groupClusterHardHeadle.push(data[i].cluster_hard_headle);
          $scope.reformClusterData.groupClusterServerHeadle.push(data[i].cluster_server_headle);
          $scope.reformClusterData.groupClusterDataHeadle.push(data[i].cluster_data_headle);
          //备份数据赋值
          $scope.listReformClusterData.groupClusterDeploy.push(data[i].cluster_deploy);
          $scope.listReformClusterData.groupClusterVolume.push(data[i].cluster_volume);
          $scope.listReformClusterData.groupClusterHardHeadle.push(data[i].cluster_hard_headle);
          $scope.listReformClusterData.groupClusterServerHeadle.push(data[i].cluster_server_headle);
          $scope.listReformClusterData.groupClusterDataHeadle.push(data[i].cluster_data_headle);
        }
      }
  		//点击切换导航
      //右侧导航
      $scope.className ={};
      $scope.className.top1=true;
      $scope.className.top2=false;
      $scope.className.top3=false;
      $scope.className.top4=false;
      $scope.changeRightTop= function (id) {
        $scope.className.top1=false;
        if(id=='top1'){
          $scope.className.top1=true;
          $scope.className.top2=false;
          $scope.className.top3=false;
          $scope.className.top4=false;
        }
        if(id=='top2'){
          $scope.className.top1=false;
          $scope.className.top2=true;
          $scope.className.top3=false;
          $scope.className.top4=false;
        }
        if(id=='top3'){
          $scope.className.top1=false;
          $scope.className.top2=false;
          $scope.className.top3=true;
          $scope.className.top4=false;
        }
        if(id=='top4'){
          $scope.className.top1=false;
          $scope.className.top2=false;
          $scope.className.top3=false;
          $scope.className.top4=true;
        }
      }
      //初始化
      $scope.showChangeActive={
        "groupTop1":true,
        "groupTop2":true,
        "groupTop3":true,
        "groupTop4":true,
        "cluSurTop1":true,
        "cluSurTop2":false,
        "cluSurTop3":false,
        "cluSurTop4":false,
        "cluSurTop5":false,
        "grRightTop1":true,
        "grRightTop2":false,
        "grRightTop3":false,
        "grRightTop4":false,
      };
      //版本汇总信息 表格导航 clickVersionState 
      
      $scope.clickVersionState=function (app){
        var data=$scope.getGroupSummaryData.versionState;
        for(var i=0;i<data.length;i++){
          if(app==data[i].id){
            data[i].classNav=true;
            $scope.getGroupSummaryData.versionData=data[i].val;
          }else{
            data[i].classNav=false;
          }
        }
        console.log("app");

        // var obj = document.getElementById(app);
        // obj.style.backgroundColor= "#cfcfd4";
        // var ids=["cluSurTop1","cluSurTop2","cluSurTop3","cluSurTop4","cluSurTop5"];
        // for(var i=0;i<ids.length;i++){
        //   if(app!=ids[i]){
        //     document.getElementById(ids[i]).style.backgroundColor="white";
        //   }
        // }
      }
      //集群概况导航 changeCluSur cluSurTop2
      $scope.changeCluSur=function (app){
        if(app=="cluSurTop1"){
          $scope.showChangeActive.cluSurTop1=true;
          $scope.showChangeActive.cluSurTop2=false;
          $scope.showChangeActive.cluSurTop3=false;
          $scope.showChangeActive.cluSurTop4=false;
          $scope.showChangeActive.cluSurTop5=false;
        }
        if(app=="cluSurTop2"){
          $scope.showChangeActive.cluSurTop1=false;
          $scope.showChangeActive.cluSurTop2=true;
          $scope.showChangeActive.cluSurTop3=false;
          $scope.showChangeActive.cluSurTop4=false;
          $scope.showChangeActive.cluSurTop5=false;
        }
        if(app=="cluSurTop3"){
          $scope.showChangeActive.cluSurTop1=false;
          $scope.showChangeActive.cluSurTop2=false;
          $scope.showChangeActive.cluSurTop3=true;
          $scope.showChangeActive.cluSurTop4=false;
          $scope.showChangeActive.cluSurTop5=false;
        }
        if(app=="cluSurTop4"){
          $scope.showChangeActive.cluSurTop1=false;
          $scope.showChangeActive.cluSurTop2=false;
          $scope.showChangeActive.cluSurTop3=false;
          $scope.showChangeActive.cluSurTop4=true;
          $scope.showChangeActive.cluSurTop5=false;
        }
        if(app=="cluSurTop5"){
          $scope.showChangeActive.cluSurTop1=false;
          $scope.showChangeActive.cluSurTop2=false;
          $scope.showChangeActive.cluSurTop3=false;
          $scope.showChangeActive.cluSurTop4=false;
          $scope.showChangeActive.cluSurTop5=true;
        }
        var obj = document.getElementById(app);
        obj.style.backgroundColor= "#cfcfd4";
        var ids=["cluSurTop1","cluSurTop2","cluSurTop3","cluSurTop4","cluSurTop5"];
        for(var i=0;i<ids.length;i++){
          if(app!=ids[i]){
            document.getElementById(ids[i]).style.backgroundColor="white";
          }
        }
      }
      //顶部导航
  		$scope.changeactive=function (app){
        if(app=="groupTop1"){
          $scope.showChangeActive.groupTop1=true;
          $scope.showChangeActive.groupTop2=true;
          $scope.showChangeActive.groupTop3=true;
          $scope.showChangeActive.groupTop4=true;
        }
        if(app=="groupTop2"){
          $scope.showChangeActive.groupTop1=false;
          $scope.showChangeActive.groupTop2=true;
          $scope.showChangeActive.groupTop3=false;
          $scope.showChangeActive.groupTop4=false;
        }
        if(app=="groupTop3"){
          $scope.showChangeActive.groupTop1=false;
          $scope.showChangeActive.groupTop2=false;
          $scope.showChangeActive.groupTop3=true;
          $scope.showChangeActive.groupTop4=false;
        }
        if(app=="groupTop4"){
          $scope.showChangeActive.groupTop1=false;
          $scope.showChangeActive.groupTop2=false;
          $scope.showChangeActive.groupTop3=false;
          $scope.showChangeActive.groupTop4=true;
        }
  			var obj = document.getElementById(app);
				obj.style.backgroundColor= "#cfcfd4";
				var ids=["groupTop1","groupTop2","groupTop3","groupTop4"];
				for(var i=0;i<ids.length;i++){
					if(app!=ids[i]){
						document.getElementById(ids[i]).style.backgroundColor="white";
					}
				}
  		}
      //changegrRightTop('grRightTop2') 右侧导航
      $scope.changeactive=function (app){
        if(app=="grRightTop1"){
          $scope.showChangeActive.grRightTop1=true;
          $scope.showChangeActive.grRightTop2=false;
          $scope.showChangeActive.grRightTop3=false;
          $scope.showChangeActive.grRightTop4=false;
        }
        if(app=="grRightTop2"){
          $scope.showChangeActive.grRightTop1=false;
          $scope.showChangeActive.grRightTop2=true;
          $scope.showChangeActive.grRightTop3=false;
          $scope.showChangeActive.grRightTop4=false;
        }
        if(app=="grRightTop3"){
          $scope.showChangeActive.grRightTop1=false;
          $scope.showChangeActive.grRightTop2=false;
          $scope.showChangeActive.grRightTop3=true;
          $scope.showChangeActive.grRightTop4=false;
        }
        if(app=="grRightTop4"){
          $scope.showChangeActive.grRightTop1=false;
          $scope.showChangeActive.grRightTop2=false;
          $scope.showChangeActive.grRightTop3=false;
          $scope.showChangeActive.grRightTop4=true;
        }
        var obj = document.getElementById(app);
        // obj.style.backgroundColor= "#cfcfd4";
        var ids=["grRightTop1","grRightTop2","grRightTop3","grRightTop4"];
        for(var i=0;i<ids.length;i++){
          if(app!=ids[i]){
            // document.getElementById(ids[i]).style.backgroundColor="white";
          }
        }
      }
      
      function showRec(){
        var data={
          "11":{
            "21":{
              "31":"41",
              "32":"42",
              "33":"43"
            },
            "22":{
              "31":"41",
              "32":"42",
              "33":"43"
            },
            "23":{
              "31":"41",
              "32":"42",
              "33":"43"
            }
          },
          "12":{
            "21":{
              "31":"41",
              "32":"42",
              "33":"43"
            },
            "22":{
              "31":"41",
              "32":"42",
              "33":"43"
            },
            "23":{
              "31":"41",
              "32":"42",
              "33":"43"
            }
          },
          "13":{
            "21":{
              "31":"41",
              "32":"42",
              "33":"43"
            },
            "22":{
              "31":"41",
              "32":"42",
              "33":"43"
            },
            "23":{
              "31":"41",
              "32":"42",
              "33":"43"
            }
          }
        };
        var points=[],region_p,region_val,region_i,country_p,country_i,cause_p,cause_i,cause_name = [];
        cause_name['Communicable & other Group I'] = 'Communicable diseases';
        cause_name['Noncommunicable diseases'] = 'Non-communicable diseases';
        cause_name['Injuries'] = 'Injuries';
        region_i = 0;
        for (var region in data) {
          region_val = 0;
          region_p = {
            id: "id_" + region_i,
            name: region,
            color: Highcharts.getOptions().colors[region_i]
          };
          country_i = 0;
          for (var country in data[region]) {
            country_p = {
              id: region_p.id + "_" + country_i,
              name: country,
              parent: region_p.id
            };
            points.push(country_p);  
            cause_i = 0;
            for (var cause in data[region][country]) {
              cause_p = {
                id: country_p.id + "_" + cause_i,
                name: cause_name[cause],
                parent: country_p.id,
                value: Math.round(+data[region][country][cause])
              };
              region_val += cause_p.value;
              points.push(cause_p);
              cause_i++;
            }
            country_i++;
          }
          region_p.value = Math.round(region_val / country_i);
          points.push(region_p);
          region_i++;
        }
        $scope.testpoints=points;
        $scope.clustercharts = {
          options: {
            title: {
                  text: 'SLA'//指定图表标题
            },
            
            credits: {enabled: false},
            chart: {
              renderTo:"clusterRec",
              reflow:true,
              // zoomType: 'x' //缩放
            },      
            xAxis: {
              labels : //定义x轴标签的样式
              {
                fontStyle : '',
                // step:3,
                style: {
                    fontSize:'',
                    fontFamily: '微软雅黑' 
                }
              }
            },

            yAxis: {
              title: {
                  text: '应用概况'  //指定y轴标题
              }
            },
            tooltip: {
               valueSuffix: '个'   //指定鼠标移动到某个点上的提示框单位
            },
            legend: {  
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series: [{
                type: "treemap",
                layoutAlgorithm: 'squarified',
                allowDrillToNode: true,
                dataLabels: {
                  enabled: false
                },
                levelIsConstant: false,
                levels: [{
                  level: 1,
                  dataLabels: {
                    enabled: true
                  },
                  borderWidth: 3
                }],
                data: $scope.testpoints

                // name: '集群',
                // zoomType: 'x',
                // events:{ 
                //   click:function(e){  //点击事件
                //     console.log(e.point);
                //     // alert(e.point);
                //   }
                // },
                // type:'column', //指定图表类型 为柱状图，默认为折线图。
                // data: [7.0, 6.9, 9.5, 1.5, 18.2, 11.5, 25.2, 16.5, 23.3, 18.3, 13.9, 9.6] //y轴数据
                // data:$scope.cluChartsData
            }]
            // series: [ $scope.getGroupSLAData]
          },
        };
      }
      // showRec();
      //group图表
      function showHIG(){
        
        var fixedSlaDataArr=[];
        for(var i=0;i<$scope.getGroupSLAData.data.length;i++){
          fixedSlaDataArr.push(0.9);
        }
    		$scope.charts = {
  		    options: {
  		      title: {
  		            text: 'SLA'//指定图表标题
  		      },
            
            credits: {enabled: false},
            chart: {
              renderTo:"containerGroup",
              reflow:true,
              zoomType: 'x' //缩放
            },      
  		      xAxis: {
              type: "datetime",
              
              labels : //定义x轴标签的样式
              {
                fontStyle : '',
                // step:3,
                style: {
                    fontSize:'',
                    fontFamily: '微软雅黑' 
                }
              }
  		      },

  		      yAxis: {
              title: {
                  text: '应用概况'  //指定y轴标题
              }
            },
  	        tooltip: {
  	           valueSuffix: '个'   //指定鼠标移动到某个点上的提示框单位
  	        },
  	        legend: {  
  	            layout: 'vertical',
  	            align: 'right',
  	            verticalAlign: 'middle',
  	            borderWidth: 0
  	        },
            colors: ['#058DC7', 'red'],
  	        // series: [{
  	        //     name: '集群',
           //      zoomType: 'x',
           //      events:{ 
           //        click:function(e){  //点击事件
           //          console.log(e.point);
           //          // alert(e.point);
           //        }
           //      },
  	        //     // type:'column', //指定图表类型 为柱状图，默认为折线图。
  	        //     // data: [7.0, 6.9, 9.5, 1.5, 18.2, 11.5, 25.2, 16.5, 23.3, 18.3, 13.9, 9.6] //y轴数据
           //      // data:$scope.cluChartsData
           //      data:$scope.getGroupSLAData
  	        // }]
            //$scope.getGroupSLAData 
            series: [{
                data:$scope.getGroupSLAData.data,
                name:"sla",
                pointInterval:300000,
                pointStart:$scope.getGroupSLAData.pointStart+28800000
              },
              {
                data:fixedSlaDataArr,
                name:"SLA固定底线值",
                pointInterval:300000,
                pointStart:$scope.getGroupSLAData.pointStart+28800000
              }
            ]
  		    },
  		  };
      }

      //调用多个接口，获取并处理全部集群数据
      $scope.allClusterInfo=[];
      var listCopeClusterInfo=[];
      var objClusterInfo={
        id:"",
        cluster_name:"none", //集群名称
        //部署信息
        tianji_region:"none",//天基region
        idc_room:"",//所属机房
        tianji_tpl_json:"none",//部署模板
        version:"none",//版本
        ag:"none",//ag
        desc:"none", //描述
        //容器信息
        machine_count:"none",//机器数
        total_size:"none",//总容量
        used_percent:"none",//使用率
        total_used_size_growth_rate:"none",//过去1天使用率上涨幅度
        total_machine_size_std:"none",//容量均衡度
        //硬件健康状态
        abnormal_machine_count:"none",
        abnormal_disk_count:"none",
        idc_host_count:"none",
        //报警统计 waring error fatal
        cluster_waring:"none",
        cluster_error:"none",
        cluster_fatal:"none",
        //集群数据流健康状态
        sla:"none", //集群SLA
        create_date:"none",//更新时间
        fail_count:"none", //请求失败的个数 
        slow_count:"none", //慢请求个数
        total:"none", //QPS
        day_slow_count_per_5min :"none", //低于预期SLA的持续时间*5
        api_avg:"none", //平均Latency
        p_99:"none",  // 99%的Latency
        
        p_999:"none", // 99.9%的Latency
        p_9995:"none",// 99.95%的Latency
        p_9999:"none",// 99.99%的Latency
        test:"none"
      };
      function getClusterCount(){
        //先获取 应用线所有的集群
        //list_cluster?group=OSS&detail=0
        $http({
            method: 'GET',
            url:'/api/v1/list_cluster?group='+$scope.mapsParam.group+'&detail=1'
        }).then(function(data,status){
          // $scope.allClusterInfo.listCluster=data.data;
          for(var i in data.data){
            // objClusterInfo.id=i;
            objClusterInfo={
              id:"",
              cluster_name:"none", //集群名称
              //部署信息
              tianji_region:"none",//天基region
              idc_room:"",//所属机房
              tianji_tpl_json:"none",//部署模板
              version:"none",//版本
              ag:"none",//ag
              desc:"none", //描述
              //容量信息
              machine_count:"none",//机器数
              total_size:"none",//总容量
              used_percent:"none",//使用率
              total_used_size_growth_rate:"none",//过去1天使用率上涨幅度
              total_machine_size_std:"none",//容量均衡度
              //硬件健康状态
              abnormal_machine_count:"none", //异常机器数
              abnormal_disk_count:"none",    //异常磁盘数
              idc_host_count:"none",         //idc工单数量
              //报警统计 waring error fatal 
              cluster_waring:"none",//报警信息
              cluster_error:"none", //错误信息
              cluster_fatal:"none", //fatal
              //集群数据流健康状态
              sla:"none", //集群SLA
              create_date:"none",//更新时间
              fail_count:"none", //请求失败的个数 
              slow_count:"none", //慢请求个数
              total:"none", //QPS
              day_slow_count_per_5min :"none", //低于预期SLA的持续时间*5
              api_avg:"none", //平均Latency
              p_99:"none",  // 99%的Latency
              
              p_999:"none", // 99.9%的Latency
              p_9995:"none",// 99.95%的Latency
              p_9999:"none",// 99.99%的Latency

              test:"none"
            };
            var obj=objClusterInfo;
            obj.cluster_name=data.data[i].cluster_name;
            obj.tianji_region=data.data[i].tianji_region;
            if(data.data[i].tianji_tpl_json!=""){
              obj.tianji_tpl_json=JSON.parse(data.data[i].tianji_tpl_json);
            }else{
              obj.tianji_tpl_json={"Version":null,"TemplateName":null};
            }
            
            obj.version=data.data[i].version;
            obj.ag=data.data[i].ag;
            obj.desc=data.data[i].cluster_desc;
            obj.machine_count=manageNum(data.data[i].machine_count);
            obj.total_size=manageNum(data.data[i].total_size)+"TB";
            obj.used_percent=manageNum(data.data[i].used_percent)+"%";
            obj.idc_room=data.data[i].idc_room;

            $scope.allClusterInfo.push(obj); 
          }
          listCopeClusterInfo=$scope.allClusterInfo;
          console.log("success");
          
          getPanguSummary();//从存储节点Summary信息获取异常数据
          getGroupIdc();
          getGroupAlert();
          getClusterSla();//集群数据流健康状态 
        }).catch(function(data,status){
          console.log(" error");
        })
        
        //获取应用线所有集群sla
        //集群数据流健康状态 
        function getClusterSla(){
          $http({
            method: 'GET',
            url:'/api/v1/cluster_sla_daily?group='+$scope.mapsParam.group
          }).then(function(data,status){
            for(var i in data.data){
              for(var j=0;j<$scope.allClusterInfo.length;j++){
                $scope.allClusterInfo[j].id=j+1;
                if($scope.allClusterInfo[j].cluster_name==i){

                  $scope.allClusterInfo[j].sla=data.data[i].sla.toFixed(5);
                  $scope.allClusterInfo[j].create_date=data.data[i].create_date;
                  $scope.allClusterInfo[j].fail_count=manageNum(data.data[i].fail_count);
                  $scope.allClusterInfo[j].slow_count=manageNum(data.data[i].slow_count);
                  $scope.allClusterInfo[j].total=manageNum(data.data[i].total);
                  $scope.allClusterInfo[j].day_slow_count_per_5min=data.data[i].day_slow_count_per_5min*5+"min";
                  $scope.allClusterInfo[j].api_avg=manageNum(data.data[i].api_avg)+"us";
                  $scope.allClusterInfo[j].p_99=manageNum(data.data[i].p_99)+"us";
                  $scope.allClusterInfo[j].p_999=manageNum(data.data[i].p_999)+"us";
                  $scope.allClusterInfo[j].p_9995=manageNum(data.data[i].p_9995)+"us";
                  $scope.allClusterInfo[j].p_9999=manageNum(data.data[i].p_9999)+"us";
                }
              }

            }
            listCopeClusterInfo=$scope.allClusterInfo;
            console.log("success");
          }).catch(function(data,status){
            console.log(" error");
          })

        }

        //获取IDC 
        //组装异常机器数量，
        function getGroupIdc(){
          $http({
            method: 'GET',
            url:'/api/v1/idc?group='+$scope.mapsParam.group
          }).then(function(data,status){
            // appCluster=data.data;
            for(var i in data.data){
              if(JSON.stringify(data.data[i])=="{}"){
                continue;
              }
              //获取集群里的异常机器数量
              for(var j=0;j<$scope.allClusterInfo.length;j++){
                if($scope.allClusterInfo[j].cluster_name==i){
                  //idc工单数量
                  var idcCount=0;
                  for(var k in data.data[i]){
                    idcCount+=data.data[i][k].length;
                  }
                  $scope.allClusterInfo[j].idc_host_count=idcCount
                  //异常机器数量
                  $scope.allClusterInfo[j].abnormal_machine_count=attributeCount(data.data[i]);
                }
              }
            }
            listCopeClusterInfo=$scope.allClusterInfo;
            console.log("success");
          }).catch(function(data,status){
            console.log(" error");
          })
        }

        //获取异常 Summary
        //组装异常磁盘数量
        function getPanguSummary(){
              $http({
              method: 'GET',
              url:'/api/v1/pangu_lscs_summary?group='+$scope.mapsParam.group
            }).then(function(data,status){
              var abnormalDiskCount=0;
              var abnormalCsCount=0;
              for(var i in data.data){
                if(JSON.stringify(data.data[i])!="{}"){

                    abnormalDiskCount+=data.data[i].abnormal_disk_count;
                    abnormalCsCount+=data.data[i].abnormal_cs_count
                }else{
                  continue;
                }
                
                // console.log("clusterName:",i);
                // console.log("abnormalDiskCount:",abnormalDiskCount);
                
                //从存储节点Summary信息获取异常数据
                for(var j=0;j<$scope.allClusterInfo.length;j++){
                  console.log(i);
                  if($scope.allClusterInfo[j].cluster_name==i){
                    $scope.allClusterInfo[j].abnormal_disk_count=data.data[i].abnormal_disk_count;
                    $scope.allClusterInfo[j].total_used_size_growth_rate=manageNum4(data.data[i].total_used_size_growth_rate);
                    $scope.allClusterInfo[j].total_machine_size_std=manageNum5(data.data[i].total_machine_size_std);
                  }
                }
              }
              $scope.getGroupSummaryData.basic.abnormal_disk_count=abnormalDiskCount;
              $scope.getGroupSummaryData.basic.abnormal_cs_count=abnormalCsCount;
              $scope.listGroupSummaryData.basic.abnormal_disk_count=abnormalDiskCount;
              $scope.listGroupSummaryData.basic.abnormal_cs_count=abnormalCsCount;
              console.log("success");
            }).catch(function(data,status){
              console.log(" error");
            })
        }
      };
      getClusterCount();
      //获取报警相关数据 
      //组装报警 waring error fatal个数
      function getGroupAlert(){
        $http({
          method: 'GET',
          url:'/api/v1/tianji_monitor?group='+$scope.mapsParam.group
        }).then(function(data,status){
          var basicWaring=0;
          var basicError=0;
          var basicFatal=0;
          for(var i in data.data){
            for(var j=0;j<$scope.allClusterInfo.length;j++){
              if($scope.allClusterInfo[j].cluster_name==i){
                var waring=0;
                var error=0;
                var fatal=0;
                for(var k in data.data[i]){
                  for(var l=0;l<data.data[i][k].length;l++){
                    if(data.data[i][k][l].type==0){
                      continue;
                    }
                    if(data.data[i][k][l].level=="warning"){
                      waring++
                    }
                    if(data.data[i][k][l].level=="error"){
                      waring++
                    }
                    if(data.data[i][k][l].level=="fatal"){
                      waring++
                    }
                  }
                }
                $scope.allClusterInfo[j].cluster_waring=waring;
                $scope.allClusterInfo[j].cluster_error=error;
                $scope.allClusterInfo[j].cluster_fatal=fatal;
                basicWaring+=waring;
                basicError+=error;
                basicFatal+=fatal;
              }
            }
          }       //basicWaringbasicErrorbasicFatal
          $scope.getGroupSummaryData.basic.basicWaring=basicWaring;
          $scope.getGroupSummaryData.basic.basicError=basicError;
          $scope.getGroupSummaryData.basic.basicFatal=basicFatal;

          $scope.listGroupSummaryData.basic.basicWaring=basicWaring;
          $scope.listGroupSummaryData.basic.basicError=basicError;
          $scope.listGroupSummaryData.basic.basicFatal=basicFatal;
          console.log("success");
        }).catch(function(data,status){
          console.log(" error");
        })
      }
      //公共方法 获取对象个数
      var attributeCount = function(obj) {
        var count = 0;
        for(var i in obj) {
            if(obj.hasOwnProperty(i)) {  // 建议加上判断,如果没有扩展对象属性可以不加
                count++;
            }
        }
        return count;
      }


    	}) 	
