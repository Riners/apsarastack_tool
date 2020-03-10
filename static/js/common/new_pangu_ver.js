myApp.controller('newPanguVerCtrl', function($scope, $http, panguService, $uibModal, $log) {
	$scope.pushlishVerTitle = "Pangu已发布版本信息";
	$scope.isShowPushlishVersionTitle = false;
	$scope.showPushlishVersionTitle = function() {
		$scope.isShowPushlishVersionTitle = !$scope.isShowPushlishVersionTitle;
	}
	$scope.isShowSearch = false;
	$scope.searchType = '精确查询';
	$scope.searchType_current = "模糊查询";
	$scope.mapsParam = get_pangu_urlParameter(window.location.href);
	var thead = [
	        {"showName":"#","tbodyKey":"index","width":"45px"},
	        {"showName":"Build ID","tbodyKey":"build_id","width":"80px"},
	        {"showName":"版本","tbodyKey":"pangu_ver","width":"135px"},
	        {"showName":"适用业务线","tbodyKey":"except_group_names","width":"100px"},
	        {"showName":"生效集群数量","tbodyKey":"exist_ver","width":"135px"},
	        {"showName":"发布原因","tbodyKey":"reason","width":"150px"},
	        {"showName":"Comments","tbodyKey":"remark","width":"150px"},
	        {"showName":"owner","tbodyKey":"owner","width":"80px"},
	        {"showName":"状态","tbodyKey":"step","width":"80px"},
	        {"showName":"Build创建时间","tbodyKey":"build_create_time","width":"100px"},
	        {"showName":"操作","tbodyKey":"action","width":""}
        ]
    //精确查找
    $scope.submit = function() {
      	var build_id = $scope.build_id;
      	var version = $scope.version;
      	var group = $scope.group;
      	var status = $scope.status;
      	var create_time = $scope.create_time ? getDateStr1($scope.create_time) : '';
      	console.log(create_time, "create_time")
      	var tbodyData = [];
      	var searchKeyMap = [
	      	{
	      		"key":build_id,
	      		"id":"build_id",
	      		"searchType":"vague"
	      	},
	      	{
	      		"key":version,
	      		"id":"pangu_ver",
	      		"searchType":"vague"
	      	},
	      	{
	      		"key":group,
	      		"id":"except_group_names",
	      		"searchType":"vague"
	      	},
	      	{
	      		"key":status,
	      		"id":"step",
	      		"searchType":"accurate"
	      	},
	      	{
	      		"key":create_time,
	      		"id":"build_create_time",
	      		"searchType":"vague"
	      	}
      	]
      //	var tbodyData = nestCall(searchData, searchByTaskId);
        var tbodyData = multiFilter($scope.searchData, searchKeyMap)
      	$scope.pangu_ver_table_data = {
			"theadData":thead,
		    "tbodyData":tbodyData,
		    "closeSelectInput":true
		}
    }
    //pangu——ver 模糊查询
    $scope.selectName = function(data) {
    	var tbodyData = vagueTable($scope.searchData, data);
    	$scope.pangu_ver_table_data = {
			"theadData":thead,
		    "tbodyData":tbodyData,
		    "closeSelectInput":true
		}
    }
    //获取用户信息
    $scope.getUserInfo = function() {
    	return $http({
    		method: 'GET',
	        url:"/api/v1/get_curr_user_info"
    	}).then(function(data, status) {
    		//console.log(data.data, "usename")
    		$scope.userName = data.data.name;
    	})
    }
    $scope.getUserInfo();
    
    $scope.edit = function(data) {
    	//console.log(data, data);
    	if(data.action === "编辑") {
    		$scope.open(data.rowData, 'edit', $scope.userName, $scope.version_list);
    	}else{
    		var build_id = data.action;
    		$scope.openBuild_datails(build_id);
    	}
    }
    $scope.pushlishNewVer = function() {
    	$scope.open([], 'publish', $scope.userName, $scope.version_list);
    }
    $scope.exactSearch = function() {
    	$scope.isShowSearch = !$scope.isShowSearch;
        $scope.searchType = $scope.isShowSearch ? '模糊查询' : '精确查询';
        $scope.searchType_current = $scope.isShowSearch ? '精确查询' : '模糊查询';
    }
    $scope.getPanguVerData = function (){
    	var getVerListUrl = $scope.mapsParam.group ? "/api/v1/pangu_ver_list?group="+ $scope.mapsParam.group : "/api/v1/pangu_ver_list";
	    return $http({
	        method: 'GET',
	        url:getVerListUrl
	    }).then(function(data,status){
            $scope.searchData = $scope.handlePanguVerData(data.data);
			$scope.pangu_ver_table_data = {
		       "theadData":thead,
		       "tbodyData":$scope.searchData,
		       "closeSelectInput":true
		    }
			$scope.pangu_ver_table_data.tbodyData = $scope.handlePanguVerData(data.data);
			//页面初始化,如果url中有build_id
		    if($scope.mapsParam.buildId) {
		    	$scope.pangu_ver_vague_key = $scope.mapsParam.buildId;
		        $scope.selectName($scope.mapsParam.buildId);
		    }
	    })
	}

    $scope.getPrivileage = function() {
    	return $http({
    		method: 'GET',
	        url:"/api/v1/get_privileage?name=pangu_ver"
    	}).then(function(data, status) {
    		console.log(data.data, "quanxoan")
    		if(data.data.enable) {
    			$scope.hasPrivileage = true;
    		}else{
    			$scope.hasPrivileage = false;
    		}
    		$scope.getPanguVerData();
    	})
    }
    $scope.getPrivileage();
    //去重
    function filterRepeat(data) {
    	var obj = {};
    	var result = [];
    	if(data && data.length) {
    		data.map(function(item) {
    			if(!obj[item]){
				    obj[item] = true;
				    result.push(item);
				}
    		})
    	}
    	return result;
    }
    $scope.handlePanguVerData = function(data) {
    	var arr=[];
    	var version_list = [];
    	data.map(function(item, index) {
    		var obj = {};
    		obj.index = {
    			"name":index + 1,
    		}
//  		obj.build_id = {
//  			"name":item.build_id,
//              "url":"http://fastwork.alibaba-inc.com/api/commonBuild/getAsvnConf?buildId="+item.build_id
//  		}
    		obj.build_id = {
                 "name":item.build_id,
                 "url":"",
                 "click":true
    		}
    		obj.pangu_ver = {
    			"name":item.pangu_ver,
    		}
    		version_list.push(item.pangu_ver);
    		obj.except_group_names = {
    			"name":item.except_group_names,
    		}
    		obj.exist_ver = {
    			"name":item.exist_ver,
    			"textAlign":"left",
    		}
    		obj.reason = {
    		//	"name":item.reason,
    			"render":{
    				"data":item.reason ? item.reason.split("\n") : []
    			},
    			"textAlign":"left",
    		}
    		obj.remark = {
    		//	"name":item.remark,
    			"render":{
    				"data":item.remark ? item.remark.split("\n") : []
    			},
    			"textAlign":"left",
    		}
    		obj.owner = {
    			"name":item.owner
    		}
    		obj.step = {
    			"name":item.step,
    		}
    		obj.build_create_time = {
    			"name":item.build_create_time,
    			"textAlign":"left"
    		}
	    	obj.action = {
			    "button":$scope.hasPrivileage ? ["编辑"] : []
	    	}
			arr.push(obj);
        })
	        version_list = filterRepeat(version_list);
	        $scope.version_list = version_list;
			return arr;
    	
    }
    //编辑
    $scope.open = function (item, type, userName, version_list) {
    	$scope.dialogData = item;
	    var modalInstance = $uibModal.open({
	         templateUrl:'/static/js/common/pangu_ver_dialog.html',
	         controller: 'ModalInstanceCtrl',
	         backdrop: "static",
             //size: size,
             resolve:{
                items1: function () {
                    return {
                    	'item':item,
                    	'type':type,
                    	'userName':userName,
                    	"version_list":version_list,
                    	'scope':$scope
                    }
                }
             }
        });
	};
	$scope.openBuild_datails = function(build_id) {
		var modalInstance = $uibModal.open({
	         templateUrl:'/static/js/common/build_id_details.html',
	         controller: 'ModalBuildIdCtrl',
	         backdrop: "static",
             //size: size,
             resolve:{
                items1: function () {
                    return {
                    	'build_id':build_id,
                    	'scope':$scope
                    }
                }
             }
        });
	}
})

