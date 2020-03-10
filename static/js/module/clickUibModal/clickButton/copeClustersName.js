//diag编辑页controller 
  myApp.controller('copeClustersNameCtrl',function($scope,$http,$uibModalInstance,chartData,ngClipboard){

      var clustersName=chartData.name?chartData.name:"";
      
      $scope.title="点击复制";
      $scope.copeClustersName=clustersName;
      $scope.copeFunc=function(){
        var str=$scope.copeClustersName;
        ngClipboard.toClipboard(str);
        alert("已复制");
      }
      $scope.okDesc=function(id){
        $uibModalInstance.close();
      }

      $scope.cancelDesc=function(id){
        $uibModalInstance.dismiss('cancel');
      }

  })
