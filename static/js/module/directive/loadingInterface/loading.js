myApp.controller('loadingInterfaceCtrl',function($scope,$http, $uibModalInstance,initData,apis){

	//验证表单是否为空，若为空则将焦点聚焦在input表单上，否则表单通过，登录成功
	$scope.user="";
	$scope.pwd="";
	$scope.errTip="";


	var storage = window.localStorage;
	if(storage["isstorename"]&&storage["isstorename"]=="yes"){
		$scope.user=storage["loginUser"];
		$scope.pwd=storage["loginPwd"];
	}
	$scope.clickLoad=function(){
		if($scope.user=="admin"&&$scope.pwd=="admin"){
			storage["loginUser"]="admin";
			storage["loginPwd"]="admin";
			storage["isstorename"]="yes";
			$scope.errTip="";
			$uibModalInstance.close("loadSuccess");
		}else{
			storage["loginUser"]="";
			storage["loginPwd"]="";
			storage["isstorename"]="no";
			$scope.errTip="用户名或密码错误";
		}
	}

	$scope.cancel=function(){
		$uibModalInstance.dismiss('cancel');
	}



})
