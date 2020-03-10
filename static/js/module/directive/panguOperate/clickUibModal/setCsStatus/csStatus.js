//diag编辑页controller 
  myApp.controller('csStatusCtrl',function($scope,$http, $uibModalInstance,chartData){

      $scope.data=chartData;

      var theadData=[{"showName":"角色类型","tbodyKey":"role_type","width":""},
                 {"showName":"状态","tbodyKey":"state","width":""},
                 {"showName":"主机","tbodyKey":"host","width":""},
                 {"showName":"角色组","tbodyKey":"role_group","width":""},
                 {"showName":"rowkey","tbodyKey":"rowKey","width":""}];
      var getCsStateData=[{
        "role_type":"bala",
        "state":"不适用",
        "host":"主机1",
        "role_group":"角色组1"
      },{
        "role_type":"data",
        "state":"已启动",
        "host":"主机2",
        "role_group":"角色组2"
      },{
        "role_type":"角色类型3",
        "state":"状态3",
        "host":"主机3",
        "role_group":"角色组3"
      },{
        "role_type":"角色类型4",
        "state":"状态4",
        "host":"主机4",
        "role_group":"角色组4"
      }]

      var gettbodyData=[];
      function getCsStatus(){
        getCsStateData.map(function(item,index){
          var gettbodyObj={};
          gettbodyObj.role_type=dealTableObj(item.role_type);
          gettbodyObj.state=dealTableObj(item.state);
          gettbodyObj.host=dealTableObj(item.host);
          gettbodyObj.role_group=dealTableObj(item.role_group);
          gettbodyObj.rowKey = {"name":index + 1,"checkedKey":false};
          gettbodyData.push(gettbodyObj);
        })
      };
      getCsStatus();           
      $scope.all_cluster_status_tableData = {
        "theadData":theadData,
        "tbodyData":gettbodyData,
        "checkBox":{
            "showCheckBox":true,
            "width":"40px"
        },
        "showFanxuanBtn":true
      };
      // 表格点击交互事件
      $scope.terminalService = function(data) {
        console.log(data);
      };
      // 处理表格项
      function dealTableObj(name){
        var obj={};
        if(name){
          obj.name=name;
        };
        
        return obj
      }
      // 
      $scope.okDesc=function(id){
        
      }

      $scope.cancelDesc=function(id){
        $uibModalInstance.dismiss('cancel');
      }

  })
