myApp.directive('screenVolume', function($http,panguClusterService) {
	return {
		restrict: 'AE',
		scope: {
		  screenVolumeData:'=',
		  selectDir:'&selectDir',
		},
		replace: true,
		templateUrl:"/static/js/module/directive/panguOperate/screenVolume/screenVolume.html",
		link:function(scope, element, parent) {
	        // 获取根目录下拉框数据
		    function getDirSelectList(name){
		      	var url="";
		      	url='/api/v1/'+scope.screenVolumeData.cluster+'/pangu_dir?cmd=lsvol';
		      	var data={};
      			data.url=url;
      			panguClusterService.getUrlRequest(data).then(function (data) {
		        var dealData=data;
		        if(scope.screenVolumeData.portal){
		          dealData=["test1","test2","test3","test4"];
		          // alert("没有staragent权限")
		        };
		        if(data.err){
		        	// dealData=["没有staragent权限"];
		        	// alert("没有staragent权限")
		        	alert(data.err)
		        }
		        dealDirSelectList(dealData);
		      }).catch(function(data,status){
		        console.log(data);
		      })
		    };
		    getDirSelectList();
		    // 处理获得的根目录下拉框数据
		    function dealDirSelectList(data){
		     scope.getDirSelectListData=data;
		      // if(scope.screenVolumeData.volume){
		        scope.selectindex=scope.screenVolumeData.volume;
		      // }else{
		        // scope.selectindex="PanguDefaultVolume";
		      // }
		    }

        }
	}
})

