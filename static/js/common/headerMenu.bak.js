var body_content_height = 0;

window.onload  = function() {
//	body_content_height = $('.body-content').height();
//	var sideBar_cluster_content = $('.sideBar-main .sideBar-cluster');
//	sideBar_cluster_content.css({'height':body_content_height-350});
	//var wHeight = window.innerHeight;
	var wHeight = $(window).height();
	var body_content = $('.body-content');
	var paramHeight=get_pangu_urlParameter(window.location.href).showbroder?0:53;
	body_content.css({'height':wHeight - paramHeight,'overflowY':'auto'});
	var sideBar_cluster_content = $('.sideBar-main .sideBar-cluster');
	sideBar_cluster_content.css({'height':wHeight-410});
	var side_bar_content = $('.side-bar-content');
	side_bar_content.css({'height':wHeight-53});
	//判断是否用户使用的chrome浏览器，如果不是chrome浏览器则显示提示框
	if(!(navigator.userAgent.indexOf("Chrome") > -1)){
	    var nav_tips_content = $(".header .nav-tips-content");
	    nav_tips_content.css({'display':'block'});
	    var close_tips_btn = nav_tips_content.find(".close-tips");
	    close_tips_btn.click(function() {
	    	nav_tips_content.css({'display':'none'})
	    })
	}
	//用户信息
	var userAction = $(".useName");
	var logoutContent = $('.useName .logout');
	var navbar = $('.navbar');
	var navFirstUl = $('.navbar .nav');
	userAction.click(function(e) {
		e.stopPropagation();
//		navFirstUl.find('ul').css({'display':'none'});
		var display_val = logoutContent.css('display') === 'block' ? 'none' : 'block';
		logoutContent.css({'display':display_val})
	})
	$(document).click(function() {
		logoutContent.css({'display':"none"})
	})
	navbar.click(function() {
//		navFirstUl.find('ul').css({'display':'block'});
		logoutContent.css({'display':"none"});
	})
}
$(document).ready(function() {
	var sideBar_cluster_content_height = $(window).height() - 410;
	var pageUrl = window.location.href;
	var urlParameter = get_pangu_urlParameter(pageUrl);
	var group = urlParameter.group ? urlParameter.group : '';
	var cluster = urlParameter.cluster ? urlParameter.cluster : '';
	var host = urlParameter.host ? urlParameter.host : '';
	var parameterObj = {};
	if(urlParameter.group) {
		parameterObj.group = urlParameter.group;
	}
	if(urlParameter.cluster) {
		parameterObj.cluster = urlParameter.cluster;
	}
	if(urlParameter.host) {
		parameterObj.host = urlParameter.host;
	}
	function concatParameter(parameterObj) {
		var str = ''
		if(JSON.stringify(parameterObj) !== '{}'){
			for(var key in parameterObj) {
			  str = str + key+'='+parameterObj[key]+'&';
		    }
		}
		return str;
	}
	var pageLocation = window.location.search.substr(1);
//	function sideBarClusterHeight() {
//		body_content_height = $('.body-content').height();
//		var sideBar_cluster_content = $('.sideBar-main .sideBar-cluster');
//		sideBar_cluster_content.css({'height':body_content_height-350})
//	}
//	sideBarClusterHeight();
    function portalHearderMenu() {
    	var pagePath = window.location.pathname.substr(1);
	//	$('.header .headerNav.' +pagePath).css({'background':'#907e7e'});
	    if(pagePath) {
		    $(".header .dropdown."+pagePath+"").addClass('active');
			$(".header .dropdown."+pagePath+"").find('.bottom-line').addClass('clickActive');
			$(".header .dropdown."+pagePath+"").find('.levelMenu a').css({'color':'#fff'})
	    }
		$('.header .headerNav').mouseenter(function() {
			$(this).find('.subMenu').addClass('active');
			$(this).find('.bottom-line').addClass('active');
	        $(this).addClass('hoverActive');
		}).mouseleave(function(){
			$(this).find('.subMenu').removeClass('active');
			$(this).find('.bottom-line').removeClass('active');
	        $(this).removeClass('hoverActive');
		})
		$('.header .headerNav').find('.levelMenu a').click(function(){
			var thisItem = $(this).closest('.headerNav');
			thisItem.addClass('clickActive');
			thisItem.siblings().removeClass('clickActive');
		})
		
       // handleSubmenuStyle('stretch');
	    //side bar的显示和隐藏
	    var isShowsideBarBtn = $('.panguPortal-index .icon');
	    var isShowSideBar = true;
	    isShowsideBarBtn.click(function() {
	    	if(isShowSideBar) {
	    	//	handleSubmenuStyle('shrink');
	    		$('.side-bar-content').css({'width':'0px'})
	    		$('.body-content').css({'marginLeft':'0px'})
		    	isShowSideBar = false;
		    }else{
		    //	handleSubmenuStyle('stretch');
		    	$('.side-bar-content').css({'width':'180px'})
		    	$('.body-content').css({'marginLeft':'180px'})
		    	isShowSideBar = true;
		    }
	    })
    }
    //顶部菜单的submenu样式跟随sidebar的伸展和收缩变化
//  function handleSubmenuStyle(isStretch) {
//  	var subMenuList = $('.headerNav .subMenu');
//      var pageWidth = document.body.clientWidth;
//	    subMenuList.map(function(index, item) {
//	    	//console.log($(item).find('.subMenu-ul-content').children(), 'subMenu-ul-content')
//	    	if(isStretch == 'stretch') {
//	    		if($(item).find('.subMenu-ul-content').children().length) {
//		    		$(item).css({'minHeight':'60px','width':pageWidth-160,'left':160})
//		    	}else{
//		    		$(item).css({'minHeight':0,'width':0})
//		    	}
//	    	}
//	    	if(isStretch == 'shrink') {
//	    	    if($(item).find('.subMenu-ul-content').children().length) {
//		    		$(item).css({'minHeight':'60px','width':pageWidth,'left':0})
//		    	}else{
//		    		$(item).css({'minHeight':0,'width':0})
//		    	}
//	    	}
//	    })
//  }
    //头部菜单动态获取数据
    //判断url中是否带有参数函数封装
    function hasUrlParameter(url) {
    	if(url && url.indexOf('?') == -1) {
    		return true;
    	}else{
    		return false;
    	}
    }
    $.ajax({
	     url: "/api/v1/get_portal_menu?group="+group+"&cluster="+cluster,
	     type: "GET",
	     success: function( data, textStatus, jqXHR ){
	     	var portalMenu = document.querySelector('.header-menu-left-content');
	     	if(data && data.length) {
	     		var html = '';
	     		var subMenu_content = '';
	     		data.map(function(item, index) {
	        		var subMenu = '';
	        		if(item.sub && item.sub.length) {
	        			item.sub.map(function(item1, index1){
	        				var nextSubMenu = '';
	        				var nextSub = true;
	        				var hasNextSubMenu = '';
	        				if(item1.sub && item1.sub.length) {
	        					item1.sub.map(function(item2, index2) {
	        					    var nextSubMenuHref = '';
	        					    if(item2.append_param && item2.append_param == 0) {
	        					    	nextSubMenuHref = item2.url;
	        					    }else{
	        					    	var str = concatParameter(parameterObj);
	        					    	if(hasUrlParameter(item2.url)){
//	        					    		if(JSON.stringify(parameterObj) !== '{}'){
//	        					    			var str = ''
//	        					    			for(var key in parameterObj) {
//	        					    			  str = str + key+'='+key+'&';
//	        					    		    }
//	        					    			nextSubMenuHref = item2.url + '?'+str;
//	        					    		}
				        					//nextSubMenuHref = item2.url + '?' + 'group='+group+;
				        					nextSubMenuHref = item2.url + '?'+str;
				        				}else{
				        					nextSubMenuHref = item2.url + '&'+str;
				        				}
	        					    }
	        						nextSubMenu = nextSubMenu +
	        						                '<li><a href="'+nextSubMenuHref+'">'+item2.name+'</a></li>'
	        					})
	        					hasNextSubMenu = '<ul class="dropdown-menu">'+nextSubMenu+'</ul>';
	        				}
	        				//判断url中是否带有参数
	        				var subMenuHref = '';
	        				if(item1.append_param && item1.append_param == 0) {
	        					subMenuHref = item1.url;
	        				}else{
	        					var str = concatParameter(parameterObj);
	        				    if(hasUrlParameter(item1.url)){
		        					subMenuHref = item1.url + '?'+str;
		        				}else{
		        					subMenuHref = item1.url + '&'+str;
		        				}
	        				}
                            var triangleLeft = hasNextSubMenu == '' ? '' : 'dropdown-submenu';
                            subMenu = subMenu + '<li class="'+triangleLeft+'">'+
													'<a href="'+subMenuHref+'" tabindex="-1">'+item1.name+'</a>'+
													hasNextSubMenu+
												'</li>'
	        			})
	        		}
	        		var hasLevelMenu = subMenu == '' ? 0 : '5px 0';
	        		subMenu_content = 	'<ul class="dropdown-menu multi-level" aria-labelledby="dropdownMenu" style="padding:'+hasLevelMenu+'">'+
	        		                        subMenu+
										'</ul>'
//                  var arr = [{
//                  	'name':'Pangu Portal',
//                  	'pathname':''
//                  }]
                    var pathname = '';
                    if(item.url && item.url !== '#') {
                    	var pagePath = item.url.split('?');
                        pathname = pagePath[0].substr(1);
                    }
                    var isLogo = item.name == 'Pangu Portal' ? 'logo' : '';
                    var levelMenuHref = '';
                        if(item.append_param && item.append_param == 0) {
                        	levelMenuHref = item.url;
                        }else{
                        	var str = concatParameter(parameterObj);
                        	if(hasUrlParameter(item.url)){
	        					levelMenuHref = item.url + '?'+str;
	        				}else{
	        					levelMenuHref = item.url + '&' +str;
	        				}
                        }
                    var targer_blank = item.target && item.target == '_blank' ? '_blank' : '';
                    if(subMenu) {
        	            html = html + '<li class="dropdown '+pathname+'">'+
							'<a href="'+levelMenuHref+'" class="dropdown-toggle" data-toggle="dropdown">'+
								item.name+
								'<b class="caret"></b>'+
							'</a>'+
							subMenu_content+
						'</li>';
                    }else{
        	            html = html + '<li class="dropdown '+pathname+'">'+
							'<a href="'+levelMenuHref+'"  target="'+targer_blank+'">'+
								item.name+
							'</a>'+
						'</li>';
                    }
	            })
	        	if(portalMenu) {
	        		portalMenu.innerHTML = html;
	        	}
	     	}
	     	portalHearderMenu();
	     },
	     error: function(jqXHR, textStatus, errorMsg){
	        console.log('请求失败')
	     }
    })
	function compare(x, y) {
    	if (x['cluster'] > y['cluster'])
    	{
    		return 1;
    	}
    	if (x['cluster'] < y['cluster'])
    	{
    		return -1;
    	}
    	return 0;
    }
    //side bar 操作
    function sideBarGroupHandle() {
    	$('.sideBar-group .group-item').click(function() {
    		groupChecked = $(this).find('a')[0].innerText;
    		getClusters(groupChecked);
    	    sideBarClusterRender(clusterListData);
    	})
    }
    function sideBarClusterHandle() {
    	
    }
    //side bar group 搜索
    var searchGroupResult = [];
    function groupSearch() {
    	$('.searchClusters .search-group-icon').click(function(){
            groupSearchCommon();
    	})
    	var searchGroupInput = $('.searchClusters .seach-group-input');
    	searchGroupInput.keyup(function() {
    		groupSearchCommon();
    	})
    }
    function groupSearchCommon() {
	   	searchGroupResult = [];
		var keyText = $('.searchClusters .seach-group-input').val();
		var reg = new RegExp(keyText,"i");
		if(groupListData.length) {
			groupListData.map(function(item, index) {
//				if(keyText && item.indexOf(keyText) !== -1) {
//					searchGroupResult.push(item);
//				}
				if(item.search(reg) !== -1) {
					searchGroupResult.push(item);
				}
			})
		}
		if(!keyText) {
			searchGroupResult = groupListData;
		}
		sideBarGroupRender(searchGroupResult);
    }
    //side bar Cluster search
    var searchClusterResult = [];
    function clusterSearch() {
    	$('.searchClusters .search-cluster-icon').click(function() {
    		clusterSearchCommon();
    	});
    	var searchClusterInput = $('.searchClusters .seach-cluster-input');
    	searchClusterInput.keyup(function() {
    		clusterSearchCommon()
    	}) 
    }
    function clusterSearchCommon() {
	   	searchClusterResult = [];
		var keyText = $('.searchClusters .seach-cluster-input').val();
		var reg = new RegExp(keyText,"i");
		if(clusterListData.length) {
			clusterListData.map(function(item, index) {
				if(item.cluster.search(reg) !== -1) {
					searchClusterResult.push(item);
				}
			})
		}
		if(!keyText) {
			searchClusterResult = clusterListData;
		}
		sideBarClusterRender(searchClusterResult);
    }
    //side bar动态渲染，最新
    var groupListData = [];
	var clusterListData = [];
	var groupChecked = '';
//	var clusterListAll = [];
	var allGroupAndCluster = '';
	function getClusters(groupChecked) {
		clusterListData = [];
		if(allGroupAndCluster) {
			for(var key in allGroupAndCluster) {
				if(key == groupChecked) {
                    if(allGroupAndCluster[key] && allGroupAndCluster[key].length) {
                    	allGroupAndCluster[key].map(function(item) {
                    		clusterListData.push({
                    			'group':key,
 						        'cluster':item
                    		})
                    	})
                    }
                    clusterListData = clusterListData.sort(compare);
				}
			}
		}
	}
	function sideBarGroupRender(groupData) {
		//处于高亮group相对于group content的高度
	    var groupActiveTop = 0;
		var groupContainer = document.querySelector('.sideBar-main .sideBar-group');
		var groupHtml = '';
		if(groupData && groupData.length) {
			groupData.map(function(item, index) {
				//计算高亮的group相对于group content的高度
				if(item == group) {
					groupActiveTop = (index+1)*27;
				}
				var groupActive = item == group ? 'active': '';
				groupHtml = groupHtml + '<p class="group-item '+groupActive+'" title="'+item+'"><a class="group-item-a '+item+'">'+item+'</a></p>'
			})
		}
		groupContainer.innerHTML = groupHtml;
        groupContainer.scrollTop = groupActiveTop > 250 ? groupActiveTop - 250 + 90 : 0;
	}
	function groupClick(data) {
		console.log(data,"gggg")
	}
    function sideBarClusterRender(clusterList) {
    	var clusterActiveTop = 0;
		var clusterContainer = document.querySelector('.sideBar-main .sideBar-cluster');
		var clusterHtml = '';
		if(clusterList && clusterList.length) {
			clusterList.map(function(item, index) {
				if(item.cluster == cluster) {
					clusterActiveTop = (index+1)*27;
				}
				var clusterActive = item.cluster == cluster ? 'active': '';
				clusterHtml = clusterHtml + '<p class="cluster-item '+clusterActive+'"><a class="cluster-item-a '+item.group+'">'+item.cluster+'</a></p>'
			})
		}
		clusterContainer.innerHTML = clusterHtml;
		clusterContainer.scrollTop = clusterActiveTop > sideBar_cluster_content_height ? clusterActiveTop - sideBar_cluster_content_height + 90 : 0;
	}
    //点击侧边栏，跳转，带上url里边的参数，用事件委托实现
    function sidebarHref() {
    	var sidebarContent = document.querySelector(".sideBar-main");
    	sidebarContent.onclick = function(ev) {
    		var ev = ev || window.event;
　　　                 var target = ev.target || ev.srcElement;
            var preGroup = group;
        	var preCluster = cluster;
        	var currentGroup = '';
        	var currentCluster = '';
            if(target.nodeName.toLowerCase() == 'a') {
            	console.log(target.className.split(" "), "target.className")
            	if(target.className.indexOf('group-item-a') > -1) {
            		currentGroup = target.innerHTML;
            	}
            	if(target.className.indexOf('cluster-item-a') > -1) {
            		currentCluster = target.innerHTML;
            	}
            }
            var paramStr = window.location.search.substr(1);
          	function getParamObj(str) {
          		var paramObj = {};
          		if(str) {
          			var arrParam = str.split("&");
          			arrParam.map(function(item) {
          				item = item.split("=");
          				paramObj[item[0]] = item[1];
          			})
          		}
          		return paramObj;
          	}
          	var paramMap = getParamObj(paramStr);
          	var urlPath = window.location.pathname;
            if(currentGroup) {
 //         	    window.location.href = "/redirect?group="+currentGroup+"&preGroup="+preGroup+"&preCluster="+preCluster;
	            $.ajax({
				    url: "/api/v1/redirect_interace",
				    type: "POST",
				    data:"group="+currentGroup+"&cluster=&path="+urlPath+"&org_param="+JSON.stringify(paramMap),
				    success: function( data, textStatus, jqXHR ){
				    	if(data && data.url) {
							window.location.href = data.url
						}
				    }
	        	})
            }
            if(currentCluster) {
            	var arr = target.className.split(" ");
            	currentGroup = arr[1];
 //         	    window.location.href = "/redirect?group="+currentGroup+"&cluster="+currentCluster+"&preGroup="+preGroup+"&preCluster="+preCluster;
                $.ajax({
				    url: "/api/v1/redirect_interace",
				    type: "POST",
				    data:"group="+currentGroup+"&cluster="+currentCluster+"&path="+urlPath+"&org_param="+JSON.stringify(paramMap),
				    success: function( data, textStatus, jqXHR ){
				    	if(data && data.url) {
							window.location.href = data.url
						}
				    }
            	})
            }
    	}
    }
    //拼接参数的封装
    function joinParameter(data) {
    	var parameter = "";
    	console.log(data, "data")
    	for(var key in data) {
    		if(data[key] === 'undefined' || data[key] === '' || data[key] === null) {
    			parameter = parameter + key+"=&"
    		}else{
    			parameter = parameter + key+"="+ data[key]+"&"
    		}
    	}
    	parameter = parameter.substring(0, parameter.length - 1);
    	return parameter;
    }
    $.ajax({
	     url: "/api/v1/list_cluster?detail=0&portal=1",
	     type: "GET",
	     success: function( data, textStatus, jqXHR ){
	     	if(data) {
	     		allGroupAndCluster = data;
	     		for(var key in data) {
		        	groupListData.push(key);
		        	if(group && group == key) {
		        	    if(data[key] && data[key].length) {
	                        data[key].map(function(item, index) {
	                        	clusterListData.push({
	                        		'group':key,
	                        		'cluster':item
	                        	})
	                        })
		        	    }
		        	}
		        	if(!group) {
		        		if(data[key] && data[key].length) {
	                        data[key].map(function(item, index) {
	                        	clusterListData.push({
	                        		'group':key,
	                        		'cluster':item
	                        	})
	                        })
		        	    }
		        	}
		        }
	     		clusterListData = clusterListData.sort(compare);
	     	}
	        if(groupListData.length) {
	        	groupListData = groupListData.sort();
	        }
            sideBarGroupRender(groupListData);
            sideBarClusterRender(clusterListData);
          //  sideBarGroupHandle();
            groupSearch();
            clusterSearch();
            sidebarHref();
		 },
	     error: function(jqXHR, textStatus, errorMsg){
	        console.log('请求失败')
	     }
	});

})

