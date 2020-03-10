//var myApp = angular.module('myApp', []);
myApp.controller('monitorSumClusterCtrl', function($scope, $http, panguService, $uibModal) {
	var pageUrl = window.location.href;
	var urlParameter = get_pangu_urlParameter(pageUrl);
	//fatal
	$scope.clusterFatalTitle = 'FATAL';
	$scope.isShowFatalTable = false;
	$scope.showFatalTable = function() {
		$scope.isShowFatalTable = !$scope.isShowFatalTable;
	}
	//error
	$scope.clusterErrorTitle = 'ERROR';
	$scope.isShowErrorTable = false;
	$scope.showErrorTable = function() {
		$scope.isShowErrorTable = !$scope.isShowErrorTable;
	}
	//warning
	$scope.clusterWarningTitle = 'WARNING';
	$scope.isShowWarningTable = false;
	$scope.showWarningTable = function() {
		$scope.isShowWarningTable = !$scope.isShowWarningTable;
	}
	$scope.requestClusterBasic = function() {
        return $http({
	        method: 'GET',
	        url:'/api/v1/tianji_monitor?cluster='+urlParameter.cluster
	    }).then(function(data,status){
	        monitorSummaryCluster(data.data);
//	        monitorSummaryClusterError(data.data);
//	        monitorSummaryClusterWarning(data.data);
	    }).catch(function(data,status){
	        console.log("error");
	    })
    }
	$scope.requestClusterBasic();
	function monitorSummaryCluster(data) {
		var moniterSumFatal = [];
		var moniterSumError = [];
		var moniterSumWarning = [];
		var index = 0;
//		var group_others = {};
		for(var key in data) {
			if(data[key] && data[key].length) {
				data[key].map(function(item, index) {
		    		var obj = {};
		    		//角色
		    		obj.serverrole = {
		    			"name":item.serverrole
		    		}
		    		//监控项
		    		obj.monitor = {
		    			"name":item.monitor
		    		}
		    		//描述
		    		obj.desc = {
		    			"name":item.desc
		    		}
		    		//发生时间
		    		obj.update_time = {
		    			"name":item.update_time
		    		}
		    		//机器
		    		obj.machine = {
		    			"name":item.machine,
		    			'url':'/terminal_service?cluster='+urlParameter.cluster+'&host='+item.machine
		    		}
		    		if(item.type !== 0) {
		    			if(item.level.toLowerCase() === 'fatal') {
							moniterSumFatal.push(obj);
						}
						if(item.level.toLowerCase() === 'error') {
							moniterSumError.push(obj);
						}
						if(item.level.toLowerCase() === 'warning') {
							moniterSumWarning.push(obj);
						}
		    		}
				})
			}
    	}
		
//		var moniterSumFatal_sort = moniterSumFatal.sort();
//		var moniterSumError_sort = moniterSumError.sort();
//		var moniterSumWarning_sort = moniterSumWarning.sort();
        $scope.showFatal = moniterSumFatal.length ? true : false;
        $scope.showError = moniterSumError.length ? true : false;
        $scope.showWarning = moniterSumWarning.length ? true : false;
        $scope.hasErrorInfo = !moniterSumFatal.length && !moniterSumError.length && !moniterSumWarning.length ? true : false;
        var moniterSumFatal_sort_index = [];
        var moniterSumError_sort_index = [];
        var moniterSumWarning_sort_index = [];
		if(moniterSumFatal.length) {
			moniterSumFatal.map(function(item, index) {
				var obj = {};
				obj.index = {
					'name':index+1
				}
				var result = Object.assign(obj, item);
				moniterSumFatal_sort_index.push(result);
			})
		}
		if(moniterSumError.length) {
			moniterSumError.map(function(item, index) {
				var obj = {};
				obj.index = {
					'name':index+1
				}
				var result = Object.assign(obj, item);
				moniterSumError_sort_index.push(result);
			})
		}
	    if(moniterSumWarning.length) {
			moniterSumWarning.map(function(item, index) {
				var obj = {};
				obj.index = {
					'name':index+1
				}
				var result = Object.assign(obj, item);
				moniterSumWarning_sort_index.push(result);
			})
		}
		$scope.monitor_summary_cluster_fatal = {
		    "thData":["#","角色","监控项","描述","发生时间","机器"],
		    "tdData":moniterSumFatal_sort_index
	    }
	    $scope.monitor_summary_cluster_error = {
		    "thData":["#","角色","监控项","描述","发生时间","机器"],
		    "tdData":moniterSumError_sort_index
	    }
		$scope.monitor_summary_cluster_warning = {
		    "thData":["#","角色","监控项","描述","发生时间","机器"],
		    "tdData":moniterSumWarning_sort_index
	    }
	}
	
})