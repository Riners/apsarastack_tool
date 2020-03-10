//diag编辑页controller 
myApp.controller('showMasterOperCtrl',function($scope,$http, $uibModalInstance,chartData){

  $scope.mapsParam=get_pangu_urlParameter(window.location.href);
  if(chartData) {
  	$scope.data=chartData;
	};
  $scope.inputData={};
  $scope.inputData.flag="";
  $scope.inputData.flagValue="";
  $scope.inputData.value="";
  $scope.showIp=get_pangu_urlParameter(chartData.url);
  function getListMasInfo(){
    // var cmd=chartData.cmd;
    // var ip=chartData.ip;
    var flag=$scope.inputData.flag;
    var flagValue=$scope.inputData.flagValue;
    // var urlStr='/api/v1/'+chartData.cluster+'/master?cmd='+cmd;
    var urlStr="";
    var urlDeal=chartData.url
    for(var i in chartData.arrParam){
      urlDeal+='&'+chartData.arrParam[i]+"="+$scope.inputData[chartData.arrParam[i]]
    };
    urlStr=urlDeal;
    if($scope.mapsParam.portal&&chartData.testPortalUrl){
      urlStr=chartData.testPortalUrl;
    };
    $http({
      method: 'GET',
      url:urlStr
    }).then(function(data,status){
      if(chartData.key=="buildinfo"){
        dealBuildinfo(data.data.buildInfo)
      }else{
        dealtListMasInfo(data.data);
      }
      if(data.data.err){
        $uibModalInstance.close(data.err);
      }else if(chartData.key=="get_all_flag"||chartData.key=="get_ms_flag"||chartData.key=="buildinfo"){
        
      }else{
        $uibModalInstance.close("success");
      };
      console.log("getQuota success");
    }).catch(function(data,status){
      $uibModalInstance.close(data);
      console.log("getQuota error");
    })
  }; 
  // 点击查询
  $scope.getFlag=function(){
    getListMasInfo();
  }
  // 当点击的是buildinfo时,马上获取buildinfo数据
  if($scope.data.name=="buildinfo"){
    // getBuildinfo();
    getListMasInfo();
  };
  $scope.getDlagData=[];
  function dealtListMasInfo(data){
    if(chartData.key=='get_ms_flag'||chartData.key=='get_all_flag'){
      $scope.getDlagData=data
    }
  };
  // function dealOkDesc(){
  //   if($scope.data.name=='checkpoint'||$scope.data.name=='切换master'){
  //     getListMasInfo();
  //   }
  // }
  //获取 buildinfo 接口
  function getBuildinfo(){
    // /api/v1/AT-Pangu-MultiVolume/master?cmd=buildinfo&ms=e46e05338.cloud.nu17
    var urlStr='/api/v1/'+chartData.cluster+'/master';
    if($scope.mapsParam.portal){
      urlStr='/api/v1/list_master_buildinfo';
    };
    urlStr+='?cmd='+chartData.cmd+'&ms='+chartData.ip+'&volume='+chartData.volume;
    $http({
      method: 'GET',
      url:urlStr
    }).then(function(data,status){
      dealBuildinfo(data.data.buildInfo);
      console.log("getQuota success");
    }).catch(function(data,status){
      console.log("getQuota error");
    })
  };
  function dealBuildinfo(data){
    $scope.buildinfoData=data;
    // 把编译环境信息转换成json
    var buildinfojson=JSON.parse(data.BuildInfo);
    $scope.buildinfoData.Env={};
    $scope.buildinfoData.Env.tianteng_id=buildinfojson.env.tianteng_id;
    $scope.buildinfoData.Env.kernel=buildinfojson.env.kernel;
    $scope.buildinfoData.Env.gcc=buildinfojson.env.gcc;
    $scope.buildinfoData.BuildInfoData=[];
    for(var i in buildinfojson){
      if(i=="env"){
        continue;
      }
      var obj={};
      obj.Name=i;
      if(buildinfojson[i]){
        obj.Branch=buildinfojson[i].Branch?buildinfojson[i].Branch:"-";
        obj.Revision=buildinfojson[i].Revision?buildinfojson[i].Revision:"-";
        obj.URL=buildinfojson[i].URL?buildinfojson[i].URL:"-";
      }else{
        obj.Branch="-";
        obj.Revision="-";
        obj.URL="-";
      }
      $scope.buildinfoData.BuildInfoData.push(obj);
    }
  }
  

	$scope.okDesc=function(id){
    if(chartData.key=="get_all_flag"||chartData.key=="get_ms_flag"||chartData.key=="buildinfo"){
      $uibModalInstance.close();
    }else{
      getListMasInfo();
    }
    
    // dealOkDesc()
    // $uibModalInstance.close();
    // $uibModalInstance.close($scope.inputData);
	};
	$scope.cancelDesc=function(id){
  	$uibModalInstance.dismiss('cancel');
 	};

})
