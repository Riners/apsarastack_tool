//var myApp = angular.module('myApp', []);
myApp.controller('groupSummaryCtrl', function($scope, $http, panguService, $uibModal) {
	$scope.mapsParam=get_pangu_urlParameter(window.location.href);
	$scope.requestClusterBasic = function() {
       var urlStr=$scope.mapsParam.portal?"group_basic_all":"group_basic"
        return $http({
	        method: 'GET',
	        url:'/api/v1/'+urlStr
	    }).then(function(data,status){
	        handleGroupAllInfo(data.data);
	    }).catch(function(data,status){
	        console.log("error");
	    })
    }
	$scope.requestClusterBasic();
	//各应用线汇总数据
	$scope.clusterAllInfoTitle = '各应用线汇总数据';
	$scope.isShowClusterInfoTable = false;
	$scope.isShowClusterInfo = function() {
		$scope.isShowClusterInfoTable = !$scope.isShowClusterInfoTable;
	}
	function handleGroupAllInfo(data) {
		var groupSumInfo = [];
		var urlData = [];
		var index = 0;
		var group_others = {};
		for(var key in data) {
			index++;
    		var obj = {};
    		var urlObj = {};
//  		obj.index = {
//  			"name":index
//  		};
    		obj.groupName = {
    			"name":key,
    			"url":'/group?group='+key+'&'
    		}
    		obj.clusterNum = {
    			'name':data[key].total_cluster_count
    		}
    		obj.total_machine_count = {
    			'name':manageNum(data[key].total_machine_count,0)
    		}
    		//panguMaster数量
    		obj.total_ms_count = {
    			'name':manageNum(data[key].total_ms_count,0)
    		}
    		//chunkserver数
    		obj.total_cs_count = {
    			'name':manageNum(data[key].total_cs_count,0)
    		}
    		//最大chunkserver
    		obj.max_cs_count = {
    			'name':manageNum(data[key].max_cs_count,0)
    		};
    		//总文件数
    		obj.total_file_count = {
    			'name':manageNum(data[key].total_file_count,0)
    		};
    		//file length
    		obj.total_logical_size = {
    			'name':manageNum(data[key].total_logical_size, 3)
    		};
    		//总容量
    		obj.total_size = {
    			'name':manageNum(data[key].total_size, 3)
    		};
    		//空间使用率
    		obj.used_percent = {
    			'name':manageNum(data[key].used_percent, 3) + '%'
    		};
    		if(key == 'OTHERS') {
    			group_others = obj;
    		}else{
    			groupSumInfo.push(obj);
    		}
    	}
		var groupSumInfo_sort = groupSumInfo.sort(compare);
		if(group_others.groupName) {
			groupSumInfo_sort.push(group_others);
		}
		var groupSumInfo_sort_index = []; 
		if(groupSumInfo_sort.length) {
			groupSumInfo_sort.map(function(item, index) {
				var obj = {};
				obj.index = {
					'name':index+1
				}
				var result = Object.assign(obj, item);
				groupSumInfo_sort_index.push(result);
			})
			
		}
		$scope.portal_group_info = {
		    "thData":["#","应用线","集群数","总机器数","PanguMaster数量","Chunkserver数量","最大Chunkserver数","总文件数","File Length(TB)","总容量(TB)","空间使用率(%)"],
		    "tdData":groupSumInfo_sort_index,
	    }
    	function compare(x, y) {
	    	if (x['total_machine_count'].name > y['total_machine_count'].name)
	    	{
	    		return -1;
	    	}
	    	if (x['total_machine_count'].name < y['total_machine_count'].name)
	    	{
	    		return 1;
	    	}
	    	return 0;
	    }
	}

})
