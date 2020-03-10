'use strict';
myApp.factory('panguService', function($http) {
	return {
		// 
		getGroupEx: function (group_name,cluster_name) {
		  if(!group_name){
	      	group_name="";
	      };
		  // var delurl='/api/v1/group_ex?group='+group_name
		  var delurl='/api/v1/group_basic?group='+group_name
	      if(cluster_name){
	        delurl+="&clusters="+cluster_name
	      }
	      return $http({
	        method: 'GET',
	        url:delurl,
	        // data:JSON.stringify({project_id:project_id}),
	        // headers: {'Content-type': 'application/json','Accept': 'application/json'}
	      })
	    },
	    getClusterEx: function (group_name) {
		  if(!group_name){
	      	group_name="";
	      };
		  var delurl='/api/v1/list_cluster_ex?group='+group_name+'&portal=1';
	      return $http({
	        method: 'GET',
	        url:delurl,
	        // data:JSON.stringify({project_id:project_id}),
	        // headers: {'Content-type': 'application/json','Accept': 'application/json'}
	      })
	    },
	    getGroupBasic: function (group_name) {
		  if(!group_name){
	      	group_name="";
	      };
		  var delurl='/api/v1/group_basic?group='+group_name+'&portal=1';
	      return $http({
	        method: 'GET',
	        url:delurl,
	        })
	    },
	    getDashboardConfig: function (group_name) {
		  var delurl='/api/v1/get_dashboard_config?group='+group_name
	      return $http({
	        method: 'GET',
	        url:delurl,
	      })
	    },
	    getportalConfig: function () {
		  var delurl='/api/v1/get_portal_config?option=index'
	      return $http({
	        method: 'GET',
	        url:delurl,
	      })
	    },
	    getUrlPublic: function (url_param_plus,group_name,btime,etime,clusters,period) {
		  var delurl=url_param_plus+'btime='+btime+'&etime='+etime 
		  if(group_name){
		  	delurl+="&group="+group_name
		  }
		  if(clusters){
		  	delurl+="&clusters="+clusters
		  }
		  if(period){
		  	delurl+="&period="+period
		  }
	      return $http({
	        method: 'GET',
	        url:delurl,
	      })
	    },
	    // 双11历史图接口 (History)
	    getDashboardConfigHistory: function (group_name,period,type) {
	      if(!group_name){
	      	group_name="";
	      };
		  var delurl='/api/v1/get_dashboard_config_period?group='+group_name
		  if(period){
		  	delurl+="&period="+period
		  }
		  if(type){
		  	delurl+="&type="+type
		  }
	      return $http({
	        method: 'GET',
	        url:delurl,
	      })
	    },
	    getGroupExHistory: function (group_name,cluster_name,period) {
	      if(!group_name){
	      	group_name="";
	      };	
		  var delurl='/api/v1/group_ex_period?group='+group_name
	      if(cluster_name){
	        delurl+="&clusters="+cluster_name
	      }
		  if(period){
		  	delurl+="&period="+period
		  }
	      return $http({
	        method: 'GET',
	        url:delurl,
	      })
	    },
	    getClusterExHistory: function (cluster_name,period) {
		  var delurl='/api/v1/cluster_ex_period?cluster='+cluster_name
	      if(period){
		  	delurl+="&period="+period
		  };
	      return $http({
	        method: 'GET',
	        url:delurl,
	      })
	    },
	    // 获取双11大盘数据连接接口
	    getHistory1111: function (group_name,cluster_name) {
	      if(!group_name){
	      	group_name="";
	      };	
		  var delurl='/api/v1/get_dashboard_period?group='+group_name
	      if(cluster_name){
		  	delurl+="&cluster="+cluster_name
		  }
	      return $http({
	        method: 'GET',
	        url:delurl,
	      })
	    },
	    // sla数据接口 pangu_sla
	    getSla: function (btime,etime,group_name,cluster_name,host_name,tag,api) {
	    	// 获取pangu全局的sla
		  	var delurl='/api/v1/pangu_sla?btime='+btime+'&etime='+etime;
	      	if(group_name){
	      		// 获取应用线的sla
	      		delurl +='&group='+group_name
	     	};
	     	if(cluster_name){
	      		// 获取集群的sla
	      		delurl +='&cluster='+cluster_name
	     	};
	     	if(host_name){
	      		// 获取机器的sla
	      		delurl +='&host='+host_name
	     	};
	     	if(tag){
	      		delurl +='&tag='+tag
	     	};
	     	if(api){
	      		delurl +='&api='+api
	     	};
	      	return $http({
	        	method: 'GET',
	        	url:delurl,
	      	})
	    },
	    // sla数据接口 pangu_sla_latency_step 面积图接口
	    getSlaLatencyStep: function (btime,etime,group_name,cluster_name,host_name,tag,api) {
	    	// 获取pangu全局的sla
		  	var delurl='/api/v1/pangu_sla_latency_step?btime='+btime+'&etime='+etime;
	      	if(group_name){
	      		delurl +='&group='+group_name
	     	};
	     	if(cluster_name){
	      		delurl +='&cluster='+cluster_name
	     	};
	     	if(host_name){
	      		delurl +='&host='+host_name
	     	};
	     	if(tag){
	      		delurl +='&tag='+tag
	     	};
	     	if(api){
	      		delurl +='&api='+api
	     	};
	      	return $http({
	        	method: 'GET',
	        	url:delurl,
	      	})
	    },
	    // sla : 获取SLA可选参数
	    getSlaParamConfig: function (group_name) {
	    	if(!group_name){
	    		group_name="";
	    	}
		  	var delurl='/api/v1/get_sla_param_config?group='+group_name;
	      	return $http({
	        	method: 'GET',
	        	url:delurl,
	      	})
	    },
	    // sla : 获取 SlaGroupDig 参数
	    getSlaGroupDig: function (begin_time,end_time,group_name,cluster_name,counter,tops) {
	    	if(!group_name){
	    		group_name="";
	    	}
		  	var delurl='/api/v1/dig_sla_group?btime='+begin_time+'&etime='+end_time+"&order=asc";
		  	if(group_name){
	      		delurl +='&group='+group_name;
	     	};
		  	if(cluster_name){
	      		delurl +='&cluster='+cluster_name;
	     	};
	     	if(counter){
	      		delurl +='&counter='+counter;
	     	};
	     	if(tops){
	      		delurl +='&tops='+tops;
	     	};
	      	return $http({
	        	method: 'GET',
	        	url:delurl,
	      	})
	    },
	    // sla : 获取 SlaGroupDig 参数
	    getSlaClusterDig: function (begin_time,end_time,group_name,cluster_name,counter,tops) {
	    	if(!group_name){
	    		group_name="";
	    	}
		  	var delurl='/api/v1/dig_sla_cluster?btime='+begin_time+'&etime='+end_time+"&order=asc";
		  	if(group_name){
	      		delurl +='&group='+group_name;
	     	};
		  	if(cluster_name){
	      		delurl +='&cluster='+cluster_name;
	     	};
	     	if(counter){
	      		delurl +='&counter='+counter;
	     	};
	     	if(tops){
	      		delurl +='&tops='+tops;
	     	};
	      	return $http({
	        	method: 'GET',
	        	url:delurl,
	      	})
	    },
	    // 获取所有基线配置数据
	    getBaselineConfig: function () {
		  	var delurl='/api/v1/get_baseline_config';
	      	return $http({
	        	method: 'GET',
	        	url:delurl,
	      	})
	    },
	    postBaselineConfig: function (data) {
	    	var postUrl=data.page.split("#");;
      		var postUrl1=postUrl[0].split("?");
      		var postStr="";
      		if(postUrl1[1]){
      			postStr=postUrl1[1]+"&html="+data.html;
      		}else{
      			postStr="html="+data.html;
      		}
      		 var delurl='/api/v1/get_baseline_config?'+postStr;
			// var delurl='/api/v1/get_baseline_config?html='+data.html+"&page="+postUrl1[1];
		    return $http({
		        method: 'GET',
		        url:delurl,
		        // data:JSON.stringify(data),
		    })
	    },
	    // 指令里调用的 获取chart图的接口
	    getLineConfig: function (data) {
	      var group=data.group?data.group:"";
	      var type=data.type?data.type:"";
	      // get_dashboard_config
		  var delurl='/api/v1/get_opr_config?group='+group;
		  if(type){
		  	delurl+="&type="+type;
		  };
	      return $http({
	        method: 'GET',
	        url:delurl,
	      })
	    },
	    // 获取单个chart图接口
	    // url_param_plus,group,btime,etime,clusters,period
	    getUrlFunc: function (data) {
	      //拼接url
	      if(!data.param_plus){
	      	return
	      }
		  var delurl=data.param_plus;
		  for(var i in data){
		  	if(i=="param_plus"){
		  		continue
		  	}
		  	delurl+="&"+i+"="+data[i];
		  };
	      return $http({
	        method: 'GET',
	        url:delurl,
	      })
	    },
	    // 获取shennong单个chart图接口
	    // get_shennong_metric_by_cluster?cmd=avg&matrix=disk_util
	    // &btime=2018-02-12%2015:07:06&etime=2018-02-12%2015:37:06
	    // &group=OSS&clusters=ALIPAY-OSS-BACKUP-SZ-A
	    // cmd,matrix btime etime group clusters
	    getShennongApi: function (data) {
	      //拼接url
	      if(!data.param_plus){
	      	return
	      };
		  var delurl=data.param_plus;
		  var count=0
		  for(var i in data){
		  	if(i=="param_plus"){
		  		continue
		  	}
		  	if(data[i]){
		  		delurl+="&"+i+"="+data[i];
		  	}
		  };
	      return $http({
	        method: 'GET',
	        url:delurl,
	      })
	    },

	}
});