//portal在线答疑
$(document).ready(function() {
	var urlParameter = get_pangu_urlParameter(window.location.href);
	var portalRobot = $(".portal-chat-icon");
	var chatContent = $(".chat-content");
	var closeChatBtn = chatContent.find(".chat-close");
	var chatDetails = chatContent.find(".chat-details-content");
	var userEditTextarea = chatContent.find(".user-edit-msg");
	var sendBtn = chatContent.find(".send-button");
	var tipsContent = $(".portal-chat-tip");
	var hideVoneBtn = $(".portal-chat .hide-vone");
	var showVoneBtn = $(".show-vone");
	var portalChat = $(".portal-chat");
	var voneContent = $(".vone-content");
	var vone = $(".vone");
	var isShowChat = false;
	var chat_msg_list = [
	    {
	   	    "part":"admin",
	   	    "msg":"你好，我是答疑小助手，有什么需要我帮助你的吗？"
	    }
	]
	if(urlParameter.vone === '1') {
		vone.css({'display':'block'})
	}
	portalRobot.click(function() {
		var me = $(this);
		if(!isShowChat) {
			voneContent.css({'width':'10px'});
			tipsContent.css({'visibility':'hidden'});
			chatContent.css({'display':'block'});
			chatContent.animate({height:'512px',width:'380px'}, 300, 'linear',function() {
				isShowChat = true;
				me.html("x").css({'fontSize':'24px','background':'#00c1de','borderRadius':'100%'});
			});
			//刚进入聊天界面时渲染一次
			setTimeout(function() {
				renderChatMsg(chat_msg_list);
			}, 1000)
		}else{
			tipsContent.css({'visibility':'visible'});
	        chatContent.animate({height:0,width:0}, 300, 'linear',function() {
	        	isShowChat = false;
	        	me.html("Vone").css({'fontSize':'16px','background':'#232020','borderRadius':'100%'});
	        });
	        chatContent.css({'overflow':'hidden'});
		}
		
	})
	closeChatBtn.click(function() {
		tipsContent.css({'visibility':'visible'});
        chatContent.animate({height:0,width:0}, 300, 'linear');
        chatContent.css({'overflow':'hidden'})
	})
	userEditTextarea.keydown(function(event) {
		var keycode = event.keyCode;
		if(keycode === 13) {
			event.preventDefault();  
			var userEditMsg = userEditTextarea.val();
			if(userEditMsg) {
				chat_msg_list.push({
			    	"part":"user",
			    	"msg":userEditMsg
			    })
				renderChatMsg(chat_msg_list);
				userEditTextarea.val('');
				$.ajax({
				    type: 'POST',
				    url: "/api/v1/pangu_robot",
				    data: "msg="+ userEditMsg,
				    success: function(data) {
				    	chat_msg_list.push({
					    	"part":"admin",
					    	"msg":data.msg
					    })
				    	renderChatMsg(chat_msg_list);
				    }
				});
			}
		}
	})
	sendBtn.click(function() {
	    var userEditMsg = userEditTextarea.val();
		if(userEditMsg) {
			chat_msg_list.push({
		    	"part":"user",
		    	"msg":userEditMsg
		    })
			renderChatMsg(chat_msg_list);
			userEditTextarea.val('');
			$.ajax({
			    type: 'POST',
			    url: "/api/v1/pangu_robot",
			    data: "msg="+ userEditMsg,
			    success: function(data) {
			    	chat_msg_list.push({
				    	"part":"admin",
				    	"msg":data.msg
				    })
			    	renderChatMsg(chat_msg_list);
			    }
			});
		}
	})
	//vone图标最小化影藏到右侧
	hideVoneBtn.click(function() {
		$(this).css({'display':'none'});
		showVoneBtn.css({'display':'block'});
		showVoneBtn.animate({right:0}, 100);
		portalChat.css({'display':'none','right':'-200px'});
		voneContent.mouseenter(function() {
			$(this).css({'width':'80px'});
			portalChat.css({'display':'block','right':'30px'});
		}).mouseleave(function() {
			$(this).css({'width':'10px'});
			if(!isShowChat) {
				portalChat.css({'display':'none','right':'-200px'});
			}
		})
	})
	//聊天信息的渲染
	function renderChatMsg(data) {
		if(data && data.length) {
			var html = '';
			var length = data.length;
			data.map(function(item, index) {
				var chat_item_last = ''
				if(index + 1 === length) {
					chat_item_last = 'chat-item-last';
				}
				if(item.part === 'admin') {
					html = html + 
					    '<div class="admin-group '+ chat_item_last +'">'+
				            '<img class="admin-img" src="/static/js/common/img/cc.jpg" />'+
				            '<div class="admin-msg">'+
				                '<p class="part-name">抚民<p>'+
				                '<i class="triangle-admin"></i>'+
				                '<div class="admin-reply">'+item.msg+'</div>'+
				            '</div>'+
					    '</div>'
				}
				if(item.part === 'user') {
					html = html +
						'<div class="user-group '+ chat_item_last +'">'+
				            '<div class="user-msg">'+
				                '<p class="part-name">罗明<p>'+
				                '<div class="user-reply">'+item.msg+'</div>'+
				                '<i class="triangle-user"></i>'+
				            '</div>'+
					        '<img class="user-img" src="/static/js/common/img/bb.jpg" />'+
					    '</div>'
				}
				chatDetails.html(html)
			})
			//渲染完成，滚动条高度到最下面
			var chatLast = chatDetails.find(".chat-item-last");
			var top = chatLast.offset().top + chatLast.height() + 1000;
			chatDetails.scrollTop(top);
		}
	}
})
//公告
$(document).ready(function() {
	var gongGaoContent = $(".portal-gong-gao");
	var gongGaoMsg = gongGaoContent.find(".gong-gao-msg");
	var gongGaoClose = gongGaoContent.find(".gong-gao-close");
	$.ajax({
	    type: 'get',
	    url: "/api/v1/pangu_announcement",
	    success: function(data) {
            if(data && data.msg) {
            	gongGaoContent.css({'display':'block'});
           	  gongGaoMsg.html(data.msg);
            }
            if(!data.msg) {
            	gongGaoContent.css({'display':'none'});
            }
	    }
	});
	gongGaoClose.click(function() {
		gongGaoContent.css({'display':'none'});
	})
})