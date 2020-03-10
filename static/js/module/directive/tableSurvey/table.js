myApp.directive('tableSurvey',['$filter', function($filter){
	return {
		restrict: 'EC',
	    scope: {
	        tableData:"=",
	        checkRowsData:"=?",
	        tableAction:"&funcTableAction",
	        checkedRows:'&checkRows'
	    },
	    templateUrl:'/static/js/module/directive/tableSurvey/table.html',
	    link: function (scope, element, attr) {
	      	
	      	scope.jsonTable={
	      		"title":"",
	      		"showSortIconData":false,
	      		"theadData":[],
	      		"tbodyData":[],
	      		"target":"_blank",
	      		"closeSelectInput":false,
	      		"itemsPerPage":10
	      	};  
         
	      	//监控
	      	scope.selectList=[];
	      	scope.itemsPerPage=scope.jsonTable.itemsPerPage;//每页显示的数量.设置值小于1表示显示所有项
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
	          	if(!scope.tableData){
	          		return
	          	}
	          	if(scope.tableData.closeSelectInput){
	          		scope.jsonTable.closeSelectInput=scope.tableData.closeSelectInput;
	          	};
	          	if(scope.tableData.itemsPerPage){
	          		scope.jsonTable.itemsPerPage=scope.tableData.itemsPerPage;
	          		scope.itemsPerPage=scope.jsonTable.itemsPerPage;
	          	};
	          	scope.jsonTable.title=scope.tableData.title;
	          	scope.jsonTable.showSortIconData=scope.tableData.showSortIconData?scope.tableData.showSortIconData:scope.jsonTable.showSortIconData;
	          	scope.jsonTable.theadData=scope.tableData.theadData;
	          	if(scope.jsonTable.theadData){
	          		scope.colspanNum=scope.jsonTable.theadData.length;
	          		for(var i in scope.jsonTable.theadData){
	          			scope.jsonTable.theadData[i].showSortIcon=false;
	          		}
	          	}
	          	// 是否跳转新页面
	          	if(scope.tableData.target){
	          		scope.jsonTable.target="";
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
	          		};
	          		// 如果表格有值更具第一列排序
	          		if(!scope.tableData.sort_by_first_col) {
	          			scope.singleRowSort(scope.jsonTable.theadData[0].tbodyKey);
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
				var selectArr=seachArr.slice(0,seachArr.length);
				if(scope.inputSelectName){
					var searchTxt = scope.inputSelectName.split(",");
					var newArr=[];
					searchTxt.map(function(item) {
						if(item) {
							var filtered = $filter('filter')(selectArr, {name: item});
							for(var i in filtered){
								newArr.push(scope.tableData.tbodyData[filtered[i].id]);
								for(var j in selectArr){
									if(filtered[i].id==selectArr[j].id){
										selectArr.splice(j,1)
									}
								}
								
							}
						}
					});
					listTdData=newArr.slice(0,newArr.length);
					scope.totalItems=listTdData.length;
					scope.jsonTable.tbodyData=listTdData.slice(start,start+scope.itemsPerPage);
				}else{
					listTdData=scope.tableData.tbodyData.slice(0,scope.tableData.tbodyData.length);
					scope.jsonTable.tbodyData=listTdData.slice(start,start+scope.itemsPerPage);
					scope.totalItems=listTdData.length;
				}
				
			}
			
			// 排序
			scope.singleRowSort=function(name){
				// scope.jsonTable.theadData[i].showSortIcon=false;
				// stdTotalSizeArr.sort(compareTo("percent"));
				scope.theadHighLight = name;
				var start=(scope.currentPage-1)*scope.itemsPerPage;
				// console.log("name",name);
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
			function compareTo(name,order) {  
		        return function(o, p) {  
		            var a="", b="";  
		            if (typeof o === "object" && typeof p === "object" && o && p) {
		                // a1 = o[name].name.split(",")?o[name].name.split(","):(o[name].name+"").split(",");  
		                // b1 = p[name].name.split(",")?p[name].name.split(","):(p[name].name+"").split(","); 
		                // if(!o[name].name && p[name].name) {
		                // 	return 1;
		                // }
		                // if(o[name].name && !p[name].name) {
		                // 	return 0;
		                // }
		                // if(!o[name].name && !p[name].name) {
		                // 	return 0;
		                // }
		                var oname=o[name].name?o[name].name:"";
		                var pname=p[name].name?p[name].name:"";
		                // if(!o[name].name) {
		                // 	return 0;
		                // };
		                // if(!p[name].name) {
		                // 	return 0;
		                // };
		                a1 = (typeof(oname) != "number")?oname.split(","):(oname+"").split(",");  
		                b1 = (typeof(pname) != "number")?pname.split(","):(pname+"").split(","); 
		                for(var i in a1){
		                	a+=a1[i]
		                } 
		                for(var j in b1){
		                	b+=b1[j]
		                }
		                if (a === b) {  
		                    return 0;  
		                }
		                if(oname==""){
		                	return  1;  
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
	        function checkbox() {
		        scope.checkBox = scope.tableData.checkBox && scope.tableData.checkBox.showCheckBox ? scope.tableData.checkBox.showCheckBox : false;
	            scope.checkBoxTdWidth = scope.tableData.checkBox && scope.tableData.checkBox.width ? scope.tableData.checkBox.width : '50px' ;
	            var checkRows = [];
	            var checkRowsData = [];
	            scope.checkRowsData = [];
	            scope.checkBoxAction = function(data) {
	            	// console.log(data,"data")
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
    						// console.log(item.rowKey.name == item1.checkedRows.rowKey.name)
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
    				// console.log(scope.checkRowsData, "fanxuandta")
    				if(scope.checkRowsData.length !== scope.tableData.tbodyData.length) {
	            		//全选不全选
	            		scope.isCheckedAll = false
	            	}else{
	            		scope.isCheckedAll = true;
	            	}
            	}
            	//默认选中
		        scope.defaultChecked = function() {
		           var checkRowsData = [];
		           var tableData = scope.tableData;
		           if(tableData && tableData.checkBox) {
		           	    if(tableData.tbodyData && tableData.tbodyData.length) {
			           	    tableData.tbodyData.map(function(item) {
			           	  	  if(item.rowKey && item.rowKey.checkedKey && item.rowKey && item.rowKey.checkedKey === true) {
			           	  	  	checkRowsData.push({
			           	  	  		"checkedRows":item
			           	  	  	})
			           	  	  }
			           	    })
			           	    scope.checkRowsData = checkRowsData;
			           	}
		           }
		        }
		        scope.defaultChecked();
	        }
	    }
	}
}])