myApp.controller('newUpgradeCfg', function($scope, $http, panguService, $uibModal, $log) {
//	$scope.group_title = "DB";
//	$scope.isShowGroupTitle = false;
//	$scope.showGroupTitle = function() {
//		$scope.isShowGroupTitle = !$scope.isShowGroupTitle;
//	}
//  $scope.edit = function(data) {
//  	console.log(data, data);
//  	$scope.open(data.rowData, 'edit');
//  }
//  $scope.pushlishNewVer = function() {
//  	$scope.open([], 'publish');
//  }
//  $scope.envirExamineReport = function(data) {
//  	console.log(data, "xuanzhong")
//  }
    $scope.searchType = "精确查询";
    $scope.searchType_current_upgrade_list = "模糊查询";
    $scope.exactSearch = function() {
    	$scope.isShowSearch = !$scope.isShowSearch;
        $scope.searchType = $scope.isShowSearch ? '模糊查询' : '精确查询';
        $scope.searchType_current_upgrade_list =  $scope.isShowSearch ? '精确查询' : '模糊查询';
    }
    $scope.fanxuan = function(data) {
    	console.log(data, "fanxuan")
    }
    $scope.checkedRow = function(data) {
    	console.log(data, "datav")
    }
    $scope.mapsParam = get_pangu_urlParameter(window.location.href);
    $scope.baseInfo_group = $scope.mapsParam.group ? $scope.mapsParam.group : '';
//  $scope.is_upgrade_cfg_list = $scope.mapsParam.group && $scope.mapsParam.tag ? false : true;
    //url没有参数
    if(!$scope.mapsParam.group && !$scope.mapsParam.tag) {
    	$scope.is_upgrade_cfg_list = true;
    	$scope.refer_page = false;
    	$scope.group_page = false;
    }
    //url只有group参数
    if($scope.mapsParam.group && !$scope.mapsParam.tag) {
    	$scope.group_page_table = false;
    	$scope.is_upgrade_cfg_list = false;
    	$scope.refer_page = false;
    	$scope.group_page = true;
    }
    //url有group参数和tag参数
    if($scope.mapsParam.group && $scope.mapsParam.tag) {
    	$scope.is_upgrade_cfg_list = false;
    	$scope.refer_page = true;
    	$scope.group_page = false;
    }
    //获取用户信息
    $scope.getUserInfo = function() {
    	return $http({
    		method: 'GET',
	        url:"/api/v1/get_curr_user_info"
    	}).then(function(data, status) {
    		$scope.userName = data.data.name;
    	})
    }
    $scope.getUserInfo();
    //获取所有的groupList
    $scope.getGroupList = function() {
		return $http({
	        method: 'get',
	        url:"/api/v1/list_group?detail=0"
	    }).then(function(data,status){
	    	if(!data.data.err) {
	    		$scope.upgradeGruopList = data.data;
	    	}
	    })
    }
    $scope.getGroupList();
    //权限
    $scope.getPrivileage = function() {
    	return $http({
    		method: 'GET',
	        url:"/api/v1/get_privileage?name=upgrade_cfg"
    	}).then(function(data, status) {
    		if(data.data.enable) {
    			$scope.hasPrivileage = true;
    		}else{
    			$scope.hasPrivileage = false;
    		}
    		//测试用
    	//	$scope.hasPrivileage = true;
    	})
    }
    $scope.getPrivileage();
    
    
    $scope.openDetailsUpgradeInfo = function(data) {
    	var group = data.rowData.action.group;
    	var tag = data.rowData.tag.name;
    	window.location = "/upgrade_cfg?group="+group+"&tag="+tag;
    }
    $scope.createUpgradeCfg = function() {
    	$scope.open($scope.upgradeGruopList, $scope.userName)
    }
    //upgrade_cfg_list 表头
    var upgrade_cfg_list_thead = [
        {"showName":"#","tbodyKey":"index","width":"45px"},
        {"showName":"应用线","tbodyKey":"group","width":"200px"},
        {"showName":"Tag","tbodyKey":"tag","width":"200px"},
        {"showName":"配置修改描述","tbodyKey":"cfg_modify_des","width":"300px"},
        {"showName":"owner","tbodyKey":"owner","width":"200px"},
        {"showName":"操作","tbodyKey":"action","width":""}
    ]
    //upgrade——cfg-list 精确查询
    $scope.submit = function() {
      	var group = $scope.group_key;
      	var tag = $scope.tag_key;
      	var cfg_modify_desc = $scope.cfg_modify_desc_key;
      	var owner = $scope.owner_key;
      	var searchKeyMap = [
	      	{
	      		"key":group,
	      		"id":"group",
	      		"searchType":"vague"
	      	},
	      	{
	      		"key":tag,
	      		"id":"tag",
	      		"searchType":"vague"
	      	},
	      	{
	      		"key":cfg_modify_desc,
	      		"id":"cfg_modify_des",
	      		"searchType":"vague"
	      	},
	      	{
	      		"key":owner,
	      		"id":"owner",
	      		"searchType":"vague"
	      	}
      	]
        var tbodyData = multiFilter($scope.searchData, searchKeyMap)
      	$scope.upgradeData_cfg = {
			"theadData":upgrade_cfg_list_thead,
		    "tbodyData":tbodyData
		}
    }
    //upgrade——cfg——list 模糊查询
    $scope.selectName = function(data) {
    	//console.log(data, "data");
    	var tbodyData = vagueTable($scope.searchData, data);
    	$scope.upgradeData_cfg = {
    		"theadData":upgrade_cfg_list_thead,
	        "tbodyData":tbodyData,
	        "closeSelectInput":true
    	}
    }
    $scope.getUpgradeCfgData = function (){
	    return $http({
	        method: 'GET',
	        url:"/api/v1/upgrade_cfg_list"
	    }).then(function(data,status){
	    	function compare(x, y) {
	      		if (x.title > y.title){
		    		return 1;
		    	}else if (x.title < y.title){
		    		return -1;
		    	}else{
		    		return 0;
		    	}
      	    }
      	    var sources_data = data.data.sort(compare);
	    	if($scope.mapsParam.group && !$scope.mapsParam.tag) {
	    		if(sources_data && sources_data.length) {
	    			var tData =  []
	            	sources_data.map(function(item, index) {
	            		if(item.title === $scope.mapsParam.group) {
	            			if(item.group_upgrade_list && item.group_upgrade_list.length) {
		            			item.group_upgrade_list.map(function(item1, index) {
		            				var tbObj = {};
		            				tbObj.index = {"name":index};
		            				tbObj.tag = {"name":item1.tag ? item1.tag : ""};
		            				tbObj.cfg_modify_des = {"name":item1.cfg_modify_des ? item1.cfg_modify_des : ""}
		            				tbObj.owner = {"name":item1.owner ? item1.owner : ""}
		            				tbObj.action = {"button":["查看"],"group":item.title ? item.title : ''}
		            				tData.push(tbObj);
		            			})
		            		}
	            		}
	            	})
	        		$scope.allUpgradeCfgData = {
	        			"theadData":[
					         {"showName":"#","tbodyKey":"index","width":"45px"},
					         {"showName":"Tag","tbodyKey":"tag","width":"400px"},
				             {"showName":"配置修改描述","tbodyKey":"cfg_modify_des","width":"400px"},
				             {"showName":"owner","tbodyKey":"owner","width":"200px"},
				             {"showName":"操作","tbodyKey":"action","width":""}
				        ],
				       "tbodyData":tData
	        		}
	            }
	    	}
//	    	if(!$scope.mapsParam.group && !$scope.mapsParam.tag) {
//	    		var upgradeData = [];
//				var upgradeGruopList = [];
//	            if(sources_data && sources_data.length) {
//	            	sources_data.map(function(item, index) {
//	            		var obj = {};
//	            		var tData =  []
//	            		if(item.group_upgrade_list && item.group_upgrade_list.length) {
//	            			item.group_upgrade_list.map(function(item1, index) {
//	            				var tbObj = {};
//	            				tbObj.index = {"name":index};
//	            				tbObj.tag = {
//	            					"name":item1.tag ? item1.tag : "",
//	            				    "url":"/upgrade?group="+item.title+"&tag="+item1.tag
//	            				};
//	            				tbObj.cfg_modify_des = {"name":item1.cfg_modify_des ? item1.cfg_modify_des : ""}
//	            				tbObj.owner = {"name":item1.owner ? item1.owner : ""}
//	            				tbObj.action = {"button":["查看"],"group":item.title ? item.title : ''}
//	            				tData.push(tbObj);
//	            			})
//	            		}
//	            		upgradeGruopList.push(item.title);
//	            		obj.group = item.title ? item.title : '';
//	            		obj.isShowGroupTable = false;
//	            		obj.details = {
//	            			"theadData":[
//						         {"showName":"#","tbodyKey":"index","width":"45px"},
//						         {"showName":"Tag","tbodyKey":"tag","width":"400px"},
//					             {"showName":"配置修改描述","tbodyKey":"cfg_modify_des","width":"400px"},
//					             {"showName":"owner","tbodyKey":"owner","width":"200px"},
//					             {"showName":"操作","tbodyKey":"action","width":""}
//					        ],
//					       "tbodyData":tData
//	            		}
//	            		upgradeData.push(obj);
//	            	})
//	            }
//				$scope.upgradeData = upgradeData;
//				$scope.upgradeGruopList = upgradeGruopList;
//	    	}
            if(!$scope.mapsParam.group && !$scope.mapsParam.tag) {
            	var tbodyData = [];
            	var num = 0;
            	if(sources_data && sources_data.length) {
	            	sources_data.map(function(item, index) {
	            		if(item.group_upgrade_list && item.group_upgrade_list.length) {
	            			item.group_upgrade_list.map(function(item1, index1) {
	            				num ++;
	            				tbodyData.push({
	            					"index":{
	            						"name":num
	            					},
	            					"group":{
	            						"name":item.title ? item.title : ''
	            					},
	            					"tag":{
		            					"name":item1.tag ? item1.tag : "",
		            				    "url":"/upgrade?group="+item.title+"&tag="+item1.tag
		            				},
		            				"cfg_modify_des":{
		            					"name":item1.cfg_modify_des ? item1.cfg_modify_des : ""
		            				},
		            				"owner":{
		            					"name":item1.owner ? item1.owner : ""
		            				},
		            				"action":{
		            					"button":["查看"],"group":item.title ? item.title : ''
		            				}
	            				})
	            			})
	            		}
	            	})
	            }
            	$scope.searchData = tbodyData;
            	$scope.upgradeData_cfg = {
            		"theadData":upgrade_cfg_list_thead,
			        "tbodyData":tbodyData,
			        "closeSelectInput":true
            	}
            }
	    })
	}
    $scope.getUpgradeCfgData();
    //查看详情
    $scope.upgardeBaseInfoTitle = decodeURIComponent($scope.mapsParam.tag) + "-配置升级基本信息";
	$scope.isShowBaseInfoTitle = false;
    $scope.editBaseInfo = function(data) {
    	console.log(data, data);
    	$scope.openModifyUpgradeDialog(data.rowData, {"group":$scope.mapsParam.group,"tag":$scope.mapsParam.tag,"schedulingTime":$scope.schedulingTime});
    }
    //配置升级基本信息表格
    $scope.getUpgrade_cfg_baseInfo = function() {
    	return $http({
	        method: 'GET',
	        url:"/api/v1/upgrade_cfg_basic_info?group="+$scope.mapsParam.group+"&tag="+$scope.mapsParam.tag
	    }).then(function(data,status){
	    	var baseInfoData =  handleUpgradeBaseInfoData(data.data);
	    	$scope.schedulingTime = data.data.one_tag_upgrade && data.data.one_tag_upgrade.step_date_json ? data.data.one_tag_upgrade.step_date_json : {};
	    	$scope.baseInfoTableData = {
            			"theadData":[
					         {"showName":"总升级进度","tbodyKey":"total_upgrade_step","width":"150px"},
					         {"showName":"不升级集群","tbodyKey":"not_need_upgrade_clusters","width":"150px"},
				             {"showName":"新增集群","tbodyKey":"new_add_clusters","width":"150px"},
				             {"showName":"配置升级描述","tbodyKey":"upgrade_cfg_desc","width":"350px"},
				             {"showName":"owner","tbodyKey":"owner","width":"200px"},
				             {"showName":"操作","tbodyKey":"action","width":""}
				        ],
				        "tbodyData":baseInfoData,
				        "showSortIconData":true
            		}
	    })
    }
    $scope.getUpgrade_cfg_baseInfo()
    function handleUpgradeBaseInfoData(data) {
    	var arr = []
    	if(data) {
//  		data.map(function(item, index) {
    			var obj = {};
    			obj.total_upgrade_step = {
    				"name":data.upgrade_process_rate + '\n\r' +'('+data.upgraded_cluster_count + '/'+ data.total_cluster_count+')',
    			}
    			obj.not_need_upgrade_clusters = {
    				"name":data.no_upgrade_cluser_count || data.no_upgrade_cluser_count === 0 ? data.no_upgrade_cluser_count : ''
    			}
    			obj.new_add_clusters = {
    				"name":data.new_cluser_count ? data.new_cluser_count : ''
    			};
    			obj.upgrade_cfg_desc = {
    				"name":data.one_tag_upgrade && data.one_tag_upgrade.remark ? data.one_tag_upgrade.remark : ''
    			};
    			obj.owner = {
    				"name":data.one_tag_upgrade && data.one_tag_upgrade.owner ? data.one_tag_upgrade.owner : ''
    			};
    			obj.action = {"button":$scope.hasPrivileage ? ["编辑"] : []}
    			arr.push(obj);
    	}
    	return arr;
    }
    //所有集群的升级状态
    $scope.allClustersStatusCfg = "所有集群的升级状态";
	$scope.isAllClustersStatusCfg = false;
    $scope.terminalService = function(data) {
    	window.location = "/terminal_service?host={{one_cluster.ag}}&cluster="+data.rowData.cluster.name;
    }
    $scope.getAllClustersUpgradeCfg = function() {
    	return $http({
	        method: 'GET',
	        url:"/api/v1/upgrade_cfg_basic_info?group="+$scope.mapsParam.group+"&tag="+$scope.mapsParam.tag
	    }).then(function(data,status){
	    	var allClusterStatus = handleAllClusterUpgradeData(data.data);
	    	$scope.all_cluster_status_tableData = {
	    		"theadData":[
					         {"showName":"集群名","tbodyKey":"cluster","width":"80px"},
					         {"showName":"天基Region","tbodyKey":"tianji_region","width":"100px"},
				             {"showName":"Tag","tbodyKey":"tag","width":"100px"},
				             {"showName":"集群描述","tbodyKey":"cluster_decs","width":"100px"},
				             {"showName":"升级排期","tbodyKey":"upgrade_schedule","width":"80px"},
				             {"showName":"升级日期","tbodyKey":"upgrade_date","width":"90px"},
				             {"showName":"升级状态","tbodyKey":"upgrade_status","width":"80px"},
				             {"showName":"Comments","tbodyKey":"comments","width":"330px"},
				             {"showName":"AG","tbodyKey":"action","width":""},
				             {"showName":"rowkey","tbodyKey":"rowKey","width":"0px"}
				        ],
				"tbodyData":allClusterStatus,
				"checkBox":{
					"showCheckBox":true,
					"width":"40px"
				},
				"showFanxuanBtn":true
	    	}
	    })
    }
    $scope.getAllClustersUpgradeCfg();
    function handleAllClusterUpgradeData(data) {
    	var arr = [];
    	if(data && data.upgrade_cluster_list && data.upgrade_cluster_list.length) {
    		data.upgrade_cluster_list.map(function(item, index) {
    			var obj = {};
    			var tr_background = '';
    			var up_status_step_code = '';
    			if(item.up_status_step_code === 0) {
    				tr_background = "red";
    				up_status_step_code = "未升级";
    			}
    			if(item.up_status_step_code === 1) {
    				tr_background = "#d1e2f1";
    				up_status_step_code = "已升级";
    			}
    			if(item.up_status_step_code === 2) {
    				tr_background = "#e2e2e2";
    				up_status_step_code = "不升级";
    			}
    			if(item.up_status_step_code === 3) {
    				tr_background = "#fff";
    				up_status_step_code = "新增集群";
    			}
    			obj.cluster = {
    				"name":item.cluster_name ? item.cluster_name : '',
    			}
    			obj.tianji_region = {
    				"name":item.tianji_region ? item.tianji_region :'',
    			}
    			obj.tag = {
    				"name":item.tianji_tag ? item.tianji_tag : '',
    			}
    			obj.cluster_decs = {
    				"name":item.desc ? item.desc : ''
    			}
    			obj.upgrade_schedule = {
    				"name":item.step_title ? item.step_title : ''
    			}
    			obj.upgrade_date = {
    				//"name":item.up_status ? "预计升级日期:"+item.except_upgrade_date + "实际升级日期:"+item.up_status : "预计升级日期:"+item.except_upgrade_date
    				"textAlign":"left",
    				"render":{
    					"data":item.up_status ? ["预计日期:",item.except_upgrade_date, "实际日期:",item.up_status] : ["预计日期:",item.except_upgrade_date]
    				}
    			}
    			obj.upgrade_status = {
    				"name":up_status_step_code,
    				"trbackground":tr_background,
    			}
    			obj.comments = {
    				"render":{
    					"data":item.remark ? item.remark.split : []
    				}
    			}
    			obj.action = {
    				"name":item.ag ? item.ag : '',
    				"button":["TS"]
    			}
    			obj.rowKey = {
    				"name":index + 1,
    				"checkedKey":false
    			}
    			arr.push(obj);
    		})
    	}
    	return arr;
    }
        //批量修改
    $scope.batchModify = function() {
    	if($scope.checkedRows.length){
    		$scope.batchModifyDialog({"clusterList":$scope.checkedRows,"tag":$scope.mapsParam.tag,"schedulingTime":$scope.schedulingTime})
    	}else{
    		alert("请选择需要编辑的集群!")
    	}
    }
    //环境检查报告
    $scope.envirExamineReport = function(data) {
    	if(data.length) {
    		var clusterList = [];
	        data.map(function(item) {
	     		clusterList.push(item.checkedRows.cluster.name);
	     	})
	        var clusterStr = clusterList.join(",")
	    	window.location = "/env_check?type=report_group&group=OSS&cluster="+ clusterList
    	}else{
    		alert("请选择集群!")
    	}
    }
    //报警情况
    $scope.alarmSituation = function(data) {
    	if(data.length) {
    		var clusterList = [];
	        data.map(function(item) {
	     		clusterList.push(item.checkedRows.cluster.name);
	     	})
	        var clusterStr = clusterList.join(",")
	    	window.location = "/monitor?type=group&group=OSS&cluster="+ clusterList
    	}else{
    		alert("请选择集群!")
    	}
    }
    $scope.open = function (upgradeGruopList, userName) {
    	//$scope.dialogData = item;
	    var modalInstance = $uibModal.open({
	         templateUrl:'/static/js/common/upgrade_cfg_dialog.html',
	         controller: 'ModalInstanceCtrl',
	         backdrop: "static",
             //size: size,
             resolve:{
                items1: function () {
                    return {
                    	"upgradeGruopList":upgradeGruopList,
                    	"userName":userName,
                    	'scope':$scope
                    }
                }
             }
        });
	};
	$scope.openModifyUpgradeDialog = function(item, paramter) {
		var modalInstance = $uibModal.open({
	         templateUrl:'/static/js/common/upgrade_cfg_dialog_modify.html',
	         controller: 'ModalInstanceModityCtrl',
	         backdrop: "static",
             //size: size,
             resolve:{
                items1: function () {
                    return {
                    	'item':item,
                    	"paramter":paramter,
                    	'scope':$scope
                    }
                }
             }
        });
	}
	$scope.batchModifyDialog = function(item) {
		var modalInstance = $uibModal.open({
	         templateUrl:'/static/js/common/upgrade_cfg_batchModify_dialog.html',
	         controller: 'batchModityCtrl',
	         backdrop: "static",
             //size: size,
             resolve:{
                items1: function () {
                    return {
                    	'item':item,
                    	'scope':$scope
                    }
                }
             }
        });
	}
	$scope.referAllupgradeCfg = function(data) {
		window.location = "/upgrade_cfg?group="+data;
	}
})

