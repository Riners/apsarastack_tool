var myApp = angular.module('markdownEditor', ['ui.bootstrap']);
	function fn($scope){
		$scope.messageShow = true
	}
var flag = false; //判断楼梯效果是滚动出发的还是点击触发的，因为点击触发的不在angular作用域中
myApp.controller('markdownCtrl', function($scope, $http, $interval,$uibModal, $log) {
	$scope.value = 'Type **Markdown** here.';
//	$scope.visible = true;
    $scope.visible = false;
	$scope.preViewBtn = '预览';
	$scope.publishDocBtnText = '编辑';
	$scope.actionBtnVisible = false;
	$scope.docTitle = '';
	$scope.isAddNewDoc = 'modifyDoc';
	$scope.docTitleList = [];
	$scope.docListLength = 0;
	$scope.docContentList = [];
    $scope.markdownHtml = $scope.value;
    $scope.saveDocId = '';
    $scope.visiblePublishBtn = false;
    $scope.messageTitle = '文档名称不能重复';
    $scope.messageStyle = 'error';
    $scope.messageDuring = 500;
    $scope.messageShow = false;
    $scope.myProject = '';
    $scope.selectError = false;
    $scope.userName = 'xxx';
    $scope.projects = ['Get started' ,'部署' ,'运维','开发','高级功能','问题调查','过往版本' ];
    var $ = function (id) { 
      	return document.getElementById(id); 
    };
    $scope.chapter = [];
	$scope.preView = function() {
//      var converter = new showdown.Converter(); 
//      $('preview-box').innerHTML = converter.makeHtml($scope.value);
        $('preview-box').innerHTML = marked($scope.value)
		if($scope.preViewBtn === '预览') {
			$scope.visible = false;
	    	$scope.preViewBtn = '编辑';
		}else{
			$scope.visible = true;
		    $scope.preViewBtn = '预览';
		}
	}
	$scope.getUserInfo = function() {
		return $http({
			method: 'get',
            url:'/api/v1/get_curr_user_info?portal=1'
		}).then(function(data, status) {
			$scope.userName = data.data.name
		}).catch(function(data, status) {
			
		})
	}
	$scope.getUserInfo();
	$scope.isHasEquire = function() {
		return $http({
		    method: 'GET',
            url:'/api/v1/get_privileage?name=docs&type='
		}).then(function(data, status) {
			if(!data.data.enable) {
				$scope.isHasEquire = false;
			}else{
			  $scope.isHasEquire = true;
			}
		}).catch(function(data, status) {
			
		})
	}
	$scope.isHasEquire();
	$scope.addNewDoc = function() {
		//点击添加新文档后，发布按钮调用添加新文档接口，否则调用修改接口
		//添加新文件，然后保存之前编辑的文档
		$scope.isAddNewDoc = 'addNewDoc';
		$scope.publishDocBtnText = '发布';
		$scope.actionBtnVisible = true;
		$scope.visible = true;
		return $http({
//	        method: 'get',
//	        url:'/api/v1/docs_add?name=new Document&author='+'xxx'+'&content='+'&project='+ $scope.parameter
            method: 'post',
            url:'/api/v1/docs_add',
            headers: {'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'},
            data:'portal=1&name=new Document&author='+$scope.userName+'&project='+$scope.parameter 
	   }).then(function(data,status){
		    $scope.isAddNewDoc = 'modifyDoc';
		    //添加新的doc返回id，存入scope中
		    if($scope.saveDocId) {
		    	$scope.saveDraft('addAndSaveDraft',data.data.id);
		    }
		    if(!$scope.saveDocId) {
		    	$scope.value = '';
			    $scope.docTitle = 'new Document';
			    $scope.saveDocId = data.data.id;
			    $scope.getDocsList('edit');
		    }
		   // $scope.saveDocId = data.data.id;
	    }).catch(function(data,status){
	        console.log(" error");
	    })
	}
	$scope.saveDraft = function(type, id, name, content) {
		//添加新文件时的保存草稿，这时没有id？？
		//name相同时的校验
		if($scope.docTitleList.length) {
			$scope.docTitleList.map(function(item, index){
				if(item.id !== $scope.saveDocId && item.name === $scope.docTitle) {
//					alert('不能重复')
				}
			})
		}
		return $http({
//	        method: 'GET',
//	        url:'/api/v1/docs_draft?id='+$scope.saveDocId+'&name='+$scope.docTitle+'&content='+$scope.value
            method: 'post',
	        url:'/api/v1/docs_draft',
	        headers: {'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'},
	        data:'portal=1&id='+$scope.saveDocId+'&name='+$scope.docTitle+'&content='+encodeURIComponent($scope.value)
       }).then(function(data,status){
		    if(type === 'addAndSaveDraft') {
		    	$scope.value = '';
			    $scope.docTitle = 'new Document';
			    $scope.saveDocId = id;
			    //打开新建的docs
			    $scope.getDocsList('edit');
		    }
		    if(type === 'saveDraft') {
		    	Message($scope, 'success', 1000, '保存草稿成功')
		    	$scope.getDocsList('edit');
		    }
		    if(type === 'getDocsAndSaveDraft') {
		    	$scope.saveDocId = id;
			    $scope.docTitle = name;
			    $scope.value = content;
//			    var converter = new showdown.Converter(); 
                $('preview-box').innerHTML = marked($scope.value);
			    //还原为展示态
			    $scope.actionBtnVisible = false;
			    $scope.visible  = false;
			    $scope.publishDocBtnText = '编辑';
			    $scope.watchPreBox();
		    }
		    if(type === 'autoSave') {
		    	//$scope.getDocsList();
		    }
        }).catch(function(data,status){
            console.log(" error");
        })
	}
	$scope.getDoc = function(item) {
		//获取当前点击的doc
		return $http({
	        method: 'GET',
	        url:'/api/v1/docs_get?portal=1&id='+item.id
      }).then(function(data,status){
	        if(data.data.draft){
	    		$scope.draft = data.data.draft;
	    	}else{
	    		$scope.draft = ''
	    	}
		    if($scope.saveDocId && item.id !== $scope.saveDocId) {
		    	//此处需要保存草稿
		    	$scope.saveDraft('getDocsAndSaveDraft', item.id, item.name, data.data.content);
		    }else{
		    	//此处应该禁掉已打开的文档，让其不能再点击
		    	$scope.value = data.data.content;
//		    	$scope.markdownHtml = markdown.toHTML($scope.value);
//		        $('preview-box').innerHTML = $scope.markdownHtml;
//              var converter = new showdown.Converter(); 
                $('preview-box').innerHTML = marked($scope.value)
		        $scope.actionBtnVisible = false;
			    $scope.visible  = false;
			    $scope.publishDocBtnText = '编辑';
			    $scope.watchPreBox();
		    }
		    if(!$scope.saveDocId) {
		    	$scope.saveDocId = item.id;
			    $scope.docTitle = item.name;
			    $scope.value = data.data.content;
		    }
        }).catch(function(data,status){
            console.log(" error");
        })
	}
	//自动保存docs
	$scope.autoSaveDocs = function() {
//		var autoSaveTimer = ''
		//$scope.autoSaveTimer = '';
		if($scope.actionBtnVisible && $scope.visible) {
			$scope.autoSaveTimer = $interval(function() {
				$scope.saveDraft('autoSave');
			},1000*60)
		}else{
			$interval.cancel($scope.autoSaveTimer);
		}
	}
	$scope.$watch('actionBtnVisible + visible', $scope.autoSaveDocs);
	//监听saveDocId的变化
	$scope.saveDocIdChange = function() {
		if($scope.saveDocId && $scope.isHasEquire){
			$scope.visiblePublishBtn = true;
		}else{
			$scope.visiblePublishBtn = false;
		}
	}
	$scope.$watch('saveDocId', $scope.saveDocIdChange);
	$scope.searchDocName = function() {
	//  Message($scope, 'error', 1000, '错误')
	  var docList = [];
	  $scope.docTitleList.map(function(item, index) {
	  	var docName = item.name;
	  	if($scope.searchDocNameValue && docName.indexOf($scope.searchDocNameValue) !== -1) {
	  		docList.push(item);
	  	}
//	  	if(!$scope.searchDocNameValue) {
//	  		$scope.getDocsList('show');
//	  	}
	 })
	  if(!$scope.searchDocNameValue) {
	  	$scope.getDocsList('show');
	  }
	  $scope.docTitleList = docList;
	}
	$scope.getProject = function(){
		if($scope.myProject){
			location.href = '/docs?project=' + $scope.myProject
		}else{
            $scope.selectError = true;
		}
	}
	$scope.projectChange = function(){
		if($scope.myProject){
			$scope.selectError = false;
		}
	}
	$scope.deleteDoc = function(item) {
//		var  newNode = document.createElement("div");
//		var dialog = document.createElement('dialog');
//		newNode.appendChild(dialog);
//		var myApp = $('.markdownEditor');
//		myApp.appendChild(newNode);
	    return $http({
	        method: 'GET',
	        url:'/api/v1/docs_remove?portal=1&id='+item.id
        }).then(function(data,status){
		   
        }).catch(function(data,status){
            console.log(" error");
        })
	}
	$scope.publishDoc = function(size) {
		if($scope.publishDocBtnText === '编辑') {
		    $scope.publishDocBtnText = '发布';
			$scope.actionBtnVisible = true;
			$scope.visible = true;
			//如果当前的文档存在草稿，则提示是否编辑草稿
		}else{
			$interval.cancel($scope.autoSaveTimer);
//		    $scope.markdownHtml = markdown.toHTML($scope.value);
//			$('preview-box').innerHTML = $scope.markdownHtml;
            return $http({
		        method: 'POST',
		        url:'/api/v1/docs_save',       
              headers: {'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'},
//              headers: {'Content-type': 'Content-Type':'application/json'},
		        data:"portal=1&id=" + $scope.saveDocId +"&name="+$scope.docTitle+"&content="+encodeURIComponent($scope.value)
		    }).then(function(data,status){
			    Message($scope, 'success', 1000, '发布成功');
			    $scope.publishDocBtnText = '编辑';
			    $scope.actionBtnVisible = false;
			    $scope.visible = false;
//			    var converter = new showdown.Converter(); 
                $('preview-box').innerHTML = marked($scope.value)
			    $scope.getDocsList('show');
		    }).catch(function(data,status){
		        Message($scope, 'error', 1000, '发布失败')
		    }) 
		}
	}
	$scope.getUrlParameter = function() {
		var urlParameter = window.location.search.substr(1);
	    var parameterArr = urlParameter.split('&');
	    var parameter = '';
	    var docsId = ''
	    if(parameterArr && parameterArr.length) {
	    	parameterArr.map(function(item, index) {
	    		var itemArr = item.split('=');
	            if(itemArr[0] === 'project') {
	            	parameter = itemArr[1];
	            }
	            if(itemArr[0] === 'id') {
	            	docsId = itemArr[1];
	            }
	    	})
	    }
	    $scope.parameter = decodeURI(parameter) ? decodeURI(parameter) : 'Get started';
	    $scope.docsId = docsId;
	}
	$scope.getUrlParameter();
	$scope.getDocsList = function(type) {
        var project = $scope.parameter ? $scope.parameter : 'Get started';
		return $http({
	        method: 'GET',
	        url:'/api/v1/docs_list?portal=1&project='+ project
        }).then(function(data,status){
            var content = data.data ? data.data : {};
            var docList = [];
            var obj = {};
            var openFirstDocs = false;
        	for(var key in content) {
        		if(content[key] && content[key].id){
        			if(content[key].id == $scope.saveDocId){
	                	obj = {
	                		id:key,
				    		name:content[key].name ? content[key].name : '',
				    		author:content[key].author ? content[key].author : '',
	                	}
	                }else{
	                	docList.push({
				    		id:key,
				    		name:content[key].name ? content[key].name : '',
				    		author:content[key].author ? content[key].author : '',
				    	})
	                }
        		}
		    }
		    if(obj.id) {
		    	docList.unshift(obj);
		    	$scope.chosedIndex = 0;
		    }
		    if(!$scope.saveDocId && docList.length) {
        		//刚进入页面时打开第一篇文档
	            $scope.chosedIndex = 0;
	            $scope.getDoc({
	            	id:docList[0].id,
	            	name:docList[0].name,
	            	author:docList[0].author
	            })
	        }
		    $scope.docTitleList = docList;
		    $scope.docListLength = docList.length;
        }).catch(function(data,status){
            console.log(data,'erro')
        })
	}
	$scope.getDocsList('show');
	$scope.docsUrlChange = function(project, id) {
		if(id){
			location.href = "/docs?project="+ project + '&id='+id;
			$scope.getDoc({id:id});
		}else{
			location.href = "/docs?project="+ project
		}
	}
	//$scope.chosedIndex = 0;//默认是0使第一个有样式
	$scope.twoClick = function(index){
	    //保存点击的li位置
	    $scope.chosedIndex = index;
	}
	//监听visible的变化，展示状态下获取章节
	$scope.watchPreBox = function() {
		if(!$scope.visible && $scope.chosedIndex !== undefined && $scope.chosedIndex !== ''){
//			setTimeout(function(){
				var preBox = document.querySelector('.markdown-body');
				var tat = angular.element(preBox.getElementsByTagName("h1"));
				var tat2 = angular.element(preBox.getElementsByTagName("h2"));
				var tat3 = angular.element(preBox.getElementsByTagName("h3"));
			    if(tat && tat.length){
			    	tat.map(function(index, item) {
			    		item.className = 'title'
			    	})
			    }
			    if(tat2 && tat2.length){
			    	tat2.map(function(index, item) {
			    		item.className = 'title'
			    	})
			    }
			    if(tat3 && tat3.length){
			    	tat3.map(function(index, item) {
			    		item.className = 'title'
			    	})
			    }
			    var titleLabel = angular.element(preBox.querySelectorAll('.title'));
			    var titleData = [];
			    //以H1分割
			    function getTitle(label, oldArr, newArr) {
			    	if(oldArr && oldArr.length) {
			    		var sum = 0;
			    		var h1Data = [];
			    		var restData = [];
			    		for(var i = 0, len = oldArr.length; i< len; i++){
			    			if(oldArr[i].tagName == label){
			    				sum++;
				    		}
			    			if(sum === 2){
			    				h1Data = oldArr.slice(0, i)
			    				restData = oldArr.slice(i);
			    				oldArr = restData;
//			    				console.log(titleLabel, 'titleLabel')
			    				newArr.push(h1Data);
			    				break;
			    			}
			    		}
			    		if(sum == 1 || sum == 0){
			    			newArr.push(oldArr)
			    			return 1;
			    		}else{
			    			getTitle(label, oldArr, newArr);
			    		}
			    	}
			    }
			    getTitle('H1', titleLabel, titleData);
			    var souceData = [];
			    var result = [];
			    if(titleData && titleData.length) {
			    	titleData.map(function(item, index) {
			    		//以h2为分割点
			    		var oldData = item;
			    		var newData = [];
			    		function getH2Title() {
					    	if(oldData && oldData.length) {
					    		var sum = 0;
					    		var h1Data = [];
					    		var restData = [];
					    		for(var i = 0, len = oldData.length; i< len; i++){
					    			if(oldData[i].tagName == 'H2'){
					    				sum++;
						    		}
					    			if(sum === 2){
					    				h1Data = oldData.slice(0, i)
					    				restData = oldData.slice(i);
					    				oldData = restData;
					    				newData.push(h1Data);
					    				break;
					    			}
					    		}
					    		if(sum == 1 || sum == 0){
					    			newData.push(oldData)
					    			return 1;
					    		}else{
					    			getH2Title();
					    		}
					    	}
					    }
			            getH2Title();
			    		var h1Data = {};
			    		if(newData.length){
			    			var h2Data = [];
			    			var h1Html = '';
			    			newData.map(function(item2, index2){
			    				if(item2.length) {
			    					var h2data = {};
			    				    var h3Arr = [];
			    					item2.map(function(index3, item3) {
			    						if(item3.tagName == 'H1') {
			    							h1Html = item3.innerHTML;
			    						}
			    						if(item3.tagName == 'H2') {
			    							h2data.h2 = item3.innerHTML;
			    						}
			    						if(item3.tagName == 'H3') {
			    							h3Arr.push(item3.innerHTML);
			    						}
			    						if(h3Arr.length) {
			    							h2data.h3 = h3Arr;
			    						}
			    					})
			    					if(JSON.stringify(h2data) !== '{}') {
			    						h2Data.push(h2data);
			    					}
			    				}
			    			})
			    			h1Data = {
			    				'h1':{
			    					'h1':h1Html
			    				}
			    			}
			    			if(h2Data.length) {
			    				h1Data.h1.h2 = h2Data
			    			}
			    			
			    		}
			    		result.push(h1Data);
			    	})
			    }
			    $scope.chapter = result;
			    //文档的滚动，章节导航会跟着一起滚动
			    //监听章节导航滚动条的滚动
			    var chapterNavNative = document.querySelector('.chapterNav');
			    var chapterNav = angular.element(chapterNavNative);
			    var chapterNavScrollTop = 0;
			    chapterNavNative.addEventListener("scroll", function() {
			    	chapterNavScrollTop = chapterNav.scrollTop();
			    })
			    var markdownHtml = document.querySelector('.textarea-content');
			    markdownHtml.addEventListener("scroll",function(){
			    	//判断滚动条的方向
//			        var sTop = scroll().top;					
//	                if (sTop != scroll().top) {
//	                    console.log('上下滚动')
//	                    sTop = scroll().top;
//	                }
			    	var angularMarkdownHtml = angular.element(markdownHtml);
			    	var scrollTop = angularMarkdownHtml.scrollTop();
			    	var chapterBoxList = document.querySelectorAll('.chapterBox p');
				    if(titleLabel && titleLabel.length) {
				    	var chapterBox = angular.element(document.querySelector('.chapterBox'));
				    	for(var i = 0, len = titleLabel.length; i < len; i++) {
				    		if((titleLabel[i].offsetTop - scrollTop) < 100){
				    			chapterBox.find('p').removeClass('active');
				    			var top = 0;
				    			var chapterItemTop = 0;
				    			if(angular.element(chapterBoxList[i]) && angular.element(chapterBoxList[i]).position) {
				    				chapterItemTop = angular.element(chapterBoxList[i]).position().top;
				    			    top = angular.element(chapterBoxList[i]).position().top - 32 > 0 ? angular.element(chapterBoxList[i]).position().top -5 + chapterNavScrollTop : 22;
				    				angular.element(document.querySelector('.chapterNav .leftLine')).css({'top':top});
				    			}
				    			angular.element(chapterBoxList[i]).addClass('active');
				    			if(top - chapterItemTop < 100) {
				    				//console.log(top - chapterItemTop, 'op - chapterItemTop')
				    				chapterNavNative.scrollTop = 0;
				    			}else{
				    				chapterNavNative.scrollTop = top - chapterItemTop + 30;
				    			}
				    			//判断滚动条的方向
				    	
				    		}
				    	}
				    }
				},0)
		}
	}
	$scope.$watch('visible', $scope.watchPreBox)
	//模态框
    $scope.open = function (size, item) {
	    var modalInstance = $uibModal.open({
	         templateUrl:'/static/js/common/testuibootModel.html',
	         controller: 'ModalInstanceCtrl',
	         backdrop: "static",
             size: size,
             resolve:{
                items1: function () {
                    return {
                    	'item':item,
                    	'scope':$scope
                    }
                }
             }
      });
	};
    $scope.toggleAnimation = function () {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };
	$scope.openTipsDialog = function(size) {
    	if($scope.draft && $scope.publishDocBtnText === '编辑') {
    		 var modalInstance = $uibModal.open({
		         templateUrl:'/static/js/common/tipsTraftModel.html',
		         controller: 'ModalDraftCtrl',
		         backdrop: "static",
		         size: size,
		         resolve:{
		            items1: function () {
		                return {
		                	'scope':$scope
		                }
		            }
		         }
	        });
    	}
    }
});
myApp.controller('ModalInstanceCtrl',function($scope, $uibModalInstance, items1, $http){
	         var screenHeight = document.documentElement.clientHeight;
             setTimeout(function(){
	             var myModal = document.querySelector('.modal-content');
			     myModal.style.top = (screenHeight - 300)/2 + 'px';
             },100)
             $scope.ok = function () {
                $uibModalInstance.close();
                return $http({
			        method: 'GET',
			        url:'/api/v1/docs_remove?portal=1&id='+items1.item.id
		        }).then(function(data,status){
				    Message(items1.scope, 'success', 1000, '删除成功');
//				    items1.scope.
                    items1.scope.getDocsList('show');
		        }).catch(function(data,status){
		            Message(items1.scope, 'error', 1000, '删除失败!')
		        })
             };
             $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
             };
});

