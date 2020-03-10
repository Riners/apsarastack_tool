//diag编辑页controller 
  myApp.controller('alarmButtonCtrl',function($scope,$http, $uibModalInstance,chartData){

      
  	$scope.radioData=[
	    {
	      "name":"自定义时间",
	      "value":"0"
	    },{
	      "name":"2小时",
	      "value":"2"
	    },{
	      "name":"6小时",
	      "value":"6"
	    },{
	      "name":"12小时",
	      "value":"12"
	    },{
	      "name":"24小时",
	      "value":"24"
	    },{
	      "name":"7天",
	      "value":"7*24"
        },{
	      "name":"15天",
	      "value":"15*24"
        },{
	      "name":"30天",
	      "value":"30*24"
	    }

  	]
 	$scope.selectRadio=0;
    $scope.noAlertBeforeTime="";
    $scope.showInput=false;
    $scope.changeRadio=function(num){
    	if(num!=0){
    		$scope.showInput=true;
    	}else{
    		$scope.showInput=false;
    	}
    }
    $scope.okDesc=function(id){
      	var test=$scope.selectRadio;
      	var inputTime="";
      	// if($scope.noAlertBeforeTime){
      	// 	inputTime=$scope.noAlertBeforeTime;
      	// }else{
      	// 	inputTime=dealInputTime($scope.selectRadio)
      	// }
      	if($scope.selectRadio!=0){
      		inputTime=dealInputTime($scope.selectRadio)
      	}else{
      		inputTime=$scope.noAlertBeforeTime;
      	};
        $uibModalInstance.close(inputTime);
    }

    $scope.cancelDesc=function(id){
        $uibModalInstance.dismiss('cancel');
    }

    function dealInputTime(num){
    	var getData=new Date();
    	var currentTime=new Date(getData.getTime()+num*60*60*1000); 
    	return currentTime;
    }
  })
