//var myApp = angular.module('myApp', []);
myApp.controller('monitorSumGroupCtrl', function($scope, $http, panguService, $uibModal) {
	var pageUrl = window.location.href;
	var urlParameter = get_pangu_urlParameter(pageUrl);
	$scope.requestClusterBasic = function() {
        return $http({
	        method: 'GET',
	        url:'/api/v1/list_cluster?group='+urlParameter.group
	    }).then(function(data,status){
	        monitorSummaryGroup(data.data);
	    }).catch(function(data,status){
	        console.log("error");
	    })
    }
	$scope.requestClusterBasic();
	//各应用线汇总数据
//	$scope.clusterAllInfoTitle = '各应用线汇总数据';
//	$scope.isShowClusterInfoTable = false;
//	$scope.isShowClusterInfo = function() {
//		$scope.isShowClusterInfoTable = !$scope.isShowClusterInfoTable;
//	}
	function monitorSummaryGroup(data) {
		var moniterSumInfo = [];
		var index = 0;
		var group_others = {};
		for(var key in data) {
			// index++;
    		var obj = {};
//  		obj.index = {
//  			"name":index
//  		};
    		obj.clusterName = {
    			"name":key,
    			"url":'/monitor_summary_cluster?group='+urlParameter.group+'&cluster='+key
    		}
    		obj.fatal = {
    			'name':manageNum(data[key].alert_fatal,0)
    		}
    		obj.Error = {
    			'name':manageNum(data[key].alert_error,0)
    		}
    		obj.Warning = {
    			'name':manageNum(data[key].alert_warning,0)
    		}
    		moniterSumInfo.push(obj);
    	}
		var moniterSumInfo_sort = moniterSumInfo.sort(compare);
//		if(group_others.groupName) {
//			groupSumInfo_sort.push(group_others);
//		}
		var moniterSumInfo_sort_index = []; 
		if(moniterSumInfo_sort.length) {
			moniterSumInfo_sort.map(function(item, index) {
				var obj = {};
				obj.index = {
					'name':index+1
				}
				var result = Object.assign(obj, item);
				moniterSumInfo_sort_index.push(result);
			})
		}
		$scope.monitor_summary_group_info = {
		    "thData":["#","集群","FATAL","ERROR","WARNING"],
		    "tdData":moniterSumInfo_sort_index
	    }
    	function compare(x, y) {
	    	if (x['fatal'].name > y['fatal'].name){
	    		return -1;
	    	}
	    	else if (x['fatal'].name < y['fatal'].name)
	    	{
	    		return 1;
	    	}
	    	else
	    	{
	    	    if (x['Error'].name > y['Error'].name)
	    	    {
	    	    	return -1;
	    	    }
	    	    else if  (x['Error'].name < y['Error'].name)
	    	    {
	    	    	return 1;
	    	    }
	    	    else
	    	    {
	    	    	if(x['Warning'].name > y['Warning'].name)
	    	    	{
	    	    		return -1;
	    	    	}
	    	    	else if(x['Warning'].name < y['Warning'].name)
	    	    	{
	    	    		return 1;
	    	    	}
	    	    }
	    	}

            return 0;
	    }
	}

})