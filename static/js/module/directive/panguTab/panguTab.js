//var myApp = angular.module('myApp', []);
//myApp.controller('tabCtrl', function($scope, $http){
//	$scope.tabData = ['AAA','BBB','CCC','DDD'];
//})
myApp.directive('tab', function() {
	return {
		restrict: 'AE',
		scope: {
		  tabData:'=',
		  isShowTabBtn:'=',
		  tabClick:'&aa',
		  chosedIndex:'=',
		  tabClass:'='
		},
		replace: true,
		controller: function($scope) {
           // $scope.chosedIndex = 0
        },
		templateUrl:"/static/js/module/directive/panguTab/panguTab.html",
		link:function(scope, element, parent) {
			scope.chosedIndex = scope.chosedIndex ? scope.chosedIndex : 0;
			scope.isShowTabBtn = false;
//	    	scope.tabClick1 = function(index, item){
//			  scope.chosedIndex = index;
//			  tabClick(index, item);
//			} 
	        scope.$watchGroup(['tabData'], function (newValue, oldValue){
	          if (newValue) {
	              setTimeout(function() {
			    	var tabList = Array.prototype.slice.call(angular.element(document.querySelectorAll('.'+scope.tabClass+' .chart-tab .tab-ul li')));
					var ulLength = 0;
					var tabTotal = 0;
				    tabList.map(function(item, index) {
						ulLength = ulLength + item.offsetWidth;
						tabTotal = index + 1;
					})
				    var ul = angular.element(document.querySelector('.'+scope.tabClass+' .chart-tab .tab-ul'))[0];
				    var chartTab = angular.element(document.querySelector('.'+scope.tabClass+' .chart-tab'))[0];
				    ul.style.width = ulLength + 'px';
					var tabBtnLeft = angular.element(document.querySelector('.'+scope.tabClass+' .btn-left'))[0];
					var tabBtnRight = angular.element(document.querySelector('.'+scope.tabClass+' .btn-right'))[0];
					var positionLeft = 0;
					var index = 0;
					var panguTabContent = angular.element(document.querySelector('.'+scope.tabClass+' .pangu-tab-content'))[0];
					var pageTabNum = parseInt((panguTabContent.offsetWidth - 76)/152);
					if(ulLength > panguTabContent.offsetWidth - 76) {
						scope.isShowTabBtn = true;
						//chartTab.style.marginLeft = 38 + 'px';
						scope.$apply();
					}
					var minLeft = ulLength > panguTabContent.offsetWidth - 76 ? panguTabContent.offsetWidth -76 - ulLength : 0;
					//运动封装
	                function move(direction, target, start) {
	                	//计算速度
	                	var speed = (target - start)/40;
	                	var current = start;
	                	var timer = setInterval(function() {
	                		ul.style.left = current + speed +'px';
	                		current = current + speed;
	                		if(direction === 'left' && ((target - current) < 0 || (target - current) == 0)) {
			              		clearInterval(timer);
		                        ul.style.left = target +'px';
	              	        }
	                		if(direction === 'right' && ((target - current) > 0 || (target - current) == 0)) {
		                		clearInterval(timer);
		                        ul.style.left = target +'px';
		                	}
	                	},10);
	                }
					tabBtnLeft.onclick = function() {
	                    index = index + pageTabNum;
	                    var start = ul.offsetLeft;
					    var target = index*(150+2);
						if(target > 0) {
							move('left', 0, start);
						}
						if(target < 0 || target == 0) {
							move('left', target, start);
						}
						if(index > 0 || index == 0) {
							index = 0;
						}
				   }
				   tabBtnRight.onclick = function() {
	                	index = index - pageTabNum;
	                    var start = ul.offsetLeft;
					    var target = index*(150+2) > minLeft ? index*(150+2) : minLeft;
						if(target < minLeft || target == minLeft) {
							index = pageTabNum - tabTotal;
							move('right', minLeft, start);
						}else{
							move('right', target, start);
						}
					}
		    	},100)	
	          }
	        });
	    	
        }
	}
})
