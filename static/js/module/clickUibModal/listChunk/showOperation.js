//diag编辑页controller 
myApp.controller('showChunkOperCtrl',function($scope,$http, $uibModalInstance,chartData){

  $scope.mapsParam=get_pangu_urlParameter(window.location.href);
  if(chartData) {
  	$scope.data=chartData;
	};
  //接口 
  function getListCsInfo(){
    var urlStr='/api/v1/'+chartData.cluster+'/chunk?cmd='+chartData.cmd+'&chunkid='+chartData.chunkid;
    // if()
    urlStr+='&volume='+chartData.volume;
    if($scope.mapsParam.portal){
      urlStr='/api/v1/all_portal_api'
    }
    $http({
      method: 'GET',
      url:urlStr
    }).then(function(data,status){
      if(data.data.err){
        $uibModalInstance.close(data.data.err);
      }
      // else{
      //   $uibModalInstance.close("success");
      // };
      var dealData=data.data;
      if($scope.mapsParam.portal){
        dealData=data.data.chunk_info
      }
      dealgetListCsInfo(dealData);
      console.log(" success");
    }).catch(function(data,status){
      $uibModalInstance.close(data);
      console.log(" error");
    })
  };
  getListCsInfo();
  function dealgetListCsInfo(data){
    $scope.csChunkReplicationData=data;
    $scope.csChunkReplicationData.statusData={};
    var getStatusData=data.ChunkInfo.lsReplicaInfo
    for(var i in getStatusData){
      var csip=getStatusData[i].Location.split("//")[1].split(":")[0];
      $scope.csChunkReplicationData.ChunkInfo.lsReplicaInfo[i].ip=csip;
      getChunkMeta(csip);
    }
  }
  function getChunkMeta(ip){
    var urlStr='/api/v1/'+chartData.cluster+'/chunk?cmd=get_meta&cs='+ip+'&chunkid='+chartData.chunkid;
    urlStr+='&volume='+chartData.volume;
    if($scope.mapsParam.portal){
      urlStr='/api/v1/all_portal_api'
    }
    $http({
      method: 'GET',
      url:urlStr
    }).then(function(data,status){
      if(data.data.err){
        $uibModalInstance.close(data.data.err);
      }
      var dealData=data.data;
      if($scope.mapsParam.portal){
        dealData=data.data.chunk_meta;
      }
      $scope.csChunkReplicationData.statusData[ip]=dealData.StatusGot
      console.log(" success");
    }).catch(function(data,status){
      $uibModalInstance.close(data);
      console.log(" error");
    })
  };
	$scope.okDesc=function(id){
    $uibModalInstance.close();
    
    
	};
	$scope.cancelDesc=function(id){
  	$uibModalInstance.dismiss('cancel');
 	};

})
