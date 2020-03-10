//diag编辑页controller 
myApp.controller('showOperationCtrl',function($scope,$http, $uibModalInstance,chartData){

  $scope.mapsParam=get_pangu_urlParameter(window.location.href);  
  $scope.data={};
  if(chartData) {
    $scope.data=chartData;
  };
  // $scope.data.add.source="";
  // $scope.data.add.target="";
  // $scope.data.add.min="";
  // $scope.data.add.max="";
  //quota
  //获取quota数据
  function getQuota(name){
    var urlStr="";
    urlStr='/api/v1/'+$scope.data.cluster+'/pangu_dir?cmd=get_quota&volume='+$scope.data.volume+'&dir='+$scope.data.add.source+'/';
    if($scope.mapsParam.portal){
      urlStr='/api/v1/all_portal_api';
    }
    $http({
      method: 'GET',
      url:urlStr
    }).then(function(data,status){
      var dealData=data.data;
      if($scope.mapsParam.portal){
        dealData=data.data.get_quota;
      }
      dealgetQuota(dealData);//删除成功，重新获取模板数据
      console.log("getQuota success");
    }).catch(function(data,status){
      console.log("getQuota error",data);
    })
  };
  $scope.quotaArr=[];
  function dealgetQuota(data){
    $scope.quotaArr=[];
    $scope.quotaArr.push(dealShowQuotaData(data.EntryNumber,"EntryNumber"));
    $scope.quotaArr.push(dealShowQuotaData(data.FilePhysicalLength,"FilePhysicalLength"));
    $scope.quotaArr.push(dealShowQuotaData(data.FileNumber,"FileNumber"));
    $scope.quotaArr.push(dealShowQuotaData(data.FileLogicalLength,"FileLogicalLength"));
  };
  function dealShowQuotaData(data,str){
    data.key=str;
    return data;

  }
  //chunk
  // 获取某台cs,chunk数据
  // /api/v1/AY03B/chunk?cmd=check_rep_status&cs=1.1.1.1
  $scope.csChunkReplicationData=[];
  function getChunk(name){
    var cs="";
    var urlStr="";
    // 查看chunk
    // /api/v1/AY03B/pangu_file?cmd=info&filename=/test/L
    if($scope.mapsParam.portal==1){
      urlStr='/api/v1/'+$scope.data.cluster+'/csChunkReplication?cmd=quota&volume='
    +$scope.data.volume;
    }else{
      urlStr='/api/v1/'+$scope.data.cluster+'/pangu_file?cmd=info&file='+$scope.data.add.source+'&volume='
    +$scope.data.volume;
    }
    $http({
      method: 'GET',
      url:urlStr
    }).then(function(data,status){
      $scope.csChunkReplicationData=data.data;//删除成功，重新获取模板数据
      if(data.data.err){
        alert(data.data.err);
      }
      console.log("getChunk success");
    }).catch(function(data,status){
      console.log("getChunk error");
    })
  };
  
  if($scope.data.name=="设置quota"){
    // 线获取quota的数据
    getQuota($scope.data.dirName);
  }else if($scope.data.name=="查看Chunk信息"){
    getChunk($scope.data.dirName);
  };
  // 点击确定后发送接口
  function getPanguDir(){
    var cmd="ls";
    var urlStr="";
    urlStr='/api/v1/'+$scope.data.cluster;
    if($scope.data.type=="dir"){
      // 目录相关操作
      urlStr+='/pangu_dir?volume='+$scope.data.volume;
      if($scope.data.name=='删除'){
        cmd='&cmd=rmdir&dir='+$scope.data.add.source+'/';
      }else if($scope.data.name=='移动'){
        cmd="&cmd=mvdir&src="+$scope.data.add.source+'&dst='+$scope.data.add.target;
      }else if($scope.data.name=='拷贝'){
        cmd="&cmd=cpdir&src="+$scope.data.add.source+'&dst='+$scope.data.add.target;
      }else if($scope.data.name=='恢复'){
        cmd="&cmd=restore&file="+$scope.data.add.source;
      }else if($scope.data.name=='Pin'){
        cmd="&cmd=pin&dir="+$scope.data.add.source;
      }else if($scope.data.name=='解Pin'){
        cmd="&cmd=unpin&dir="+$scope.data.add.source;
      }else if($scope.data.name=='设置quota'){
        var quota=[];
        for(var i in $scope.quotaArr){
          quota.push($scope.quotaArr[i].Limit);
        };
        var quotaStr=quota.join(",");
        cmd="&cmd=set_quota&dir="+$scope.data.add.source+'&quota='+quotaStr;
      };
    }else if($scope.data.type=="file"){
      // 文件相关操作
      urlStr+='/pangu_file?volume='+$scope.data.volume;  
      if($scope.data.name=='删除'){
        cmd='&cmd=rm&file='+$scope.data.add.source;
      }else if($scope.data.name=='移动'){
        cmd='&cmd=mv&src='+$scope.data.add.source+'&dst='+$scope.data.add.target;
      }else if($scope.data.name=='拷贝'){
        cmd="&cmd=cp&src="+$scope.data.add.source+'&dst='+$scope.data.add.target;
      }else if($scope.data.name=='恢复'){
        cmd="&cmd=restore&file="+$scope.data.add.source;
      }else if($scope.data.name=='修改replica'){
        cmd="&cmd=setreplica&file="+$scope.data.add.source+"&min="+$scope.data.add.min
        +"&max="+$scope.data.add.max;
      }else if($scope.data.name=='创建链接'){
        cmd="&cmd=ln&src="+$scope.data.add.source+'&dst='+$scope.data.add.target;
      }
    }else if($scope.data.type=="deleted"){
      if($scope.data.name=='清空回收站'){
        cmd='/pangu_dir?cmd=crb'+'&volume='+$scope.data.volume;
      }
    }
    urlStr+=cmd;
    
    $http({
      method: 'GET',
      url:urlStr
    }).then(function(data,status){
      // dealPanguDir(data.data);//删除成功，重新获取模板数据
      if(data.data.err){
        $uibModalInstance.close(data.data.err);
      }else{
        $uibModalInstance.close("success");
      }
      
      console.log("getAlarmUpgrade success");
    }).catch(function(data,status){
      $uibModalInstance.close("error");
      console.log("getAlarmUpgrade error");
    })
  };
  $scope.okDesc=function(id){
    if($scope.data.name!="查看Chunk信息"){

      getPanguDir();
    }else{
      $uibModalInstance.close();
    }
    
    // $uibModalInstance.close();
    // $uibModalInstance.close($scope.inputData);
  }
  $scope.cancelDesc=function(id){
    $uibModalInstance.dismiss('cancel');
  }

})
