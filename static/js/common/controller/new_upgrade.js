myApp.controller('upgradeCtrl', function($scope, $http, $uibModal) {
    $scope.mapsParam = get_pangu_urlParameter(window.location.href);
    $scope.isShowSearch = false;
    $scope.isShowSearch_all_cluster = false;
    $scope.searchType = "精确查询";
    $scope.searchType_current_upgrade_list = "模糊查询";
    $scope.searchType_all_cluster = "精确查询";
    $scope.searchType_all_cluster_current = "模糊查询";
    $scope.baseInfo_group = $scope.mapsParam.group;
    $scope.upgradeData_loading = true;
    $scope.baseInfoTableData_loading = true;
    $scope.all_cluster_status_tableData_loading = true;
    $scope.group_page_table = false;
//  group_page
    if(!$scope.mapsParam.tag) {
    	$scope.upgrade_list = true;
    	$scope.show_upgrade_detail_list = false;
    }
    //url有tag参数
    if($scope.mapsParam.tag) {
    	$scope.upgrade_list = false;
    	$scope.show_upgrade_detail_list = true;
    }
    $scope.exactSearch = function() {
    	$scope.isShowSearch = !$scope.isShowSearch;
        $scope.searchType = $scope.isShowSearch ? '模糊查询' : '精确查询';
        $scope.searchType_current_upgrade_list =  $scope.isShowSearch ? '精确查询' : '模糊查询';
    }
    $scope.all_cluster_search = false;
    $scope.exactSearch_all_cluster = function() {
    	$scope.all_cluster_search = !$scope.all_cluster_search;
        $scope.searchType_all_cluster = $scope.all_cluster_search ? '模糊查询' : '精确查询';
        $scope.searchType_all_cluster_current = $scope.all_cluster_search ? '精确查询' : '模糊查询';
    }
     var upgrade_list_thead = [
        {"showName":"#","tbodyKey":"index","width":"45px"},
        {"showName":"升级名称","tbodyKey":"tag"},
        {"showName":"业务线","tbodyKey":"group","width":"100px"},
        {"showName":"负责人","tbodyKey":"owner"},
        {"showName":"创建时间","tbodyKey":"create_time"},
        {"showName":"版本","tbodyKey":"upgrade_mod_ver"},
        {"showName":"升级排期","tbodyKey":"step_date_json"},
        {"showName":"报备状态","tbodyKey":"changefree"},
        {"showName":"环境检查","tbodyKey":"group_name"},
        {"showName":"进度","tbodyKey":"upgPro","width":"100px"},
        {"showName":"操作","tbodyKey":"action","width":"110px"}
    ];
    //精确查找
    $scope.submit = function() {
        var tbodyData = searchUpgradeData("", "ones")
      	$scope.upgradeData = {
			"theadData":upgrade_list_thead,
		    "tbodyData":tbodyData
		}
      	
    }
    //upgrade——list 模糊查询
    $scope.selectName = function(data) {
    	//$scope.sourceSearchUpgradeData
    	// var tbodyData = vagueTable($scope.searchData, data);
        var tbodyData =searchUpgradeData(data,"all")
    	$scope.upgradeData = {
			"theadData":upgrade_list_thead,
		    "tbodyData":tbodyData
		}
    };
    function searchUpgradeData(str,type){
        var resultData=[];
        if(type=="all"){
            $scope.sourceSearchUpgradeData.map(function(item,index){
                if(item.allSourchStr.search(str)!== -1){
                    resultData.push($scope.searchData[index]);
                };
            });
        }else if(type=="ones"){
            var group = $scope.group;
            var tag = $scope.tag;
            var pangu_ver = $scope.pangu_ver;
            $scope.sourceSearchUpgradeData.forEach(function(item,index){
                var tabBool=false;
                var groupBool=false;
                var pangu_verBool=false;
                if(!tag||((item.title.search(tag)!== -1)&&tag)){
                    tabBool=true;
                }
                if(group.length==0||((item.group_name.search(group.join())!== -1)&&group.length!=0)){
                    groupBool=true;
                }
                if(!pangu_ver||((item.version.search(pangu_ver)!== -1)&&pangu_ver)){
                    pangu_verBool=true;
                };
                if(tabBool==true&&groupBool==true&&pangu_verBool==true){
                    resultData.push($scope.searchData[index]);
                }
            })
        }
        return resultData
    }
    //所有集群升级状态表头
    var theadArr = [
        {"showName":"集群名","tbodyKey":"cluster","width":"80px"},
        {"showName":"业务线","tbodyKey":"group","width":"80px"},
        {"showName":"天基域","tbodyKey":"tianji_region","width":""}
    ]
	if($scope.mapsParam.group === "ECS") {
		theadArr.push({"showName":"自定义域","tbodyKey":"custom_region","width":""});
		theadArr.push({"showName":"IO","tbodyKey":"io","width":""})
	}
	var restThead = [
	     {"showName":"Tag","tbodyKey":"tag","width":""},
         {"showName":"集群描述","tbodyKey":"cluster_decs","width":"120px"},
         {"showName":"集群状态","tbodyKey":"cluster_status","width":""},
         {"showName":"版本","tbodyKey":"all_version","width":"90px"},
         {"showName":"升级排期","tbodyKey":"upgrade_schedule","width":""},
         {"showName":"升级日期","tbodyKey":"upgrade_date","width":""},
         {"showName":"升级状态","tbodyKey":"upgrade_status","width":""},
         {"showName":"Comments","tbodyKey":"comments","width":""},
         {"showName":"操作","tbodyKey":"action","width":""},
         {"showName":"rowkey","tbodyKey":"rowKey","width":""}
	]
    var theadData_all_cluster_status = theadArr.concat(restThead);
    //所有的集群升级状态精确查找
    $scope.allClusterSearch = function() {
    	var cluster = $scope.cluster_key;
    	var group = $scope.group_key;
    	var tianji_region = $scope.tianji_region_key;
    	var tag = $scope.tag_key;
    	var cluster_desc = $scope.cluster_desc_key;
    	var cluster_status = $scope.cluster_status_key;
    	var upgrade_status = $scope.upgrade_status_key;
    	var user_defined_region = $scope.user_defined_region_key;
    	var version = $scope.version_key;
    	var comments = $scope.comments_key;
    	var upgrade_schedule = $scope.upgrade_schedule_key;
//  	var cluster_status = $scope.cluster_status_key;
    	var upgrade_start_time = $scope.upgrade_start_time ? getDateStr1($scope.upgrade_start_time) : '';
    	var upgrade_end_time = $scope.upgrade_end_time ? getDateStr1($scope.upgrade_end_time) : '';
    	var tbodyData = [];
      	var searchKeyMap = [
	      	{
	      		"key":cluster,
	      		"id":"cluster",
	      		"searchType":"vague"
	      	},
	      	{
	      		"key":group,
	      		"id":"group",
	      		"searchType":"accurate"
	      	},
	      	{
	      		"key":tianji_region,
	      		"id":"tianji_region",
	      		"searchType":"vague"
	      	},
	      	{
	      		"key":tag,
	      		"id":"tag",
	      		"searchType":"vague"
	      	},
	      	{
	      		"key":cluster_desc,
	      		"id":"cluster_decs",
	      		"searchType":"vague"
	      	},
	      	{
	      		"key":cluster_status,
	      		"id":"cluster_status",
	      		"searchType":"accurate"
	      	},
	      	{
	      		"key":user_defined_region,
	      		"id":"custom_region",
	      		"searchType":"vague"
	      	},
	      	{
	      		"key":version,
	      		"id":"all_version",
	      		"searchType":"vague"
	      	},
	      	{
	      		"key":comments,
	      		"id":"comments",
	      		"searchType":"vague"
	      	},
	      	{
	      		"key":upgrade_schedule,
	      		"id":"upgrade_schedule",
	      		"searchType":"accurate"
	      	},
	      	{
	      		"key":upgrade_status,
	      		"id":"upgrade_status",
	      		"searchType":"accurate"
	      	}
//	      	{
//	      		"key":upgrade_start_time + upgrade_end_time,
//	      		"id":"upgrade_date",
//	      		"searchType":"vague",
//	      		"searchFrom":'first'
//	      	}
      	];
      	if(!user_defined_region) {
      		tbodyData = multiFilter($scope.searchData_all_cluster_status, searchKeyMap);
      	}
      	//对时间的单独处理
      	function filterByTime(data) {
      		var tbodyData_filter_time = [];
	      	data.map(function(item) {
	      		var start = item.upgrade_date.name.start;
	      		var end = item.upgrade_date.name.end;
	      		var isPush = true;
	      		if(upgrade_start_time && upgrade_start_time !== start) {
	      			isPush = false;
	      		}
	      		if(upgrade_end_time && upgrade_end_time !== end) {
	      			isPush = false;
	      		}
	      		if(isPush) {
	      			tbodyData_filter_time.push(item);
	      		}
	      	})
	      	return tbodyData_filter_time;
      	}
      	tbodyData = filterByTime(tbodyData);
      	$scope.all_cluster_status_tableData = {
			"theadData":theadData_all_cluster_status,
		    "tbodyData":tbodyData,
		    "checkBox":{
				"showCheckBox":true,
				"width":"40px"
			},
			"showFanxuanBtn":true
		}
    }
    $scope.search_accu_all_cluster = function(data) {
    	var tbodyData = vagueTable($scope.searchData_all_cluster_status, data);
    	$scope.all_cluster_status_tableData = {
			"theadData":theadData_all_cluster_status,
		    "tbodyData":tbodyData,
		    "checkBox":{
				"showCheckBox":true,
				"width":"40px"
			},
			"showFanxuanBtn":true
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
            $scope.userId = data.data.uid;
    	})
    }
    $scope.getUserInfo();
    //权限
    $scope.getPrivileage = function() {
    	return $http({
    		method: 'GET',
	        url:"/api/v1/get_privileage?name=upgrade"
    	}).then(function(data, status) {
    		if(data.data.enable) {
    			$scope.hasPrivileage = true;
    		}else{
    			$scope.hasPrivileage = false;
    		}
    		//测试用
    		//$scope.hasPrivileage = true;
    	})
    }
    $scope.getPrivileage();
    
    $scope.openDetailsUpgradeInfo = function(data) {
        // http://pangu.aliyun-inc.com:38083/env_check?type=group&group={NAS}
        if(data.action.key=="upgrade_mod_ver"){
            window.open("http://pangu.aliyun-inc.com:38083/pangu_ver?buildId="+data.action.name);
        }else if(data.action.key=="changefreeKey"){
            window.open("http://pangu.aliyun-inc.com:38083/show_changefree?tag="+data.action.title);
        }else if(data.action.key=="groupNameKey"){
            window.open("http://pangu.aliyun-inc.com:38083/env_check?type=group&group="+data.action.name);
        }else if(data.key=="tag"){
            var group = data.rowData.group.name;
            var tag = data.rowData.tag.name;
            $scope.upgrade_list = false;
            window.location = "/upgrade?tag="+tag+"&group="+ group;
        }else if(data.action=="编辑"){
            getUpgradeCfgCaseInfo(data.rowData);
        }
    };
    function getUpgradeCfgCaseInfo(indata){
        var group = indata.group.name;
        var tag = indata.tag.name;
        var descVer=indata.upgrade_mod_ver.descVer;
        var initObj={};
        initObj.master_expect_ver=dealTablebodyObj(descVer.PanguMaster);
        initObj.chunkserver_expect_ver=dealTablebodyObj(descVer.PanguChunkserver);
        initObj.supervisor_expect_ver=dealTablebodyObj(descVer.PanguSupervisor);
        initObj.moniter_expect_ver=dealTablebodyObj(descVer.PanguMonitor);
        initObj.tools_expect_ver=dealTablebodyObj(descVer.PanguTools);
        initObj.bm=dealTablebodyObj(descVer.PanguBlockMaster);
        initObj.bs=dealTablebodyObj(descVer.PanguBlockServer);
        initObj.bgc=dealTablebodyObj(descVer.PanguBlockGCWorker);
        initObj.PanguSnapshotServer=dealTablebodyObj(descVer.PanguSnapshotServer);
        var descVer=indata.upgrade_mod_ver.descVer;
        $http({
            method: 'GET',
            url:"/api/v1/upgrade_ver_basic_info?tag="+tag+"&group="+group
        }).then(function(data,status){
            var schedulingTime = data.data.one_tag_upgrade && data.data.one_tag_upgrade.step_date_json ? data.data.one_tag_upgrade.step_date_json : {};
            $scope.openModifyUpgradeDialog(initObj, {"group":group,"tag":tag,"schedulingTime":schedulingTime,"upgradeGruopList":$scope.upgradeGruopList});
        }).catch(function(data) {
            console.log(data)
        })
        

    }
    // 获取upgrade所有数据
    $scope.getUpgradeData = function(){
	    var Url = '';
	    if(!$scope.mapsParam.group && !$scope.mapsParam.tag) {
	        Url = '/api/v1/upgrade_ver_list'
	    }
	    if($scope.mapsParam.group && !$scope.mapsParam.tag) {
	      	Url = '/api/v1/upgrade_ver_list?group='+ $scope.mapsParam.group
	    }
	    return $http({
	        method: 'GET',
	        url:Url
	    }).then(function(data){
	    	$scope.upgradeData_loading = false;
	    	//"2018-04-26 11:39:11"转化为Date对象
	        function compare(x, y) {
	      		if (x.group_upgrade_list.create_time > y.group_upgrade_list.create_time){
		    		return -1;
		    	}else if (x.group_upgrade_list.create_time < y.group_upgrade_list.create_time){
		    		return 1;
		    	}else{
		    		return 0;
		    	}
	      	}
	      	var sources_data = data.data.sort(compare);
	        dealgetUpgradeData(data.data);
	        $scope.upgradeListData = data.data;
	    }).catch(function(data){
	        $scope.upgradeData_loading = false;
	    })
    }
    $scope.getUpgradeData();
    function dealVerStr(str){
        var endStr="";
        switch(str){
            case "PanguTools":endStr="Tools";
            break;
            case "PanguMonitor":endStr="MO";
            break;
            case "PanguSupervisor":endStr="SV";
            break;
            case "PanguChunkserver":endStr="CS";
            break;
            case "PanguMaster":endStr="MS";
            break;
            case "PanguBlockGCWorker":endStr="BGC";
            break;
            case "PanguSnapshotServer":endStr="BSS";
            break;
            case "PanguBlockServer":endStr="BS";
            break;
            case "PanguBlockMaster":endStr="BM";
            break;
        }
        return endStr;
    }
    // 排序
    function compareTo(name,order,type) {  
      return function(o, p) {  
        var a="", b="";  
        if (typeof o === "object" && typeof p === "object" && o && p) {
            if(type=="create_time"){
                a=o.group_upgrade_list[name]?o.group_upgrade_list[name]:"";
                b=p.group_upgrade_list[name]?p.group_upgrade_list[name]:"";
            }else if(type=="sortStepDate"){
                a=o[0][name]?o[0][name]:"";
                b=p[0][name]?p[0][name]:"";
            };
            
            if (a === b) { 
                return 0;  
            }
            if(order=="des"){
                if(!isNaN(Number(a))&&!isNaN(Number(b))){  
                    return Number(a) < Number(b) ? -1 : 1;  
                }  
                if (typeof a === typeof b) {  
                    return a < b ? -1 : 1;  
                }
            };
            if(order=="asc"){
                if(!isNaN(Number(a))&&!isNaN(Number(b))){    
                    return Number(a) > Number(b) ? -1 : 1;  
                }  
                if (typeof a === typeof b) {  
                    return b < a ? -1 : 1;  
                }  
            } 
            return typeof a < typeof b ? -1 : 1;  
        }  
      };  
    }
    // 定义搜索源数据
    $scope.sourceSearchUpgradeData=[];
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
        "new_cluster":"新增集群",
        "no_set_upgrade":"不升级",
        "is_upgraded":"已升级"
    };
    function afterSortChange(data){
        for(var i=0;i<data.length;i++){
            for(var j=0;j<data[i].length;j++){
                var name=data[i][j].name.split(":")[0];
                var oname=data[i][j].name.split(":")[1]
                data[i][j].name=(dataMap[name]?(dataMap[name]+":"+oname):name)
            }
        };
        return data
    }
    function dealgetUpgradeData(data){
        if(!data){
            return
        };
        var tbodyData = [];
        var sortData=data.sort(compareTo("create_time","asc","create_time"));
        sortData.map(function(item, index){
            var sourceSearchUpgradeStr={};//拼接单个源数据
            sourceSearchUpgradeStr.title=item.title;
            sourceSearchUpgradeStr.group_name=item.group_upgrade_list.group_name;
            sourceSearchUpgradeStr.version="";
            sourceSearchUpgradeStr.allSourchStr="";
            sourceSearchUpgradeStr.allSourchStr+=item.title+'\b';
            sourceSearchUpgradeStr.allSourchStr+=item.group_upgrade_list.group_name+'\b';
            sourceSearchUpgradeStr.allSourchStr+=item.owner+'\b';
            sourceSearchUpgradeStr.allSourchStr+=item.group_upgrade_list.create_time+'\b';
            var upgradeGruopList = [];
            var obj={};
            obj.index=dealTablebodyObj(index+1);
            obj.tag=dealTablebodyObj(item.title);
            obj.tag.click=true;
            obj.group=dealTablebodyObj(item.group_upgrade_list.group_name);
            obj.owner=dealTablebodyObj(item.group_upgrade_list.owner);
            obj.create_time=dealTablebodyObj(item.group_upgrade_list.create_time);          
            // 处理版本数据，使之可点击跳转
            var upgrade_mod_verArr=[];
            modVerData=item.group_upgrade_list.upgrade_mod_ver;
            // MS,CS,SV,Mo,Tools,BM,BS,BGC,BSS
            var sourceVerArr=["PanguMaster","PanguChunkserver","PanguSupervisor",
            "PanguMonitor","PanguTools","PanguBlockMaster","PanguBlockServer",
            "PanguBlockGCWorker","PanguSnapshotServer"]
            // for(var i in modVerData){
            sourceVerArr.map(function(VerArrKey){
                var versionArr=[];
                var versionObj1={};
                versionObj1.name=dealVerStr(VerArrKey)+":";
                versionObj1.click=false;
                versionArr.push(versionObj1);
                var versionClickArr=[];
                versionClickArr=modVerData[VerArrKey]?modVerData[VerArrKey].split(","):[];
                for(var j=0;j<versionClickArr.length;j++){
                    var versionClick={};
                    versionClick.name=versionClickArr[j];
                    versionClick.click=true;
                    versionClick.key="upgrade_mod_ver";
                    versionArr.push(versionClick);
                    if(j+1!=versionClickArr.length){
                        versionArr.push({"name":",","click":false});
                    }
                };
                if(modVerData[VerArrKey]){
                   upgrade_mod_verArr.push(versionArr); 
                   sourceSearchUpgradeStr.version+=modVerData[VerArrKey]+'\b';
                   sourceSearchUpgradeStr.allSourchStr+=modVerData[VerArrKey]+'\b';
                }
                
            })
            obj.upgrade_mod_ver={"render":{"versionData":upgrade_mod_verArr}};
            obj.upgrade_mod_ver.descVer=modVerData;
            //升级排期数据处理
            var step_date_json=item.group_upgrade_list.step_date_json;
            var step_date_jsonArr=[];
            for(var i in step_date_json){
                var stepArr=[];
                var objStep={};
                objStep.name=i+":"+step_date_json[i];
                // objStep.name=dataMap[i]+":"+step_date_json[i];
                objStep.click=false;
                stepArr.push(objStep);
                step_date_jsonArr.push(stepArr);
                sourceSearchUpgradeStr.allSourchStr+=i+":"+step_date_json[i]+'\b';
            };
            var sortStepDate=step_date_jsonArr.sort(compareTo("name","des","sortStepDate"));
            var sortStepDate1=afterSortChange(sortStepDate);
            obj.step_date_json={"render":{"versionData":sortStepDate1}};
            // 报备状态数据处理
            var changefreeArr=[];
            var changefree=item.group_upgrade_list.changefree;
            for(var i in changefree){
                var chFArr=[];
                var chFObj1={};
                chFObj1.name=i+":";
                // chFObj1.name=dataMap[i]?dataMap[i]:+":";
                chFObj1.click=false;
                chFArr.push(chFObj1);
                var chFObj2={};
                chFObj2.name=changefree[i];
                chFObj2.click=true;
                chFObj2.key="changefreeKey";
                chFObj2.title=item.title;
                chFArr.push(chFObj2);
                changefreeArr.push(chFArr);
                sourceSearchUpgradeStr.allSourchStr+=i+":"+changefree[i]+'\b';
            };
            var sortchangefree=changefreeArr.sort(compareTo("name","des","sortStepDate"));
            var sortchangefree1=afterSortChange(sortchangefree);
            obj.changefree={"render":{"versionData":sortchangefree1}};
            // 环境检查数据处理
            var group_nameArr=[];
            var sourceGroupNameArr=item.group_upgrade_list.group_name?item.group_upgrade_list.group_name.split(","):[];
            sourceGroupNameArr.map(function(gNkey){
                var gNArr=[];
                var gNObj={};
                gNObj.name=gNkey;
                gNObj.click=true;
                gNObj.key="groupNameKey";
                gNArr.push(gNObj);
                group_nameArr.push(gNArr);
            });
            obj.group_name={"render":{"versionData":group_nameArr}};
            obj.action={
               "button":["编辑"],"group":item.title? item.title : '' 
            };
            var upgProNum=item.group_upgrade_list.total_up_cluster_count/item.group_upgrade_list.total_need_cluster_count;
            upgPro=upgProNum?upgProNum:0;
            obj.upgPro={};
            obj.upgPro.name=(upgPro*100).toFixed(3)+ "%" + '\n\r' +'('+item.group_upgrade_list.total_up_cluster_count + '/'+ item.group_upgrade_list.total_need_cluster_count+')';

            tbodyData.push(obj);
            $scope.sourceSearchUpgradeData.push(sourceSearchUpgradeStr);
        })
    	$scope.searchData = tbodyData;
    	$scope.upgradeData = {
    		"theadData":upgrade_list_thead,
		    "tbodyData":tbodyData,
		    "closeSelectInput":true,
		    "upgradeData_loading":'loaded'
    	};
    }
    //"2018-04-26 11:39:11"转化为Date对象
    function tranStrToDate(str) {
    	var date = new Date(str); 
    }
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
    //创建新的版本升级
    $scope.createUpgradeVer = function(data) {
    	//console.log(data, 'data')
    	$scope.open(data, $scope.upgradeGruopList, $scope.userName,$scope.userId)
    }
    //查看非016页面
    $scope.upgardeBaseInfoTitle = decodeURIComponent($scope.mapsParam.tag) + "-升级基本信息";
	$scope.isShowBaseInfoTitle = false;
	//配置升级基本信息表格
	$scope.editBaseInfo = function(data) {
    	//console.log(data, data);
    	$scope.openModifyUpgradeDialog(data.rowData, {"group":$scope.mapsParam.group,"tag":$scope.mapsParam.tag,"schedulingTime":$scope.schedulingTime,"upgradeGruopList":$scope.upgradeGruopList});
    }

    $scope.getUpgrade_cfg_baseInfo = function() {
    	return $http({
	        method: 'GET',
	        url:"/api/v1/upgrade_ver_basic_info?tag="+$scope.mapsParam.tag+"&group="+$scope.mapsParam.group
	    }).then(function(data,status){
	    	$scope.baseInfoTableData_loading = false;
	    	if(!data.data.err) {
	    		$scope.remark_show = data.data.one_tag_upgrade && data.data.one_tag_upgrade.remark ? data.data.one_tag_upgrade.remark.split("\n") : [];
	    		//console.log($scope.remark_show, "remark_show")
		    	if($scope.remark_show === "undefined") {
		    		$scope.remark_show = [];
		    	}
		    	var baseInfoData =  handleUpgradeBaseInfoData(data.data);
		    	$scope.schedulingTime = data.data.one_tag_upgrade && data.data.one_tag_upgrade.step_date_json ? data.data.one_tag_upgrade.step_date_json : {};
		    	$scope.baseInfoTableData = {
        			"theadData":[
				         {"showName":"升级进度","tbodyKey":"total_upgrade_step","width":""},
				         {"showName":"不升级集群","tbodyKey":"not_need_upgrade_clusters","width":""},
			             {"showName":"新增集群","tbodyKey":"new_add_clusters","width":""},
			             {"showName":"MS","tbodyKey":"master_expect_ver","width":""},
			             {"showName":"CS","tbodyKey":"chunkserver_expect_ver","width":""},
			             {"showName":"Sup","tbodyKey":"supervisor_expect_ver","width":""},
			             {"showName":"Mon","tbodyKey":"moniter_expect_ver","width":""},
			             {"showName":"Tools","tbodyKey":"tools_expect_ver","width":""},
			             {"showName":"BM","tbodyKey":"bm","width":""},
			             {"showName":"BS","tbodyKey":"bs","width":""},
			             {"showName":"BGC","tbodyKey":"bgc","width":""},
			             {"showName":"BSnapshot","tbodyKey":"PanguSnapshotServer","width":""},
			             {"showName":"负责人","tbodyKey":"owner","width":""},
			             {"showName":"操作","tbodyKey":"action","width":""}
			        ],
			        "tbodyData":baseInfoData,
			        "showSortIconData":true
	            }
		    	//处理所有集群状态数据
	    	}
	    }).catch(function() {
	    	$scope.baseInfoTableData_loading = false;
	    })
    }
    if($scope.mapsParam.tag) {
    	$scope.getUpgrade_cfg_baseInfo();
    }
    function handleUpgradeBaseInfoData(data) {
    	var arr = []
    	if(data) {
			var obj = {};
			obj.total_upgrade_step = {
				"name":data.upgrade_process_rate+ "%" + '\n\r' +'('+data.upgraded_cluster_count + '/'+ data.total_cluster_count+')',
			}
			obj.not_need_upgrade_clusters = {
				"name":data.no_upgrade_cluser_count || data.no_upgrade_cluser_count === 0 ? data.no_upgrade_cluser_count : ''
			}
			obj.new_add_clusters = {
				"name":data.new_cluser_count ? data.new_cluser_count : ''
			};
            obj.master_expect_ver = {
            	"name":data.one_tag_upgrade && data.one_tag_upgrade.PanguMaster ? data.one_tag_upgrade.PanguMaster : ''
            }
            obj.chunkserver_expect_ver = {
            	"name":data.one_tag_upgrade.PanguChunkserver ? data.one_tag_upgrade.PanguChunkserver : ''
            }
            obj.supervisor_expect_ver = {
            	"name":data.one_tag_upgrade.PanguSupervisor ? data.one_tag_upgrade.PanguSupervisor : ''
            }
            obj.moniter_expect_ver = {
            	"name":data.one_tag_upgrade.PanguMonitor ? data.one_tag_upgrade.PanguMonitor : ''
            }
            obj.tools_expect_ver = {
            	"name":data.one_tag_upgrade.PanguTools ? data.one_tag_upgrade.PanguTools : ''
            }
            obj.bm = {
            	"name":data.one_tag_upgrade.PanguBlockMaster ? data.one_tag_upgrade.PanguBlockMaster : ''
            }
            obj.bs = {
            	"name":data.one_tag_upgrade.PanguBlockServer ? data.one_tag_upgrade.PanguBlockServer : ''
            }
            obj.bgc = {
            	"name":data.one_tag_upgrade.PanguBlockGCWorker ? data.one_tag_upgrade.PanguBlockGCWorker : ''
            }
            obj.PanguSnapshotServer = {
            	"name":data.one_tag_upgrade.PanguSnapshotServer ? data.one_tag_upgrade.PanguSnapshotServer : ''
            }
			obj.owner = {
				"name":data.one_tag_upgrade && data.one_tag_upgrade.owner ? data.one_tag_upgrade.owner : ''
			};
			obj.action = {"button":$scope.hasPrivileage ? ["编辑"] : []}
			arr.push(obj);

     	}
    	return arr;
    }
    
	$scope.allClustersStatusCfg = "所有集群的升级状态";
	$scope.isAllClustersStatusCfg = false;
	$scope.terminalService = function(data) {
		if(data.action === 'TS') {
			window.open("/terminal_service?host="+ data.rowData.action.name +"&cluster="+data.rowData.cluster.name);
		};
		if(data.action === "审批视图") {
			window.open(data.rowData.action.approve_view_addr);
		};
        if(data.rowData =="button" &&data.action === "edit"){
            $scope.batchModify();
        };
        // 集群名称导出 export
        if(data.rowData =="button" &&data.action === "export"){
            exportClusterName($scope.checkedRows)
        };
        if(data.rowData =="button" &&data.action === "checked_cluster_info"){
            checkedClusterUpgradeInfo($scope.checkedRows);
        };
        if(data.rowData =="button" &&data.action === "check"){
            $scope.envirExamineReport($scope.checkedRows)
        };
        if(data.rowData =="button" &&data.action === "alarm"){
            $scope.alarmSituation($scope.checkedRows)
        };
        if(data.action=="glyphicon glyphicon-pencil"){
            editTable(data);
        };
    };
    function checkedClusterUpgradeInfo(data) {
    	var tag = $scope.mapsParam.tag;
    	if(data.length) {
            var clusterList = [];
            data.map(function(item) {
                clusterList.push(item.checkedRows.cluster.name);
            })
            var clusterStr = clusterList.join(",")
        }else{
            alert("请选择集群!")
            return
        };
        window.open("/upgrade_cluster_status?tag="+ tag +"&cluster="+ clusterStr);
    }
    // 导出集群弹出框，点击复制集群名
    function exportClusterName(data){
        if(data.length) {
            var clusterList = [];
            data.map(function(item) {
                clusterList.push(item.checkedRows.cluster.name);
            })
            var clusterStr = clusterList.join(",")
        }else{
            alert("请选择集群!")
            return
        };
        var clusterObj={};
        clusterObj.name=clusterStr;
        var modalInstance = $uibModal.open({
           templateUrl: '/static/js/module/clickUibModal/clickButton/copeClustersName.html',
           controller: 'copeClustersNameCtrl',
           backdrop: "static",
           size: "",
           resolve: {
               chartData: function () {
                   return clusterObj;
               }
           }
        });
        modalInstance.result.then(function (selectedItem) {
          $scope.getAllClustersUpgradeCfg();
          console.log("编辑成功")
        }, function () {
          console.log("取消编辑")
        });
    };
    // 编辑弹窗
    var copeUpgradeVerBasicInfo={};
    function editTable(data){
      var user_def_tag=copeUpgradeVerBasicInfo[data.rowData.cluster.name].user_def_tag_map;
      if(user_def_tag=="ecs"){
        user_def_tag={
          "region": "",
          "io_type": "",
          "desc": ""
        }
      }else if(!user_def_tag||JSON.stringify(user_def_tag)=="{}"){
        user_def_tag={
          "desc": ""
        }
      };
      data.user_def_tag=user_def_tag;
      data.cluster_name=data.rowData.cluster.name;
      var modalInstance = $uibModal.open({
           templateUrl: '/static/js/module/clickUibModal/clickButton/clickVersionButton.html',
           controller: 'versionButtonCtrl',
           backdrop: "static",
           size: "",
           resolve: {
               chartData: function () {
                   return data;
               }
           }
      });
      modalInstance.result.then(function (selectedItem) {
          $scope.getAllClustersUpgradeCfg();
          console.log("编辑成功")
      }, function () {
          console.log("取消编辑")
      });
    };

	$scope.getAllClustersUpgradeCfg = function() {
    	return $http({
	        method: 'GET',
	        url:"/api/v1/upgrade_ver_basic_info?tag="+$scope.mapsParam.tag+"&group="+$scope.mapsParam.group
	    }).then(function(data,status){
	    	$scope.all_cluster_status_tableData_loading = false;
	    	if(!data.data.err) {
                copeUpgradeVerBasicInfo=data.data;//备份返回数据
	    		var allClusterStatus = handleAllClusterUpgradeData(data.data);
	    		$scope.searchData_all_cluster_status = allClusterStatus;
		    	$scope.all_cluster_status_tableData = {
		    		"theadData":theadData_all_cluster_status,
					"tbodyData":allClusterStatus,
					"checkBox":{
						"showCheckBox":true,
						"width":"40px"
					},
					"showFanxuanBtn":true
		    	}
	    	}
	    }).catch(function() {
	    	$scope.all_cluster_status_tableData_loading = false;
	    })
    }
	if($scope.mapsParam.tag) {
    	$scope.getAllClustersUpgradeCfg();
    }
    //背景色列表
    var backGroundColorArr={
        "灰度1":"#d0d0d0",
        "灰度2":"#BEBEBE",
        "灰度3":"#ADADAD",
        "灰度4":"#9D9D9D",
        "升级1":"#D2E9FF",
        "升级2":"#C4E1FF",
        "升级3":"#ACD6FF",
        "升级4":"#97CBFF",
        "升级5":"#84C1FF",
        "升级6":"#66B3FF",
        "升级7":"#46A3FF",
        "升级8":"#2894FF",
        "升级9":"#0080FF",
        "升级10":"#0072E3",
        "新增集群":"#0066CC",
        "不升级":"#005AB5",
        "已升级":"#004B97",
    };
    function handleAllClusterUpgradeData(data) {
    	var arr = [];
    	if(data && data.upgrade_cluster_list && data.upgrade_cluster_list.length) {
    		var upgrade_mod_list = data.upgrade_mod_list;
    		if(data.upgrade_mod_list) {
    			upgrade_mod_list.map(function(item) {
    				item.name = "Pangu"+item.name+"#"
    			})
    		}
    		data.upgrade_cluster_list.map(function(item, index) {
                copeUpgradeVerBasicInfo[item.cluster_name]=item;
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
    			var cluster_status_color = '';
    			if(item.cluster_status === "W") {
    				cluster_status_color = "#F90"
    			}
    			if(item.cluster_status === "E") {
    				cluster_status_color = "#FF00FF"
    			}
    			if(item.cluster_status === "F") {
    				cluster_status_color = "#F00"
    			}
    			if(item.cluster_status === "OK") {
    				cluster_status_color = "#09c"
    			}
    			obj.cluster = {
    				"name":item.cluster_name ? item.cluster_name : '',
    			}
    			obj.group = {
    				"name":item.group_name ? item.group_name : '',
    			}
    			obj.tianji_region = {
    				"name":item.tianji_region  ? item.tianji_region  :'',
    			}
    			if($scope.mapsParam.group === "ECS") {
    				obj.custom_region = {
	    				"name":item.user_def_tag_map && item.user_def_tag_map.region ? item.user_def_tag_map.region :'',
	    			}
	    		    obj.io = {
	    				"name":item.user_def_tag_map.io_type ? item.user_def_tag_map.io_type :'',
	    				"textAlign":"left"
	    			}
    			}
    			obj.tag = {
    				"name":item.tianji_tag ? item.tianji_tag : '',
    				"textAlign":"left"
    			}
    			obj.cluster_decs = {
    				"name":item.desc ? item.desc : "",
    				"textAlign":"left",
                    "a_class":"glyphicon glyphicon-pencil"
    			}
    			obj.cluster_status = {
    				"name":item.cluster_status ? item.cluster_status : '',
    				"trbackground":cluster_status_color,
    				"color":"#fff",
    				"url":"/health?type=cluster&grup="+$scope.mapsParam.group+"&cluster="+item.cluster_name,
    				"title":item.cluster_status_detail ? item.cluster_status_detail : ''
    			}
                var all_version_map = item.all_version_map;
                var arr_mod = [];
                upgrade_mod_list.map(function(item) {
                	var flag = true;
                	for(var key in all_version_map) {
                		if(item.name === key && item.val.length && item.val.indexOf(all_version_map[key]) === -1){
            			   arr_mod.push({
            			   	  "name":item.name,
            			   	  "color":"red"
            			   })
            			   flag = false;
                		}
                	}
                	if(flag) {
                		arr_mod.push({
            				"name":item.name,
            				"color":''
            			})
                	}
                })
                var mod_map = {
                	"PanguChunkserver#":{
                		"name":item.PanguChunkserver_version ? "CS:"+item.PanguChunkserver_version : 'CS:',
                	},
                	"PanguMaster#":{
                		"name":item.PanguMaster_version ? "MS:"+item.PanguMaster_version : 'MS:',
                	},
                	"PanguMonitor#":{
                		"name":item.PanguMonitor_version ? "Mo:"+item.PanguMonitor_version : 'Mo:',
                	},
                	"PanguSupervisor#":{
                		"name":item.PanguSupervisor_version ? "SV:"+item.PanguSupervisor_version : 'SV:',
                	},
                	"PanguTools#":{
                		"name":item.PanguTools_version ? "Tools:"+item.PanguTools_version : 'Tools:'
                	}
                }
                var ver_data = [];
                var ver_data_str = '';
                arr_mod.map(function(item1) {
                	for(var key in mod_map) {
                		if(item1.name === key) {
                			ver_data.push({
                				"name":mod_map[key].name,
                				"color":item1.color
                			})
                			ver_data_str = ver_data_str + mod_map[key].name;
                		}
                	}
                })
                obj.all_version = {
                	"render":{
                        "data":ver_data,
	                	"mark_color":true
                	},
                	"name":ver_data_str
                }
    			obj.upgrade_schedule = {
    				"name":item.step_title ? item.step_title : '',
                    "trbackground":backGroundColorArr[item.step_title],
    			}
    			obj.upgrade_date = {
    				"textAlign":"left",
    				"render":{
    					"data":item.up_status ? ["预计日期:",item.except_upgrade_date, "实际日期:",item.up_status] : ["预计日期:",item.except_upgrade_date]
    				},
    				"name":{
    					"start":item.except_upgrade_date,
    					"end":item.up_status
    				}
    			}
    			obj.upgrade_status = {
    				"name":up_status_step_code,
    				"trbackground":tr_background,
    			}
    			//comments的处理，有\n则换行
    			
    			obj.comments = {
    			//	"name":item.remark ? item.remark : '',
    				"render":{
    					"data":item.remark ? item.remark.split("\n") : []
    				},
    				"textAlign":"left",
    				"name":item.remark
    			}
    			obj.action = {
    				"name":item.ag ? item.ag : '',
    				"button":["TS","审批视图"],
    				"approve_view_addr":item.approve_view_addr ? item.approve_view_addr : ''
    			}
    			obj.rowKey = {
    				"name":index + 1,
    				"checkedKey":false,
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
	    	window.location = "/env_check?type=report_group&group="+$scope.mapsParam.group+"&cluster="+ clusterList
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
	    	window.location = "/monitor?type=group&group="+$scope.mapsParam.group+"&cluster="+ clusterList
    	}else{
    		alert("请选择集群!")
    	}
    
    }
	$scope.remarkTitle = decodeURIComponent($scope.mapsParam.tag) + "-备注";
	$scope.isShowRemarkTitle = false;
	$scope.edit_btn = "编辑";
    $scope.isShowSaveBtn = false;
    $scope.editRemark = function() {
    	if($scope.edit_btn === "编辑") {
    		$scope.edit_btn = "取消编辑"
    		$scope.isShowSaveBtn = true;
    		$scope.remark = $scope.remark_show.join('\n');
    	}else{
    		$scope.edit_btn = "编辑"
    		$scope.isShowSaveBtn = false;
    	}
    }
    $scope.saveRemark = function() {
    	return $http({
            method: 'post',
            url:'/api/v1/upgrade_edit_remark_post',
            headers: {'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'},
            data:"tag=" + $scope.mapsParam.tag + "&group=" + $scope.mapsParam.group + "&remark=" + $scope.remark
       }).then(function(data,status){
        	$scope.remark_show = $scope.remark ? $scope.remark.split('\n') : [];
        //	alert("修改备注成功")
        	$scope.edit_btn = "编辑";
    	    $scope.isShowSaveBtn = false;
//    	    $scope.getUpgrade_cfg_baseInfo();
        }).catch(function(data,status){
        	alert("修改备注失败")
        })
    }
	//弹框
    $scope.open = function (item, upgradeGruopList, userName,userId) {
    	$scope.dialogData = item;
	    var modalInstance = $uibModal.open({
	         templateUrl:'/static/js/common/controller/upgrade_ver_dialog.html',
	         controller: 'ModalInstanceCtrl',
	         backdrop: "static",
             //size: size,
             resolve:{
                items1: function () {
                    return {
                    	'item':item,
                    	"userName":userName,
                        "userId":userId,
                    	"upgradeGruopList":upgradeGruopList,
                    	'scope':$scope
                    }
                }
             }
        });
	};
	$scope.openModifyUpgradeDialog = function(item, paramter) {
		var modalInstance = $uibModal.open({
	         templateUrl:'/static/js/common/controller/upgrade_ver_modify_dialog.html',
	         controller: 'ModalInstanceModityCtrl',
	         backdrop: "static",
           //  size:'sm',
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
	         templateUrl:'/static/js/common/controller/upgrade_ver_batchModify_dialog.html',
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
		window.location = "/upgrade";
//		window.location = "/new_upgrade?group="+data;
	}
	//修改升级信息的二次确认框
	$scope.againConfirmModifyDialog = function(item) {
		var modalInstance = $uibModal.open({
	        templateUrl:'/static/js/common/controller/upgrade_ver_modify_confirm.html',
	        controller: 'againConfirmCtrl',
	        backdrop: "static",
            size:'sm',
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
	$scope.group_key_upgrade = "group_key_upgrade";
	$scope.group_key_upgrade_tag = "group_key_upgrade_tag";
    $scope.openModal = function(data) {
		var obj = {
			"group":$scope.group,
			"group_key":$scope.group_key,
		}
		var default_data = [];
		var key_map = [{"name":"group","key":"group_key_upgrade"},{"name":"group_key","key":'group_key_upgrade_tag'}]
		if(key_map && key_map.length) {
			key_map.map(function(item) {
				if(item.key === data.selectKey) {
					default_data = obj[item.name]
				}
			})
		}
	    $scope.openMasterModal($scope.upgradeGruopList, 'sm', data.selectKey, default_data);
	}
		
	$scope.openMasterModal = function (groupList, size, key, default_data) {
	    var modalInstance = $uibModal.open({
	         templateUrl:'/static/js/common/controller/multiSelect.html',
	         controller: 'ModalStepsHandleCtrl',
	         backdrop: "static",
            // size:size,
             resolve:{
                items1: function () {
                    return {
                    	'scope':$scope,
                    	"groupList":groupList,
                    	'key':key,
                    	'default_data':default_data
                    }
                }
             }
        });
	};
})

myApp.controller('ModalInstanceCtrl',function($scope, $uibModalInstance, items1, $http){
	$scope.tableData = items1.item ? items1.item : '';
	$scope.group = $scope.tableData.group;
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
     var screenHeight = window.screen.height
     setTimeout(function(){
         var myModal = document.querySelector('.modal-content');
	     myModal.style.top = (screenHeight - myModal.offsetHeight)/3 < 150 ? (screenHeight - myModal.offsetHeight)/3 + 'px' : 150 + 'px';
     },100)
     $scope.ok = function () {
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
        var strMsDate = $scope.ms_ver ? $scope.ms_ver : '';
        var strCsDate = $scope.cs_ver ? $scope.cs_ver : '';
        var strSvDate = $scope.sv_ver ? $scope.sv_ver : '';
        var strMvDate = $scope.Mo_ver ? $scope.Mo_ver : '';
        var strTvDate = $scope.tools_ver ? $scope.tools_ver : '';
        var PanguBlockMaster = $scope.PanguBlockMaster ? $scope.PanguBlockMaster : '';
        var PanguBlockServer = $scope.PanguBlockServer ? $scope.PanguBlockServer : '';
        var PanguBlockGCWorker = $scope.PanguBlockGCWorker ? $scope.PanguBlockGCWorker : '';
        var PanguSnapshotServer = $scope.PanguSnapshotServer ? $scope.PanguSnapshotServer : '';
        var old_changefree_id = $scope.old_changefree_id ? $scope.old_changefree_id : '';
        $uibModalInstance.close();
        return $http({
            method: 'post',
            url:'/api/v1/upgrade_add_post',
            headers: {'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'},
            data:"tag=" + $scope.tag + "&owner=" + items1.userName+ "&owner_id=" + items1.userId + "&group=" + $scope.group + "&PanguMaster_Ver=" + strMsDate + 
                 "&PanguChunkserver_Ver=" + strCsDate + "&PanguSupervisor_Ver=" + strSvDate + "&PanguMonitor_Ver=" + strMvDate + 
                 "&PanguTools_Ver=" + strTvDate + "&PanguBlockMaster_Ver="+ PanguBlockMaster + "&PanguBlockServer_Ver="+PanguBlockServer + 
                 "&PanguBlockGCWorker_Ver="+ PanguBlockGCWorker + "&PanguSnapshotServer_Ver=" + PanguSnapshotServer + "&old_changefree_id="+ old_changefree_id + strDateParam
        }).then(function(data,status){
        	if(data.data.err) {
        		alert(data.data.err)
        	}else{
        		items1.scope.getUpgradeData();
        	}
        }).catch(function(data,status){
        	alert("创建失败")
        })
     };
     $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
     };
     function getPanguVerList() {
     	 $http({
	     	method:'get',
	        url:'/api/v1/pangu_ver_list'
	     }).then(function(data, status) {
	     	if(!data.data.err) {
	     		var pangu_ver_list = [];
	     		if(data.data.length) {
	     			data.data.map(function(item) {
	     				pangu_ver_list.push(item.build_id + '');
	     			})
	     		}
	     		pangu_ver_list.sort(function(a, b){
	     			return b - a;
	     		});
	     		$scope.pangu_ver_list = pangu_ver_list;
	     	}
	     })
     }
     //监控ms的变化，自动补全
     function watchMs() {
     	var ms_ver = $scope.ms_ver;
     	$scope.cs_ver = ms_ver;
     	$scope.Mo_ver = ms_ver;
     	$scope.tools_ver = ms_ver;
     	$scope.sv_ver = ms_ver;
     }
     $scope.$watch('ms_ver', watchMs);
     function watchBm() {
        var PanguBlockMaster = $scope.PanguBlockMaster;
        $scope.PanguBlockServer = PanguBlockMaster;
        $scope.PanguBlockGCWorker = PanguBlockMaster;
        $scope.PanguSnapshotServer = PanguBlockMaster;
        
     }
     $scope.$watch('PanguBlockMaster', watchBm);
     getPanguVerList();
     searchSelectFixBug();
});

myApp.controller('ModalInstanceModityCtrl',function($scope, $uibModalInstance, items1, $http){
	 $scope.upgrade_cfg_modify_title = items1.paramter.group+'-修改'+decodeURIComponent(items1.paramter.tag)+'的升级信息';
     $scope.tag = decodeURIComponent(items1.paramter.tag);
     var oldTag = decodeURIComponent(items1.paramter.tag);
     $scope.selected_group = items1.paramter.group.split(",");
     $scope.upgradeGruopList = items1.paramter.upgradeGruopList;
    // console.log(items1.item, "item")
     $scope.ms_ver = items1.item.master_expect_ver.name;
     $scope.cs_ver = items1.item.chunkserver_expect_ver.name;
     $scope.sv_ver = items1.item.supervisor_expect_ver.name;
     $scope.Mo_ver = items1.item.moniter_expect_ver.name;
     $scope.tools_ver = items1.item.tools_expect_ver.name;
     $scope.PanguBlockMaster = items1.item.bm.name;
     $scope.PanguBlockServer = items1.item.bs.name;
     $scope.PanguBlockGCWorker = items1.item.bgc.name;
     $scope.PanguSnapshotServer = items1.item.PanguSnapshotServer.name;
     var screenHeight = window.screen.height;
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
     setTimeout(function(){
         var myModal = document.querySelector('.modal-content');
	     myModal.style.top = (screenHeight - myModal.offsetHeight)/3 < 150 ? (screenHeight - myModal.offsetHeight)/3 + 'px' : 150 + 'px';
//	     myModal.style.width = 500 + 'px';
     },100)
     $scope.ok = function () {
     	//items1.scope.againConfirmModifyDialog();
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
        var strMsDate = $scope.ms_ver ? $scope.ms_ver : '';
        var strCsDate = $scope.cs_ver ? $scope.cs_ver : '';
        var strSvDate = $scope.sv_ver ? $scope.sv_ver : '';
        var strMvDate = $scope.Mo_ver ? $scope.Mo_ver : '';
        var strTvDate = $scope.tools_ver ? $scope.tools_ver : '';
        return $http({
            method: 'post',
            url:'/api/v1/upgrade_edit_post',
            headers: {'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'},
            data:"oldTag=" + oldTag + "&tag=" + $scope.tag + "&group=" + $scope.group + "&PanguMaster_Ver=" + strMsDate +
                 "&PanguChunkserver_Ver=" + strCsDate + "&PanguSupervisor_Ver=" + strSvDate + "&PanguMonitor_Ver=" +
                  strMvDate + "&PanguTools_Ver=" + strTvDate + strDateParam + "&PanguBlockMaster_Ver="+ $scope.PanguBlockMaster + "&PanguBlockServer_Ver="+$scope.PanguBlockServer + 
                 "&PanguBlockGCWorker_Ver="+ $scope.PanguBlockGCWorker + "&PanguSnapshotServer_Ver=" + $scope.PanguSnapshotServer + "&group="+$scope.group
        }).then(function(data,status){
        	if(data.data.err) {
        		alert(data.data.err)
        	}else{
        	//	alert("修改成功")
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
            "new_cluster":"新增集群",
		 	"no_set_upgrade":"不升级",
		 	"is_upgraded":"已升级"
		 }
	var schedulingTimeList = [];
	for(var j in dataMap) {
	 	for(var i in schedulingTime) {
	 		if(i === j && j !== "no_set_upgrade" && j !== "is_upgraded"&& j !== "new_cluster") {
	 			var timeStr = schedulingTime[i] ? schedulingTime[i] : "没有设置排期时间";
	 			schedulingTimeList.push(dataMap[j]+'('+ timeStr +')')
	 		}
	 	}
	};
    schedulingTimeList.push("新增集群");
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
            url:'/api/v1/upgrade_tag_post',
            headers: {'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'},
            data:"tag=" + items1.item.tag + "&cluster_list=" +  $scope.clusterList + "&step=" + stepStr + "&remark=" + strRemark
        }).then(function(data,status){
        //	alert("修改成功")
//		    Message(items1.scope, 'success', 1000, '删除成功');
            items1.scope.getAllClustersUpgradeCfg();
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
myApp.controller('againConfirmCtrl',function($scope, $uibModalInstance, items1, $http){
     var screenHeight = window.screen.height;
     setTimeout(function(){
         var myModal = document.querySelector('.modal-content');
	     myModal.style.top = (screenHeight - myModal.offsetHeight)/3 < 150 ? (screenHeight - myModal.offsetHeight)/3 + 'px' : 150 + 'px';
     },100)
    // $scope.getClusterList();
     $scope.ok = function () {
     	$uibModalInstance.close();
     };
     $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
     };
});

myApp.controller('ModalStepsHandleCtrl',function($scope, $uibModalInstance, items1, $http){
	$scope.title = '业务线列表';
	var hostList = items1.groupList;
	var key = items1.key;
	var default_data = items1.default_data;
	var theadData = [
	     {"showName":"业务线","tbodyKey":"group","width":"80px"},
         {"showName":"rowkey","tbodyKey":"rowKey","width":"30px"}
	]
	var tbodyData = [];
	if(hostList && hostList.length) {
		hostList.map(function(item, index) {
			var checkedKey = false;
			if(default_data && default_data.length) {
				default_data.map(function(item1) {
					if(item1 === item) {
						checkedKey = true;
					}
				})
			}
			tbodyData.push({
				'group':{
			 		"name":item
			 	},
		 	    'rowKey':{
					"name":index + 1,
					"checkedKey":checkedKey
				}
			})
		})
	}
	$scope.host_list = {
		"theadData":theadData,
		"tbodyData":tbodyData,
		"checkBox":{
			"showCheckBox":true,
			"width":"10%"
		},
		"showFanxuanBtn":false
	}
     var screenHeight = window.screen.height
     setTimeout(function(){
         var myModal = document.querySelector('.modal-content');
	     myModal.style.top = (screenHeight - myModal.offsetHeight)/3 < 150 ? (screenHeight - myModal.offsetHeight)/3 + 'px' : 150 + 'px';
//	     myModal.style.width = 500 + 'px';
     },100)
     $scope.ok = function (data) {
     	var checked_data = []
     	if(data && data.length) {
     		data.map(function(item) {
     			checked_data.push(item.checkedRows.group.name)
     		})
     	}
        if(key && key === 'group_key_upgrade') {
		   items1.scope.group = checked_data;
		}
		if(key && key === 'group_key_upgrade_tag') {
		   items1.scope.group_key = checked_data;
		}
        $uibModalInstance.close();
     };
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
//	    	    setTimeout(function() {
//	    	    	var resultBox = $(this).parent('.search-select-content').find(".search-result-box");
//	    	    	resultBox.css({'display':'block'})
//	    	    },200)
//		        setTimeout(function() {
//		        	search_result_box_list.map(function(item1) {
//			    		item1.style.display = 'block';
//					})
//		        },200)
			}
		})
	}, 200)
}