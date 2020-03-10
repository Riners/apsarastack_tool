myApp.controller('upgradeCtrl', function($scope, $http, $uibModal) {
    $scope.mapsParam = get_pangu_urlParameter(window.location.href);
    
    $scope.baseInfo_group = "查看"+$scope.mapsParam.group+"全部配置升级";
    $scope.upgrade_list = $scope.mapsParam.group ? false : true;
    if($scope.mapsParam.tag){
        $scope.show_upgrade_detail_list =  true ;//是否展示 tag!=016 的详情信息数据
    }else if($scope.mapsParam.group){
        $scope.show_upgrade016_detail_list =true;//是否展示upgrade016信息
    };


    $scope.openDetailsUpgradeInfo = function(data) {
        var group = data.rowData.action.group;
        var tag = data.rowData.Tag.name;
        $scope.upgrade_list=false;
        if(tag=="016"){
            window.location = "/new_upgrade?group="+group;
            // window.location = "/upgrade016?group="+group;
        }else{
            window.location = "/new_upgrade?group="+group+"&tag="+tag;
            // window.location = "/upgrade?group="+group+"&tag="+tag;
        }
    }
    // 获取upgrade所有数据
    function getUpgradeData(){
      return $http({
          method: 'GET',
          // url:'/api/v1/upgrade_list'
          url:'/api/v1/upgrade_ver_list?group='+$scope.mapsParam.group
      }).then(function(data){
        dealgetUpgradeData(data.data);
      }).catch(function(data){

      })
    }
    getUpgradeData();
    function dealgetUpgradeData(data) {
    	// var thead = [
     //            {"showName":"#","tbodyKey":"index","width":"45px"},
     //            {"showName":"升级名称","tbodyKey":"tag","width":"200px"},
     //            {"showName":"业务线","tbodyKey":"group","width":"200px"},
     //            {"showName":"进度","tbodyKey":"step","width":"200px"},
     //            {"showName":"盘古版本","tbodyKey":"pangu_ver","width":"200px"},
     //            {"showName":"MS","tbodyKey":"Master_ver","width":"200px"},
     //            {"showName":"CS","tbodyKey":"Chunkserver_ver","width":"200px"},
     //            {"showName":"Sup","tbodyKey":"Supervisor_ver","width":"200px"},
     //            {"showName":"Mon","tbodyKey":"Monitor_ver","width":"200px"},
     //            {"showName":"Tools","tbodyKey":"Tools_ver","width":"200px"},
     //            {"showName":"BM","tbodyKey":"bm_ver","width":"200px"},
     //            {"showName":"BS","tbodyKey":"bs_ver","width":"200px"},
     //            {"showName":"BGC","tbodyKey":"bgc_ver","width":"200px"},
     //            {"showName":"负责人","tbodyKey":"owner","width":"200px"},
     //            {"showName":"操作","tbodyKey":"action","width":"100px"}
     //        ];
        var thead = [
                {"showName":"#","tbodyKey":"index","width":"45px"},
                {"showName":"升级名称","tbodyKey":"tag","width":"200px"},
                {"showName":"业务线","tbodyKey":"group","width":"200px"},
                {"showName":"负责人","tbodyKey":"owner","width":"200px"},
                {"showName":"版本","tbodyKey":"upgrade_mod_ver","width":"200px"},
                {"showName":"升级排期","tbodyKey":"step_date_json","width":"200px"},
                {"showName":"报备状态","tbodyKey":"Chunkserver_ver","width":"200px"},
                {"showName":"环境检查","tbodyKey":"Supervisor_ver","width":"200px"},
                {"showName":"集群升级进度","tbodyKey":"Monitor_ver","width":"200px"}
                {"showName":"操作","tbodyKey":"action","width":"100px"}
            ]    
    	var tbodyData = [];
        data.map(function(item, index){
            var upgradeGruopList = [];
            var upgrade_mod_ver=JSON.stringify(item.group_upgrade_list.upgrade_mod_ver);
            var step_date_json=JSON.stringify(item.group_upgrade_list.step_date_json);
            var step_date_json=JSON.stringify(item.group_upgrade_list.changefree);
            tbodyData.push({
                "index":{
                    "name":index+1,
                },
                "tag":{
                    "name":item.title
                },
                "group":{
                    "name":item.group_upgrade_list.group_name
                },
                "owner":{
                    "name":item.group_upgrade_list.owner
                },
                "upgrade_mod_ver":{
                    "name":upgrade_mod_ver
                },
                "step_date_json":{
                    "name":step_date_json
                },
                "changefree":{
                    "name":changefree
                },
                "group_name":{
                    "name":item.group_upgrade_list.group_name
                },
                "action":{"button":["查看"],"group":item.group_upgrade_list.group_name ? item.group_upgrade_list.group_name : ''}
            })
            upgradeGruopList.push(item.group_upgrade_list.group_name);
        })
    	// data.map(function(item, index) {
    	// 	var upgradeGruopList = [];
     //        if(item.config_info) {
     //            item.config_info.map(function(item1, index) {
     //            	tbodyData.push({
     //            		"index":{
     //            			"name":index+1,
     //            		},
     //            		"tag":{
     //            			"name":item1.tag ? item1.tag : "",
     //                        "url":"/new_upgrade?group="+item.group
     //            		},
     //            		"group":{
     //            			"name":item.group ? item.group : ''
     //            		},
     //            		"step":{
     //            			"name":item1.step ? item1.step : ''
     //            		},
     //            		"Master_ver":{"name":item1.Master_ver ? item1.Master_ver : ""},
     //            		"Chunkserver_ver":{"name":item1.Chunkserver_ver ? item1.Chunkserver_ver : ""},
     //            		"Supervisor_ver":{"name":item1.Supervisor_ver ? item1.Supervisor_ver : ""},
     //            		"Monitor_ver":{"name":item1.Monitor_ver ? item1.Monitor_ver : ""},
     //            		"Tools_ver":{"name":item1.Tools_ver ? item1.Tools_ver : ""},
     //            		"bm_ver":{"name":item1.bm_ver ? item1.bm_ver : ""},
     //            		"bs_ver":{"name":item1.bs_ver ? item1.bs_ver : ""},
     //            		"bgc_ver":{"name":item1.bgc_ver ? item1.bgc_ver : ""},
     //            		"owner":{"name":item1.owner ? item1.owner : ""},
     //            		"action":{"button":["查看"],"group":item.group ? item.group : ''}
     //            	})
     //            })
     //        };
     //        upgradeGruopList.push(item.group);
     //    })
    	$scope.upgradeGruopList = upgradeGruopList;
    	$scope.upgradeData = {
    		"theadData":thead,
		    "tbodyData":tbodyData
    	};
        return {
			"theadData":thead,
		    "tbodyData":tbodyData
		};
    }
//  function dealgetUpgradeData(data){
//      if(!data){
//          return
//      };
//      var upgradeData = [];
//      var upgradeGruopList = [];
//      data.map(function(item, index) {
//          var obj = {};
//          var tData =  [];
//          if(item.config_info) {
//              item.config_info.map(function(item1, index) {
//                  var tbObj = {};
//                  tbObj.index = {"name":index+1};
//                  tbObj.tag = {"name":item1.tag ? item1.tag : "",
//                      url:"/new_upgrade?group="+item.group};
//                  tbObj.Master_ver = {"name":item1.Master_ver ? item1.Master_ver : ""};
//                  tbObj.Chunkserver_ver = {"name":item1.Chunkserver_ver ? item1.Chunkserver_ver : ""};
//                  tbObj.Supervisor_ver = {"name":item1.Supervisor_ver ? item1.Supervisor_ver : ""};
//                  tbObj.Monitor_ver = {"name":item1.Monitor_ver ? item1.Monitor_ver : ""};
//                  tbObj.Tools_ver = {"name":item1.Tools_ver ? item1.Tools_ver : ""};
//                  tbObj.owner = {"name":item1.owner ? item1.owner : ""};
//                  tbObj.action = {"button":["查看"],"group":item.group ? item.group : ''}
//                  tData.push(tbObj);
//              })
//          };
//          upgradeGruopList.push(item.group);
//          obj.group = item.group ? item.group : '';
//          obj.isShowGroupTable = false;
//          obj.details = {
//              "theadData":[
//                  {"showName":"#","tbodyKey":"index","width":"45px"},
//                  {"showName":"Tag","tbodyKey":"tag","width":"200px"},
//                  {"showName":"Master 期望版本","tbodyKey":"Master_ver","width":"200px"},
//                  {"showName":"Chunkserver 期望版本","tbodyKey":"Chunkserver_ver","width":"200px"},
//                  {"showName":"Supervisor 期望版本","tbodyKey":"Supervisor_ver","width":"200px"},
//                  {"showName":"Monitor 期望版本","tbodyKey":"Monitor_ver","width":"200px"},
//                  {"showName":"Tools 期望版本","tbodyKey":"Tools_ver","width":"200px"},
//                  {"showName":"owner","tbodyKey":"owner","width":"200px"},
//                  {"showName":"操作","tbodyKey":"action","width":"100px"}
//              ],
//             "tbodyData":tData
//          }
//          upgradeData.push(obj);
//      })
//      $scope.upgradeData = upgradeData;
//      $scope.upgradeGruopList = upgradeGruopList;
//  }
    // 获取 upgrade == 016时的list数据信息
    function getUpgrade016Data(){
      return $http({
          method: 'GET',
          url:'/api/v1/upgrade016_list?group='+$scope.mapsParam.group
      }).then(function(data){
        dealUpgrade016Data(data.data);
        console.log("get upgrade016_list success");
      }).catch(function(data){
        console.log("deal upgrade016_list error",data);
      })
    };
    if($scope.mapsParam.group){
        getUpgrade016Data();
    };
    $scope.upgrade016Data={};
    function dealUpgrade016Data(data){
        $scope.upgrade016Data.upgrade_progress=$scope.mapsParam.group+"-升级进度:"+data.upgrade_progress+"%";
        var tData =  [];
        data.data.map(function(item,index){
            var obj = {};
            obj.index={"name":index+1};
            obj.cluster_name={"name":item.cluster_name ? item.cluster_name : ""};
            obj.remarks={"name":item.remarks ? item.remarks : ""};
            obj.version={"name":item.version ? item.version : ""};
            obj.status={"name":item.status ? item.status : ""};
            tData.push(obj);
        });
        $scope.upgrade016Data.details= {
            "theadData":[
                {"showName":"#","tbodyKey":"index","width":"45px"},
                {"showName":"集群名","tbodyKey":"cluster_name","width":"200px"},
                {"showName":"备注","tbodyKey":"remarks","width":"200px"},
                {"showName":"当前版本","tbodyKey":"version","width":"200px"},
                {"showName":"状态","tbodyKey":"status","width":"200px"}
            ],
           "tbodyData":tData
        }
    };
    // 获取 upgrade != 016时的list数据信息
    function getUpgradeDetailsData(){
      return $http({
          method: 'GET',
          url:'/api/v1/upgrade_details_info?group='+$scope.mapsParam.group+"&tag="+$scope.mapsParam.tag
      }).then(function(data){
        dealUpgradeDetailsData(data.data);
        console.log("get upgrade_details_info success");
      }).catch(function(data){
        console.log("deal upgrade_details_info error",data);
      })
    };
    if($scope.mapsParam.tag){
        getUpgradeDetailsData();
    };
    function dealUpgradeDetailsData(data){
        $scope.show_group_upgrade="查看"+$scope.mapsParam.group+"全部升级";
        $scope.upgardeBaseInfoTitle = $scope.mapsParam.tag + "-升级基本信息";
        $scope.isShowBaseInfoTitle = false;
        $scope.allClustersStatusCfg = "所有集群的升级状态";
        $scope.isAllClustersStatusCfg = false;
        var tData =  [];
        data.all_cluster_upgrade.map(function(item,index){
            var obj = {};
            obj.index={"name":index+1};
            obj.cluster_name={"name":item.cluster_name ? item.cluster_name : ""};
            obj.tianji_region={"name":item.tianji_region ? item.tianji_region : ""};
            obj.tag={"name":item.tag ? item.tag : ""};
            obj.cluster_decs={"name":item.cluster_decs ? item.cluster_decs : ""};
            obj.cluster_state={"name":item.cluster_state ? item.cluster_state : ""};
            obj.Ms_Ver={"name":item.Ms_Ver ? item.Ms_Ver : ""};
            obj.Cs_Ver={"name":item.Cs_Ver ? item.Cs_Ver : ""};
            obj.Ss_Ver={"name":item.Ss_Ver ? item.Ss_Ver : ""};
            obj.Mo_Ver={"name":item.Mo_Ver ? item.Mo_Ver : ""};
            obj.Tools_Ver={"name":item.Tools_Ver ? item.Tools_Ver : ""};
            obj.upgrade_schedule={"name":item.upgrade_schedule ? item.upgrade_schedule : ""};
            obj.upgrade_date={"name":item.upgrade_date ? item.upgrade_date : ""};
            obj.upgrade_status={"name":item.upgrade_status ? item.upgrade_status : ""};
            obj.comments={"name":item.comments ? item.comments : ""};
            obj.ag={"name":item.ag ? item.ag : ""};
            tData.push(obj);
        });
        $scope.all_cluster_status_tableData= {
            "theadData":[
                {"showName":"#","tbodyKey":"index","width":"45px"},
                {"showName":"集群名","tbodyKey":"cluster_name","width":"100px"},
                {"showName":"天基域","tbodyKey":"tianji_region","width":"100px"},
                {"showName":"Tag","tbodyKey":"tag","width":"100px"},
                {"showName":"集群描述","tbodyKey":"cluster_decs","width":"100px"},
                {"showName":"集群状态","tbodyKey":"cluster_state","width":"100px"},
                {"showName":"Ms_Ver","tbodyKey":"Ms_Ver","width":"100px"},
                {"showName":"Cs_Ver","tbodyKey":"Cs_Ver","width":"100px"},
                {"showName":"Ss_Ver","tbodyKey":"Ss_Ver","width":"100px"},
                {"showName":"Tools_Ver","tbodyKey":"Tools_Ver","width":"100px"},
                {"showName":"升级排期","tbodyKey":"upgrade_schedule","width":"100px"},
                {"showName":"升级日期","tbodyKey":"upgrade_date","width":"100px"},
                {"showName":"升级状态","tbodyKey":"upgrade_status","width":"100px"},
                {"showName":"comments","tbodyKey":"comments","width":"100px"},
                {"showName":"AG","tbodyKey":"ag","width":"100px"}
            ],
           "tbodyData":tData
        };

    };



})