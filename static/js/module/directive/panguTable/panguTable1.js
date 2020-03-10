//var myApp = angular.module('myApp', []);
//myApp.controller('tabCtrl', function($scope, $http){
//	$scope.tabData = ['AAA','BBB','CCC','DDD'];
//})
myApp.directive('newPanguTable', function() {
	return {
		restrict: 'AE',
		scope: {
//		  columns:'=',
//		  data:'=',
		  tableAction:'&action',
		},
		replace: true,
		controller: function($scope) {
           // $scope.chosedIndex = 0
        },
		templateUrl:"/static/js/module/directive/panguTable/panguTable.html",
		link:function(scope, element, parent) {
//	    	scope.tabClick1 = function(index, item){
//			  scope.chosedIndex = index;
//			  tabClick(index, item);
//			} 
            scope.columns = [
	            {
	            	"title":"姓名",
	            	"dataIndex":"name",
	            	"width":"100px"
	            },
	             {
	            	"title":"年龄",
	            	"dataIndex":"age",
	            	"width":"200px"
	            },
	             {
	            	"title":"城市",
	            	"dataIndex":"addres",
	            	"width":"25%"
	            },
	            {
	            	"title":"操作",
	            	"dataIndex":"action",
	            	"width":""
	            }
            ];
            scope.data = [
	            {
	                "age":{
	                	"text":"24",
	                	"url":"www.baidu.com"
	                },
	                 "action":{
	                	"text":["增加1","删除1"]
	                },
	                "name":{
	                	"text":"zhang san"
	                },
	                "addres":{
	                	"text":"beijin"
	                }
	             
	            },
	              {
	                "name":{
	                	"text":"li si"
	                },
	                "addres":{
	                	"text":"shanghai"
	                },
	                "age":{
	                	"text":"25"
	                },
	                "action":{
	                	"text":["增加2","删除2"]
	                }
	            },
	              {
	              	"addres":{
	              		"text":"guangzhou"
	              	},
	                "name":{
	                	"text":"wangwu"
	                },
	                "age":{
	                	"text":"26"
	                },
	                "action":{
	                	"text":["增加3","删除3"]
	                }
	            }
            ]
            var columns = scope.columns;
            var sourceData = scope.data;
            scope.panguTableData = [];
            if(columns && columns.length) {
            	sourceData.map(function(item, index) {
            		var obj = {};
            		columns.map(function(item1, index1) {
            		    for(var key in item) {
            		    	if(key == item1.dataIndex) {
            		    		obj[key] = item[key];
            		    		break;
            		    	}
            		    }
            	    })
            		scope.panguTableData.push(obj);
            	})
            }
//	        scope.$watchGroup(['tabData'], function (newValue, oldValue){
//		        if (newValue) {
//		          	
//		        }
//	        });
	    	
        }
	}
})