myApp.controller('ModalInstanceCtrl',function($scope, $uibModalInstance, items1, $http){
    //	文本域校验
	$scope.reason_conf = {
        label:"发布原因:",
        required:true,
    	placeholder:"请输入发布原因",
    	rules:[validator.isEmpty],
    	width:"405px",
    	height:"80px"
    }
	$scope.version_list = items1.version_list;
	$scope.build_id = items1.item.build_id ? items1.item.build_id.name : '';
	$scope.version = items1.item.pangu_ver ? items1.item.pangu_ver.name : '';
	$scope.group = items1.item.except_group_names ? items1.item.except_group_names.name : '';
	$scope.step = items1.item.step ? items1.item.step.name : '';
	$scope.reason = items1.item.reason ? items1.item.reason.render.data.join(",") : '';
	$scope.remark = items1.item.remark ? items1.item.remark.render.data.join(",") : '';
	$scope.isEdit = false;
	var selectedList = [];
	var userName = items1.userName;
	if(items1.type === 'edit') {
		$scope.modal_title = 'BuildID('+$scope.build_id+') - 修改版本信息';
		$scope.isEdit = true;
		selectedList = items1.item.except_group_names ? items1.item.except_group_names.name.split(",") : [];
		$scope.selectedList = selectedList;
	}else{
		$scope.modal_title = '发布新版本';
	}
     var screenHeight = document.documentElement.clientHeight;
     setTimeout(function(){
         var myModal = document.querySelector('.modal-content');
	     myModal.style.top = 150 + 'px';
	     myModal.style.width = 500 + 'px';
     },100)
     //请求数据得到groupList
     $scope.getGroupList = function() {
 	  	return $http({
            method: 'get',
            url:'/api/v1/list_group?detail=0'
        }).then(function(data,status){
        	if(data.data) {
        		$scope.groupList = data.data;
        	}
        })
     }
     $scope.getGroupList();
    // 发布新版本 buildId改变时，重新获取version
    $scope.changeBuildId=function(){
      // '/api/v1/'+cluster+'/'+reqStr+'?cmd=lsbm';
      $http({
        method: 'GET',
        url:'/api/v1/get_apsara_ver?build_id='+$scope.build_id
      }).then(function(data,status){
        if(data.data) {
          $scope.version = data.data[$scope.build_id];
        }
      }).catch(function(data){
        console.log(data)
      })
    }
    //select 多选测试
	   $scope.selectChange = function(data) {
  	 	if(selectedList.indexOf(data.data) == -1) {
  	 		selectedList.push(data.data);
  	 	}
	 	 $scope.selectedList = selectedList;
	   }
	 $scope.deletSelect = function(data) {
	 	var index = selectedList.indexOf(data.selected)
	 	selectedList.splice(index, 1);
	 	$scope.selectedList = selectedList;
	 }
	 
     $scope.ok = function () {
     	$scope.reason_action = "submit";
        var groupStr = $scope.selectedList ? $scope.selectedList.join(",") : '';
        if(items1.type === 'edit') {
        	if($scope.reason_pass) {
	        	$uibModalInstance.close();
	        	var verStr = $scope.version ? $scope.version : '';
	        	var reasonStr = $scope.reason ? $scope.reason : '';
	        	var remarkStr = $scope.remark ? $scope.remark : '';
	          	return $http({
		            method: 'post',
		            url:'/api/v1/pangu_ver_post',
		            headers: {'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'},
		            data:"owner="+ userName +"&save_type=modify&build_id=" + $scope.build_id + "&pangu_ver=" + verStr + "&except_group_names=" + groupStr + "&step=" + $scope.step + "&reason=" + reasonStr + "&remark=" + remarkStr 
		        }).then(function(data,status){
		            items1.scope.getPanguVerData();
		            if(data.data.err) {
		            	alert("修改失败")
		            }
		        }).catch(function(data,status){
		        	alert("修改失败")
		        })
	        }
        }else{
    		if($scope.reason_pass) {
    			$uibModalInstance.close();
	        	return $http({
		            method: 'post',
		            url:'/api/v1/pangu_ver_post',
		            headers: {'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'},
		            data:"owner="+ userName +"&save_type=create&build_id=" + $scope.build_id + "&pangu_ver=" + ($scope.version ? $scope.version :"")+ "&except_group_names=" + groupStr + "&step=" + $scope.step + "&reason=" + $scope.reason + "&remark=" + $scope.remark
		        }).then(function(data,status){
		            items1.scope.getPanguVerData();
		            if(data.data.err) {
		            	alert("发布失败:" + data.data.err)
		            }
		        }).catch(function(data,status){
		        	alert("发布失败：" + data.data.err)
		        })
	        }
        }
     };
     $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
     };
     searchSelectFixBug();
});

