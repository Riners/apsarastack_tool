//diag编辑页controller 
myApp.controller('showOperationCtrl',function($scope,panguClusterService, $uibModal,$uibModalInstance,chartData,apis){

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
  $scope.showIp=get_pangu_urlParameter(chartData.url);
  var theade={
    "getFlagTh":[
      {"name":"Status","key":"Status"},
      {"name":"Value","key":"Value"},
      {"name":"Server","key":"Server"}
    ],
    "getCrbFlagTh":[
      // {"name":"Status","key":"Status","width":"60px"},
      {"name":"Type","key":"type","width":"60px"},
      {"name":"Value(秒)","key":"Value","width":"70px"},
      // {"name":"Server","key":"Server"}
    ],
    "basic_buildinfoTh":[
      {"name":"ReleaseName","key":"ReleaseName"},
      {"name":"Target","key":"Target"},
      {"name":"TiantengId","key":"TiantengId"},
      {"name":"Mode","key":"Mode"},
      {"name":"Time","key":"Time"},
    ],
    "env_buildinfoTh":[
      {"name":"Name","key":"Name"},
      {"name":"Branch","key":"Branch"},
      {"name":"Revision","key":"Revision"},
      // {"name":"URL","key":"URL"},
    ],
    "cs_safe":[
      {"name":"CS","key":"cs"},
      {"name":"status","key":"status"}
    ],
    "disk_safe":[
      {"name":"CS","key":"cs"},
      {"name":"status","key":"status"},
      {"name":"DiskId","key":"disk"}
    ],
    "basic_chunkinfoTh":[
      {"name":"FileType","key":"FileType"},
      {"name":"MinCopy","key":"MinCopy"},
      {"name":"MaxCopy","key":"MaxCopy"}
    ],
    "check_replicainfoTh":[
      {"name":"Replica位置","key":"Location"},
      {"name":"Replica状态","key":"Status"},
      {"name":"DiskId","key":"DiskId"},
      {"name":"操作","key":"operation"},
    ],
    "file_info_basic":[
      {"name":"FileId","key":"FileId","width":"100px"},
      {"name":"FileType","key":"FileType","width":"100px"},
      {"name":"ChunkNumber","key":"ChunkNumber","width":"100px"},
      {"name":"AppName","key":"AppName"},
      {"name":"PartName","key":"PartName"},
      {"name":"CompressType","key":"CompressType"},
      {"name":"MinCopy","key":"MinCopy","width":"70px"},
      {"name":"MaxCopy","key":"MaxCopy","width":"70px"},
      {"name":"FileLength","key":"FileLength"},
      {"name":"CreateTime","key":"CreateTime"},
      {"name":"LastModifyTime","key":"LastModifyTime"},
    ],
    "file_info":[
      {"name":"ChunkId","key":"ChunkId"},
      {"name":"Status","key":"Status"},
      {"name":"Location","key":"Location"},
      {"name":"DiskId","key":"DiskId"},
      // {"name":"操作","key":"operation"},
      {"name":"Version","key":"Version"},
      {"name":"ChunkFlag","key":"ChunkFlag"},
      {"name":"ReplicaNum","key":"ReplicaNum"},
    ],
    "chunkMetaTh":[
      {"name":"","key":"metaName","width":"200px"},
      {"name":"","key":"metaValue"}
    ],
  };
  $scope.showLoading=false;
  // Changesafe点选框变更时触发事件
  $scope.changeChangesafeCheck=function(){
    $scope.inputData.changesafeCheck=!$scope.inputData.changesafeCheck;
    if($scope.inputData.changesafeCheck==true){
      $scope.inputData.changesafeId=0
    }else{
      $scope.inputData.changesafeId="";
    }
  }
  //判断是否展示提示信息
  function showTopTip(){
    // showSourceAddress 是否显示源地址
    switch(chartData.key){
      case "dir_copy":
      case "dir_mv":
      case "file_copy":
      case "file_mv":
      case "dir_ln":$scope.showSourceAddress=false;
        break;
      default:$scope.showSourceAddress=true;
    }
  };
  showTopTip();
  // 设置CS Disk状态时 获取图片数据
  // chart图配置文件
  function clickHrefChart(group,view,host){
    var hrefStr="http://shennong.apsara.aliyun-inc.com/checkcluster/checkView?cluster="+$scope.mapsParam.cluster+"&view="+view+"&group="+group+"&btime="+dealTimeFormat(0.5)+"&etime="+dealTimeFormat(0)+"&host="+host;
    return hrefStr
  }
  var chartMsurl="/api/v1/get_shennong_metric?mgroup=pangu.PanguMaster%23&cluster="+$scope.mapsParam.cluster+"&matrix=";
  var chartCsurl="/api/v1/get_shennong_metric?mgroup=pangu.PanguChunkserver%23&&cluster="+$scope.mapsParam.cluster+"&matrix="
  var chartConfig={
    "Status":{
      "metrics":[//请求数据
      {
        "param_plus":chartCsurl+"net_summary",//url请求时?后面需要的参数
        "id":"chart21",
        "showChartloading":true,
        "matrix":"net_summary",
        "clickHref":clickHrefChart("pangu.PanguChunkserver%23","net_summary",-1)

      },{
        "param_plus":chartMsurl+"PG_MS_ReplicationQueueSize",//url请求时?后面需要的参数
        "id":"chart22",
        "showChartloading":true,
        "matrix":"PG_MS_ReplicationQueueSize",
        "clickHref":clickHrefChart("pangu.PanguMaster%23","PG_MS_ReplicationQueueSize",-1)
      }],
      "target":"shennong",//标题
      "chartSizeSmall":true//是否显示chart小图
    },
    "Status1":{
      "metrics":[//请求数据
      {
        "param_plus":chartCsurl+"net_summary",//url请求时?后面需要的参数
        "id":"chart23",
        "showChartloading":true,
        "matrix":"net_summary",
        "clickHref":clickHrefChart("pangu.PanguChunkserver%23","net_summary",-1)
      },{
        "param_plus":chartMsurl+"PG_MS_ReplicationQueueSize",//url请求时?后面需要的参数
        "id":"chart24",
        "showChartloading":true,
        "matrix":"PG_MS_ReplicationQueueSize",
        "clickHref":clickHrefChart("pangu.PanguMaster%23","PG_MS_ReplicationQueueSize",-1)
      }],
      "target":"shennong",//标题
      "chartSizeSmall":true//是否显示chart小图
    },
    "start_bal":{
      "metrics":[//请求数据
      {
        "param_plus":chartCsurl+"net_summary",//url请求时?后面需要的参数
        "id":"chart31",
        "showChartloading":true,
        "matrix":"net_summary",
        "clickHref":clickHrefChart("pangu.PanguChunkserver%23","net_summary",-1)
      },{
        "param_plus":chartMsurl+"PG_MS_ReplicationQueueSize",//url请求时?后面需要的参数
        "id":"chart32",
        "showChartloading":true,
        "matrix":"PG_MS_ReplicationQueueSize",
        "clickHref":clickHrefChart("pangu.PanguMaster%23","PG_MS_ReplicationQueueSize",-1)
      },{
        "param_plus":chartMsurl+"PG_CS_ReplicationOngoingTaskNumber",//url请求时?后面需要的参数
        "id":"chart33",
        "showChartloading":true,
        "matrix":"PG_CS_ReplicationOngoingTaskNumber",
        "clickHref":clickHrefChart("pangu.PanguMaster%23","PG_CS_ReplicationOngoingTaskNumber",-1)
      }],
      "target":"shennong",//标题
      "chartSizeSmall":true//是否显示chart小图
    },
  };
  function getStatusChart(){
    $scope.statusConfigData={
      "configData":chartConfig.Status,
      "group":$scope.mapsParam.group,
      "title":"Status",
      "id":"DiskStatusId",
      "width":"45%",
      "clusters":$scope.mapsParam.clusters,
      "chartSizeSmall":true,//是否显示chart小图
      "hideTimeList":true//是否隐藏放大chart图中的时间选择点击事件
    };
  };
  // 设置Disk 状态为error时 获取abnchunk值
  var abnchunkCount=1;
  var abnchunkTypeArr=["none","onecopy","lessmin"];
  function getAllAbnchunkApi(){
    abnchunkCount=1;
    $scope.abnchunkData={};
    for(var i in abnchunkTypeArr){
      getAbnchunkApi(abnchunkTypeArr[i])
    }
  };
  // 数据安全
  var initAbnchunk={"none":{"name":"0 Replica"},
  "onecopy":{"name":"1 Replica"},"lessmin":{"name":"Less Min"}};
  // 获取单个abnchunk数据接口
  function getAbnchunkApi(type){
    var url=chartData.getAbnUrl+'&type='+type+"&token="+chartData.token;
    var data={};
    data.url=url;
    panguClusterService.getUrlRequest(data).then(function (data) {
      var reqData=data;
      if($scope.mapsParam.portal){
        reqData=apis.allJsonData.list_master.abnchunk;
      };
      var color="";
      var dealData=reqData.count
      if(dealData>0){
        color="red"
      }
      $scope.abnchunkData[type]={"num":dealData,"title":initAbnchunk[type].name,"color":color}
      if(abnchunkCount==3){
        $scope.showLoading=false;
      }
      abnchunkCount++
      console.log("getAlarmUpgrade success");
    }).catch(function(data,status){
      console.log(data);
    })
  };
  //获取flag值的list列表
  $scope.flagList=[];
  $scope.flagObj={};
  function getflagList(type){
    var data={};
    data.url='/api/v1/get_pangu_flag?type='+type;
    panguClusterService.getUrlRequest(data).then(function (data) {  
      if(data){
        for(var i in data){
          if(data[i].name.toUpperCase().indexOf("PANGU_")==-1){
            continue;
          }
          $scope.flagList.push(data[i]);  
          $scope.flagObj[data[i].name]=data[i];
        }
      };

      console.log("success");
    }).catch(function(data,status){
      console.log(" error");
    })
  };
  var get_crb_flagArr=[];
  function putFlagArr(){
    var flagArr=chartData.flagArr;
    $scope.flagList=[{"name":"回收站保存期限"},{"name":"chunkserver保存期限"}];
    $scope.flagObj={
      "pangu_master_DelayTimeForFileGC":{"name":"pangu_master_DelayTimeForFileGC"},
      "pangu_chunkserver_DeleteTempChunkSubDirFileIntervalTime":{"name":"pangu_chunkserver_DeleteTempChunkSubDirFileIntervalTime"}
    };
    get_crb_flagArr=[];
    if(chartData.key=="get_crb_flag"){
      sendOutHttpApi(chartData.url,"get_crb_flag1");
      sendOutHttpApi(chartData.getCsUrl,"get_crb_flag2");
    }
  };

  function groupByValue(data,key){
    var outDataArr=[];
    var addStrArr=[];
    data.map(function(item){
      if(addStrArr.indexOf(item[key])==-1){
        addStrArr.push(item[key]);
        outDataArr.push(item)
      }
    })
    return outDataArr;
  }
  function dealFlagConfiguration(data){
    var dealData=data
    if($scope.mapsParam.portal){
      dealData=apis.allJsonData.list_master.get_flag;
    };
    
    if(isArray(dealData)){
      dealData=groupByValue(dealData,"Value");
    }else{
      $scope.get_crb_flagTip=dealData.err?dealData.err:"success";
      return
    }
    
    var getFlagTd=[];
    for(var i in dealData){
      var obj={};
      obj.type=dealTablebodyObj(chartData.flag);
      obj.Value=dealTablebodyObj(dealData[i].Value);
      getFlagTd.push(obj);
    };
    if(getFlagTd.length>1){
      $scope.get_crb_flagTip="数据不一致，请统一flag"
    }
    $scope.get_ms_flagData = {
      "theadData":theade.getCrbFlagTh,
      "tbodyData":getFlagTd,
      "showSearch":false,
      "showPage":false,
    };
  }
  $scope.get_crb_flagTip="";
  function dealGetCrbFlag(data,key){
    var dealData=data
    if($scope.mapsParam.portal){
      dealData=apis.allJsonData.list_master.get_flag;
    };
    dealData=groupByValue(dealData,"Value");
    var getFlagTd=[];
    for(var i in dealData){
      var obj={};
      var type="";
      if(key=="get_crb_flag1"){
        // type="pangu_master_DelayTimeForFileGC"
        type="回收站保存期限";
      }else{
        // type="pangu_chunkserver_DeleteTempChunkSubDirFileIntervalTime"
        type="chunkserver保存期限";
      }
      obj.type=dealTablebodyObj(type);
      obj.Value=dealTablebodyObj(dealData[i].Value);
      getFlagTd.push(obj);
    };
    if(key=="get_crb_flag1"){
      get_crb_flagArr=getFlagTd.concat(get_crb_flagArr)
    }else{
      get_crb_flagArr=get_crb_flagArr.concat(getFlagTd);
    }
    var showBodyArr=[];
    if(get_crb_flagArr.length>2){
      showBodyArr=get_crb_flagArr.slice(0,5);
      showBodyArr.push({"Status":{"name":"..."}});
      $scope.get_crb_flagTip="数据不一致，请设置保存期限";
    }else{
      showBodyArr=get_crb_flagArr;
      $scope.get_crb_flagTip="";
    }
    
    $scope.get_ms_flagData = {
      "theadData":theade.getCrbFlagTh,
      "tbodyData":showBodyArr,
      "showSearch":false,
      "showPage":false,
    };
  };
  $scope.clickSet_crb_flag=function(){
    var data={};
    data.title=$scope.data.name;
    data.tip="是否确认设置回收站参数";
    showSecOper(data);
  };
  function setCrbFlag(){
    if($scope.inputData.flag=="回收站保存期限"){
      sendOutHttpApi(chartData.url+"&value="+$scope.inputData.value,chartData.key);
    }else{
      sendOutHttpApi(chartData.setCsUrl+"&value="+$scope.inputData.value,chartData.key);
    }
  }
  // 回收站页
  $scope.isCrbRestore=false;
  $scope.clickCrbRestore=function(){
    $scope.isCrbRestore=!$scope.isCrbRestore
  }
  //flag值改变时 触发事件
  $scope.changeFlag =function (){
    if($scope.inputData.flag==""){
      $scope.inputData.value="";
    }
    if($scope.flagObj[$scope.inputData.flag]){
      $scope.inputData.value=$scope.flagObj[$scope.inputData.flag].default;
    }
  }
  // 获取集群基础信息
  $scope.clusterBasic={};
  //表格内 点击操作相关点击事件
  $scope.opeaClickFunc=function(data){
    var url="";
    var reqData={};
    var key=data.info.key;
    if(chartData.key=="file_info"){
      key=chartData.key;
    }
    switch(key){
      case "get_chunk_meta":url=chartData.getMeta+"&cs="+cutMetaIp(data.item.Location.name)+"&chunkid="+chartData.ChunkId
        ,reqData.title="查看chunk_meta信息";
      break;
      // getFileChunkMeta
      case "file_info":url=chartData.getMeta+"&cs="+cutMetaIp(data.item.Location.arrName[data.info])
      +"&chunkid="+$scope.get_basic_buildinfo.tbodyData[0].FileId.name+"_"+data.item.ChunkId.name
        ,reqData.title="查看chunk_meta信息";
      break;
    };
    
    reqData.url=url;
    reqData.key=key;
    showSecOper(reqData)
  }
  // 切割tcp://10.101.221.45:10260中的ip
  function cutMetaIp(data){
    var cutIp=data.split("//")[1];
    return cutIp.split(":")[0];
  }
  // 
  $scope.changeStatus=function(){
    $scope.abnchunkData={};
    $scope.data.dangerImg=false;
    if($scope.setStatus=="SHUTDOWN"){
      // getStatusChart();
      $scope.setStatusTip="此操作会引发复制，请检查集群容量、网络流量和复制队列。"
    }else if($scope.setStatus=="ERROR"){
      initLoading();
      // getStatusChart();
      getAllAbnchunkApi();
      $scope.data.dangerImg=true;
      $scope.setStatusTip="0replica和1replica存在时，禁止此操作，lessmin replica数量高或集群容量高时，请谨慎执行。此操作会引发复制，请检查集群流量、复制队列。（maste sniff有延迟，当前的abnchunk不准确，有一定风险）"
    }
  };
  // 初次加载时需要做处理的相关key
  function initOper(){
    var url=chartData.url;
    switch(chartData.key){
      case "get_configuration_flag":sendOutHttpApi(chartData.url,chartData.key);;
      break;
      case "set_configuration_flag":initSetConfFlag();
      break;
      case "get_crb_flag":
      case "set_crb_flag":putFlagArr();
      break;
      case "set_sv_flag":getflagList("supervisor");
      break;
      case "set_ms_flag":
      case "set_msAll_flag":getflagList("master");
      break;
      case "set_csAll_flag":
      case "batch_set_All_flag":
      case "set_cs_flag":getflagList("cs");
      break;
      case "get_sv_flag":getflagList("supervisor"),get_ms_flag();
      break;
      case "get_ms_flag":
      case "get_msAll_flag":getflagList("master"),get_ms_flag();
      break;
      case "batch_get_csAll_flag":
      case "get_cs_flag":
      case "get_csAll_flag":getflagList("cs"),get_ms_flag();
      break;
      case "cs_buildinfo":
      case "cs_all_buildinfo":
      case "ms_all_buildinfo":
      case "buildinfo":init_info("max2");//,getClusterBasic()
      break;
      case "get_csAll_safe":init_info("csAllSafe");
      break;
      case "batch_get_csAll_safe":
      case "get_cs_safe":init_info("csSafe");
      break;
      case "get_diskAll_safe":sendOutHttpApi(chartData.url,"get_diskAll_safe");
      break;
      case "get_disk_safe":sendOutHttpApi(chartData.url,"get_disk_safe");
      break;
      case "set_cs_status":set_status("set_cs_status");
      break;
      
      case "set_diskdown_status":
      case "set_disk_status":set_status("set_disk_status");
      break;
      case "chunk_info":abnChunkInfo();
      break;
      case "file_info":init_info("file_info");
      break;  
      
      case "get_recycle_quotaroot":
      case "getquotaroot":
      case "setquotaroot":
      case "get_quota":
      case "set_quota":sendOutHttpApi(chartData.getUrl,"get_quota");
      break;
      // case "start_bal":start_bal();
      // break;
      case "replication_chunk_meta":sendOutHttpApi(chartData.url,chartData.key);
      break;
      
    }
  };
  function initSetConfFlag(){
    var data={};

    data.tip="注意：当前操作只是修改进程内部的flag，如果发生重启修改将失效；如果期望重启后仍然生效，请到天基上执行，配置修改的操作。";
    showSecOper(data)
  }
  function initSetSvFlag(){
    $scope.flagList=[{"name":"pangu_supervisor_NuwaLockRetryIntervalMills"}];
    $scope.flagObj.pangu_supervisor_NuwaLockRetryIntervalMills={"name":"pangu_supervisor_NuwaLockRetryIntervalMills"};
    $scope.inputData.flag=$scope.flagList[0].name;
  }
  function initSvFlag(){
    $scope.flagList=[{"name":"pangu_supervisor_NuwaLockRetryIntervalMills"}];
    $scope.flagObj.pangu_supervisor_NuwaLockRetryIntervalMills={"name":"pangu_supervisor_NuwaLockRetryIntervalMills"};
    $scope.inputData.flag=$scope.flagList[0].name;
    $scope.get_ms_flagData = {
      "theadData":theade.getFlagTh,
      "tbodyData":[],
      "showSearch":false,
      "showPage":false,
    };
  }
  // function start_bal(){
  //   $scope.statusConfigData1={
  //     "configData":chartConfig.start_bal,
  //     "group":$scope.mapsParam.group,
  //     "title":"Status",
  //     "id":"startBal",
  //     "clusters":$scope.mapsParam.clusters,
  //     "chartSizeSmall":true,//是否显示chart小图
  //     "hideTimeList":true//是否隐藏放大chart图中的时间选择点击事件
  //   };
  // };
  initOper();
  // 点击按钮,就开始获取数据
  function init_info(str){
    switch(str){
      case "csAllSafe":initLoading("898px","197px");
      break;
      case "csSafe":initLoading("589px","215px");
      break;
      case "max2":initLoading("1198px","373px");
      break;
      case "file_info":initLoading("1198px","309px");
      break;
    }
    if(chartData.key=="batch_get_csAll_safe"){
      reqBatchClick("initCsAllSafe");
      return
    }else{
      sendOutHttpApi(chartData.url,chartData.key);
    }
    
  }
  function abnChunkInfo(){
    initLoading("589px","339px");
    sendOutHttpApi(chartData.url,"chunk_info");
    sendOutHttpApi(chartData.getUrl,"init_chunk_info");
  }
  // 设置cs和disk状态 调用参数
  function set_status(str){
    // getClusterBasic();//获取状态数据
    $scope.statusData=[];
    var statusArr=[]
    var reqStatusArr=[];
    if(str=="set_cs_status"){
      statusArr=["NORMAL","READONLY","SHUTDOWN"];
      for(var i in statusArr){
        if(statusArr[i]!=chartData.status){
          $scope.statusData.push(statusArr[i])
        }
      };
    }else{
      statusArr=["OK","SHUTDOWN","ERROR"];
      reqStatusArr=["DISK_OK","DISK_SHUTDOWN","DISK_ERROR"];
      if(chartData.key=="set_disk_status"){
        reqStatusArr=["DISK_OK","DISK_SHUTDOWN","DISK_ERROR"];
      }
      for(var i in statusArr){
        if(reqStatusArr[i]!=chartData.status){
          $scope.statusData.push(statusArr[i])
        }
      };
      if(chartData.key=="set_diskdown_status"){
        $scope.statusData=["ERROR"];
      }
      
    };
    $scope.setStatus=$scope.statusData[0];
    $scope.changeStatus();
  };
  //重新获取token值
  function getClusterToken(str){
    var data={};
    data.url='/api/v1/get_opr_write_token?cluster='+$scope.mapsParam.cluster;
    panguClusterService.getUrlRequest(data).then(function (data) {
      var dealData=data;
      if($scope.mapsParam.portal){
        dealData=apis.allJsonData.list_master.get_opr_write_token1;
      };
      chartData.token=dealData.token;
      console.log("success");
    }).catch(function(data,status){
      console.log(data);
    })
  };
  // 抽离所有请求相同部分代码，
  function initLoading(w,h){
    $scope.loadingData={};
    var os = document.getElementById('operWinId');
    var osw=os?os.offsetWidth+"px":"";
    var osh=os?(os.offsetHeight-7)+"px":"";
    $scope.loadingData.width=w?w:osw;
    $scope.loadingData.height=h?h:osh;
    $scope.showLoading=true;
  };
  
  function sendOutHttpApi(urlStr,key){

    var method=chartData.method?chartData.method:"GET";
    var data={};
    data.url=urlStr;
    if(chartData.token){
      data.url+="&token="+chartData.token;
    }
    data.method=method
    panguClusterService.getUrlRequest(data).then(function (data) {
    
      if(data.err){
        if(data.err.split(":")[0]=="Invalid token"){
          // 当返回的token不对时,刷新页面
          $uibModalInstance.close("已经有其他用户操作过当前集群,点击'确认'将刷新当前页面!");
        }else{
          alert(data.err);
          $scope.showLoading=false;
          if(chartData.key=="cs_buildinfo"||chartData.key=="buildinfo"){
            $uibModalInstance.close();
          }
          // getClusterToken();
          return;
        } 
      }else if(data.show_type&&data.show_type=="link"){
        //当show_type存在时 2次弹框 展示该操作说明
        var inheData={};
        inheData=data;
        inheData.key="show_type";
        $scope.showLoading=false;
        showSecOper(inheData);
        return;
      };
      if($scope.mapsParam.portal){
          // var timename=setTimeout(function(){
          // $scope.showLoading=false;
          

          dealResponseHttpApi(data,key);
          if(chartData.key=="batch_get_csAll_flag"||chartData.key=="batch_set_All_flag"){
            if(batchCount==chartData.arrList.length){
              $scope.showLoading=false;
            }else{
              batchCount++
            }
          }else{
            $scope.showLoading=false;
          }
          // $scope.$digest();
        // },1000);//定时，测试使用
      }else{
        dealResponseHttpApi(data,key);
        if(chartData.key=="batch_get_csAll_flag"||chartData.key=="batch_set_All_flag"){
          if(batchCount==chartData.arrList.length){
            $scope.showLoading=false;
          }else{
            batchCount++
          }
        }
        $scope.showLoading=false;

      }
      console.log("success");
    }).catch(function(data,status){
      if($scope.mapsParam.portal){
        var timename=setTimeout(function(){
          $scope.showLoading=false;
          $scope.$digest();
        },1000);//定时，测试使用
      }else{
        $scope.showLoading=false;
      }
      console.log(data);
      $uibModalInstance.close(data);
      
    })
  };
  $scope.get_cs_safeData = {
    "theadData":[],
    "tbodyData":[],
    "showSearch":false,
    "showPage":false,
  };
  $scope.get_basic_buildinfo = {
    "theadData":[],
    "tbodyData":[],
    "showSearch":false,
    "showPage":false
  };
  $scope.get_env_buildinfo = {
    "theadData":[],
    "tbodyData":[],
    "showSearch":false,
    "showPage":false,
    "title":"所有Chunk信息"
  };
  function dealResponseHttpApi(data,key){
    switch(key){
      
      case "dir_setreplica":
      case "set_cs_status":
      case "set_diskdown_status":closeShowOper("setSuccess");
      break;
      case "set_disk_status":closeShowOper(data);
      break;
      case "set_configuration_flag":
      case "get_configuration_flag":dealFlagConfiguration(data);
      break;
      case "get_crb_flag1":dealGetCrbFlag(data,key);
      break;
      case "get_crb_flag2":dealGetCrbFlag(data,key);
      break;
      case "get_sv_flag":dealGetsvData(data);
      break;
      case "batch_get_csAll_flag":
      case "get_ms_flag":dealGetApiData(data);
      break;
      case "cs_all_buildinfo":
      case "ms_all_buildinfo":
      case "cs_buildinfo":
      case "buildinfo":dealRespBuildinfo(data);
      break;
      // list_cs
      case "get_csAll_safe":dealRespCsSafe(data);
      break;
      case "batch_get_csAll_safe":
      case "get_cs_safe":dealRespCsSafe(data);
      break;
      case "get_diskAll_safe":dealRespDiskSafe(data);
      break;
      case "get_disk_safe":dealRespDiskSafe(data);
      break;
      case "chunk_info":dealRespChunkInfo(data);
      break;
      case "init_chunk_info":dealRespInitChunkInfo(data);
      break;
      case "file_info":dealRespFileInfo(data);
      break;
      case "get_recycle_quotaroot":
      case "getquotaroot":
      case "get_quota":dealRespGetQuota(data);
      break;
      case "batch_set_All_flag":closeBatchSetFlag();
      break;
      case "replication_chunk_meta":dealChunkMeta(data);
      break;
      default :closeShowOper("success");
    }
  };
  //处理返回的falg数据 get_sv_flag
  function dealGetsvData(data){
    var dealData=data;
    if($scope.mapsParam.portal){
      resData=apis.allJsonData.list_master.get_cs_flag;
    };
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
  // 处理chunkmeta 返回数据
  $scope.chunkMetaData=[];
  function dealChunkMeta(data){
    var resData=data;
    if($scope.mapsParam.portal){
      resData=apis.allJsonData.list_master.chunk_meta;
    };
    var metaBody=[];
    for(var i in resData){
      var obj={};
      obj.metaName=dealTablebodyObj(i);
      obj.metaValue=dealTablebodyObj(resData[i]);
      metaBody.push(obj);
    };
    $scope.chunkMetaData=metaBody;
    $scope.get_basic_buildinfo = {
      "theadData":theade.chunkMetaTh,
      "tbodyData":metaBody,
      "showSearch":false,
      "showPage":true,
      // "title":"chunk meta by cs"
    };
  }
  // get_quota
  function dealShowQuotaData(data,str){
    data.key=str;
    return data;
  }
  function dealRespGetQuota(data){
    var dealData=data;
    if($scope.mapsParam.portal){
      dealData=apis.allJsonData.list_master.get_quota;
    };
    for(var i in dealData){
      dealData[i].Used=manageNum(dealData[i].Used,0);
    };
    $scope.quotaArr=[];
    $scope.quotaArr.push(dealShowQuotaData(dealData.EntryNumber,"EntryNumber"));
    $scope.quotaArr.push(dealShowQuotaData(dealData.FileNumber,"FileNumber"));
    $scope.quotaArr.push(dealShowQuotaData(dealData.FileLogicalLength,"FileLogicalLength"));
    $scope.quotaArr.push(dealShowQuotaData(dealData.FilePhysicalLength,"FilePhysicalLength"));
  };
  $scope.set_quota=function(){
    var data={};
    data.title=$scope.data.name;
    data.tip="是否确认设置Quota";
    showSecOper(data);
  };
  function setFileQuota(){
    if(!checkInputNull()){
      return
    }
    initLoading();
    var quota=[];
    for(var i in $scope.quotaArr){
      quota.push($scope.quotaArr[i].Limit);
    };
    var quotaStr=quota.join(",");
    var urlStr=chartData.url+"&quota="+quotaStr
    sendOutHttpApi(urlStr,"set_ms_flag");
  }
  $scope.showgetquotaroot=false;
  
  // file_info
  $scope.showInfoTable=true;
  function dealRespFileInfo(data){
    var dealData=data;
    if($scope.mapsParam.portal){
      dealData=apis.allJsonData.list_master.file_info;
    };
    var file_info_basicTd=[];
    var file_infoTd=[];
    var basicObj={};
    basicObj.FileId=dealTablebodyObj(dealData.FileId);
    basicObj.FileType=dealTablebodyObj(dealData.FileType);
    basicObj.ChunkNumber=dealTablebodyObj(dealData.ChunkNumber);
    if(dealData.ChunkNumber==0){
      $scope.showInfoTable=false;
    }else{
      $scope.showInfoTable=true;
    }
    basicObj.AppName=dealTablebodyObj(dealData.AppName);
    basicObj.PartName=dealTablebodyObj(dealData.PartName);
    basicObj.CompressType=dealTablebodyObj(dealData.CompressType);
    basicObj.MinCopy=dealTablebodyObj(dealData.MinCopy);
    basicObj.MaxCopy=dealTablebodyObj(dealData.MaxCopy);
    var dirSize=dealData.FileLength;
    var unitArr=["B","KB","MB","GB","TB"];
    var unitCount=0;
    while((dirSize/1024)>=1&&unitCount<5)
    {
      dirSize=dirSize/1024;
      unitCount++;
    };
    dirSize=manageNum(dirSize,3)+unitArr[unitCount];
    basicObj.FileLength=dealTablebodyObj(dirSize);
    basicObj.CreateTime=dealTablebodyObj(dealData.CreateTime);
    basicObj.LastModifyTime=dealTablebodyObj(dealData.LastModifyTime);
    file_info_basicTd.push(basicObj) 
    var replicaData=dealData.lsChunkInfo;
    for(var i in replicaData){
      var obj={};
      obj.ChunkId=dealTablebodyObj(replicaData[i].ChunkId);
      var Status=[];
      var Location=[];
      var DiskId=[];
      var operationChunk=[];
      for(var j in replicaData[i].lsReplicaInfo){
        Status.push(replicaData[i].lsReplicaInfo[j].Status);
        Location.push(replicaData[i].lsReplicaInfo[j].Location);
        DiskId.push(replicaData[i].lsReplicaInfo[j].DiskId);
        operationChunk.push("get chunk meta")
      };
      obj.Status={"arrName":Status};
      obj.Location={"arrName":Location};
      obj.DiskId={"arrName":DiskId};
      obj.operation={"arrName":operationChunk,"click":true,"key":"getFileChunkMeta"}

      obj.Version=dealTablebodyObj(replicaData[i].Version);
      obj.ChunkFlag=dealTablebodyObj(replicaData[i].ChunkFlag);
      obj.ReplicaNum=dealTablebodyObj(replicaData[i].ReplicaNum);
      file_infoTd.push(obj);
    }
    $scope.get_basic_buildinfo= {
      "theadData":theade.file_info_basic,
      "tbodyData":file_info_basicTd,
      "showSearch":false,
      "showPage":false,
      "title":"Chunk基础信息"
    };
    $scope.get_env_buildinfo = {
      "theadData":theade.file_info,
      "tbodyData":file_infoTd,
      "showSearch":false,
      "showPage":false,
      "title":"所有Chunk信息"
    };
    if(file_infoTd.length>10){
      $scope.get_env_buildinfo.showPage=true;
    }
  }
  function dealRespInitChunkInfo(data){
    var dealData=data;
    if($scope.mapsParam.portal){
      dealData=apis.allJsonData.list_master.pangu_file_whois;
    };
    $scope.abnchunkFilename=dealData.strFileName;
  }
  // chunkinfo
  function dealRespChunkInfo(data){
    var dealData=data;
    if($scope.mapsParam.portal){
      dealData=apis.allJsonData.list_master.chunk_info;
    };
    var basic_ChunkinfoTd=[];
    var check_replicaTd=[];
    var basicObj={};
    basicObj.FileType=dealTablebodyObj(dealData.FileType);
    basicObj.MinCopy=dealTablebodyObj(dealData.MinCopy);
    basicObj.MaxCopy=dealTablebodyObj(dealData.MaxCopy);
    basic_ChunkinfoTd.push(basicObj)  
    var replicaData=dealData.ChunkInfo.lsReplicaInfo;
    for(var i in replicaData){
      var obj={};
      obj.Location=dealTablebodyObj(replicaData[i].Location);
      obj.Status=dealTablebodyObj(replicaData[i].Status);
      obj.DiskId=dealTablebodyObj(replicaData[i].DiskId);
      obj.operation=dealTablebodyObj("","",[{"name":"get chunk meta","key":"get_chunk_meta"}]);
      check_replicaTd.push(obj);
    };
    // get_basic_chunkinfo get_replica_chunkinfo
    $scope.get_basic_buildinfo= {
      "theadData":theade.basic_chunkinfoTh,
      "tbodyData":basic_ChunkinfoTd,
      "showSearch":false,
      "showPage":false,
      "title":"文件信息"
    };
    $scope.get_env_buildinfo = {
      "theadData":theade.check_replicainfoTh,
      "tbodyData":check_replicaTd,
      "showSearch":false,
      "showPage":false,
      "title":"Replica信息"
    };
  }
  // list_cs
  // disk_safe
  function dealRespDiskSafe(data){
    var dealData=data;
    if($scope.mapsParam.portal){
      dealData=apis.allJsonData.list_master.cs_safe;
    };
    var getSafeTd=[];
    for(var i in dealData){
      var obj={};
      obj.cs=dealTablebodyObj(dealData[i].cs);
      var status=dealData[i].status=="SAFE"?"可下线":"不可下线";
      obj.status=dealTablebodyObj(status);
      if(dealData[i].status=="SAFE"){
        obj.status.color="green";
      }else{
        obj.status.color="red";
      }
      obj.disk=dealTablebodyObj(dealData[i].disk);
      getSafeTd.push(obj);
    }
    $scope.get_cs_safeData = {
      "theadData":theade.disk_safe,
      "tbodyData":getSafeTd,
      "showSearch":true,
      "showPage":true,
    };
  }
  // cs_safe
  function dealRespCsSafe(data){
    var dealData=data;
    if($scope.mapsParam.portal){
      dealData=apis.allJsonData.list_master.cs_safe;
    };
    var getSafeTd=[];
    for(var i in dealData){
      var obj={};
      obj.cs=dealTablebodyObj(dealData[i].cs);
      var status=dealData[i].status=="SAFE"?"可下线":"不可下线";
      obj.status=dealTablebodyObj(status);
      if(dealData[i].status=="SAFE"){
        obj.status.color="green";
      }else{
        obj.status.color="red";
      }
      getSafeTd.push(obj);
    };
    batch_get_csAll_safeData=batch_get_csAll_safeData.concat(getSafeTd);
    $scope.get_cs_safeData = {
      "theadData":theade.cs_safe,
      "tbodyData":batch_get_csAll_safeData,
      "showSearch":false,
      "showPage":false,
    };
    if(chartData.key=="get_csAll_safe"){
      $scope.get_cs_safeData.showSearch=true;
      $scope.get_cs_safeData.showPage=true;
    }
  }

  // list_master--> buildinfo
  var basic_buildinfoObj={};
  var env_buildinfoObj={};
  $scope.buildinfoTiantengId=[];
  $scope.buildInfolsServerArr=[];
  $scope.buildInfolsServerStr="";
  function dealRespBuildinfo(data){
    var dealData=data;
    if($scope.mapsParam.portal){
      dealData=apis.allJsonData.list_master.buildInfo;
    };
    //当show_type存在时 2次弹框 展示该操作说明
    if(dealData.show_type&&dealData.show_type=="link"){
      var inheData={};
      inheData=dealData;
      inheData.key="show_type";
      showSecOper(inheData)
      return;
    };
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
  //点击buildinfo内tab相关事件
  $scope.tabClickBuildInfo=function(data){
    $scope.buildInfolsServerStr=$scope.buildInfolsServerArr[data.index];
    $scope.buildinfoTiantengId=showTabList(data,$scope.buildinfoTiantengId);
    $scope.get_basic_buildinfo = {
      "theadData":theade.basic_buildinfoTh,
      "tbodyData":basic_buildinfoObj[$scope.buildinfoTiantengId[data.index].name],
      "showSearch":false,
      "showPage":false,
      "title":"buildinfo基础信息"
    };
    $scope.get_env_buildinfo = {
      "theadData":theade.env_buildinfoTh,
      "tbodyData":env_buildinfoObj[$scope.buildinfoTiantengId[data.index].name],
      "showSearch":false,
      "showPage":false,
      "title":"编译环境信息"
    };
  }
  // tip 只有一行提示信息时
  $scope.dealOnlyTip=function(){
    if(!checkInputNull()){
      return
    }
    switch(chartData.key){
      case "show_opr_log_title":closeShowOper();
      break;
      case "crb_restore":initLoading(),sendOutHttpApi(chartData.url+($scope.isCrbRestore?"&dst="+$scope.inputData.targetAddress:""),chartData.key);
      break;
      
      case "crb":
      case "reboot":
      case "dir_delete":
      case "file_delete":
      // case "start_bal":
      case "switch_ms":secondCrb();
      break;
      case "batch_reboot":reqBatchClick();
      break;
      case "pin":
      case "unpin":
      // case "dir_delete":
      // case "reboot":
      // case "switch_ms":
      case "start_bal":
      case "flush_oplog":
      case "stop_bal":
      case "del_cs_schbs":
      case "checkpoint":initLoading(),sendOutHttpApi(chartData.url,chartData.key);
      break;
      default:initLoading(),sendOutHttpApi(chartData.url,chartData.key);

    }
  };
  $scope.errTip={};

  function checkInputNull(type){
    var resptype=true;
    // if($scope.data.changesafe){
    //   if($scope.inputData.changesafeId===0){
    //     $scope.errTip.errTipSafeId="";
    //   }else if(!$scope.inputData.changesafeId){
    //     $scope.errTip.errTipSafeId="changesafeId值不能为空";
    //     resptype=false;
    //   }else{
    //     $scope.errTip.errTipSafeId="";
    //   }
    // }
    if(type=="setMsFlag"){
      if(!$scope.inputData.flag){
        $scope.errTip.errTipFlag="Flag值不能为空";
        resptype=false;
      }else{
        $scope.errTip.errTipFlag="";
      }
      if(!$scope.inputData.value){
        $scope.errTip.errTipValue="Value值不能为空";
        resptype=false;
      }else{
        $scope.errTip.errTipValue="";
        var returnmsg="";
        // if(!$scope.flagObj[$scope.inputData.flag]){
        //   resptype=false;
        //   return resptype
        // };
        if($scope.flagObj[$scope.inputData.flag].type=="double"&&$scope.flagObj[$scope.inputData.flag]){
          var returnmsg=validator.isDouble($scope.inputData.value);
        }else if($scope.flagObj[$scope.inputData.flag].type=="int32"&&$scope.flagObj[$scope.inputData.flag]){
          var returnmsg=validator.isInt32(parseInt($scope.inputData.value));
        }else if($scope.flagObj[$scope.inputData.flag].type=="int64"&&$scope.flagObj[$scope.inputData.flag]){
          var returnmsg=validator.isInt64(parseInt($scope.inputData.value));
        }else if($scope.flagObj[$scope.inputData.flag].type=="bool"&&$scope.flagObj[$scope.inputData.flag]){
          var returnmsg=validator.isBool($scope.inputData.value);
        }
        if(returnmsg&&!returnmsg.pass){
          $scope.errTip.errTipValue=returnmsg.errMsg;
          resptype=false;
        }
      }
    }else if(type=="fileDir"){
      if(!$scope.inputData.targetAddress){
        $scope.errTip.errTipTarAdd="目标地址不能为空";
        resptype=false;
      }else{
        $scope.errTip.errTipTarAdd="";
      }
    }else if(type=="getMsFlag"){
      if(!$scope.inputData.flag){
        $scope.errTip.errTipFlag="Flag值不能为空";
        resptype=false;
      }else{
        $scope.errTip.errTipFlag="";
      }
    }else if(type=="add_cs_schbs"){
      if(!$scope.inputData.inputLocation){
        $scope.errTip.errTipFlag="location不能全部为空:";
        resptype=false;
      }
      // else{
      //   if(lacationArr.length>5){
      //     $scope.errTip.errTipFlag="非法输入，批量增加BS数量最多不超过5个，请重新输入";
      //     resptype=false;
      //   };
      // }
    }
    return resptype;
  };
  var batch_get_csAll_safeData=[];
  var batchCount=1;
  function reqBatchClick(str){
    if(!str){
      initLoading();
    }
    
    batchCount=1
    batch_get_csAll_safeData=[];
    for(var i in chartData.arrList){
      var urlStr=chartData.url+"&cs="+chartData.arrList[i].machine.name;
      switch(chartData.key){
        case "batch_get_csAll_safe": urlStr=chartData.url+"&cs="+chartData.arrList[i].machine.name;
        break;
        case "batch_get_csAll_flag": urlStr=chartData.url+"&cs="+chartData.arrList[i].machine.name+"&flag="+$scope.inputData.flag;
        break;
        case "batch_set_All_flag": urlStr=chartData.url+"&cs="+chartData.arrList[i].machine.name+"&flag="+$scope.inputData.flag;
        break;
        case "batch_reboot": urlStr=chartData.url+"&changesafe_id="+$scope.inputData.changesafeId+"&cs="+chartData.arrList[i].machine.name;
        break;
      }
      sendOutHttpApi(urlStr,chartData.key);
    }
  };

  // 批量 循环请求 设置CS flag值
  function batchSetCsFlag(){
    initLoading();
    batchCount=1
    batch_set_csAll_safeData=[];
    for(var i in chartData.arrList){
      sendOutHttpApi(chartData.url+"&flag="+$scope.inputData.flag+"&value="+
        $scope.inputData.value+"&changesafe_id="+$scope.inputData.changesafeId+
        "&cs="+chartData.arrList[i].machine.name,"setMsFlag")
    }
  };
  // 批量 全部设置成功关闭
  function closeBatchSetFlag(){
    if(batchCount==chartData.arrList.length){
      closeShowOper("success")
    }
  }
  // 点击确定查询相关数据
  $scope.dirTip="";
  $scope.clickTrue=function(keys){
    if(!checkInputNull(keys)){
      return
    }
    // ||chartData.key=="batch_get_csAll_flag"||chartData.key=="batch_set_All_flag"||chartData.key=="batch_reboot"
    if(chartData.key=="batch_get_csAll_flag"){
      reqBatchClick();
      return
    }else if(chartData.key=="add_cs_schbs"||keys=="del_cs_schbs"){
      tipSecFunc();
      return
    }
    // else if(chartData.key=="batch_set_All_flag"){
    //   setMsFlagFunc();
    //   return
    // }
    if(chartData.key=="dir_setreplica"||chartData.key=="batchPUTreplica"){
      if(parseInt($scope.data.min)>parseInt($scope.data.max)){
        $scope.dirTip="min不能大于max";
        return;
      }else{
        $scope.dirTip="";
      };
    }else if(keys=="setMsFlag"){
      setMsFlagFunc();
      return
    }else if(keys=="setCsStatus"&&$scope.setStatus=="ERROR"){
      // openDiskError()//当disk状态为error时,需要进行2次确认
      var showData={};
      showData.arr=[];
      showData.arr.push({"name":"我已知晓此操作的风险，已进行安全性确认，愿意继续执行并为后果负责。"});
      showSecOper(showData);
      return
    };
    initLoading();
    var urlStr=chartData.url;
    var key=keys?keys:chartData.key;
    var reqKey=""
    switch(key){
      case "batchPUTreplica":urlStr=chartData.url+"&min="+$scope.data.min+"&max="+$scope.data.max;
      break;
      case "dir_setreplica":urlStr=chartData.url+"&min="+$scope.data.min+"&max="+$scope.data.max;//+"&changesafe_id="+$scope.inputData.changesafeId
      break;
      case "setCsStatus":urlStr=chartData.url+"&status="+$scope.setStatus+"&changesafe_id="+$scope.inputData.changesafeId;
      break;  
      case "operDir":urlStr=chartData.url+"&dst="+$scope.inputData.targetAddress;
      break;
      case "getMsFlag":urlStr=chartData.url+"&flag="+$scope.inputData.flag,
        reqKey="get_ms_flag";
      break;
      case "get_sv_flag":urlStr=chartData.url;
      break;
      default:sendOutHttpApi(chartData.url,chartData.key);
    };
    reqKey=reqKey?reqKey:chartData.key
    sendOutHttpApi(urlStr,reqKey);
  };
  
  function setMsFlagFunc(data){
    var data={};
    data.title=$scope.data.name;
    data.key=chartData.key;
    data.ip=chartData.ip;
    data.flag=$scope.inputData.flag;
    data.value=$scope.inputData.value;
    data.getUrl=chartData.getUrl+"&flag="+$scope.inputData.flag;
    data.arrList=chartData.arrList;
    if(chartData.key=="set_sv_flag"){
      data.tip="是否确认设置supervisor的Falg值"
    }else if(chartData.key=="set_crb_flag"){
      data.tip="是否确认设置回收站参数";
      // data.flag=$scope.inputData.flag=="回收站保存期限"?"pangu_master_DelayTimeForFileGC":"pangu_chunkserver_DeleteTempChunkSubDirFileIntervalTime";
    }
    showSecOper(data);
  }
  // get_ms_flag,get_msAll_flag
  function get_ms_flag(){
    $scope.get_ms_flagData = {
      "theadData":theade.getFlagTh,
      "tbodyData":[],
      "showSearch":false,
      "showPage":false,
    };
  };
  function dealGetApiData(data){
    var dealData=data
    if($scope.mapsParam.portal){
      dealData=apis.allJsonData.list_master.get_flag;
    };
    
    var getFlagTd=[];
    for(var i in dealData){
      var obj={};
      obj.Status=dealTablebodyObj(dealData[i].Status);
      obj.Value=dealTablebodyObj(dealData[i].Value);
      obj.Server=dealTablebodyObj(dealData[i].Server);
      getFlagTd.push(obj);
    };
    batch_get_csAll_safeData=batch_get_csAll_safeData.concat(getFlagTd);
    if(chartData.key=="get_csAll_flag"||chartData.key=="batch_get_csAll_flag"){
      $scope.get_ms_flagData = {
        "theadData":theade.getFlagTh,
        "tbodyData":batch_get_csAll_safeData,
        "showSearch":true,
        "showPage":true,
      };
    }else{
      $scope.get_ms_flagData = {
      "theadData":theade.getFlagTh,
      "tbodyData":getFlagTd,
      "showSearch":false,
      "showPage":false,
    };
    }
  };

  //点击  全部buildinfo 上方的tip 展示机器的详细表格
  $scope.clickBuildinfoTip=function(str){
    var list=$scope.buildInfolsServerStr.split("|");
    var data={};
    data.key="buildinfo_hostTable";
    data.tableList=list;
    showSecOper(data)
  }
  $scope.setmvdirApi=function(){
    if(!checkInputNull("fileDir")){
      return
    }
    var data={};
    data.arr=[];
    if($scope.data.Size&&$scope.data.key=="dir_copy"){
      data.arr.push({"name":"当前目录(文件)size为:"+$scope.data.Size+",大目录(文件)复制可能会超时，复制不完整."});
    }
    data.arr.push({"name":"源地址:"+$scope.data.sourceAddress});
    data.arr.push({"name":"目标地址:"+$scope.inputData.targetAddress});
    if(!panguRegular($scope.inputData.targetAddress)){
      return 
    };
    data.title=$scope.data.name;
    showSecOper(data);
  };
  function secondCrb(){
    var data={};
    data.key=chartData.key;
    data.tip=chartData.tip;
    showSecOper(data);  
  }
  //当disk状态为error时,需要进行2次确认
  function openDiskError(){
    showSecOper()
  };
  function tipSecFunc(){
    var data={};
    data.key=chartData.key;
    data.name=$scope.data.name;
    data.url=chartData.url;
    data.tip=chartData.tip;
    switch(data.key){
      case "add_cs_schbs":data.tip="是否确定要把'"+$scope.inputData.inputLocation+"'添加到黑名单里面吗";
      break;
    }
    showSecOper(data);
  }
  // 2次弹框确认
  function showSecOper(data){ 
    var size="modal-maxlg";
    if(data.size){
      size=data.size;
    };
    var modalInstance = $uibModal.open({
       templateUrl: '/static/js/module/directive/panguOperate/secUibModal/operation.html',
       controller: 'secOperCtrl',
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
        case "add_cs_schbs":initLoading(),sendOutHttpApi(chartData.url+"&cs_addr="+$scope.inputData.inputLocation,chartData.key)
        break;
        case "switch_ms":
        case "reboot":
        case "start_bal":
        case "dir_delete":
        case "file_delete":
        case "crb":initLoading(),sendOutHttpApi(chartData.url,chartData.key);
        break;
        case "set_configuration_flag":initLoading(),sendOutHttpApi(chartData.url,chartData.key);
        break;
        case "file_copy":
        case "file_mv":
        case "dir_ln":
        case "dir_copy":
        case "dir_mv":initLoading(),sendOutHttpApi(chartData.url+"&dst="+$scope.inputData.targetAddress+"&changesafe_id="+$scope.inputData.changesafeId,chartData.key);
        break;
        case "set_crb_flag":initLoading(),setCrbFlag();
        break;
        case "set_quota":
        case "setquotaroot":initLoading(),setFileQuota();
        break;
        case "set_ms_flag":
        case "set_sv_flag":
        case "set_msAll_flag":
        case "set_csAll_flag":
        case "set_cs_flag":initLoading(),sendOutHttpApi(chartData.url+"&flag="
          +$scope.inputData.flag+"&value="+$scope.inputData.value+"&changesafe_id="
          +$scope.inputData.changesafeId,"setMsFlag")
        break;
        case "batch_set_All_flag":initLoading(),batchSetCsFlag();
        break;
        
        case "set_diskdown_status":
        case "set_disk_status":initLoading(),sendOutHttpApi(chartData.url+"&status="+
          $scope.setStatus+"&changesafe_id="+$scope.inputData.changesafeId,chartData.key)
        break;
        // default:operDir();
        default:$scope.clickTrue("operDir");
      }

    }, function (data) {
      if(data=="show_type"){
        $uibModalInstance.close("success")
      }
    });
  };

  // 关闭
  function closeShowOper(str){
    $uibModalInstance.close(str);
  };
	$scope.okDesc=function(id){
    $uibModalInstance.close();
	};
	$scope.cancelDesc=function(id){
    if(chartData.key=="set_configuration_flag"||chartData.key=="get_configuration_flag"){
      $uibModalInstance.close("success");
    }else{
      $uibModalInstance.dismiss('cancel');
    }
  	
 	};

})