myApp.controller('ModalInstanceCtrl',function($scope, $uibModalInstance, items1, $http){
	//$scope.tableData = items1.item ? items1.item : '';
	//$scope.group = $scope.tableData.group;
    $scope.upgradeGruopList = items1.upgradeGruopList;
    $scope.upgrade_title = '';
    $scope.upgrade_cfg_des = '';
    $scope.dstep_gray_scale_1 = '';
    $scope.dstep_gray_scale_2 = '';
    $scope.dstep_gray_scale_3 = '';
    $scope.dstep_gray_scale_4 = '';
    $scope.dstep_upgrade_1 = '';
    $scope.dstep_upgrade_2 = '';
    $scope.dstep_upgrade_3 = '';
    $scope.dstep_upgrade_4 = '';
    $scope.dstep_upgrade_5 = '';
    $scope.dstep_upgrade_6 = '';
    $scope.dstep_upgrade_7 = '';
    $scope.dstep_upgrade_8 = '';
    $scope.dstep_upgrade_9 = '';
    $scope.dstep_upgrade_10 = '';
    var strOwner = items1.userName ? items1.userName : '';
//  items1.item.details.tbodyData.map(function(item) {
//  	strOwner = item.owner.name;
//  })
//	if(items1.type === 'edit') {
//		$scope.modal_title = 'BuildID('+$scope.build_id+') - 修改版本信息';
//		$scope.isEdit = true;
//	}else{
//		$scope.modal_title = '发布新版本';
//	}
     //var screenHeight = document.documentElement.clientHeight;
     var screenHeight = window.screen.height
     setTimeout(function(){
         var myModal = document.querySelector('.modal-content');
	     myModal.style.top = (screenHeight - myModal.offsetHeight)/3 < 150 ? (screenHeight - myModal.offsetHeight)/3 + 'px' : 150 + 'px';
//	     myModal.style.width = 500 + 'px';
     },100)
     $scope.ok = function () {
        $uibModalInstance.close();
       	var date1 = new Date();
        var date2 = new Date();
        var date3 = new Date();
        var date4 = new Date();
        var date_1 = new Date();
        var date_2 = new Date();
        var date_3 = new Date();
        var date_4 = new Date();
        var date_5 = new Date();
        var date_6 = new Date();
        var date_7 = new Date();
        var date_8 = new Date();
        var date_9 = new Date();
        var date_10 = new Date();
        date1 = $scope.dstep_gray_scale_1 ? $scope.dstep_gray_scale_1 : '';
        date2 = $scope.dstep_gray_scale_2 ? $scope.dstep_gray_scale_2 : '';
        date3 = $scope.dstep_gray_scale_3 ? $scope.dstep_gray_scale_3 : '';
        date4 = $scope.dstep_gray_scale_4 ? $scope.dstep_gray_scale_4 : '';
        date_1 = $scope.dstep_upgrade_1 ? $scope.dstep_upgrade_1 : '';
        date_2 = $scope.dstep_upgrade_2 ? $scope.dstep_upgrade_2 : '';
        date_3 = $scope.dstep_upgrade_3 ? $scope.dstep_upgrade_3 : '';
        date_4 = $scope.dstep_upgrade_4 ? $scope.dstep_upgrade_4 : '';
        date_5 = $scope.dstep_upgrade_5 ? $scope.dstep_upgrade_5 : '';
        date_6 = $scope.dstep_upgrade_6 ? $scope.dstep_upgrade_6 : '';
        date_7 = $scope.dstep_upgrade_7 ? $scope.dstep_upgrade_7 : '';
        date_8 = $scope.dstep_upgrade_8 ? $scope.dstep_upgrade_8 : '';
        date_9 = $scope.dstep_upgrade_9 ? $scope.dstep_upgrade_9 : '';
        date_10 = $scope.dstep_upgrade_10 ? $scope.dstep_upgrade_10 : '';
        var strDate1 = '';
        var strDate2 = '';
        var strDate3 = '';
        var strDate4 = '';
        var strDate_1 = '';
        var strDate_2 = '';
        var strDate_3 = '';
        var strDate_4 = '';
        var strDate_5 = '';
        var strDate_6 = '';
        var strDate_7 = '';
        var strDate_8 = '';
        var strDate_9 = '';
        var strDate_10 = '';
        if(date1) {
        	strDate1 = getDateStr1(date1);
        }
        if(date2) {
        	strDate2 = getDateStr1(date2);
        }
        if(date3) {
        	strDate3 = getDateStr1(date3);
        }
        if(date4) {
        	strDate4 = getDateStr1(date4);
        }
        if(date_1) {
        	strDate_1 = getDateStr1(date_1);
        }
        if(date_2) {
        	strDate_2 = getDateStr1(date_2);
        }
        if(date_3) {
        	strDate_3 = getDateStr1(date_3);
        }
        if(date_4) {
        	strDate_4 = getDateStr1(date_4);
        }
        if(date_5) {
        	strDate_5 = getDateStr1(date_5);
        }
        if(date_6) {
        	strDate_6 = getDateStr1(date_6);
        }
        if(date_7) {
        	strDate_7 = getDateStr1(date_7);
        }
        if(date_8) {
        	strDate_8 = getDateStr1(date_8);
        }
        if(date_9) {
        	strDate_9 = getDateStr1(date_9);
        }
        if(date_10) {
        	strDate_10 = getDateStr1(date_10);
        }
        var strDateParam = "&dstep_gray_scale_1="+strDate1+"&dstep_gray_scale_2="+strDate2+"&dstep_gray_scale_3="+strDate3+
        "&dstep_gray_scale_4="+strDate4+"&dstep_upgrade_1="+strDate_1+"&dstep_upgrade_2="+strDate_2+"&dstep_upgrade_3="+strDate_3+
        "&dstep_upgrade_4="+strDate_4+"&dstep_upgrade_5="+strDate_5+"&dstep_upgrade_6="+strDate_6+"&dstep_upgrade_7="+strDate_7+
        "&dstep_upgrade_8="+strDate_8+"&dstep_upgrade_9="+strDate_9+"&dstep_upgrade_10="+strDate_10;
        return $http({
            method: 'post',
            url:'/api/v1/upgrade_cfg_add_post',
            headers: {'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'},
            data:"tag=" + $scope.tag + "&owner=" + items1.userName + "&group=" + $scope.group +  "&remark=" + $scope.remark + strDateParam
        }).then(function(data,status){
        	if(data.data.err) {
        		alert("创建失败")
        	}else{
        	//	alert("创建成功");
        		items1.scope.getUpgradeCfgData();
        	}
		//   Message(items1.scope, 'success', 1000, '删除成功');
          //  items1.scope.getDocsList('show');
        }).catch(function(data,status){
        	alert("创建失败");
           // Message(items1.scope, 'error', 1000, '删除失败!')
        })
     };
     $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
     };
});

