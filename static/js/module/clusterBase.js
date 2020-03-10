var leftMenuObj={
	"cluster_dashboard":{
		"id":"menuLeftId0"
	},
	"cluster_dashboard_summary":{
		"id":"menuLeftId01"
	},
	"cluster_dashboard_node":{
		"id":"menuLeftId02"
	},
	"monitor_latest":{
		"id":"menuLeftId03"
	},
	"pangu_opr":{
		"id":"menuLeftId1"
	},
	"opr_log":{
		"id":"menuLeftId3"
	},
	"configuration":{
		"id":"menuLeftId4"
	},
	"env_check":{
		"id":"menuLeftId6"
	},
	"availability":{
		"id":"menuLeftId7"
	},
	"disk_upline_undisk":{
		"id":"menuLeftIdDisk4"
	},
	"disk_upline":{
		"id":"menuLeftIdDisk1"
	},
	
	"disk_downline":{
		"id":"menuLeftIdDisk2"
	},
	"disk_history":{
		"id":"menuLeftIdDisk3"
	},
	"lessmin_abn_chunk":{
		"id":"menuLeftId9"
	},
	// "disk_downline":{
	// 	"id":"menuLeftId10"
	// },
	"cluster_data_lessmin_abn_chunk":{
		"id":"menuLeftId110"
	},
	"cluster_data_rebalance":{
		"id":"menuLeftId111"
	},
	"cluster_data_recycle":{//回收站
		"id":"menuLeftId112"
	},
	"cluster_data_file":{//文件运维
		"id":"menuLeftId113"
	},
	"replication":{
		"id":"menuLeftId115"
	},
	"pangu_gc":{
		"id":"menuLeftId116"
	},
	"cluster_opr_ms":{
		"id":"menuLeftIdCluOpr1"
	},
	"cluster_opr_cs":{
		"id":"menuLeftIdCluOpr2"
	},
	"cs_blacklist":{
		"id":"menuLeftIdCluOpr3"
	},
	"monitor_history":{
		"id":"menuLeftId31"
	},
	"log_view":{
		"id":"menuLeftId32"
	},
}

window.onload  = function() {
	var wHeight = $(window).height();
	var pathname= window.location.pathname.split("/")[1];
	var menuRightCss=$('.menuRightCss');
	var paramHeight=get_pangu_urlParameter(window.location.href).showbroder?0:53;
	menuRightCss.css({'height':wHeight -paramHeight,'overflowY':'auto'});
	var menuLeftCss = $('.menuLeftCss');
	menuLeftCss.css({'height':wHeight-paramHeight});
	if(leftMenuObj[pathname]){
		$("#"+leftMenuObj[pathname].id).addClass('active');
	}
	
	if(pathname=="env_check"||pathname=="availability"){
		$("#menuLeftId5").addClass('active menu-open');
	}
	if(pathname=="disk_upline"||pathname=="disk_downline"||pathname=="disk_history"||pathname=="disk_upline_undisk" ){
		$("#menuLeftIdDisk").addClass('active menu-open');
	}
	if(pathname=="lessmin_abn_chunk"||pathname=="disk_downline"){
		$("#menuLeftId8").addClass('active menu-open');
	}
	if(pathname=="cluster_dashboard_summary"||pathname=="cluster_dashboard_node"||pathname=="monitor_latest"){
		$("#menuLeftId0").addClass('active menu-open');
	}
	if(pathname=="cluster_data_lessmin_abn_chunk"||pathname=="cluster_data_rebalance"||pathname=="cluster_data_file"||pathname=="cluster_data_recycle"||pathname=="replication"||pathname=="pangu_gc" ){
		$("#menuLeftId11").addClass('active menu-open');
	}
	if(pathname=="cluster_opr_ms"||pathname=="cluster_opr_cs"||pathname=="cs_blacklist"){
		$("#menuLeftIdCluOpr").addClass('active menu-open');
	}
	// showCluBaseLoading()//显示加载图标
	// hiddenCluBaseLoading()//隐藏加载图标
	getClusterName();
}
function getClusterName(){
	// showCluBaseLoading()
	if(window.location.pathname.split("/")[1]=="index"){
		return
	}
	$.ajax({
	     url: "/api/v1/cluster_name?app=portal&timestamp="+new Date().getTime(),
	     type: "GET",
	     success: function( data, textStatus, jqXHR ){
	     	var cluster_name="";
	     	if(data.Success){
	     		cluster_name="集群名:"+data.Content.cluster_name
	     	}
	     	var cluster_name_id = document.getElementById("cluster_base_clustername_id");
	     	var para=document.createElement("span");
			var node=document.createTextNode(cluster_name);
			para.appendChild(node);
			cluster_name_id.appendChild(para);
			// hiddenCluBaseLoading()
	     },
	    error:function(data, textStatus, jqXHR ){
			console.log("get_cluster_name",data);
			// hiddenCluBaseLoading();
		}
	})
}

function showCluBaseLoading(){
	var wHeight = window.screen.height;
	var width=window.screen.width
	var menuRightCss=$('.cluBaseLoadingCss');
	var paramHeight=get_pangu_urlParameter(window.location.href).showbroder?0:53;
	menuRightCss.css({'height':wHeight -paramHeight,'width':width});
	var cluBaseLoadingImg=$('.cluBaseLoadingImg');
	cluBaseLoadingImg.css({'margin-top': wHeight/2-paramHeight-55});
	document.getElementById("cluBaseLoading").style.display=""
}

function hiddenCluBaseLoading(mun){
	if(mun){
	 	var timename=setTimeout(function(){
       		document.getElementById("cluBaseLoading").style.display="none"
     	},mun);
	}else{
		
		document.getElementById("cluBaseLoading").style.display="none"
		
	}

	// document.getElementById("cluBaseLoading").style.display="none"
}

// function clickmenuLeftId(){
// 	$("ul#menuLeftId").on("click","li",function(){
// 		var clickId=$(this).attr('id');
// 		if(clickId=="menuLeftId6"||clickId=="menuLeftId7"||clickId=="menuLeftId9"||clickId=="menuLeftId10"){
// 			$(".sidebar-menu li").removeClass('active');
// 			$(".sidebar-menu li").removeClass('active');
// 			$(".sidebar-menu li ul li").removeClass('active');
// 			$(this).addClass('active');
// 			$(this).parent().parent().addClass('active');
// 		}else if(clickId=="menuLeftId5"||clickId=="menuLeftId8"){}else{
// 			$(".sidebar-menu li").removeClass('active');
// 			$(".sidebar-menu li").removeClass('active');
// 			$(".sidebar-menu li ul li").removeClass('active');
// 			$(this).addClass('active');
// 		}
// 	});
// }