myApp.controller('ModalDraftCtrl',function($scope, $uibModalInstance, items1, $http){
	         var screenHeight = document.documentElement.clientHeight;
             setTimeout(function(){
	             var myModal = document.querySelector('.modal-content');
			     myModal.style.top = (screenHeight - 300)/2 + 'px';
             },100)
             $scope.ok = function () {
                $uibModalInstance.close();
                items1.scope.value = items1.scope.draft;
                items1.scope.draft = '';
             };
             $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
                items1.scope.draft = '';
             };
});

myApp.directive('markdownHtml', function(){
    return {
        restrict: 'AE',
        scope: false,
        replace: true,
        template: function(markdownHtml){
        	return markdownHtml;
        },
    };
})
myApp.directive('dialog', function() {
	return {
		restrict: 'AE',
        scope: {
        	
        },
        replace: true,
        template: "<div class='pangu-dialog'>"+
                    "<div class='pangu-dialog-zhezhao'></div>"+
                    "<div class='pangu-dialog-content'>"+
                     "<div class='pangu-dialog-header'><span></span><p>您确定要删除该文档吗？</p></div>"+
                     "<div class='pangu-dialog-body'><p>删除该文档后将无法找回</p></div>"+
                     "<div class='pangu-dialog-footer'><button class='dialog-cancel'>取消</button><button class='dialog-ensure'>确定</button></div>"+
                   "</div></div>",
        link:function(scope, element) {
        	var screenHeight = window.screen.height;
        	var screenWidth = window.screen.width;
        	scope.setDialogStyle = function() {
        		$('.pangu-dialog-zhezhao').css({'height':screenHeight,'width':screenWidth});
        		$('.pangu-dialog-content').css({'left':(screenWidth-300)/2,'top':(screenHeight-150)/3})
        	}
        	scope.setDialogStyle();
        }
	}
})
//message
myApp.directive('message', function() {
	return {
		restrict: 'AE',
		scope: {
		  title:'=',
		  messageStyle:'=',
		  during:'=',
		  messageShow:'='
		},
		replace: true,
		controller: function($scope) {
           // $scope.messageShow=false;
//          setTimeout(function(){
//  			$scope.messageShow = false;
//  			$scope.$apply();
//  		}, $scope.during)
        },
		template:"<div><p ng-bind='title'></p></div>",
		link:function(scope, element, $scope) {
        	scope.setDialogStyle = function() {
//      		var screenHeight = window.screen.height;
//      	    var screenWidth = window.screen.width;
//      		if(scope.messageStyle == 'success') {
//      			$('.myMessage').removeClass('pangu-message-content-error')
//      			$('.myMessage').addClass('pangu-message-content-success')
//      		}else{
//      			$('.myMessage').removeClass('pangu-message-content-success')
//      			$('.myMessage').addClass('pangu-message-content-error')
//      		}
//      	    $('.myMessage').css({'left':(screenWidth-100)/2,'top':0}).animate({top:(screenHeight-100)/2.5},150);
        	}
        	scope.setDialogStyle();
        }
	}
})
$(document).ready(function() {
    var Wheight = window.screen.availHeight;
	$('.markdownEditor .docsListAll').css({'minHeight':Wheight-63-110-150});
	var chapterBox = document.querySelector('.chapterBox');
	//监听章节导航滚动条的滚动
	var chapterNavNative = document.querySelector('.chapterNav');
    var chapterNav = $(chapterNavNative);
    var chapterNavScrollTop = 0;
    chapterNavNative.addEventListener("scroll", function() {
    	chapterNavScrollTop = chapterNav.scrollTop();
    })
	chapterBox.onclick = function(ev){
　　　　var ev = ev || window.event;
　　　　var target = ev.target || ev.srcElement;
　　　　if(target.nodeName.toLowerCase() == 'p'){
            $(chapterBox).find('p').removeClass('active');
            $(target).addClass('active');
            $('.chapterNav .leftLine').css({'top':($(target).position().top - 5 + chapterNavScrollTop)});
            var targetHtml = target.innerHTML;
            var titleList = document.querySelectorAll('.markdown-body .title');
            var titleListRealy = Array.prototype.slice.call(titleList);
            if(titleListRealy && titleListRealy.length) {
            	titleListRealy.map(function(item, index) {
            		if(item.innerHTML == targetHtml) {
//          			console.log(item.offsetTop)
            			$(".textarea-content").scrollTop(item.offsetTop)

            		}
            	})
            }
　　　　}
　　}
})
