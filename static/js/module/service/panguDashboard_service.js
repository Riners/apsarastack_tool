'use strict';
myApp.factory('panguDashboardService', function($http,$q) {
	// return {
	// 	// 获取Global版本
	// 	getGlobalPanguVer: function () {
	// 		var url='/api/v1/global_pangu_ver';
	// 	    $http({
	// 	        method: 'GET',
	// 	        url:url,
	// 	    }).then(function(data){
	// 	    	return data.data
	// 	    }).catch(function(data){
	// 	        console.log("getGlobalPanguVer error",data);
	// 	    })
	//     },
	// }
	var service = {};
	service.getGlobalPanguVer=function () {
		var d = $q.defer();
		var url='/api/v1/global_pangu_ver';
		var respData="";
	    $http({
	        method: 'GET',
	        url:url,
	    }).then(function(data){
	    	d.resolve(data.data);  //使用resolve方法，变成完成状态
	    },function error(data){
	    	d.reject(data.data);   //使用reject方法，变成拒绝状态
	    })
	    return d.promise;   //defer.promise用于返回一个promise对象
    };

    //获取group热力图数据 group_dashboard
    service.getGroupHealth=function(group,type) {
      var d = $q.defer();
      var url='/api/v1/group_health?group='+group
      $http({
          method: 'GET',
          url:url
      }).then(function(data){
        //group 健康热力图
        if(type&&type=="dashboard"){
        	var clusterChart=disTreeMapData3(data.data);
        }else{
        	var clusterChart=dealTreeMapGroup(data.data,group);
        }
        d.resolve(clusterChart); 
      }).catch(function(data){
          console.log("error getGroupHealth");
      });
      return d.promise; 
    };
    function dealTreeMapGroup(data,group){
      var clusterChart=[];
      var regionChart={}; 
      var count=1;
      for(var i in data){
        var color_cluster_p="";
        var cluster_p={};
        if(data[i].score==0){
          color_cluster_p="#090"
        }else if(data[i].score<100){
          color_cluster_p="#F90"
        }else if(data[i].score<10000){
          color_cluster_p="#F4F"
        }else{
          color_cluster_p="#F00"
        }
        cluster_p = {
            id: "id"+count,
            name: i,
            value: 1,
            color: color_cluster_p,
            events:{
              click:function(e){  //点击事件  
                window.open("/health?type=cluster&cluster="+e.point.name+"&group="+group);
              }
            }
          }
          clusterChart.push(cluster_p);
          count++
        };
      return clusterChart
    }
    function disTreeMapData3(data){
		var clusterChart=[];
		var regionChart={}; 
		for(var i in data){
		    //计算集群健康度图表数据
		    var region_p={};
		    region_p = {
		       id: i,
		       name: i,
		       color: "#FFFFFF"
		    };
		    clusterChart.push(region_p);
	        for(var key in data[i]) {
	          var color_cluster_p="";
	          var cluster_p={};
	          if(data[i][key].score==0){
	            color_cluster_p="#090"
	          }else if(data[i][key].score<100)
	          {
	            color_cluster_p="#F90"
	          }else if(data[i][key].score<10000){
	            color_cluster_p="#F4F"
	          }else{
	            color_cluster_p="#F00"
	          }
	          cluster_p = {
	              id: i+key,
	              name: key,
	              parent: i,
	              value: 1,
	              color: color_cluster_p,
	              events:{
	                click:function(e){  //点击事件  
	                  window.open("/health?type=cluster&cluster="+e.point.name+"&group="+e.point.parent);
	                }
	              }
	            }
	          clusterChart.push(cluster_p);
	        };
		}
	    return clusterChart
	}
    return service
});