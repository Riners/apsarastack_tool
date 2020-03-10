//diag编辑页controller 
myApp.controller('alarmButtonCtrl',function($scope,$http, $uibModalInstance,chartData){

  	
	$scope.inputData={
    "contactgroup":"",
    "level":""
  }
  if(chartData)	{
    $scope.inputData.contactgroup=chartData.contactgroup;
    $scope.inputData.level=chartData.level;
  }
	$scope.okDesc=function(id){
		
	  $uibModalInstance.close($scope.inputData);
	}
  $scope.cancelDesc=function(id){
    $uibModalInstance.dismiss('cancel');
 	}

})
