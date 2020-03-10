//diag编辑页controller 
myApp.controller('showConfirmCtrl',function($scope,$http, $uibModal,$uibModalInstance,resData){

  $scope.mapsParam=get_pangu_urlParameter(window.location.href);
  if(resData) {
  	$scope.data=resData;
	};
  
  // 初次加载时需要做处理的相关key
  function initOper(){
    var url=resData.url;
    switch(resData.key){
      // case "getBlockMasterBalbm":getflagList("blockmaster");
      // break;
      
    }
  };
  
  // 根据具体的值 查看是否需要初始化
  initOper();
  
  
  

  //相关处理方法 body体end
  

  // 与html交互相关事件
  //heml 点击查询事件
  $scope.clickTrue=function(){
    var urlStr="";
    keys=$scope.data.key;
    switch(keys){
      case "set_bmAll_flag":
      case "set_bsAll_flag":
      case "set_gcAll_flag":
      case "getBlockMasterBalbm":closeShowOper(resData)
      break;
      default :closeShowOper(resData);
      
    };
  };
 

  // 关闭
  function closeShowOper(data){
    $uibModalInstance.close(data);
  };
	$scope.okDesc=function(id){
    $uibModalInstance.close();
	};
	$scope.cancelDesc=function(id){
  	$uibModalInstance.dismiss('cancel');
 	};

})