myApp.controller('ModalInstanceModityCtrl',function($scope, $uibModalInstance, items1, $http){
	 $scope.upgrade_cfg_modify_title = items1.paramter.group+'-修改'+decodeURIComponent(items1.paramter.tag)+'的升级信息';
     $scope.tag = decodeURIComponent(items1.paramter.tag);
     $scope.group = items1.paramter.group;
     $scope.remark = items1.item.upgrade_cfg_desc.name;
     var schedulingTime = JSON.parse(items1.paramter.schedulingTime);
     $scope.dstep_gray_scale_1 = new Date(schedulingTime.gray_scale_1);
     $scope.dstep_gray_scale_2 = new Date(schedulingTime.gray_scale_2);
     $scope.dstep_gray_scale_3 = new Date(schedulingTime.gray_scale_3);
     $scope.dstep_gray_scale_4 = new Date(schedulingTime.gray_scale_4);
     $scope.dstep_upgrade_1 = new Date(schedulingTime.upgrade_1);
     $scope.dstep_upgrade_2 = new Date(schedulingTime.upgrade_2);
     $scope.dstep_upgrade_3 = new Date(schedulingTime.upgrade_3);
     $scope.dstep_upgrade_4 = new Date(schedulingTime.upgrade_4);
     $scope.dstep_upgrade_5 = new Date(schedulingTime.upgrade_5);
     $scope.dstep_upgrade_6 = new Date(schedulingTime.upgrade_6);
     $scope.dstep_upgrade_7 = new Date(schedulingTime.upgrade_7);
     $scope.dstep_upgrade_8 = new Date(schedulingTime.upgrade_8);
     $scope.dstep_upgrade_9 = new Date(schedulingTime.upgrade_9);
     $scope.dstep_upgrade_10 = new Date(schedulingTime.upgrade_10);
     var screenHeight = window.screen.height
     setTimeout(function(){
         var myModal = document.querySelector('.modal-content');
	     myModal.style.top = (screenHeight - myModal.offsetHeight)/3 < 150 ? (screenHeight - myModal.offsetHeight)/3 + 'px' : 150 + 'px';
//	     myModal.style.width = 500 + 'px';
     },100)
     $scope.ok = function () {
        $uibModalInstance.close();
        	var date1 = new Date();
        var date2 = new Date();
        var date3 = new Date();
        var date4 = new Date();
        var date_1 = new Date();
        var date_2 = new Date();
        var date_3 = new Date();
        var date_4 = new Date();
        var date_5 = new Date();
        var date_6 = new Date();
        var date_7 = new Date();
        var date_8 = new Date();
        var date_9 = new Date();
        var date_10 = new Date();
        date1 = $scope.dstep_gray_scale_1;
        date2 = $scope.dstep_gray_scale_2;
        date3 = $scope.dstep_gray_scale_3;
        date4 = $scope.dstep_gray_scale_4;
        date_1 = $scope.dstep_upgrade_1;
        date_2 = $scope.dstep_upgrade_2;
        date_3 = $scope.dstep_upgrade_3;
        date_4 = $scope.dstep_upgrade_4;
        date_5 = $scope.dstep_upgrade_5;
        date_6 = $scope.dstep_upgrade_6;
        date_7 = $scope.dstep_upgrade_7;
        date_8 = $scope.dstep_upgrade_8;
        date_9 = $scope.dstep_upgrade_9;
        date_10 = $scope.dstep_upgrade_10;
        var strDateParam = "&dstep_gray_scale_1="+getDateStr1(date1)+"&dstep_gray_scale_2="+getDateStr1(date2)+"&dstep_gray_scale_3="+getDateStr1(date3)+
        "&dstep_gray_scale_4="+getDateStr1(date4)+"&dstep_upgrade_1="+getDateStr1(date_1)+"&dstep_upgrade_2="+getDateStr1(date_2)+"&dstep_upgrade_3="+getDateStr1(date_3)+
        "&dstep_upgrade_4="+getDateStr1(date_4)+"&dstep_upgrade_5="+getDateStr1(date_5)+"&dstep_upgrade_6="+getDateStr1(date_6)+"&dstep_upgrade_7="+getDateStr1(date_7)+
        "&dstep_upgrade_8="+getDateStr1(date_8)+"&dstep_upgrade_9="+getDateStr1(date_9)+"&dstep_upgrade_10="+getDateStr1(date_10);
        return $http({
            method: 'post',
            url:'/api/v1/upgrade_cfg_edit_post',
            headers: {'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'},
            data:"tag=" + $scope.tag + "&group=" + $scope.group + "&remark=" + $scope.remark + strDateParam
        }).then(function(data,status){
        	if(data.data.err) {
        		alert("修改失败")
        	}else{
        		//alert("修改成功")
        		items1.scope.getUpgrade_cfg_baseInfo();
        	}
//		    Message(items1.scope, 'success', 1000, '删除成功');
//          items1.scope.getDocsList('show');
        }).catch(function(data,status){
        	alert("修改失败")
//          Message(items1.scope, 'error', 1000, '删除失败!')
        })
     };
     $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
     };
});

