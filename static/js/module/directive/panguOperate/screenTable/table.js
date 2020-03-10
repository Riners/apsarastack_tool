myApp.directive('screenTable', function($filter,$compile) {
	return {
		restrict: 'AE',
		scope: {
		  screenTableData:'=',
		  tableAction:'&opeaClickFunc',
		},
		replace: true,
		templateUrl:"/static/js/module/directive/panguOperate/screenTable/table.html",
		link:function(scope, element, parent) {
			scope.tableData={
	      		"theadData":[],//表格thead 数据体
	      		"tbodyData":[],//表格tbody 数据体
	      		"titleBtn":[],
	      		"batchBtn":[],
	      		"title":"",//表格上方标题
	      		"sortArr":"",//多项排序 "sortArr":{"key":"disk","data":["status","IP","DiskId"]}
	      		"showSearch":false,//是否显示模糊查询,默认显示
	      		"showPage":false,//是否显示分页 默认显示
	      		// "colspan":scope.tableData.theadData.length,
	      		"showCheckBox":false,//是否 显示点选框,默认不显示
	      		"secondTable":false,//是否 显示点击展开收缩第2层表格
	      		"showTheadSort":false,//是否展示表头排序
	      		"showTdTip":"没有数据!",//表格数据获取中时提示
	      		"tableExplain":"",//表格说明
	      		"itemsPerPage":10 //每页显示条数
	      	}

			scope.$watchGroup(["screenTableData"], function (newValue, oldValue){
	          if (newValue) {
	          	//检查数据是否有变化，若数据改变则重新赋值.
	          	if(!scope.tableData){
	          		return
	          	};
	          	if(scope.screenTableData){
	          		dealTableData(scope.screenTableData);
	          	}
	          }
	        },true);
	        
			//分页
			//分页 初始化 相关属性
			scope.maxSize = 5;  //可点击选着数字最大个数
	        scope.totalItems = 0;//总条数
	        scope.currentPage = 1;//当前页
			//改变每页查询条数
		    scope.changePagesize=function(){
		      scope.tableData.tbodyData=listTdData.slice(0,scope.itemsPerPage);
		    };
	        //切换分页时调取函数
	        scope.changePage=function(){
	        	var start=(scope.currentPage-1)*scope.itemsPerPage;
	        	scope.tableData.tbodyData=listTdData.slice(start,start+scope.itemsPerPage);
			}
	        //分页end
	        
	        //第一次加载时是否 更具多个key值排序
	        scope.clickSortArr=function(data){
	       	  var start=(scope.currentPage-1)*scope.itemsPerPage;

       	  	  
        	  listTdData=listTdData.sort(compareSortArr(data));
			  scope.tableData.tbodyData=listTdData.slice(start,start+scope.itemsPerPage);
	        };
	        function compareSortArr(data) {
	          var  name=data.data[0];
		      return function(o, p) {  
	            var a="", b="";  
	            if (typeof o === "object" && typeof p === "object" && o && p) {
	            	if(!o[name].name){
	            		return 1
	            	}
	            	if(!p[name].name){
	            		return 0
	            	};
	            	a=o[name].name;
	            	b=p[name].name;
	            	var count=0;
	                return resCompare(o,p,count,data);  
	            }  
		      };  
		    }
		    function resCompare(o,p,count,data){
		    	var  name=data.data[count];
		    	var a1="",b1="";

		    	a=o[name]?o[name].name:"";
	            b=p[name]?p[name].name:"";
		    	if(count==0&&data.key=="disk"){
            	  if(o.status.name=="DISK_OK"){
		            a1=1;
		          }else if(o.status.name=="DISK_SHUTDOWN"){
		            a1=2;
		          }else if(o.status.name=="DISK_ERROR"){
		            a1=3;
		          }else{
		            a1=4;
		          };
		          if(p.status.name=="DISK_OK"){
		            b1=1;
		          }else if(p.status.name=="DISK_SHUTDOWN"){
		            b1=2;
		          }else if(p.status.name=="DISK_ERROR"){
		            b1=3;
		          }else{
		            b1=4;
		          };
		          if(a1==b1){
		          	var rescount=count+1;
		          	resCompare(o,p,rescount,data);
				  }else{
				  	return a1>b1?-1:1;
				  }
        	  	}else if(count==0&&data.key=="cs"){
        	  	  if(o.status.name=="NORMAL"){
		            a1=1;
		          }else if(o.status.name=="READONLY"){
		            a1=2;
		          }else if(o.status.name=="SHUTDOWN"){
		            a1=3;
		          }else{
		            a1=4;
		          };
		          if(p.status.name=="NORMAL"){
		            b1=1;
		          }else if(p.status.name=="READONLY"){
		            b1=2;
		          }else if(p.status.name=="SHUTDOWN"){
		            b1=3;
		          }else{
		            b1=4;
		          };
		          if(a1==b1){
		          	var rescount=count+1;
		          	resCompare(o,p,rescount,data);
				  }else{
				  	return a1>b1?-1:1;
				  }
        	  	}
        	  	if (a === b) { 
            	  if(count<data.data.length-1){
            	  	var count2=count+1;
            	  	resCompare(o,p,count2,data);
            	  	
            	  }else{
            	  	return 0;  
            	  }	                 
                }
            	if(!isNaN(Number(a))&&!isNaN(Number(b))){  
                    return Number(a) < Number(b) ? -1 : 1;  
                }  
                if (typeof a === typeof b) {  
                	// var diskid1=o["id"].name;
                	// var diskid2=p["id"].name;
                	// var test1=a;
                	// var test2=b;
                	// var test3=a < b ? -1 : 1;
                    return a < b ? -1 : 1;  
                }
            	
                return typeof a < typeof b ? -1 : 1;
		    }
	        //排序
	        scope.clickRowSort=function(name,order){
	       	  var start=(scope.currentPage-1)*scope.itemsPerPage;
	          for(var i in scope.tableData.theadData){
	          	if(scope.tableData.theadData[i].key==name){
	          		listTdData=listTdData.sort(compareTo(name,order));
					scope.tableData.tbodyData=listTdData.slice(start,start+scope.itemsPerPage);
	          	}
	          }
	        }
	        function compareTo(name,order) {  
		      return function(o, p) {  
	            var a="", b="";  
	            if (typeof o === "object" && typeof p === "object" && o && p) {
	            	if(o[name].name==undefined){
	            		return
	            	}
	            	if(p[name].name==undefined){
	            		return 
	            	}
	                a1 = (typeof(o[name].name) != "number")?o[name].name.split(","):(o[name].name+"").split(",");  
	                b1 = (typeof(o[name].name) != "number")?p[name].name.split(","):(p[name].name+"").split(","); 
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
					if(order=="ase"){
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
	        //排序end
	        scope.isCheckedAll=false;
	        // 处理传入的screenTableData数据
	        scope.showTableTbody=true;
	        var tbodyDataBak=[];//备份初始传入的tbodyData值，方便查询
	        var listTdData=[];//查询/处理后 tbodyData 的值
	        var seachArr=[];//处理传入的 body体 使之方便搜索
			function dealTableData(data){

				if(data.titleBtn){
					scope.tableData.titleBtn=data.titleBtn
				};
				if(data.batchBtn){
					scope.tableData.batchBtn=data.batchBtn
				};
				var reqtbodyData=data.tbodyData.slice(0,data.tbodyData.length);
				if(data.showCheckBox){
					scope.tableData.showCheckBox=data.showCheckBox;
					reqtbodyData=showCheckBoxFunc(reqtbodyData);
				};
				if(data.secondTable){
					scope.tableData.secondTable=data.secondTable;
				};
				tbodyDataBak=reqtbodyData;
				listTdData=reqtbodyData;
				scope.tableData.theadData=data.theadData;
				scope.tableData.tbodyData=reqtbodyData;
				scope.totalItems=reqtbodyData.length;//总条数
				scope.tableData.itemsPerPage=data.itemsPerPage?data.itemsPerPage:scope.tableData.itemsPerPage;
				scope.itemsPerPage=scope.tableData.itemsPerPage;//每页显示的数量.设置值小于1表示显示所有项
				if(scope.tableData.tbodyData.length!=0){
					scope.showTableTbody=true;
					// scope.tableData.colspan=data.colspan?data.colspan:scope.tableData.theadData.length
				}else{
					scope.showTableTbody=false
				};
				if(scope.tableData.tbodyData){
	          		seachArr=[];
	          		for(var i in listTdData){
	          			var serObj={};
	          			var seachStr="";
		          		for(var j in listTdData[i]){
		          			seachStr+=listTdData[i][j].name+'\b';
		          		}
	          			serObj.name=seachStr;
	          			serObj.id=i;
	          			seachArr.push(serObj);
	          		};
	          		// 如果表格有值更具第一列排序
	          		// scope.singleRowSort(scope.jsonTable.theadData[0].tbodyKey);
	          	}
				// 改变默认值
				// 当showPage为false时关闭分页
				if(data.showPage==false){
					scope.tableData.showPage=data.showPage
				}else{
					scope.tableData.showPage=true
				};
				// 当showSearch 为false时 关闭模糊查询
				if(data.showSearch==false){
					scope.tableData.showSearch=data.showSearch
				}else{
					scope.tableData.showSearch=true
				};
				if(data.title){
					scope.tableData.title=data.title
				};
				if(data.tableExplain){
					scope.tableData.tableExplain=data.tableExplain
				};
				if(data.showTdTip){
					scope.tableData.showTdTip=data.showTdTip
				};
				// 
				if(data.showTheadSort){
					scope.tableData.showTheadSort=data.showTheadSort
				};
				if(data.sortDes){
					scope.clickRowSort(scope.tableData.theadData[0].key,'des')
				}
				// sortArr
				if(data.sortArr){
					scope.clickSortArr(data.sortArr)
				}
				scope.changePage();
			}
			//返选相关事件
			//初始化 是否显示返选
			function showCheckBoxFunc(data){
				for(var i in data){
					data[i].checkBox=false;
				};
				if(scope.tableData.titleBtn&&scope.tableData.titleBtn[0].key!="reverse"){
					scope.tableData.titleBtn.unshift({"name":"反选","key":"reverse"})
				}
				
				return data;
			};
			// 点击返选相关事件
			scope.clickCheckBox= function(str,index){	
				var dealData=scope.tableData.tbodyData;
				if(str=="all"){
					scope.isCheckedAll=!scope.isCheckedAll;
					for(var i in dealData){
						dealData[i].checkBox=scope.isCheckedAll;
					}
				};
				if(str=="alone"){
					for(var i in dealData){
						if(index==i){
							dealData[i].checkBox=!dealData[i].checkBox
						}	
					}
				}
				scope.tableData.tbodyData=dealData;
				// scope.$disget();
			};
			function dealselectArr(){
          		seachArr=[];
          		// for(var i in listTdData){
          		// 	var serObj={};
          		// 	var seachStr="";
	          	// 	for(var j in listTdData[i]){
	          	// 		seachStr+=listTdData[i][j].name+'\b';
	          	// 	}
          		// 	serObj.name=seachStr;
          		// 	serObj.id=i;
          		// 	seachArr.push(serObj);
          		// };
          		for(var i in tbodyDataBak){
          			var serObj={};
          			var seachStr="";
	          		for(var j in tbodyDataBak[i]){
	          			seachStr+=tbodyDataBak[i][j].name+'\b';
	          		}
          			serObj.name=seachStr;
          			serObj.id=i;
          			seachArr.push(serObj);
          		};
			}
			//搜索框
			//搜索框双向绑定数据
			scope.inputSelectName = ""; //输入框输入字符串
			scope.selectName=function(){
				dealselectArr();
				var start=(scope.currentPage-1)*scope.itemsPerPage;
				if(scope.inputSelectName){
					var filtered = $filter('filter')(seachArr, {name: scope.inputSelectName});
					var newArr=[];
					for(var i in filtered){
						// newArr.push(listTdData[filtered[i].id]);
						newArr.push(tbodyDataBak[filtered[i].id]);
					};
					listTdData=newArr.slice(0,newArr.length);
					scope.totalItems=listTdData.length;
					scope.tableData.tbodyData=listTdData.slice(start,start+scope.itemsPerPage);
				}else{
					listTdData=tbodyDataBak.slice(0,tbodyDataBak.length);
					scope.tableData.tbodyData=listTdData.slice(start,start+scope.itemsPerPage);
					scope.totalItems=listTdData.length;
				}
			}
			//搜索框end
			
			//表格上方按钮 显示/隐藏 显示隐藏按钮 list 
			scope.clickBtnList=function(index){
				for(var i in scope.tableData.batchBtn){
					if(i==index){
						if(scope.tableData.batchBtn[i].showBtnList){
							scope.tableData.batchBtn[i].showBtnList=false;
						}else{
							scope.tableData.batchBtn[i].showBtnList=true;
						}
					}else{
						scope.tableData.batchBtn[i].showBtnList=false;
					}
				}
			}
			//操作栏 显示/隐藏 更多弹框 
			scope.showTableMore="";
		    scope.clickTableMore=function(name){
		      if(name==scope.showTableMore){
		        scope.showTableMore="";
		      }else{
		        scope.showTableMore=name;
		      }
		    };
		    // 点击表格更多之外的区域,隐藏更多选项
		    $(document).bind('click',function(e){ 
		      var e = e || window.event; //浏览器兼容性 
		      var elem = e.target || e.srcElement; 
		      while (elem) { //循环判断至跟节点，防止点击的是div子元素 
		        if (elem.id && elem.id=='tableMoreTd') { 
		          return; 
		        } 
		        elem = elem.parentNode; 
		      } 
		      scope.clickTableMore(scope.showTableMore);
		      scope.clickBtnList(-1)
		      scope.$apply();
		    });
		    scope.showSecondTablele=false
	    	scope.clickSecondTableIcon=function(index){
	    		// scope.showSecondTablele=!scope.showSecondTablele;
	    		scope.tableData.tbodyData[index].secondTable.switchWhen=!scope.tableData.tbodyData[index].secondTable.switchWhen
	    	}
	    	// scope.clickappend=function(){	
	    	// 	var t = document.getElementById("testtableid1");
		    //     var rows = t.getElementsByTagName("tr");
		    //     //给tr绑定click事件
		    //     for(var i in rows){
		    //       rows[i].onclick = rowClick;
		    //     }
	    	// }

	    	// function rowClick(e){ 
	    	// 	$("table tr:eq("+this.rowIndex+")").after("<tr><td>c-01</td><td>c-02</td><td>c-03</td><td>c-04</td></tr>");
	    		
	    		// var str="<tr><td><screen-table-test screen-table-data='"+scope.screenTableData+"'"
	    		// 	+ "opea-click-func=\"opeaClickFunc({\'item\':item, \'info\':info})\"></screen-table-test></td></tr>"
	    			
	    		// var str="<kbn-table-row  screen-table-data='"+scope.screenTableData+"'></kbn-table-row>"		
	    		// $("table tr:eq("+this.rowIndex+")").after($compile(str));
		        // console.log(this.rowIndex); //显示所点击的行的索引
		    // }
        }
	}
})
// var tbodyData=[
//   {"host":{"name":"主机1"},"ip":{"name":"ip1"},"sendbuff":{"name":"sendbuff1"},"operation":{"name":"","button":["添加","删除"]}},
//   {"host":{"name":"主机1"},"ip":{"name":"ip1"},"sendbuff":{"name":"sendbuff1"},"operation":{"name":"","button":["添加","删除"]}},
//   {"host":{"name":"主机1"},"ip":{"name":"ip1"},"sendbuff":{"name":"sendbuff1"},"operation":{"name":"","button":["添加","删除"]}},
//   {"host":{"name":"主机1"},"ip":{"name":"ip1"},"sendbuff":{"name":"sendbuff1"},"operation":{"name":"","button":["添加","删除"]}},
// ];

//表格传入样式
// var theadData=[
//      {"name":"主机","key":"host","width":"","icon":[""],"clickName":""},
//      {"name":"ip","key":"ip","width":""},
//      {"name":"sendbuff","key":"sendbuff","width":""},
//      {"name":"操作","key":"operation","width":"170px"},
//     ];
    
//     $scope.opeaClickFunc=function(data){
//       console.log(data)
//     }
//     // name,url,button,a_class
//     var tbodyData=[];
//     function testtbodyDatafunc(){    
//       for(var i=0;i<4;i++){
//         var obj={};
//         obj.host=dealTablebodyObj("主机"+i);
//         obj.ip=dealTablebodyObj("ipsxcxfded"+i);
//         obj.sendbuff=dealTablebodyObj("sendbucxdsdfdsff"+i);
//         obj.operation=dealTablebodyObj("","",[{"name":"添加"},{"name":"删除","class":"fontDeleteColor"},{"name":"修改"},{"name":"修改1"},{"name":"修改2"}],"","id"+i);
//         tbodyData.push(obj);
//       }
//     }
//     testtbodyDatafunc();

//     $scope.disk_tableData = {
//       "theadData":theadData,
//       "tbodyData":tbodyData,
//       "showSearch":false,//是否显示模糊查询,默认显示
//       "showCheckBox":true,//是否 显示点选框,默认不显示
//       "showPage":false,//是否显示分页 true为显示 默认显示
//     }; 