myApp.controller('ModalBuildIdCtrl',function($scope, $uibModalInstance, items1, $http){
	 var build_id = items1.build_id;
     var screenHeight = document.documentElement.clientHeight;
     setTimeout(function(){
         var myModal = document.querySelector('.modal-content');
	     myModal.style.top = 150 + 'px';
	     myModal.style.width = 500 + 'px';
     },100)
     //请求数据得到groupList
     $scope.getGroupList = function() {
     	  	return $http({
	            method: 'get',
	            url:'/api/v1/get_apsara_ver_by_fastwork?build_id='+build_id
	        }).then(function(data,status){
	        	if(data.data) {
	        		var arr = data.data.message.split("\n");
	        		var result = [];
	        		function sortErr(arr, key) {
	        			if(arr.length) {
		        			var push = false
		        			arr.map(function(item, index) {
		        				if(item[0] === '[' && item.indexOf(key) > -1) {
		        					push = true;
		        				}
		        				if(push) {
		        					result.push(item);
		        				}
		        				if(push && item === '') {
		        					push = false;
		        				}
		        			})
		        		}
	        		}
	        		sortErr(arr, "pangu");
	        		sortErr(arr, "nuwa");
	        		sortErr(arr, "base");
	        		sortErr(arr, "common");
                    arr.map(function(item, index) {
                    	if(result.indexOf(item) === -1) {
                    		result.push(item);
                    	}
                    })
                    //标红处理
                    function handleCol() {
                    	var pangu = false;
                    	result.map(function(item, index) {
	                    	if(item[0] === '[' && item.indexOf("pangu") > -1) {
	        					pangu = true;
	        				}
	        				if(pangu && item === '') {
	        					pangu = false;
	        				}
	        				if(pangu) {
	        					result[index] = {
	        						"text":item,
	        						"color":"red"
	        					}
	        				}else{
	        					result[index] = {
	        						"text":item,
	        						"color":""
	        					}
	        				}
	                    })
                    }
                    handleCol();
	        		$scope.build_id_details = result;
	        	}
	        })
     }
     $scope.getGroupList();
     $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
     };
});

function searchSelectFixBug() {
  	setTimeout(function() {
  		var Document = document.querySelector(".modal-content");
	    var search_result_box_list = document.querySelectorAll(".search-result-box");
		var search_input_list = document.querySelectorAll(".search-select-content .search-input");
		search_input_list = Array.prototype.slice.call(search_input_list);
		search_result_box_list = Array.prototype.slice.call(search_result_box_list);
		Document.onclick = function() {
			search_result_box_list.map(function(item) {
				item.style.display = 'none';
			})
		}
        search_input_list.map(function(item) {
		    item.onfocus = function(e) {
	    	    e.stopPropagation();
		        setTimeout(function() {
		        	search_result_box_list.map(function(item1) {
			    		item1.style.display = 'block';
					})
		        },200)
			}
		})
	}, 200)
}