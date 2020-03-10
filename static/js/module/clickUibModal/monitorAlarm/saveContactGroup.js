//diag编辑页controller 
myApp.controller('alarmButtonCtrl',function($scope,$http, $uibModalInstance,chartData){

  	// $scope.data=chartData;
  	$scope.fromInputData={
	  "contact_group":"",
	  "contact_desc":"",
	  "contact_name":"",
	  "contact_name_list":[],
	};
	var returnType="";
	if(chartData&&chartData.action=="编辑"){
		$scope.fromInputData.contact_group=chartData.rowData.contact_name.name;
		$scope.fromInputData.contact_desc=chartData.rowData.desc.name;
		$scope.fromInputData.contact_name_list=chartData.rowData.user_list.name.split(",");
		$scope.fromInputData.oldObj=chartData;
		returnType=chartData.action;
	}else if(chartData&&chartData.type=="新增"){
		returnType=chartData.type;
	}
  $scope.spliceNameList=function(name,index){
    $scope.fromInputData.contact_name_list.splice(index,1);
  };
	$scope.okDesc=function(id){
		var obj=$scope.fromInputData;
		obj.type=returnType;
	   $uibModalInstance.close(obj);
	};
	$scope.cancelDesc=function(id){
  	$uibModalInstance.dismiss('cancel');
	};

})
