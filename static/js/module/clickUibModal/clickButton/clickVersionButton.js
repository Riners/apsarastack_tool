//diag编辑页controller 
  myApp.controller('versionButtonCtrl',function($scope,$http, $uibModalInstance,chartData){

      $scope.data=chartData;
      if(isObject(chartData.user_def_tag)){
        $scope.user_def_tag=JSON.stringify(chartData.user_def_tag,null,4);
      }else if(isString(chartData.user_def_tag)){
        $scope.user_def_tag=chartData.user_def_tag;
      };
      var cluster_name="";
      if(chartData.cluster_name){
        cluster_name=chartData.cluster_name;
      }else{
        cluster_name=chartData.rowData.cluster_name.name
      };
      $scope.title="修改集群("+cluster_name+")Tag";
      
      $scope.okDesc=function(id){
        return $http({
            method: 'GET',
            url:'/api/v1/cluster_tag_post?cluster='+cluster_name+'&tag='+encodeURIComponent($scope.user_def_tag)
        }).then(function(data,status){
          // $uibModalInstance.dismiss('cancel');
          $uibModalInstance.close(data);
          if(data.data.err){
            alert("修改失败:",data.data.err);
          }else{
            alert("修改成功");
          }
          
          console.log("success");
        }).catch(function(data,status){
          alert("错误:",data.data);

          console.log(" error");
        })
      }

      $scope.cancelDesc=function(id){
        $uibModalInstance.dismiss('cancel');
      }

  })
