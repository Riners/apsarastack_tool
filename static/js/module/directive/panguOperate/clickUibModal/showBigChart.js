//diag编辑页controller 
myApp.controller('showChartCtrl',function($scope,$http, $uibModalInstance, chartData,panguService){
  var param=chartData.param;
  var group=chartData.group;
  var refresh=chartData.refresh;
  if(chartData.clusters){
    var clusters=chartData.clusters;
  }else{
    var clusters="";
  }
  
  $scope.showTitle=chartData.title;
  $scope.hideTimeList=true;
  if(chartData.hideTimeList){
    $scope.hideTimeList=false
  }
  
  var showGroupDashboardData={
    "id":"showGroupDashboardId",
    "title":chartData.title,
    "seriesData":chartData.seriesData
  };
  // 获取所有基线配置数据
  $scope.baselineConfigdata={};
  function getBaselineConfig(){
    var postData={};
    postData.html=chartData.html;
    postData.page=window.location.href;
    panguService.postBaselineConfig(postData).then(function (data) {
      $scope.baselineConfigdata=data.data;
    },function(data){
      //处理响应失败
    }).catch(function(data){
      //处理数据 异常捕获
    });
  };
  getBaselineConfig();
  //把时间转化为字符串格式
  function getDateStr(date){
    var year=date.getFullYear();
    var month=date.getMonth()+1;
    var dates=date.getDate();
    var hours=date.getHours();
    var minutes=date.getMinutes();
    var seconds=date.getSeconds();
    if(month<10){
      month="0"+month;
    }
    if(dates<10){
      dates="0"+dates;
    }
    if(hours<10){
      hours="0"+hours;
    }
    if(minutes<10){
      minutes="0"+minutes;
    }
    if(seconds<10){
      seconds="0"+seconds;
    }
    var time=year+"-"+month+"-"+dates+" "+hours+":"+minutes+":"+seconds;
    return time;
  }

  // 发送请求 
  $scope.getAloneChart=function(begin_time,end_time){
    $scope.showBigChartData={};
    var delurl=param+'&btime='+begin_time+'&etime='+end_time+"&clusters="+clusters;
    if(group){
      delurl=delurl+'&group=' +group
    };
    return $http({
        method: 'GET',
        url:delurl
    }).then(function(data,status){
      delAloneChartData(data.data);
      console.log("getAloneChart success");
    }).catch(function(data,status){
      console.log(" error");
    })
  }
  //
  var initTimeNum=0.5;
  $scope.updataAloneTime=function (num){
    initTimeNum=num
    clearInterval(refreshChartTimeBig);
    $scope.refreshChart();
    var getData=new Date();
    var currentTime=getDateStr(new Date(getData.getTime()));
    var beginTime=getDateStr(new Date(getData.getTime()-num*60*60*1000)); 
    $scope.getAloneChart(beginTime,currentTime); 
  }
  
  // 处理得到的函数
  var count=0;
  function delAloneChartData(data){
    var obj={};
    obj.seriesData=[];
    var count=0;
    // if(count>20){
    //   count=0;
    // }
    for(var i in data){
      var seriesobj={};
      if(i=="time"){
        continue;
      };
      // var pointStart=data["time"][0]*1000+8*60*60*1000;
      var pointStart=data["time"][0]*1000;
      var pointInterval=data["time"][1]*1000-data["time"][0]*1000;
      var dealArr=changeObjSeries(i,data[i],pointStart,pointInterval,"",$scope.baselineConfigdata[i],count);
      count++;
      obj.seriesData=obj.seriesData.concat(dealArr);
    }
    showGroupDashboardData.seriesData=obj.seriesData;
    // $scope.showBigChartData={
    //   "id":"showGroupDashboardId",
    //   "title":chartData.title,
    //   "seriesData":obj.seriesData
    // }
    checkSeriesData(obj.seriesData);
  };
  //chart数据体
  $scope.showBigChartData={};
  function checkSeriesData(data){
    $scope.showBigChartData={
      "id":"showGroupDashboardId",
      "title":chartData.title,
      "seriesData":showGroupDashboardData.seriesData
    }
    for(var i in data){
      if(data[i].name=="sla"){
        $scope.showBigChartData.yAxis_min="1";
      }
    }
  };
  checkSeriesData(showGroupDashboardData.seriesData);
  
  
  //定时刷新
  var refreshChartTimeBig;
  $scope.refreshChart=function(){
    var refreshTime=60*1000;
    if(refresh){
      refreshTime=parseInt(refresh)*1000;
      refreshChartTimeBig = setInterval(function() {
       $scope.updataAloneTime(initTimeNum);
      }, refreshTime);
    }
  }
  $scope.refreshChart();

  $scope.cancel = function () {
    clearInterval(refreshChartTimeBig);
    $uibModalInstance.dismiss('cancel');
  };
})
