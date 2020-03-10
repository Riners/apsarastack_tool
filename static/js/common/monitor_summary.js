//var myApp = angular.module('myApp', []);
myApp.controller('monitorSummaryCtrl', function($scope, $http, panguService, $uibModal) {
	$scope.requestClusterBasic = function() {
        
        return $http({
	        method: 'GET',
	        url:'/api/v1/group_basic'
	    }).then(function(data,status){
	        handleMonitorSummaryInfo(data.data);
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
	function handleMonitorSummaryInfo(data) {
		var moniterSumInfo = [];
		var index = 0;
		var group_others = {};
		for(var key in data) {
			index++;
    		var obj = {};
//  		obj.index = {
//  			"name":index
//  		};
    		obj.groupName = {
    			"name":key,
    			"url":'/monitor_summary_group?group='+key,
    			"color":''
    		}
    		obj.fatal = {
    			'name':manageNum(data[key].alert_fatal,0),
    			"color":"panguOverviewRed"
    		}
    		obj.Error = {
    			'name':manageNum(data[key].alert_error,0),
    			"color":"panguOverviewPink"
    		}
    		obj.Warning = {
    			'name':manageNum(data[key].alert_warning,0),
    			"color":"panguOverviewOrange"
    		}
    		moniterSumInfo.push(obj);
    	}
		var moniterSumInfo_sort = moniterSumInfo.sort(compare_with_monitor);
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
		$scope.monitor_summary_info = {
		    "thData":["#","应用线","FATAL","ERROR","WARNING"],
		    "tdData":moniterSumInfo_sort_index
	    }
    	function compare_with_monitor(x, y) {
	    	if (Number(x['fatal'].name) > Number(y['fatal'].name)){
	    		return -1;
	    	}
	    	else if (Number(x['fatal'].name) < Number(y['fatal'].name))
	    	{
	    		return 1;
	    	}
	    	else
	    	{
	    	    if (Number(x['Error'].name) > Number(y['Error'].name))
	    	    {
	    	    	return -1;
	    	    }
	    	    else if  (Number(x['Error'].name) < Number(y['Error'].name))
	    	    {
	    	    	return 1;
	    	    }
	    	    else
	    	    {
	    	    	if(Number(x['Warning'].name) > Number(y['Warning'].name))
	    	    	{
	    	    		return -1;
	    	    	}
	    	    	else if(Number(x['Warning'].name) < Number(y['Warning'].name))
	    	    	{
	    	    		return 1;
	    	    	}
	    	    }
	    	}

            return 0;
	    }
	}

})
