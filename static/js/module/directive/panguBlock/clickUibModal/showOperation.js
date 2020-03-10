//diag编辑页controller 
myApp.controller('showPanguBlockCtrl',function($scope,$http, $uibModal,$uibModalInstance,chartData,apis){

  $scope.mapsParam=get_pangu_urlParameter(window.location.href);
  if(chartData) {
  	$scope.data=chartData;
	};
  $scope.inputData={};
  $scope.inputData.flag="";
  $scope.inputData.flagValue="";
  $scope.inputData.value="";
  $scope.inputData.targetAddress="";
  $scope.inputData.changesafeId="";
  $scope.inputData.changesafeCheck=false;
  $scope.inputData.add={};
  $scope.inputData.inputLocation="";
  $scope.inputData.srcCluster=chartData.BlockMasterUuid;
  $scope.inputData.dstCluster="";
  $scope.inputData.srcDev="";
  $scope.inputData.dstDev="";
  $scope.inputData.inputfirst="";
  $scope.inputData.inputsecond="";
  $scope.inputData.inputthird="";
  $scope.inputData.inputFourth="";
  $scope.inputData.inputFifth="";
  $scope.inputData.inputSixth="";
  $scope.inputData.compress="";
  $scope.inputData.compressList=["","enable","disable"];
  $scope.inputData.EC="";
  $scope.inputData.ECList=["","enable","disable"];
  $scope.inputData.prefetch="";
  $scope.inputData.prefetchList=["","enable","disable"];
  $scope.showIp=get_pangu_urlParameter(chartData.url);
  var theade=apis.pangu_block_showOperationTh;


  $scope.showTrueButton=false;
  function showTrueBtn(){
    switch(chartData.key){
      case "set_bmAll_flag":
      case "set_bsAll_flag":
      case "set_gcAll_flag":
      case "block_master_rebalance":
      case "add_bs_schbs":
      case "set_bs_schbs":
      case "del_bs_schbs":
      case "change_newbm_Leader":
      case "baksnap_device":
      case "flushdev_all_segment":
      case "device_opendev":
      case "load_select_opendev":
      case "close_select_opendev":
      case "del_select_opendev":
      case "del_dev":
      case "device_segment_loaddev":
      case "device_segment_flushdev":
      case "close_dev":
      case "device_snapshot_delsnap":
      case "device_snapshot_srnsnap":
      case "set_config_dev":
      case "cp_dev":
      case "stat_config_dev":
      case "clone_dev":
      case "crt_dev":
      case "crt_snap":
      // case "crt_dev":
      
      case "config_dev":$scope.showTrueButton=true;
      break;
    }
  };  
  showTrueBtn();
  // chart图配置文件
  function clickHrefChart(group,view,host){
    var hrefStr="http://shennong.apsara.aliyun-inc.com/checkcluster/checkView?cluster="+$scope.mapsParam.cluster+"&view="+view+"&group="+group+"&btime="+dealTimeFormat(0.5)+"&etime="+dealTimeFormat(0)+"&host="+host;
    return hrefStr
  }
  var chartSvurl="/api/v1/get_shennong_metric?mgroup=pangu.PanguSupervisor%23&&cluster="+$scope.mapsParam.cluster+"&matrix=";
  var chartConfig={
    // "deviceSnapshot":{
    //   "metrics":[//请求数据
    //   {
    //     "param_plus":chartSvurl+"PG_SS_SnapshotMetaQps",//url请求时?后面需要的参数
    //     "id":"chart21",
    //     "showChartloading":true,
    //     "matrix":"PG_SS_SnapshotMetaQps",
    //     "clickHref":clickHrefChart("pangu.PanguChunkserver%23","PG_SS_SnapshotMetaQps",-1)
    //   }],
    //   "target":"shennong",//标题
    //   "chartSizeSmall":true//是否显示chart小图
    // },
    // "deviceSegment":{
    //   "metrics":[//请求数据
    //   {
    //     "param_plus":chartSvurl+"PG_BS_SegmentNum",//url请求时?后面需要的参数
    //     "id":"chart23",
    //     "showChartloading":true,
    //     "matrix":"PG_BS_SegmentNum",
    //     "clickHref":clickHrefChart("pangu.PanguChunkserver%23","PG_BS_SegmentNum",-1)
    //   }],
    //   "target":"shennong",//标题
    //   "chartSizeSmall":true//是否显示chart小图
    // },
    "start_bal":{
      "metrics":[//请求数据
      {
        "param_plus":chartSvurl+"net_summary",//url请求时?后面需要的参数
        "id":"chart31",
        "showChartloading":true,
        "matrix":"net_summary",
        "clickHref":clickHrefChart("pangu.PanguChunkserver%23","net_summary",-1)
      },{
        "param_plus":chartSvurl+"PG_MS_ReplicationQueueSize",//url请求时?后面需要的参数
        "id":"chart32",
        "showChartloading":true,
        "matrix":"PG_MS_ReplicationQueueSize",
        "clickHref":clickHrefChart("pangu.PanguMaster%23","PG_MS_ReplicationQueueSize",-1)
      },{
        "param_plus":chartSvurl+"PG_CS_ReplicationOngoingTaskNumber",//url请求时?后面需要的参数
        "id":"chart33",
        "showChartloading":true,
        "matrix":"PG_CS_ReplicationOngoingTaskNumber",
        "clickHref":clickHrefChart("pangu.PanguMaster%23","PG_CS_ReplicationOngoingTaskNumber",-1)
      }],
      "target":"shennong",//标题
      "chartSizeSmall":true//是否显示chart小图
    },
  };

  //获取flag值的list列表
  $scope.flagList=[];
  $scope.flagObj={};
  function getflagList(type){
    // /api/v1/get_pangu_flag?type=master
    $http({
      method: 'GET',
      url:'/api/v1/get_pangu_flag?type='+type
    }).then(function(data,status){
      if(data.data){
        for(var i in data.data){
          if(data.data[i].name.toUpperCase().indexOf("PANGU_")==-1){
            continue;
          }
          $scope.flagList.push(data.data[i]);  
          $scope.flagObj[data.data[i].name]=data.data[i];
        }
      };
      console.log("success");
    }).catch(function(data,status){
      console.log(" error");
    })
  };
  //flag值改变时 触发事件
  $scope.changeFlag =function (){
    if($scope.inputData.flag==""){
      $scope.inputData.value="";
    }
    if($scope.flagObj[$scope.inputData.flag]){
      $scope.inputData.value=$scope.flagObj[$scope.inputData.flag].default;
    }
  }
  
  // 切割tcp://10.101.221.45:10260中的ip
  function cutMetaIp(data){
    var cutIp=data.split("//")[1];
    return cutIp.split(":")[0];
  }
  
  // 初次加载时需要做处理的相关key
  function initOper(){
    var url=chartData.url;
    switch(chartData.key){
      case "set_bmAll_flag":getflagList("blockmaster");
      break;
      case "set_bsAll_flag":getflagList("blockserver");
      break;
      case "set_gcAll_flag":getflagList("blockgcworker");
      break;
      case "get_bm_batch_Flag":
      case "get_bmAll_flag":
      case "get_bm_flag":initFlag("blockmaster");
      break;
      case "get_bs_batch_Flag":
      case "get_bsAll_flag":
      case "get_bs_flag":initFlag("blockserver");
      break;
      case "get_gc_batch_Flag":
      case "get_gcAll_flag":
      case "get_gc_flag":initFlag("blockgcworker");
      break;
      case "query_device":initLoading("898px","197px"),sendOutHttpApi(chartData.url,chartData.key);
      break;
      case "query_device_segment":initqueryDeviceSegment();
      break;
      case "distseg_device":initLoading("898px","197px"),sendOutHttpApi(chartData.url,chartData.key);
      break;
      case "query_device_snapshot":initqueryDeviceSnapshot();
      break;
      case "check_status_chkbm":
      case "device_segment_chkseg":
      case "list_ver_gbi_gc":
      case "list_ver_gbi_bm":
      case "list_ver_gbi_bs":
      case "list_cluster_dcgc":sendOutHttpApi(chartData.url,chartData.key);
      break;
      
    }
  };
  // 初始化相关方法 汇总
  

  function initqueryDeviceSegment(){
    // DeviceSegmentConfigData
    // $scope.chartConfigData={
    //   "configData":chartConfig.deviceSegment,
    //   "group":$scope.mapsParam.group,
    //   "title":"deviceSegment",
    //   "id":"deviceSegmentId",
    //   "width":"90%",
    //   "clusters":$scope.mapsParam.clusters,
    //   "chartSizeSmall":true,//是否显示chart小图
    //   "hideTimeList":true//是否隐藏放大chart图中的时间选择点击事件
    // };
    initLoading("898px","197px");
    sendOutHttpApi(chartData.url,chartData.key);
  };
  function initqueryDeviceSnapshot(){
    // DeviceSnapshotConfigData
    // $scope.chartConfigData={
    //   "configData":chartConfig.deviceSnapshot,
    //   "group":$scope.mapsParam.group,
    //   "title":"deviceSnapshot",
    //   "id":"deviceSnapshotId",
    //   "width":"90%",
    //   "clusters":$scope.mapsParam.clusters,
    //   "chartSizeSmall":true,//是否显示chart小图
    //   "hideTimeList":true//是否隐藏放大chart图中的时间选择点击事件
    // };
    initLoading("898px","197px");
    sendOutHttpApi(chartData.url,chartData.key);
  };
  function initFlag(type){
    $scope.get_ms_flagData = {
      "theadData":theade.getFlagTh,
      "tbodyData":[],
      "showSearch":false,
      "showPage":false,
    };
    getflagList(type);
  }
  $scope.showInfoTable=false;
  function dealQueryDevice(data){
    var dealData=data;
    var basic_body=[];
    var basicObj={};
    basicObj.status=dealTablebodyObj(dealData.status);
    basicObj.currentSnapshotVersion=dealTablebodyObj(dealData.currentSnapshotVersion);
    basicObj.maxClientVersion=dealTablebodyObj(dealData.maxClientVersion);
    basicObj.openVersion=dealTablebodyObj(dealData.openVersion);
    basicObj.newSnapshotVersion=dealTablebodyObj(dealData.newSnapshotVersion);
    // var meta=JSON.stringify(dealData.meta);
    // basicObj.meta=dealTablebodyObj(meta);
    basic_body.push(basicObj);
    $scope.get_basic_buildinfo= {
      "theadData":theade.queryDeviceTh,
      "tbodyData":basic_body,
      "showSearch":false,
      "showPage":false,
      "title":"Device基础信息"
    };
    $scope.showInfoTable=true;
    var detailedArr=[];
    // var detailedObj={};
    // detailedObj.segmentSizeInSectors=dealTablebodyObj(dealData.meta.segmentSizeInSectors);
    // detailedObj.stripeSegmentCount=dealTablebodyObj(dealData.meta.stripeSegmentCount);
    // detailedObj.ecPacketSizeBits=dealTablebodyObj(dealData.meta.ecPacketSizeBits);
    // detailedObj.stripeUnitSizeInSectors=dealTablebodyObj(dealData.meta.stripeUnitSizeInSectors);
    // detailedObj.ecGroupDataChunks=dealTablebodyObj(dealData.meta.ecGroupDataChunks);
    // detailedObj.format=dealTablebodyObj(dealData.meta.format);
    // detailedObj.snapshotBlockSizeInSectors=dealTablebodyObj(dealData.meta.snapshotBlockSizeInSectors);

    // detailedObj.sectorSize=dealTablebodyObj(dealData.meta.sectorSize);
    // detailedObj.copy=dealTablebodyObj(dealData.meta.copy);
    // detailedObj.ecGroupParityChunks=dealTablebodyObj(dealData.meta.ecGroupParityChunks);
    // detailedObj.compressionAlgorithm=dealTablebodyObj(dealData.meta.compressionAlgorithm);
    // detailedObj.deviceSize=dealTablebodyObj(dealData.meta.deviceSize);
    // detailedObj.enableStripe=dealTablebodyObj(dealData.meta.enableStripe);
    // detailedObj.migrationState=dealTablebodyObj(dealData.meta.migrationState);
    // detailedArr.push(detailedObj);
    var detailedObj={};
    detailedObj.segmentSizeInSectors=dealTablebodyObj(dealData.meta.segmentSizeInSectors);
    detailedObj.stripeSegmentCount=dealTablebodyObj(dealData.meta.stripeSegmentCount);
    detailedObj.ecPacketSizeBits=dealTablebodyObj(dealData.meta.ecPacketSizeBits);
    detailedObj.stripeUnitSizeInSectors=dealTablebodyObj(dealData.meta.stripeUnitSizeInSectors);
    detailedObj.ecGroupDataChunks=dealTablebodyObj(dealData.meta.ecGroupDataChunks);
    detailedObj.format=dealTablebodyObj(dealData.meta.format);
    detailedObj.snapshotBlockSizeInSectors=dealTablebodyObj(dealData.meta.snapshotBlockSizeInSectors);
    detailedArr.push(detailedObj);
    // {"name":"sectorSize","key":"sectorSize"},
    // {"name":"copy","key":"copy"},
    // {"name":"ecGroupParityChunks","key":"ecGroupParityChunks"},
    // {"name":"compressionAlgorithm","key":"compressionAlgorithm"},
    // {"name":"deviceSize","key":"deviceSize"},
    // {"name":"enableStripe","key":"enableStripe"},
    // {"name":"migrationState","key":"migrationState"},

    var obj2Th={};
    obj2Th.segmentSizeInSectors=dealTablebodyObj("sectorSize");
    obj2Th.segmentSizeInSectors.style="font-weight: 700;"
    obj2Th.stripeSegmentCount=dealTablebodyObj("copy");
    obj2Th.stripeSegmentCount.style="font-weight: 700;"
    obj2Th.ecPacketSizeBits=dealTablebodyObj("ecGroupParityChunks");
    obj2Th.ecPacketSizeBits.style="font-weight: 700;"
    obj2Th.stripeUnitSizeInSectors=dealTablebodyObj("compressionAlgorithm");
    obj2Th.stripeUnitSizeInSectors.style="font-weight: 700;"
    obj2Th.ecGroupDataChunks=dealTablebodyObj("deviceSize");
    obj2Th.ecGroupDataChunks.style="font-weight: 700;"
    obj2Th.format=dealTablebodyObj("enableStripe");
    obj2Th.format.style="font-weight: 700;"
    obj2Th.snapshotBlockSizeInSectors=dealTablebodyObj("migrationState");
    obj2Th.snapshotBlockSizeInSectors.style="font-weight: 700;"
    detailedArr.push(obj2Th);
    var obj3={};
    obj3.segmentSizeInSectors=dealTablebodyObj(dealData.meta.sectorSize);
    obj3.stripeSegmentCount=dealTablebodyObj(dealData.meta.copy);
    obj3.ecPacketSizeBits=dealTablebodyObj(dealData.meta.ecGroupParityChunks);
    obj3.stripeUnitSizeInSectors=dealTablebodyObj(dealData.meta.compressionAlgorithm);
    obj3.ecGroupDataChunks=dealTablebodyObj(dealData.meta.deviceSize);
    obj3.format=dealTablebodyObj(dealData.meta.enableStripe);
    obj3.snapshotBlockSizeInSectors=dealTablebodyObj(dealData.meta.migrationState);
    detailedArr.push(obj3);
    
    $scope.get_env_buildinfo= {
      "theadData":theade.queryDeviceDetailedTh,
      "tbodyData":detailedArr,
      "showSearch":false,
      "showPage":false,
      "title":"Device详细信息"
    };

  }
  function dealDeviceSegment(data){
    var dealData=data[0];

    var basic_body=[];
    var basicObj={};
    basicObj.errorCode=dealTablebodyObj(dealData.errorCode);
    basicObj.errorMsg=dealTablebodyObj(dealData.errorMsg);
    basicObj.deviceId=dealTablebodyObj(dealData.deviceId);
    basic_body.push(basicObj);
    $scope.get_basic_buildinfo= {
      "theadData":theade.queryDeviceSegmentBasicTh,
      "tbodyData":basic_body,
      "showSearch":false,
      "showPage":false,
      "title":"文件信息"
    };
    var list_body=[];
    $scope.showInfoTable=true;
    dealData.segmentList.map(function(item){
      var obj={};
      obj.status=dealTablebodyObj(item.status);
      // obj.MEDIUM_TYPE=dealTablebodyObj(item.MEDIUM_TYPE);
      obj.snapVersion=dealTablebodyObj(item.snapVersion);
      obj.configVersion=dealTablebodyObj(item.configVersion);
      obj.location=dealTablebodyObj(item.location);
      obj.segmentIdx=dealTablebodyObj(item.segmentIdx);
      if(item.status!="LOADED"){
        obj.status.color="red";
        obj.snapVersion.color="red";
        obj.configVersion.color="red";
        obj.location.color="red";
        obj.segmentIdx.color="red";
        list_body.unshift(obj);
      }else{
        list_body.push(obj);
      };
    });
    $scope.get_env_buildinfo = {
      "theadData":theade.queryDeviceSegmentEnvTh,
      "tbodyData":list_body,
      "showSearch":false,
      "showPage":true,
      "title":"Segment列表"
    };
  };
  function dealDeviceSnapshot(data){
    var dealData=data[0];
    var list_body=[];
    $scope.showInfoTable=true;
    if(!dealData.list){
      return;
    }
    dealData.list.map(function(item){
      var obj={};
      obj.SNAPDEVICEID=dealTablebodyObj(item.SNAPDEVICEID);
      obj.MODE=dealTablebodyObj(item.MODE);
      obj.status=dealTablebodyObj(item.STATUS);
      obj.SIZE=dealTablebodyObj(item.SIZE);
      obj.COPY=dealTablebodyObj(item.COPY);
      obj.REFCOUNT=dealTablebodyObj(item.REFCOUNT);
      obj.SNAPINDEX=dealTablebodyObj(item.SNAPINDEX);
      if(item.STATUS!="SNAPSHOT_SUCCESS"){
        obj.SNAPDEVICEID.color="red";
        obj.MODE.color="red";
        obj.status.color="red";
        obj.SIZE.color="red";
        obj.COPY.color="red";
        obj.REFCOUNT.color="red";
        obj.SNAPINDEX.color="red";
        list_body.unshift(obj);
      }else{
        list_body.push(obj);
      };
    });
    $scope.get_env_buildinfo = {
      "theadData":theade.queryDeviceSnapshotEnvTh,
      "tbodyData":list_body,
      "showSearch":false,
      "showPage":true,
      "title":"快照列表"
    };
  }
  // 初始化相关方法 汇总 end
  
  // 根据具体的值 查看是否需要初始化
  initOper();
  
  
  // 抽离所有请求相同部分代码
  // 加载时，展示加载中需要覆盖的弹框长*宽，init时需要自己传入长*宽;
  // 若弹框已加载完毕会 自动获取长*宽
  function initLoading(w,h){
    $scope.loadingData={};
    var os = document.getElementById('operWinId');
    var osw=os?os.offsetWidth+"px":"";
    var osh=os?(os.offsetHeight-7)+"px":"";
    $scope.loadingData.width=w?w:osw;
    $scope.loadingData.height=h?h:osh;
    $scope.showLoading=true;
  };
  //所有请求 公共方法
  $scope.showLoading=false;
  function sendOutHttpApi(urlStr,key){
    if(chartData.token){
      urlStr=urlStr+"&token="+chartData.token;
    };
    $http({
      method: 'GET',
      url:urlStr
    }).then(function(data,status){
      if(data.data.err){
        if(data.data.err.split(":")[0]=="Invalid token"){
          $uibModalInstance.close("已经有其他用户操作过当前集群,点击'确认'将刷新当前页面!");
        }else{
          alert(data.data.err);
          $scope.showLoading=false;
          // getClusterToken();
          return;
        } 
      }else if(data.data.show_type&&data.data.show_type=="link"){
        //当show_type存在时 2次弹框 展示该操作说明
        var inheData={};
        inheData=data.data;
        inheData.key="show_type";
        $scope.showLoading=false;
        showSecOper(inheData);
        return;
      };
     
      dealResponseHttpApi(data.data,key);
      $scope.showLoading=false;
      console.log("success");
    }).catch(function(data,status){
      
      $scope.showLoading=false;
      console.log(data);
      $uibModalInstance.close(data);
      
    })
  };
  function dealResponseHttpApi(data,key){
    switch(key){
      case "set_bmAll_flag":
      case "set_bsAll_flag":
      case "set_gcAll_flag":closeShowOper("success");
      break;
      case "get_bm_batch_Flag":
      case "get_bs_batch_Flag":
      case "get_gc_batch_Flag":
      case "get_bmAll_flag":
      case "get_bsAll_flag":
      case "get_gcAll_flag":
      case "get_bs_flag":
      case "get_gc_flag":
      case "get_bm_flag":dealGetApiData(data);
      break;
      case "query_device":dealQueryDevice(data);
      break;
      case "query_device_segment":dealDeviceSegment(data);
      break;
      case "query_device_snapshot":dealDeviceSnapshot(data);
      break;
      case "device_segment_chkseg":dealDeviceSegmentChkseg(data);
      break;
      case "distseg_device":dealDeviceSistseg(data);
      break;
      
      // case "device_segment_flushdev":dealDeviceSegmentFlushdev(data);
      // break;
      case "list_cluster_dcgc":dealListClusterDcgc(data);
      break;
      case "list_ver_gbi_bm":
      case "list_ver_gbi_bs":
      case "list_ver_gbi_gc":dealRespBuildinfo(data);
      break;
      case "change_newbm_Leader":closeShowOper(data.errorMsg);
      break;
      case "stat_config_dev":
      case "check_status_chkbm":dealRespChkbm(data,key);
      break;

      default :closeShowOper("success");
    }
  };



  //相关处理方法 body体
  
  //flush（指定segment/全部segment）的所有transaction log
  // function dealDeviceSegmentFlushdev(data){
  //   $scope.data.changesafe=false;
  //   $scope.showTrueButton=false;
  //   var dealData=data;
  //   var basic_body=[];
  //   dealData.map(function(item){
  //     var basicObj={};
  //     basicObj.deviceId=dealTablebodyObj(dealData.deviceId);
  //     basicObj.Segment=dealTablebodyObj(dealData.Segment);
  //     basicObj.Result=dealTablebodyObj(dealData.Result);
  //     basic_body.push(basicObj);
  //   })
    
  //   $scope.get_basic_buildinfo= {
  //     "theadData":theade.BlockDeviceAbnCheckreadyTH,
  //     "tbodyData":basic_body,
  //     "showSearch":false,
  //     "showPage":false,
  //     "title":"transaction log"
  //   };
  // }
  // 查看所有Segment的在BlockServer间分布情况
  function dealDeviceSistseg(data){
    if(!data.list){
      return
    };
    var list_body=[];
    data.list.map(function(item){
      var obj={};
      obj.deviceId=dealTablebodyObj(item.deviceId);
      obj.group=dealTablebodyObj(item.group);
      obj.bs0=dealTablebodyObj(item.bs0);
      obj.bs1=dealTablebodyObj(item.bs1);
      obj.bs2=dealTablebodyObj(item.bs2);
      obj.bs3=dealTablebodyObj(item.bs3);
      obj.bs4=dealTablebodyObj(item.bs4);
      obj.bs5=dealTablebodyObj(item.bs5);
      obj.bs6=dealTablebodyObj(item.bs6);
      obj.bs7=dealTablebodyObj(item.bs7);
      obj.sum=dealTablebodyObj(item.sum);
      list_body.push(obj);
    });
    $scope.get_basic_buildinfo= {
      "theadData":theade.BlockDeviceSistsegTH,
      "tbodyData":list_body,
      // "showSearch":false,
      // "showPage":false,
      // "title":"文件信息"
    };

  }
  // 检查Segment状态
  function dealDeviceSegmentChkseg(data){
    var dealData=data;
    var basic_body=[];
    var basicObj={};
    basicObj.listDeviceFail=dealTablebodyObj(dealData.listDeviceFail);
    basicObj.normalSegment=dealTablebodyObj(dealData.normalSegment);
    basicObj.checkSegmentFail=dealTablebodyObj(dealData.checkSegmentFail);
    basicObj.locationDeviceFail=dealTablebodyObj(dealData.locationDeviceFail);
    basic_body.push(basicObj);
    $scope.get_basic_buildinfo= {
      "theadData":theade.BlockDeviceCheckreadyTH,
      "tbodyData":basic_body,
      "showSearch":false,
      "showPage":false,
      "title":"文件信息"
    };
    var list_body=[];
    $scope.showInfoTable=true;
    data.list.map(function(item){
      var obj={};
      obj.DeviceId=dealTablebodyObj(item.DeviceId);
      obj.Segment=dealTablebodyObj(item.Segment);
      obj.Result=dealTablebodyObj(item.Result);
      list_body.push(obj);
      
    });
    $scope.get_env_buildinfo = {
      "theadData":theade.BlockDeviceAbnCheckreadyTH,
      "tbodyData":list_body,
      "showSearch":false,
      "showPage":true,
      "title":"Segment列表"
    };
  }
  //处理 检查BlockMaster的状态
  function dealRespChkbm(data,key){
    var str="";
    switch(key){
      case "stat_config_dev":str="查询结果status状态为:"+data.status;
      break;
      case "check_status_chkbm":str="处理结果:"+data.errorMsg;
      break;
    }
    $scope.data.tip=str;
  }
  //处理 获取所有buildinfo信息
  var basic_buildinfoObj={};
  var env_buildinfoObj={};
  $scope.buildinfoTiantengId=[];
  $scope.buildInfolsServerArr=[];
  $scope.buildInfolsServerStr="";
  function dealRespBuildinfo(data){
    var dealData=data;
    
    //当show_type存在时 2次弹框 展示该操作说明
    if(dealData.show_type&&dealData.show_type=="link"){
      var inheData={};
      inheData=dealData;
      inheData.key="show_type";
      showSecOper(inheData)
      return;
    };
    $scope.showInfoTable=true;
    for(var c in dealData){
      if(!dealData[c].buildInfo){
       continue;
      };
      $scope.buildInfolsServerArr.push(dealData[c].lsServer.join(" | "));
      //basic_buildinfo
      var basic_buildinfoThTd=[];
      var basicObj={};
      basicObj.ReleaseName=dealTablebodyObj(dealData[c].buildInfo.ReleaseName);
      basicObj.Target=dealTablebodyObj(dealData[c].buildInfo.Target);
      var TiantengId=dealData[c].buildInfo.TiantengId
      basicObj.TiantengId=dealTablebodyObj(TiantengId);
      var tiantengIdObj={};
      tiantengIdObj.name=TiantengId;
      tiantengIdObj.showClass=(c==0)?true:false;
      $scope.buildinfoTiantengId.push(tiantengIdObj);
      basicObj.HostName=dealTablebodyObj(dealData[c].buildInfo.HostName);
      basicObj.Mode=dealTablebodyObj(dealData[c].buildInfo.Mode);
      basicObj.Time=dealTablebodyObj(dealData[c].buildInfo.Time);
      basicObj.Path=dealTablebodyObj(dealData[c].buildInfo.Path);
      basicObj.Env=dealTablebodyObj(dealData[c].buildInfo.Env);
      basic_buildinfoThTd.push(basicObj); 
      basic_buildinfoObj[TiantengId]=basic_buildinfoThTd;
      // env_buildinfoTd
      var env_buildinfoTd=[];
      var buildinfojson=JSON.parse(dealData[c].buildInfo.BuildInfo);  
      for(var i in buildinfojson){
        if(i=="env"){
          continue;
        };
        var obj={};
        obj.Name=dealTablebodyObj(i);
        if(buildinfojson[i]){
          obj.Branch=dealTablebodyObj(buildinfojson[i].Branch?buildinfojson[i].Branch:"-");
          obj.Revision=dealTablebodyObj(buildinfojson[i].Revision?buildinfojson[i].Revision:"-");
          obj.URL=dealTablebodyObj(buildinfojson[i].URL?buildinfojson[i].URL:"-");
        }else{
          obj.Branch=dealTablebodyObj("-");
          obj.Revision=dealTablebodyObj("-");
          obj.URL=dealTablebodyObj("-");
        };
        if(obj.Name.name=="pangu"){
          obj.Name.color="blue";
          obj.Branch.color="blue";
          obj.Revision.color="blue";
          obj.URL.color="blue";
          env_buildinfoTd.unshift(obj);
        }else{
          env_buildinfoTd.push(obj);
        }
      }
      env_buildinfoObj[TiantengId]=env_buildinfoTd;
    }
    $scope.buildInfolsServerStr=$scope.buildInfolsServerArr[0];
    $scope.get_basic_buildinfo = {
      "theadData":theade.basic_buildinfoTh,
      "tbodyData":basic_buildinfoObj[$scope.buildinfoTiantengId[0].name],
      "showSearch":false,
      "showPage":false,
      "title":"buildinfo基础信息"
    };
    $scope.get_env_buildinfo = {
      "theadData":theade.env_buildinfoTh,
      "tbodyData":env_buildinfoObj[$scope.buildinfoTiantengId[0].name],
      "showSearch":false,
      "showPage":false,
      "title":"编译环境信息"
    };
  };
  //列出集群所有压缩的任务
  function dealListClusterDcgc(data){
    var dealData=data.list;

    var basic_body=[];
    var basicObj={};
    basicObj.finish=dealTablebodyObj(data.finish);
    basicObj.querying=dealTablebodyObj(data.querying);
    basicObj.t_ignore=dealTablebodyObj(data.t_ignore);
    basicObj.t_fail=dealTablebodyObj(data.t_fail);
    basicObj.selectworker=dealTablebodyObj(data.selectworker);
    basicObj.t_succ=dealTablebodyObj(data.t_succ);
    basicObj.notify=dealTablebodyObj(data.notify);
    basicObj.importing=dealTablebodyObj(data.importing);
    basicObj.t_all=dealTablebodyObj(data.t_all);
    basic_body.push(basicObj);
    $scope.get_basic_buildinfo= {
      "theadData":theade.listClusterDcgcBasicTh,
      "tbodyData":basic_body,
      "showSearch":false,
      "showPage":false,
      "title":"集群压缩任务基础信息"
    };
    var tbodyArr=[];
    $scope.showInfoTable=true;
    for(var i in dealData){
      var obj={};
      obj.location=dealTablebodyObj(dealData[i].location);
      obj.status=dealTablebodyObj(dealData[i].status);
      obj.scrub=dealTablebodyObj(dealData[i].scrub);
      obj.time_s=dealTablebodyObj(dealData[i].time_s);
      obj.segment=dealTablebodyObj(dealData[i].segment);
      obj.strategy=dealTablebodyObj(dealData[i].strategy);
      tbodyArr.push(obj);
    };
    $scope.get_env_buildinfo = {
      "theadData":theade.listClusterDcgcTh,
      "tbodyData":tbodyArr,
      "showSearch":false,
      "showPage":false,
      "title":"集群压缩任务详细信息"
    };
  }
  //处理返回的falg数据 get_ms_flag
  function dealGetApiData(data){
    var dealData=data;
    var getFlagTd=[];
    for(var i in dealData){
      var obj={};
      obj.Status=dealTablebodyObj(dealData[i].Status);
      obj.Value=dealTablebodyObj(dealData[i].Value);
      obj.Server=dealTablebodyObj(dealData[i].Server);
      getFlagTd.push(obj);
    };
    $scope.get_ms_flagData = {
      "theadData":theade.getFlagTh,
      "tbodyData":getFlagTd,
      "showSearch":false,
      "showPage":false,
    };
    
  };

  //相关处理方法 body体end
  

  // 与html交互相关事件
  //heml 点击查询事件
  $scope.clickTrue=function(keys){
    initLoading();
    var urlStr="";
    keys=keys?keys:$scope.data.key;
    if(keys=="set_bmAll_flag"||keys=="set_bsAll_flag"||keys=="set_gcAll_flag"){
      setFlagFunc();
      return;
    }else if(keys=="add_bs_schbs"||keys=="set_bs_schbs"||keys=="del_bs_schbs"
      ||keys=="change_newbm_Leader"||keys=="baksnap_device"||keys=="device_segment_loaddev"||keys=="device_snapshot_srnsnap"||keys=="set_config_dev"||keys=="cp_dev"||keys=="load_select_opendev"||keys=="close_select_opendev"||keys=="del_select_opendev"||keys=="clone_dev"||keys=="crt_dev"||keys=="crt_snap"){
      tipSecFunc();
      return
    }
    switch(keys){
      case "stat_config_dev":urlStr=chartData.url+"&version="+$scope.inputData.inputLocation;
      break;
      case "get_bm_batch_Flag":
      case "get_bs_batch_Flag":
      case "get_gc_batch_Flag":
      case "get_bmAll_flag":
      case "get_bsAll_flag":
      case "get_gcAll_flag":
      case "get_bs_flag":
      case "get_gc_flag":
      case "get_bm_flag":urlStr=chartData.url+"&flag="+$scope.inputData.flag;
      break;
      case "set_sv_flag":
      case "device_opendev":
      case "del_dev":
      case "close_dev":
      case "config_dev":
      case "device_snapshot_delsnap":
      case "device_segment_flushdev":
      case "flushdev_all_segment":
      case "block_master_rebalance":urlStr=chartData.url+"&changesafe_id="+$scope.inputData.changesafeId;
      break;
      
      
    };
    sendOutHttpApi(urlStr,keys);
  };
  function tipSecFunc(){
    var data={};
    data.key=chartData.key;
    data.name=$scope.data.name;
    data.url=chartData.url;
    data.tip=chartData.tip;
    switch(data.key){
      case "add_bs_schbs":data.tip="是否确定要把'"+$scope.inputData.inputLocation+"'添加到黑名单里面吗";
      break;
      case "baksnap_device":data.tip="是否确定要把'"+$scope.inputData.srcCluster+"'集群里的快照备份到"+$scope.inputData.dstCluster;
      break;
      case "device_segment_loaddev":data.tip="是否确定要把'"+chartData.DeviceId+"'调度到"+$scope.inputData.inputLocation;
      break;
      case "device_snapshot_srnsnap":data.tip="是否确定要把'"+chartData.DeviceId+"'的副本数设置为"+$scope.inputData.inputLocation;
      break;
      case "set_config_dev":data.tip="是否确定把deviceID为 '"+chartData.DeviceId+"' 的Device的配置修改为compress: '"+$scope.inputData.compress+"' "+($scope.inputData.inputfirst?",algorithm: '"+$scope.inputData.inputfirst+"'":"")+" ,EC: '"+$scope.inputData.EC+"'"+($scope.inputData.inputsecond?",dara_chunks: '"+$scope.inputData.inputsecond+"'":"")+($scope.inputData.inputthird?",parity_chunks: '"+$scope.inputData.inputthird+"' ":"")+($scope.inputData.inputFourth?",packet_bits: '"+$scope.inputData.inputFourth+"'":"")+" ,prefetch: '"+$scope.inputData.prefetch+"'"+($scope.inputData.inputFifth?",copy: '"+$scope.inputData.inputFifth+"'":"")+($scope.inputData.inputSixth?",storage_mode: '"+$scope.inputData.inputSixth+"'":"");
      break;
      case "cp_dev":data.tip="是否确定要把'"+$scope.inputData.srcDev+"'的device复制到'"+$scope.inputData.dstDev+"'";
      break;
      case "clone_dev":data.tip="是否确定要把deviceId为:"+$scope.data.DeviceId+",snapIndex为:"+$scope.data.snapIndex+",的快照克隆到dstId为:"+$scope.inputData.inputfirst+",dstSize为:"+$scope.inputData.inputsecond+",dstSector为:"+$scope.inputData.inputthird+"的device里";
      break;
      case "crt_dev":data.tip="是否确定创建deviceId为:"+$scope.inputData.inputfirst+",snapIndex为:"+$scope.inputData.inputsecond+",size为:"+$scope.inputData.inputthird+",sector为:"+$scope.inputData.inputFourth+"的device";
      break;
      case "crt_snap":data.tip="是否确定创建deviceId为:"+$scope.data.DeviceId+"snapIndex为:"+$scope.inputData.inputfirst+",的快照";
      break;
      
    }
    
    showSecOper(data);
  }
  function setFlagFunc(){
    var data={};
    data.url=chartData.url+"&flag="+$scope.inputData.flag+"&value="+
    $scope.inputData.value+"&changesafe_id="+$scope.inputData.changesafeId;
    data.name=$scope.data.name;
    data.key=chartData.key;
    // data.ip=chartData.ip;
    // data.flag=$scope.inputData.flag;
    // data.value=$scope.inputData.value;
    data.arr=[];
    data.arr.push({"name":"是否确定把"});
    data.arr.push({"name":"("+$scope.inputData.flag+")flag的值,设置为"});
    data.arr.push({"name":$scope.inputData.value,"color":"green"});
    showSecOper(data);
  };
  // Changesafe点选框变更时触发事件
  $scope.changeChangesafeCheck=function(){
    $scope.inputData.changesafeCheck=!$scope.inputData.changesafeCheck;
    if($scope.inputData.changesafeCheck==true){
      $scope.inputData.changesafeId=0
    }else{
      $scope.inputData.changesafeId="";
    }
  };
  $scope.errTip={};
  function checkInputNull(str){



  }
  // 与html交互相关事件
  

  // tip 只有一行提示信息时
  $scope.dealOnlyTip=function(){
    if(!checkInputNull()){
      return
    }
    switch(chartData.key){
      
      case "checkpoint":initLoading(),sendOutHttpApi(chartData.url+"&changesafe_id="+$scope.inputData.changesafeId,chartData.key);
      break;
      default:initLoading(),sendOutHttpApi(chartData.url,chartData.key);

    }
  };
  $scope.errTip={};

  

  
  function secondCrb(){
    var data={};
    data.key=chartData.key;
    data.tip=chartData.tip;
    showSecOper(data);  
  }
  // 2次弹框确认
  function showSecOper(data){
    var size="modal-maxlg";
    if(data.size){
      size=data.size;
    };
    var modalInstance = $uibModal.open({
       templateUrl: '/static/js/module/directive/panguBlock/confirm/showConfirm.html',
       controller: 'showConfirmCtrl',
       backdrop: "static",
       size: size,
       resolve: {
           resData: function () {
               return data;
           }
       }
    });
    modalInstance.result.then(function (msg) {
      //2次确认提示框
      switch(chartData.key){
        case "set_bmAll_flag":
        case "set_bsAll_flag":
        case "set_gcAll_flag":initLoading(),sendOutHttpApi(chartData.url+"&flag="
          +$scope.inputData.flag+"&value="+$scope.inputData.value+"&changesafe_id="
          +$scope.inputData.changesafeId,chartData.key)
        break;
        case "add_bs_schbs":initLoading(),sendOutHttpApi(chartData.url+"&bsLocation="
          +$scope.inputData.inputLocation+"&changesafe_id="
          +$scope.inputData.changesafeId,chartData.key)
        break;
        case "load_select_opendev":
        case "close_select_opendev":
        case "del_select_opendev":
        case "set_bs_schbs":
        case "change_newbm_Leader":
        case "del_bs_schbs":initLoading(),sendOutHttpApi(chartData.url+"&changesafe_id="+$scope.inputData.changesafeId,chartData.key)
        break;
        case "baksnap_device":initLoading(),sendOutHttpApi(chartData.url+"&changesafe_id="+$scope.inputData.changesafeId+"&srcCluster="+$scope.inputData.srcCluster+"&dstCluster="+$scope.inputData.dstCluster,chartData.key)
        break;
        case "device_segment_loaddev":initLoading(),sendOutHttpApi(chartData.url+"&changesafe_id="+$scope.inputData.changesafeId+"&blockServer="+$scope.inputData.inputLocation);
        break;
        case "device_snapshot_srnsnap":initLoading(),sendOutHttpApi(chartData.url+"&changesafe_id="+$scope.inputData.changesafeId+"&num="+$scope.inputData.inputLocation);
        break;
        case "set_config_dev":initLoading(),sendOutHttpApi(chartData.url+"&changesafe_id="+$scope.inputData.changesafeId+"&compress="+$scope.inputData.compress+($scope.inputData.inputfirst?"&algorithm="+$scope.inputData.inputfirst:"")+"&EC="+$scope.inputData.EC+($scope.inputData.inputsecond?"&dara_chunks="+$scope.inputData.inputsecond:"")+($scope.inputData.inputthird?"&parity_chunks="+$scope.inputData.inputthird:"")+($scope.inputData.inputFourth?"&packet_bits="+$scope.inputData.inputFourth:"")+"&prefetch="+$scope.inputData.prefetch+($scope.inputData.inputFifth?"&copy="+$scope.inputData.inputFifth:"")+($scope.inputData.inputSixth?"&storage_mode="+$scope.inputData.inputSixth:""));
        break;
        case "cp_dev":initLoading(),sendOutHttpApi(chartData.url+"&changesafe_id="+$scope.inputData.changesafeId+"&srcDev="+$scope.inputData.srcDev+"&dstDev="+$scope.inputData.dstDev,chartData.key)
        break;
        case "clone_dev":initLoading(),sendOutHttpApi(chartData.url+"&changesafe_id="+$scope.inputData.changesafeId+"&dstId="+$scope.inputData.inputfirst+"&dstSize="+$scope.inputData.inputsecond+"&dstSector="+$scope.inputData.inputthird,chartData.key)
        break;
        case "crt_dev":initLoading(),sendOutHttpApi(chartData.url+"&changesafe_id="+$scope.inputData.changesafeId+"&deviceId="+$scope.inputData.inputfirst+"&snapIndex="+$scope.inputData.inputsecond+"&size="+$scope.inputData.inputthird+"&sector="+$scope.inputData.inputFourth,chartData.key)
        break;
        case "crt_snap":initLoading(),sendOutHttpApi(chartData.url+"&changesafe_id="+$scope.inputData.changesafeId+"&snapIndex="+$scope.inputData.inputfirst,chartData.key)
        break;
      }

    }, function (data) {
      if(data=="show_type"){
        $uibModalInstance.close("success")
      }
      $scope.showLoading=false;
    });
  };

  //表格内 点击操作相关点击事件
  $scope.opeaClickFunc=function(data){
    // var url="";
    // var reqData={};
    // var key=data.info.key;
    // if(chartData.key=="file_info"){
    //   key=chartData.key;
    // }
    // switch(key){
    //   case "get_chunk_meta":url=chartData.getMeta+"&cs="+cutMetaIp(data.item.Location.name)+"&chunkid="+chartData.ChunkId
    //     ,reqData.title="查看chunk_meta信息";
    //   break;
    //   // getFileChunkMeta
    //   case "file_info":url=chartData.getMeta+"&cs="+cutMetaIp(data.item.Location.arrName[data.info])
    //   +"&chunkid="+$scope.get_basic_buildinfo.tbodyData[0].FileId.name+"_"+data.item.ChunkId.name
    //     ,reqData.title="查看chunk_meta信息";
    //   break;
    // };
    
    // reqData.url=url;
    // reqData.key=key;
    // showSecOper(reqData)
  };


  // 关闭
  function closeShowOper(str){
    $uibModalInstance.close(str);
  };
	$scope.okDesc=function(id){
    $uibModalInstance.close();
	};
	$scope.cancelDesc=function(id){
  	$uibModalInstance.dismiss('cancel');
 	};

})
