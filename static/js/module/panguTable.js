myApp.directive('panguTable',['$filter', function($filter){
	return {
		restrict: 'EC',
	    scope: {
	        panguTableData:"="
	    },
	    templateUrl:'/static/js/module/panguTable.html',
	    link: function (scope, element, attr) {
	      	
	      	scope.jsonTable={
	      		"title":"",
	      		"thData":[],
	      		"tdData":[]
	      	};  

	      	//监控
	      	scope.selectList=[];
	      	scope.itemsPerPage=20;//每页显示的数量.设置值小于1表示显示所有项
	      	var listTdData=[]; //cope TdData用来比较和查询
	      	
	      	// scope.colspanNum=6;
	      	scope.colspanNum=scope.jsonTable.thData.length;
	      	scope.showTdData=true;
	      	var seachArr=[];
	        scope.$watchGroup(['panguTableData'], function (newValue, oldValue){
	          if (newValue) {
	          	//检查数据是否有变化，若数据改变则重新赋值.
	          	if(!scope.panguTableData){
	          		return
	          	}
	          	scope.jsonTable.title=scope.panguTableData.title;
	          	scope.jsonTable.thData=scope.panguTableData.thData;
	          	if(scope.jsonTable.thData){
	          		scope.colspanNum=scope.jsonTable.thData.length;
	          	}
	          	if(scope.panguTableData.tdData){
	          		scope.jsonTable.tdData=scope.panguTableData.tdData.slice(0,scope.itemsPerPage);
	          		listTdData=scope.panguTableData.tdData.slice(0,scope.panguTableData.tdData.length);
	          		scope.totalItems = scope.panguTableData.tdData.length;

	          		for(var i in listTdData){
	          			var serObj={};
	          			var seachStr="";
		          		for(var j in listTdData[i]){
		          			seachStr+=listTdData[i][j].name+'\b';
		          		}
	          			serObj.name=seachStr;
	          			serObj.id=i
	          			seachArr.push(serObj);
	          		}
	          	}
	          	if(scope.jsonTable.tdData.length==0){
	          		scope.showTdData=false;
	          	}else{
	          		scope.showTdData=true;
	          	};
	          	

	          }
	        },true);
            //点击td
            scope.tdClick = function(data) {
            	if(data.url) {
            		window.location = data.url;
            	}
            }
            //改变每页查询条数
		    scope.changePagesize=function(){
		      scope.jsonTable.tdData=listTdData.slice(0,scope.itemsPerPage);
		    };
	        //搜索框双向绑定数据
			scope.inputSelectName = ""; //输入框输入字符串
			scope.selectName=function(){
				if(scope.inputSelectName){
					var filtered = $filter('filter')(seachArr, {name: scope.inputSelectName});
					var newArr=[];
					for(var i in filtered){
						newArr.push(scope.panguTableData.tdData[filtered[i].id]);
					}
					listTdData=newArr.slice(0,newArr.length);
					scope.totalItems=listTdData.length;
					scope.jsonTable.tdData=listTdData.slice(0,scope.itemsPerPage);
				}else{
					listTdData=scope.panguTableData.tdData.slice(0,scope.panguTableData.tdData.length);
					scope.jsonTable.tdData=listTdData.slice(0,scope.itemsPerPage);
					scope.totalItems=listTdData.length;
				}
			}
			
			//分页
			//分页相关属性
			scope.maxSize = 5;  //可点击选着数字最大个数
	        scope.totalItems = 0;//总条数
	        scope.currentPage = 1;//当前页
			
			//切换分页时调取函数
	        scope.changePage=function(){
	        	var start=(scope.currentPage-1)*scope.itemsPerPage;
	        	scope.jsonTable.tdData=listTdData.slice(start,start+scope.itemsPerPage);
			}	
	    }
	}
}])