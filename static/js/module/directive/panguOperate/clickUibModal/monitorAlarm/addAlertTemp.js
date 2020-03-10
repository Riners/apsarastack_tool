//diag编辑页controller 
myApp.controller('addAlertTempCtrl',function($scope,$http, $uibModalInstance,chartData){

  	
	$scope.inputData={
    "tempName":""
  }
  if(chartData)	{
    $scope.inputData.tempName=chartData.tempName;
    // $scope.inputData.name=chartData.name;
  }
	$scope.okDesc=function(id){
		
	  $uibModalInstance.close($scope.inputData);
	}
  $scope.cancelDesc=function(id){
    $uibModalInstance.dismiss('cancel');
 	}

})
