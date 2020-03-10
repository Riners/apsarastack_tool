myApp.directive('tableUpgrade',['$filter', function($filter){
	return {
		restrict: 'EC',
	    scope: {
	        tableData:"=",
	        checkRowsData:"=?",
	        tableAction:"&funcTableAction",
	        checkedRows:'&checkRows',
	        isShowSearch:"=?"
	    },
	    templateUrl:'/static/js/module/directive/tableUpgrade/table.html',
	    link: function (scope, element, attr) {
	      	
	      	scope.jsonTable={
	      		"title":"",
	      		"showSortIconData":false,
	      		"theadData":[],
	      		"tbodyData":[],
	      		"target":"_blank",
	      		"closeSelectInput":false
	      	};  
            
//          scope.jsonTable={
//	      		"title":"",
//	      		"showSortIconData":false,
//	      		"theadData":[],
//	      		"tbodyData":[],
//	      		"target":"_blank",
//	      		"closeSelectInput":false,
//	      		"itemsPerPage":10
//	      	};  
            //监控isShowSearch
//          scope.$watchGroup(['isShowSearch'], function (newValue, oldValue){
//	      		if(newValue) {
//	      		   	scope.jsonTable.closeSelectInput = scope.isShowSearch;
//	      		}
//	      	},true)
            
            
            
	      	//监控
	      	scope.selectList=[];
	      	scope.itemsPerPage=200;//每页显示的数量.设置值小于1表示显示所有项
	      	var listTdData=[]; //cope TdData用来比较和查询
	      	
	      	// scope.colspanNum=6;
	      	scope.colspanNum=scope.jsonTable.theadData.length;
	      	scope.showTdData=true;
	      	var seachArr=[];
	      	scope.$watchGroup(['checkRowsData'], function (newValue, oldValue){
	      		if(newValue) {
	      		//	console.log(scope.checkRowsData, "监控反选")
	      		}
	      	},true)
	        scope.$watchGroup(['tableData'], function (newValue, oldValue){
	          if (newValue) {
	          	//检查数据是否有变化，若数据改变则重新赋值.
//	          	if(scope.tableData && scope.tableData.length > 0) {
//	          		scope.showTdData = true;
//	          	}else{
//	          		scope.showTdData = false;
//	          	}
//              if(scope.tableData.closeSelectInput){
//	          		scope.jsonTable.closeSelectInput = scope.tableData.closeSelectInput;
//	          	};
	          	if(!scope.tableData){
	          		return
	          	}
	          	scope.jsonTable.title=scope.tableData.title;
	          	scope.jsonTable.showSortIconData=scope.tableData.showSortIconData?scope.tableData.showSortIconData:scope.jsonTable.showSortIconData;
	          	scope.jsonTable.theadData=scope.tableData.theadData;
	          	if(scope.jsonTable.theadData){
	          		scope.colspanNum=scope.jsonTable.theadData.length;
	          		for(var i in scope.jsonTable.theadData){
	          			scope.jsonTable.theadData[i].showSortIcon=false;
	          		}
	          		
	          	}
	          	if(scope.tableData.tbodyData){
	          		scope.jsonTable.tbodyData=scope.tableData.tbodyData.slice(0,scope.itemsPerPage);
	          		listTdData=scope.tableData.tbodyData.slice(0,scope.tableData.tbodyData.length);
	          		scope.totalItems = scope.tableData.tbodyData.length;
	          		seachArr=[];
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
	          	if(scope.jsonTable.tbodyData.length==0){
	          		scope.showTdData=false;
	          	}else{
	          		scope.showTdData=true;
	          	};
	          	checkbox();
	          	if(scope.inputSelectName){
	          		scope.selectName();
	          		// scope.changePage();
	          	};
	          	if(scope.currentPage!=1){
	          		scope.selectName();
	          	}
	          	
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
		      scope.jsonTable.tbodyData=listTdData.slice(0,scope.itemsPerPage);
		    };
	        //搜索框双向绑定数据
			scope.inputSelectName = ""; //输入框输入字符串
			scope.selectName=function(){
				var start=(scope.currentPage-1)*scope.itemsPerPage;
				if(scope.inputSelectName){
					var filtered = $filter('filter')(seachArr, {name: scope.inputSelectName});
					var newArr=[];
					for(var i in filtered){
						newArr.push(scope.tableData.tbodyData[filtered[i].id]);
					}
					listTdData=newArr.slice(0,newArr.length);
					scope.totalItems=listTdData.length;
					scope.jsonTable.tbodyData=listTdData.slice(start,start+scope.itemsPerPage);
				}else{
					listTdData=scope.tableData.tbodyData.slice(0,scope.tableData.tbodyData.length);
					scope.jsonTable.tbodyData=listTdData.slice(start,start+scope.itemsPerPage);
					scope.totalItems=listTdData.length;
				}
			}
			// 高级搜索
			scope.showSearch=true;
			// 调试时设置 showSearch=false，方便调试
			// scope.showSearch=false;
			scope.clickSearchChange=function(){
				scope.showSearch=!scope.showSearch;
			};
			// 拼接all_version
			function joinVersionStr(data){
				var str=""
				for(var i in data.all_version.render.data){
					str+=data.all_version.render.data[i].name
				}
				return str
			};
			//  处理 upgrade_date
			function joinDateArr(data){
				var dateArr=[];
				// for(var i in data.upgrade_date.render.data){
				// 	var timeStr=data.upgrade_date.render.data[i].split(":")[1];
				// 	var timeNum="";
				// 	if(timeStr){
				// 		timeNum=(new Date(timeStr)).getTime();
				// 	};
				// 	dateArr.push(timeNum);
				// }
				var timeNum1="";
				timeStr1=data.upgrade_date.render.data[1];
				if((new Date(timeStr1)).getTime()){
					timeNum1=(new Date(timeStr1)).getTime();
				}
				dateArr.push(timeNum1);
				var timeNum3="";
				timeStr3=data.upgrade_date.render.data[3];
				if((new Date(timeStr3)).getTime()){
					timeNum3=(new Date(timeStr3)).getTime();
				}
				dateArr.push(timeNum3);
				return dateArr
			};
			// 点击搜索 过滤字段
			scope.clickSearchData=function(){
				var searchData=scope.tableData.tbodyData.slice(0,scope.tableData.tbodyData.length);
				var start=(scope.currentPage-1)*scope.itemsPerPage;
				for(var i in scope.highSearchData){
					// 若当前输入框为空，跳过该循环
					if(!scope.highSearchData[i].value){
						continue
					};
					if(scope.highSearchData[i].value=="全部"){
						continue
					};
					var afterSearchData=[];
					// 版本单独处理
					if(scope.highSearchData[i].key=="all_version"){
						for(var iver in searchData){
							if(joinVersionStr(searchData[iver]).
								indexOf(scope.highSearchData[i].value)>=0){
							afterSearchData.push(searchData[iver]);
							}
						}
						searchData=afterSearchData.slice(0,afterSearchData.length);
						continue
					};
					// 时间单独处理
					if(scope.highSearchData[i].key=="upgrade_date"){
						for(var idate in searchData){
							var dealDateArr=joinDateArr(searchData[idate]);
							var getDataArr=[];
							for(var jdate in scope.highSearchData[i].value){
								var time=scope.highSearchData[i].value[jdate].date;
								var timeNum="";
								if(time){
									timeNum=time.getTime();
								}
								getDataArr.push(timeNum);
							}
							// if((getDataArr[0]==""&&getDataArr[1]=="")||(dealDateArr[0]==""&&dealDateArr[1]=="")){
							// 	afterSearchData.push(searchData[idate]);
							// 	continue
							// };
							if((getDataArr[0]<=dealDateArr[0]&&getDataArr[1]>=dealDateArr[1])||
								((!getDataArr[0]||!dealDateArr[0])&&getDataArr[1]>=dealDateArr[1])||
								(getDataArr[0]<=dealDateArr[0]&&(!getDataArr[1]||!dealDateArr[1]))){
								afterSearchData.push(searchData[idate]);
							}else{
								console.log(dealDateArr);
							};
							
						}
						searchData=afterSearchData.slice(0,afterSearchData.length);
						continue
					};
					
					for(var j in searchData){
						if(searchData[j][scope.highSearchData[i].key].name.
							indexOf(scope.highSearchData[i].value)>=0){
							afterSearchData.push(searchData[j]);
						}
					}
					searchData=afterSearchData.slice(0,afterSearchData.length);
				}
				listTdData=searchData.slice(0,searchData.length);
				scope.totalItems=listTdData.length;
				scope.jsonTable.tbodyData=listTdData.slice(start,start+scope.itemsPerPage);
			}
			
			scope.highSearchData=[{
				"name":"集群名:",
				"key":"cluster",
				"show":"cluster",
				"value":""
			},{
				"name":"天基域:",
				"key":"tianji_region",
				"show":"cluster",
				"value":""
			},{
				"name":"自定义域:",
				"key":"custom_region",
				"show":"cluster",
				"value":""
			},{
				"name":"Tag:",
				"key":"tag",
				"show":"cluster",
				"value":""
			},{
				"name":"集群描述:",
				"key":"cluster_decs",
				"show":"cluster",
				"value":""
			},{
				"name":"版本:",
				"key":"all_version",
				"show":"cluster",
				"value":""
			},{
				"name":"Comments:",
				"key":"comments",
				"show":"cluster",
				"value":""
			},{
				"name":"升级排期:",
				"key":"upgrade_schedule",
				"show":"upgrade_schedule",
				"value":""
			},{
				"name":"集群状态:",
				"key":"cluster_status",
				"show":"cluster_status",
				"value":""
			},{
				"name":"升级状态:",
				"key":"upgrade_status",
				"show":"upgrade_status",
				"value":""
			},{
				"name":"升级日期(暂时不支持Safari):",
				"key":"upgrade_date",
				"show":"upgrade_date",
				"value":[{"date":""},{"date":""}]
			}]
			// 排序
			scope.singleRowSort=function(name){
				// scope.jsonTable.theadData[i].showSortIcon=false;
				// stdTotalSizeArr.sort(compareTo("percent"));
				scope.theadHighLight = name;
				console.log(scope.theadHighLight, "scope.theadHighLight")
				var start=(scope.currentPage-1)*scope.itemsPerPage;
				console.log("name",name);
				for(var i in scope.jsonTable.theadData){
					if(scope.jsonTable.theadData[i].tbodyKey==name){
						scope.jsonTable.theadData[i].showSortIcon=!scope.jsonTable.theadData[i].showSortIcon
						if(scope.jsonTable.theadData[i].showSortIcon==true){
							listTdData=listTdData.sort(compareTo(name,"des"));
							scope.jsonTable.tbodyData=listTdData.slice(start,start+scope.itemsPerPage);
						}else{
							listTdData=listTdData.sort(compareTo(name,"asc"));
							scope.jsonTable.tbodyData=listTdData.slice(start,start+scope.itemsPerPage);
						}
					};

				};

			}
			//点击排序，表头对应单元格高亮
//			scope.theadHighLight = {
//			//	"background":"#c1baba",
//			}
			function compareTo(name,order) {  
		        return function(o, p) {  
		            var a="", b="";  
		            if (typeof o === "object" && typeof p === "object" && o && p) {
		                a1 = o[name].name.split(",");  
		                b1 = p[name].name.split(","); 
		                for(var i in a1){
		                	a+=a1[i]
		                } 
		                for(var j in b1){
		                	b+=b1[j]
		                }
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
			//分页
			//分页相关属性
			scope.maxSize = 5;  //可点击选着数字最大个数
	        scope.totalItems = 0;//总条数
	        scope.currentPage = 1;//当前页
			
			//切换分页时调取函数
	        scope.changePage=function(){
	        	var start=(scope.currentPage-1)*scope.itemsPerPage;
	        	scope.jsonTable.tbodyData=listTdData.slice(start,start+scope.itemsPerPage);
			}
	        //是否显示反选按钮
//	        scope.showFanxuanBtn = false;
	        //全选反选
	        //scope.jsonTable.tbodyData
	        function checkbox() {
		        scope.checkBox = scope.tableData.checkBox && scope.tableData.checkBox.showCheckBox ? scope.tableData.checkBox.showCheckBox : false;
	            scope.checkBoxTdWidth = scope.tableData.checkBox && scope.tableData.checkBox.width ? scope.tableData.checkBox.width : '50px' ;
	            var checkRows = [];
	            var checkRowsData = [];
	            scope.checkRowsData = [];
	            scope.checkBoxAction = function(data) {
	            	console.log(data,"data")
	            	var checkedIndex = '';
	            	if(data.checkedRows instanceof Array) {
	            		checkedIndex = 0;
	            	}else{
	            		checkedIndex = data.checkedRows.rowKey.name;
	            	}
	            	if(checkedIndex === 0) {
	            		//点击全选按钮
	            		var isCheckedAll = true;
	            		checkRows.map(function(item, index) {
	            			if(item.index == 0) {
	            			//	scope.checkedItem = false;
	            			    //控制全选和全不选
	            			    var arr = [];
	            			    scope.jsonTable.tbodyData.map(function(item) {
	            			    	item.rowKey.checkedKey = false;
	            			    })
	            			    scope.jsonTable.tbodyData = scope.jsonTable.tbodyData;
	            				isCheckedAll = false;
	            				checkRows = [];
	            				checkRowsData = [];
	            				scope.checkRowsData = checkRowsData;
	            			}
	            		})
	            		if(isCheckedAll) {
            			    var arr = [];
            			    scope.jsonTable.tbodyData.map(function(item) {
            			    	item.rowKey.checkedKey = true;
            			    })
            			    
            			    scope.jsonTable.tbodyData = scope.jsonTable.tbodyData;
	            			//scope.checkedItem = true;
	            			checkRows = [];
	            			checkRows.push(data);
	            			checkRowsData = [];
	            			data.checkedRows.map(function(item, index) {
	            				var obj = {}
	            				obj.checkedRows = item;
	            				checkRowsData.push(obj);
	            			})
	            			scope.checkRowsData = checkRowsData;
	            		}
	            	}else{
	                    if(scope.checkRowsData.length) {
	                    	var isPushCheckedItem = true;
	                    	scope.checkRowsData.map(function(item, index) {
	                    		if(item.checkedRows.rowKey.name === checkedIndex) {
	                    			scope.jsonTable.tbodyData.map(function(item1) {
	                    				if(item1.rowKey.name === checkedIndex) {
	                    					item1.rowKey.checkedKey = false;
	                    				}
	            			        })
	                    			scope.checkRowsData.splice(index, 1);
	                    			isPushCheckedItem = false;
	                    		}
	                    	})
	                		if(isPushCheckedItem){
	                			scope.jsonTable.tbodyData.map(function(item1) {
                    				if(item1.rowKey.name === checkedIndex) {
                    					item1.rowKey.checkedKey = true;
                    				}
            			        })
	                			scope.checkRowsData.push(data);
	                		}
	                    }else{
                    		scope.jsonTable.tbodyData.map(function(item1) {
                				if(item1.rowKey.name === checkedIndex) {
                					item1.rowKey.checkedKey = true;
                				}
        			        })
	                    	scope.checkRowsData.push(data);
	                    }
	            	}
	            	if(scope.checkRowsData.length !== scope.tableData.tbodyData.length) {
	            		//全选不全选
	            		scope.isCheckedAll = false;
	            		checkRows = [];
	            	}else{
	            		scope.isCheckedAll = true;
	            		checkRows = [{'checkedRows':scope.tableData.tbodyData,'index':0}];
	            	}
	            }
                //反选、
            	scope.fanxuan = function() {
    				scope.jsonTable.tbodyData.map(function(item) {
    					item.rowKey.checkedKey = true;
    					scope.checkRowsData.map(function(item1) {
//          						console.log(item.rowKey.name, "item.rowKey.name")
//          						console.log(item1.checkedRows.rowKey.name, "item1.checkedRows.rowKey.name")
    						console.log(item.rowKey.name == item1.checkedRows.rowKey.name)
    						if(item.rowKey.name == item1.checkedRows.rowKey.name) {
    			    		    item.rowKey.checkedKey = false;
    			    	    }
    					})
    			    })
    				//scope.jsonTable.tbodyData = scope.jsonTable.tbodyData;
    				scope.$applyAsync(); 
    				var fanXuanData = [];
    				scope.tableData.tbodyData.map(function(item, index) {
    					var flag = true;
    					scope.checkRowsData.map(function(item1) {
    						if(item.rowKey.name == item1.checkedRows.rowKey.name) {
    			    		   flag = false;
    			    	    }
    					})
    					if(flag){
    						fanXuanData.push({
    							"checkedRows":item
    						})
    					}
    				})
    				scope.checkRowsData = fanXuanData;
    				console.log(scope.checkRowsData, "fanxuandta")
    				if(scope.checkRowsData.length !== scope.tableData.tbodyData.length) {
	            		//全选不全选
	            		scope.isCheckedAll = false
	            	}else{
	            		scope.isCheckedAll = true;
	            	}
            	}
	        }
	    }
	}
}])