myApp.controller('batchModityCtrl',function($scope, $uibModalInstance, items1, $http){
	 var schedulingTime = JSON.parse(items1.item.schedulingTime);
	 var dataMap =  {
		 	"gray_scale_1":"灰度1",
		 	"gray_scale_2":"灰度2",
		 	"gray_scale_3":"灰度3",
		 	"gray_scale_4":"灰度4",
		 	"upgrade_1":"升级1",
		 	"upgrade_2":"升级2",
		 	"upgrade_3":"升级3",
		 	"upgrade_4":"升级4",
		 	"upgrade_5":"升级5",
		 	"upgrade_6":"升级6",
		 	"upgrade_7":"升级7",
		 	"upgrade_8":"升级8",
		 	"upgrade_9":"升级9",
		 	"upgrade_10":"升级10",
		 	"no_set_upgrade":"不升级",
		 	"is_upgraded":"已升级"
		 }
	var schedulingTimeList = [];
	for(var j in dataMap) {
	 	for(var i in schedulingTime && j !== "no_set_upgrade" && j !=="is_upgraded") {
	 		if(i === j) {
	 			var timeStr = schedulingTime[i] ? schedulingTime[i] : "没有设置排期时间";
	 			schedulingTimeList.push(dataMap[j]+'('+ timeStr +')')
	 		}
	 	}
	}
	schedulingTimeList.push("不升级");
	schedulingTimeList.push("已升级");
	$scope.schedulingTimeList = schedulingTimeList;
	$scope.title = decodeURIComponent(items1.item.tag)+"-批量修改"+items1.item.clusterList.length+"个集群的升级信息";
    if(items1.item.clusterList.length === 1) {
	 	var step = items1.item.clusterList[0].checkedRows.upgrade_schedule.name;
	 	schedulingTimeList.map(function(item) {
	 		if(item.indexOf(step) !== -1) {
	 			$scope.step = item;
	 		}
	 	})
	 	$scope.remark = items1.item.clusterList[0].checkedRows.comments.render.data.join('\n');
	}
     var screenHeight = window.screen.height;
     setTimeout(function(){
         var myModal = document.querySelector('.modal-content');
	     myModal.style.top = (screenHeight - myModal.offsetHeight)/3 < 150 ? (screenHeight - myModal.offsetHeight)/3 + 'px' : 150 + 'px';
//	     myModal.style.width = 500 + 'px';
     },100)
     //获取clusterList
     $scope.getClusterList = function(){
     	var clusterList = [];
        items1.item.clusterList.map(function(item) {
     		clusterList.push(item.checkedRows.cluster.name);
     	})
        $scope.clusterList = clusterList;
     }
     $scope.getClusterList();
     $scope.ok = function () {
     	//获取升级时间安排
     	var step = $scope.step;
     	var stepStr = '';
     	if(step) {
     		for(var key in dataMap) {
	     		if(step.indexOf(dataMap[key]) !== -1){
	     			stepStr = key;
	     			break;
	     		}
     	    }
     	}
        $uibModalInstance.close();
        var strRemark = $scope.remark ? $scope.remark : '';
        return $http({
            method: 'post',
            url:'/api/v1/upgrade_cfg_tag_post',
            headers: {'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'},
            data:"tag=" + items1.item.tag + "&cluster_list=" +  $scope.clusterList + "&step=" + stepStr + "&remark=" + strRemark
        }).then(function(data,status){
        	//alert("修改成功")
//		    Message(items1.scope, 'success', 1000, '删除成功');
//          items1.scope.getDocsList('show');
        }).catch(function(data,status){
        	alert("修改失败")
//          Message(items1.scope, 'error', 1000, '删除失败!')
        })
     };
     $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
     };
     $scope.referAllCluster = function() {
     	var str = "";
     	items1.item.clusterList.map(function(item) {
     		str = str + '\n' +item.checkedRows.cluster.name
     	})
     	alert(str)
     }
});