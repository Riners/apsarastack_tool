//diag编辑页controller 
myApp.controller('showCsOperationCtrl',function($scope,$http, $uibModalInstance,chartData){


	$scope.data={}
  	if(chartData) {
    	$scope.data=chartData;
  	};
  	$scope.inputData={};
  	$scope.inputData.getFlag="";
  	$scope.inputData.flagValue="";
  	$scope.inputData.status="";
  	$scope.inputData.diskid="";
  	//获取disk状态列表
  	// $scope.getDiskStatusData
    if(chartData.diskStatus){
      $scope.getDiskStatusData=[];
      var statusArr=["OK","SHUTDOWN","ERROR"];
      for(var i in statusArr){
        if(statusArr[i]!=chartData.diskStatus){
          $scope.getDiskStatusData.push(statusArr[i])
        }
      };
      $scope.disksStatus=$scope.getDiskStatusData[0];
    }
    if(chartData.csStatus){
      $scope.getCSStatusData=[];
      var statusArr=["NORMAL","READONLY","SHUTDOWN"];
      for(var i in statusArr){
        if(statusArr[i]!=chartData.csStatus){
          $scope.getCSStatusData.push(statusArr[i])
        }
      };
      $scope.disksStatus=$scope.getCSStatusData[0];
    }
  	// $scope.getDiskStatusData=["OK","READONLY","ERROR"];
   //  $scope.getCSStatusData=["NORMAL","READONLY","SHUTDOWN"];
  	
	// 获取 cs flag数据
	$scope.getFlag= function(){
		// /api/v1/AT-Pangu-MultiVolume/cs?cmd=get_flag&cs=100.81.240.140
		// &flag=pangu_LogRotateFileLimitInBackup
		getListCsInfo(chartData.cmd,chartData.ip)
	}
	if(chartData.cmd=="safe"){//查看是否disk可以移除
		getListCsInfo()
	}
  	//接口 
  	function getListCsInfo(){
  		var cmd=chartData.cmd;
      var key=chartData.key;
  		var ip=chartData.ip;
	    var flag=$scope.inputData.getFlag;
	    var flagValue=$scope.inputData.flagValue;
	    var status=$scope.inputData.status;
	    var diskid=chartData.diskid;
	    var urlStr='/api/v1/'+chartData.cluster+'/cs?cmd='+cmd;

	    if(key=="get_all_flag"){
	    	urlStr+='&flag='+flag;
	    }else if(key=="set_all_flag"){
        urlStr+='&flag='+flag+'&value='+flagValue;
      }else if(cmd=="get_flag"){
        urlStr+='&cs='+ip+'&flag='+flag;
      }else if(cmd=="set_flag"){
	    	urlStr+='&cs='+ip+'&flag='+flag+'&value='+flagValue;
	    }else if(chartData.name=="设置状态"){
	    	urlStr+='&cs='+ip+'&status='+$scope.disksStatus;
	    }else if(cmd=="reboot"){
	    	urlStr+='&cs='+ip;
	    }else if(chartData.name=="设置磁盘状态"){
	    	urlStr='/api/v1/'+chartData.cluster+'/disk?cmd='+cmd+'&cs='+ip+'&diskid='+diskid+'&status='+$scope.disksStatus;
	    }else if(key=="get_cs_safe"){//检查某台SHUTDOWN的CS是否可以安全地移除
	    	urlStr='/api/v1/'+chartData.cluster+'/cs?cmd='+cmd+'&cs='+ip;
	    }else if(key=="get_disk_safe"){//
        urlStr='/api/v1/'+chartData.cluster+'/disk?cmd='+cmd+'&cs='+ip+'&disk='+diskid;
      }else if(key=="get_allcs_safe"){//
        urlStr='/api/v1/'+chartData.cluster+'/cs?cmd='+cmd;
      }else if(key=="get_alldisk_safe"){//
        urlStr='/api/v1/'+chartData.cluster+'/disk?cmd='+cmd;
      };
	    urlStr+='&volume='+chartData.volume;
	    $http({
	      method: 'GET',
	      url:urlStr
	    }).then(function(data,status){
        if(data.data.err){
          $uibModalInstance.close(data.data.err);
        }else if(cmd=="get_flag"||chartData.cmd=="safe"){
          
        }else{
          $uibModalInstance.close("success");
        };
	      dealgetListCsInfo(data.data);
	      console.log(" success");
	    }).catch(function(data,status){
        $uibModalInstance.close(data);
	      console.log(" error");
	    })
  	}; 
  	$scope.getDlagData=[];
  	function dealgetListCsInfo(data){
      $scope.getDlagData=data;
  		if(chartData.cmd=="get_flag"){
  			$scope.getDlagData=data;
  		}else if(chartData.cmd=="safe"){
        for(var i in data){
          if(data[i].status!="SAFE"){
            $scope.safeStr="不可以安全移除";
            break;
          }
          $scope.safeStr="可以安全移除";
        }
  			
  		}
  	};
  	// 点击确定 根据不同的类型调用不同的接口
  	function dealOkDesc(){
  		if(chartData.cmd=="set_flag"||chartData.cmd=="set_status"||
        chartData.cmd=="reboot"||chartData.name=="设置磁盘状态"){
        getListCsInfo();
  		};
      
  	}
  	$scope.okDesc=function(id){
	    if(chartData.cmd=="get_flag"||chartData.cmd=="safe"){
        $uibModalInstance.close();
      }
      dealOkDesc();
  	}
  	$scope.cancelDesc=function(id){
    	$uibModalInstance.dismiss('cancel');
 	}

})
