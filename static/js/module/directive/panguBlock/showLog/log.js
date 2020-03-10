//diag编辑页controller 
myApp.controller('envCheckCtrl',function($scope,panguClusterService, $uibModal,$uibModalInstance,chartData,apis){

  $scope.mapsParam=get_pangu_urlParameter(window.location.href);
  if(chartData) {
  	$scope.data=chartData;
	};
  
  var refreshTime=5000;//5秒循环一次
  if(chartData.key=="envCheck"){
    $scope.data.keyName="环境检查:";
    var timeRefresh = setInterval(function() { 
      getEnvCheckStatus("env_check");
    }, refreshTime);
  }else if(chartData.key=="availability"){
    $scope.data.keyName="一键分析:";
    var timeRefresh = setInterval(function() { 
      getEnvCheckStatus("availability");
    }, refreshTime);
  }
  // clearInterval(timeRefresh);//关闭自动刷新
  function getEnvCheckStatus(str){
    var reqStr=$scope.mapsParam.portal?"env_check_get_status":"status";
    var url='/api/v1/health/'+str+'/'+reqStr
    var data={};
    data.url=url;
    panguClusterService.getUrlRequest(data).then(function (data) {
      if(data.job_finish=="True"){
        clearInterval(timeRefresh);
        closeShowOper("success");//关闭弹窗
      }else{
        $scope.data.JobLog=data;
      }
      console.log("success");
    }).catch(function(data,status){
      console.log("get ms error",data);
    })
  };
  
  $scope.clickTrue=function(){

  }
  // 关闭
  function closeShowOper(str){
    $uibModalInstance.close(str);
  };
	$scope.okDesc=function(id){
    $uibModalInstance.close();
	};
	$scope.cancelDesc=function(id){
    if(timeRefresh){
      clearInterval(timeRefresh);//关闭弹窗
    }
  	$uibModalInstance.dismiss('cancel');
 	};

})
