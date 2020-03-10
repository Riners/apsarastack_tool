//diag编辑页controller 
myApp.controller('secOperCtrl',function($scope,$http, $uibModalInstance,resData,apis){

  if(resData) {
  	$scope.data=resData;
	};
  $scope.mapsParam=get_pangu_urlParameter(window.location.href);
  $scope.tip="";
  // 抽离所有请求相同部分代码，
  $scope.showLoading=false;
  function initLoading(w,h){
    $scope.loadingData={};
    var os = document.getElementById('operWinId2');
    var osw=os?os.offsetWidth+"px":"";
    var osh=os?(os.offsetHeight-7)+"px":""
    $scope.loadingData.width=w?w:osw;
    $scope.loadingData.height=h?h:osh;
    $scope.showLoading=true;
  };
  function sendOutHttpApi(urlStr,key){
    $http({
      method: 'GET',
      url:urlStr
    }).then(function(data,status){
      if(data.data.err){
        if(data.data.err.split(":")[0]=="Invalid token"){
          // 当返回的token不对时,刷新页面
          $uibModalInstance.close(data.data.err);
        }else{
          alert(data.data.err)
        } 
      }else if(data.data.show_type&&data.data.show_type=="link"){
        //当show_type存在时 2次弹框 展示该操作说明
        $scope.data={};
        $scope.data=data.data;
        $scope.data.key="show_type";
        $scope.showLoading=false;
        // var inheData={};
        // inheData=data.data;
        // inheData.key="show_type";
        // showSecOper(inheData)
        return;
      };
      if($scope.mapsParam.portal){
        // var timename=setTimeout(function(){
          $scope.showLoading=false;
          dealResponseHttpApi(data.data,key);
          // $scope.$digest();
        // },1000);//定时，测试使用
      }else{
        dealResponseHttpApi(data.data,key);
        $scope.showLoading=false;
        if(resData.arrList){
          if(getBatchFlagCount==resData.arrList.length){
            $scope.showLoading=false;
          }
        }else{
          $scope.showLoading=false;
        }
      }
      console.log("success");
    }).catch(function(data,status){
      if($scope.mapsParam.portal){
        // var timename=setTimeout(function(){
          $scope.showLoading=false;
          // $scope.$digest();
        // },1000);//定时，测试使用
      }else{
        $scope.showLoading=false;
      }
      $uibModalInstance.close(data);
      console.log(data);
    })
  };
  function dealResponseHttpApi(data,key){
    switch(key){
      case "get_flag":getNodeFlag(data);
      break;
      case "batch_set_All_flag":getBatchNodeFlag(data);
      break;
      case "file_info":
      case "get_chunk_meta":getChunkMeta(data);
      break;
      default :closeShowOper("success");
    }
  };
  //初始变量 config
  var theade={
    "chunkMetaTh":[
      {"name":"","key":"metaName","width":"200px"},
      {"name":"","key":"metaValue"}
    ]
  }
  // 处理chunkmeta 返回数据
  $scope.chunkMetaData=[];
  function getChunkMeta(data){
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
      "title":"chunk meta by cs"
    };
  } 
  var getBatchFlagCount=1;
  var getBatchFlagList=[];
  function getBatchFlag(){
    getBatchFlagCount=1;
    getBatchFlagList=[];
    for(var i in resData.arrList){
      sendOutHttpApi(resData.getUrl+"&cs="+resData.arrList[i].machine.name,resData.key)
    }
  }
  function showBuildinfoTable(){
    var chunkMetaTh=[{"name":"#","key":"id","width":"200px"},{"name":"host","key":"host"}];
    var tablist=resData.tableList
    var metaBody=[];
    for(var i in tablist){
      var obj={};
      obj.id=dealTablebodyObj(i);
      obj.host=dealTablebodyObj(tablist[i]);
      metaBody.push(obj);
    };
    $scope.table_buildinfo = {
      "theadData":chunkMetaTh,
      "tbodyData":metaBody,
      "showSearch":true,
      "showPage":true,
      // "title":"chunk meta by cs"
    };
  }
  //初次打开弹窗时，获取数据
  function initOper(){
    switch(resData.key){
      case "batch_set_All_flag":initLoading("598px","187px"),getBatchFlag();
      break;
      case "set_ms_flag":
      case "set_msAll_flag":
      case "set_csAll_flag":
      case "set_cs_flag":initLoading("598px","168px"),sendOutHttpApi(resData.getUrl,"get_flag");
      break;
      case "file_info":
      case "get_chunk_meta":initLoading("598px","150px"),
        sendOutHttpApi(resData.url,resData.key);
      break;
      case "buildinfo_hostTable":showBuildinfoTable();
      break;
      // default:initLoading(),sendOutHttpApi(resData.url,resData.key);
    }
  };
  initOper();
  // 批量获取flag值
  function getBatchNodeFlag(data){
    getBatchFlagList=getBatchFlagList.concat(data);
    if(getBatchFlagCount==resData.arrList.length){
      getNodeFlag(getBatchFlagList);
    }else{
      getBatchFlagCount++
    }
  }
  function getNodeFlag(data){
    var dealData=data
    if($scope.mapsParam.portal){
      dealData=apis.allJsonData.list_master.get_flag;
    };
    var valueArr=[];
    var valueObj={};
    for(var i in dealData){
      if(dealData[i].Status!="OK"){
        continue;
      }
      if(valueArr.indexOf(dealData[i].Value)==-1){
        valueArr.push(dealData[i].Value);
        valueObj[dealData[i].Value]=0;
      };
      valueObj[dealData[i].Value]++
    };
    var allStatus="";//单个节点和全部节点 状态提示信息区分
    for(var j in valueObj){
      var per=manageNum(valueObj[j]/dealData.length*100,3)+"%"
      allStatus+=j+"("+per+"),"
    };
    var tipStr1="修改";
    var type=""
    //判断是cs还是ms 进行字符串相加
    if(resData.key=="set_msAll_flag"||resData.key=="set_ms_flag"){
      type="Master";
    }else if(resData.key=="set_csAll_flag"||resData.key=="set_cs_flag"||resData.key=="batch_set_All_flag"){
      type="CS";
    };
    // var allNode="";//单个节点和全部节点提示信息区分
    var tipGetVal="";
    var tipStr2="--->";
    var tipStr3=",请确认!";

    if(resData.key=="set_msAll_flag"||resData.key=="set_csAll_flag"||resData.key=="batch_set_All_flag"){
      // allNode="所有节点的";
      tipStr1+="所有"+type+"的Flag("+resData.flag+"),从";
      tipGetVal=allStatus;
    }else if(resData.key=="set_ms_flag"||resData.key=="set_cs_flag"){
      tipStr1+=type+resData.ip+"的Flag("+resData.flag+"),从";
      tipGetVal=dealData[0].Value;
    };
    tipReqVal=resData.value;
    $scope.data.arr=[];
    $scope.data.arr.push({"name":tipStr1});
    $scope.data.arr.push({"name":tipGetVal,"color":"green"});
    $scope.data.arr.push({"name":tipStr2});
    $scope.data.arr.push({"name":tipReqVal,"color":"red"});
    $scope.data.arr.push({"name":tipStr3});

  }
  $scope.crbstr=""
  $scope.FileDeleteStr=""
  $scope.tipstr=""
  function crbFunc(){
    if(resData.key=="crb"){
      if($scope.crbstr=="清空回收站"){
        $scope.tipstr=""
        $uibModalInstance.close("success");
      }else{
        $scope.tipstr="输入不匹配";
      };
    }else if(resData.key=="dir_delete"){
      if($scope.FileDeleteStr=="DELETE"){
        $scope.tipstr=""
        $uibModalInstance.close("success");
      }else{
        $scope.tipstr="输入不匹配";
      };
    }else if(resData.key=="file_delete"){
      if($scope.FileDeleteStr=="DELETE"){
        $scope.tipstr=""
        $uibModalInstance.close("success");
      }else{
        $scope.tipstr="输入不匹配";
      };
    }
  	
  }

  $scope.okDesc=function(id){
  	
	  switch(resData.key){
      case "dir_delete":
      case "file_delete":
      case "crb":crbFunc();
      break;
      
      default:$uibModalInstance.close("success");
    }
    
  };
	$scope.cancelDesc=function(id){
    if($scope.data.key=="show_type"){
      $uibModalInstance.dismiss("show_type");
    }
  	$uibModalInstance.dismiss('cancel');
 	};

})
