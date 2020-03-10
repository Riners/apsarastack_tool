myApp.directive('headCrumb', function(apis,panguService,$uibModal){
	return {
	    restrict: 'EC',
	    scope: {
	        headCrumbData:"=",
	    },
	    templateUrl:'/static/js/module/directive/chartLineConfig/volume/volume.html',
	    link: function (scope,element, attr) {
	      	
	      	// 监控 lineconfigData 的变化刷新指令数据
	      	scope.$watchGroup(['tableData'], function (newValue, oldValue){
			  if (newValue) {
			  	// getChartlineConfig();
			  }
	      	},true);

	      	//面包屑
		    // 获取根目录下拉框数据
		    function getDirSelectList(name){
		      var urlStr="";
		      urlStr='/api/v1/'+$scope.mapsParam.cluster+'/pangu_dir?cmd=lsvol';
		      $http({
		        method: 'GET',
		        url:urlStr
		      }).then(function(data,status){
		        var dealData=data.data;
		        if($scope.mapsParam.portal){
		          dealData=["test1","test2","test3","test4"];
		        };
		        dealDirSelectList(dealData);//删除成功，重新获取模板数据
		        // getPanguDir();//下拉框加载成功后加载list数据
		        console.log("getDirSelectList success");
		      }).catch(function(data,status){
		        console.log("getDirSelectList error");
		      })
		    };
		    getDirSelectList();
		    // 处理获得的根目录下拉框数据
		    function dealDirSelectList(data){
		      $scope.getDirSelectListData=data;
		      $scope.selectindex=$scope.getDirSelectListData[0];
		    }
		    // 选择不同的下拉框，重新获取选定的list
		    $scope.crumbsArr=[];
		    crumbsArr=[];
		    $scope.selectDir=function(str){
		      $scope.crumbsArr=[];
		      crumbsArr=[];
		      // getPanguDir(str)
		    };
		    // 点击面包屑查询当前列表
		    $scope.showCrumbsList=function(str,num){
		      $scope.crumbsArr=crumbsArr.slice(0,num+1);
		      crumbsArr=crumbsArr.slice(0,num+1);
		      getMasterList();
		    }
		    //面包屑 end
		    
		    
		   
		    
		    

		    


	      }
	    }
  	})
