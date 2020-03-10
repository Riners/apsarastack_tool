//获取URl参数  传入一个url 解析？后面的参数  返回一个对象
function get_pangu_urlParameter(url){
  // var url=window.location.href;
  var url1=url.split("#");
  var arrUrl=url1[0].split("?");
  var mapParam = {};
  mapParam.winLocationHref=arrUrl[1];
  if(arrUrl[1]){
    var groupUrl=arrUrl[1].split("&");
    for(var i=0;i<groupUrl.length;i++){
      lsParam = groupUrl[i].split("=");
      if(lsParam.length!=2){
        continue;
      }
      mapParam[lsParam[0]] = lsParam[1];
    }
  }
  if(!mapParam.group){
    mapParam.group="";
  }
  if(!mapParam.cluster){
    mapParam.cluster="";
  }
  if(!mapParam.clusters){
    mapParam.clusters="";
  }
  if(!mapParam.tag){
    mapParam.tag="";
  }
  return mapParam;
}
// var a=[0]; 
// document.write(isArray(a),'<br/>'); 
// 判断是否为数组
function isArray(obj){ 
  return (typeof obj=='object')&&obj.constructor==Array; 
}
// document.write(isString('test'),'<br/>'); 
// document.write(isString(10),'<br/>'); 
// 判断是否为字符串
function isString(str){ 
  return (typeof str=='string')&&str.constructor==String; 
}
// 判断是否为数字
function isNumber(obj){ 
  return (typeof obj=='number')&&obj.constructor==Number; 
};
// 判断是否为对象
function isObject(obj){ 
return (typeof obj=='object')&&obj.constructor==Object; 
}; 
//传入以小时为单位的时间 返回xxxx-xx-xx xx:xx:xx格式的时间
function dealTimeFormat(num){
  var getData=new Date();
  var endTime=getDateStr(new Date(getData.getTime()-num*60*60*1000));  
  return endTime;
}
//把时间转化为字符串格式
function getDateStr(date){
  var year=date.getFullYear();
  var month=date.getMonth()+1;
  var dates=date.getDate();
  var hours=date.getHours();
  var minutes=date.getMinutes();
  var seconds=date.getSeconds();
  if(month<10){
    month="0"+month;
  }
  if(dates<10){
    dates="0"+dates;
  }
  if(hours<10){
    hours="0"+hours;
  }
  if(minutes<10){
    minutes="0"+minutes;
  }
  if(seconds<10){
    seconds="0"+seconds;
  }
  var time=year+"-"+month+"-"+dates+" "+hours+":"+minutes+":"+seconds;
  return time;
}

//时间格式化
function getDateStr1(date){
  var year=date.getFullYear();
  var month=date.getMonth()+1;
  var dates=date.getDate();
  if(month<10){
    month="0"+month;
  }
  if(dates<10){
    dates="0"+dates;
  }
  var time=year+"-"+month+"-"+dates;
  if(!year) {
  	time = "";
  }
  return time;
}

//操作数字串,传入一个  长数字 和单位 返回整数前3位逗号分割，保留小数点num位
//例  manageNum(1782378.237478238,3)-->1,782,378.237
function manageNum(dataNum,num){
  if(dataNum=="none"){
    return "none";
  }
  var num1=parseFloat(dataNum);
  var num2=num1.toFixed(num);
  var x=num2.split(".");
  var intNum=parseInt(x[0]).toLocaleString();
  var smallNum="";
  if(x[1]){
    smallNum="."+x[1];
  }
  num3=intNum+""+smallNum;
  return num3
}
// 处理热力图数据  传入group下所有集群 data
function disTreeMapData3(data){
  var clusterChart=[];
  var regionChart={};
  for(var i in data){
    //计算集群健康度图表数据
    var region_p={};
    if(regionChart[data[i].basic.group_name]!=true){
      regionChart[data[i].basic.group_name]=true;

      region_p = {
        id: data[i].basic.group_name,
        name: data[i].basic.group_name,
        color: "#FFFFFF"
      };
      clusterChart.push(region_p);
    };

    var cluster_p={};
    var color_cluster_p="";
    if(data[i].basic.cluster_health_map.score==0){
      color_cluster_p="#090"
      // color_cluster_p="#579257"
    }else if(data[i].basic.cluster_health_map.score<100)
    {
      color_cluster_p="#F90"
      // color_cluster_p="#e4c28e"
    }else if(data[i].basic.cluster_health_map.score<10000){
      color_cluster_p="#F4F"
      // color_cluster_p="#ef6c00"
    }else{
      color_cluster_p="#F00"
      // color_cluster_p="#d86e6e"
    }
    cluster_p = {
        id: data[i].basic.group_name+data[i].basic.cluster_name,
        name: data[i].basic.cluster_name,
        parent: data[i].basic.group_name,
        value: 1,
        color: color_cluster_p,
        events:{
          click:function(e){  //点击事件  
            window.open("/health?type=cluster&cluster="+e.point.name+"&group="+e.point.parent);
          }
        }
    };
    clusterChart.push(cluster_p);
  }
  return clusterChart;
}
// 数组去重
function array_remove_repeat(a) { // 去重
  var r = [];
  for(var i = 0; i < a.length; i ++) {
      var flag = true;
      var temp = a[i];
      for(var j = 0; j < r.length; j ++) {
          if(temp === r[j]) {
              flag = false;
              break;
          }
      }
      if(flag) {
          r.push(temp);
      }
  }
  return r;
}
// 数组交集
function array_intersection(a, b) { // 交集
  var result = [];
  for(var i = 0; i < b.length; i ++) {
      var temp = b[i];
      for(var j = 0; j < a.length; j ++) {
          if(temp === a[j]) {
              result.push(temp);
              break;
          }
      }
  }
  return array_remove_repeat(result);
}
// 处理top5 表格相关数据
function disTop5Data(data,counter,id,func,baseData){
  var obj={};
  obj.id=id;
  obj.data=[];
  var baseDataLineArr=[];
  if(baseData){
    if(isArray(baseData.data)){
      baseDataLineArr=baseData.data;
    }else if(isNumber(baseData.data)){
      for(var k=0;k<data.length;k++){
        baseDataLineArr.push(baseData.data);
      };
    }
  }
  for(var i in data){
    var digObj={};
    digObj.key=data[i].key;
    digObj.group=data[i].group;
    if(func=="manageNum6"){
      digObj.val=manageNum(data[i].val,6);
    }
    if(func=="manageNum3"){
      digObj.val=manageNum(data[i].val,3);
    }
    if(func=="toMB"){
      digObj.val=manageNum(data[i].val/1024/1024,0);
    }
    if(func=="manageNum"){
      digObj.val=manageNum(data[i].val,0);
    }
    if(baseData&&baseData.cmp_opr==">"){
      if(data[i].val>baseDataLineArr[i]){
        digObj.classColor="boxibaseline";
      }
    }else if(baseData&&baseData.cmp_opr=="<"){
      if(data[i].val<baseDataLineArr[i]){
        digObj.classColor="boxibaseline";
      }
    }
    obj.data.push(digObj);
  }
  return obj
};
// 传入baseData chartData 格式如上
function dealChartZone(baseData,chartData){
  var series={};
  var zones=[];
  var axis=baseData.type;
  if(axis=="x"){
    zones=[{
      value:baseData.data
    },{
      color:'red',
    }];
  }else if(axis=="y"){

  }
  series.zoneAxis=axis;
  series.zones=zones;
  return series;
};
// 处理一个chart图数据 并赋值
var chartColor=['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#8085e8', '#8d4653', '#91e8e1'];
function dealTime(timestart,timeend,ay1,ay2,by1,by2){
  var a=ay1-ay2;
  var b=by1-by2;
  var y=(by1*a-ay1*b)/(a-b);
  var time=(timeend-timestart)*((ay1-y)/a)
  return timestart+time
}
// 计算2条线 计算超出基线部分的值并画成红色
function dealDataUp(data1,data2,timestart,timeinterval){
  var dealzones=[];
  for(var i=0;i<data1.length;i++){
    var obj={};
    if(data1[i]<=data2[i]){
      obj.value=timestart+timeinterval*i;
      dealzones.push(obj);
      obj={};
      continue;
    }
    if(data1[i]>data2[i]){
      if(i==0){
        obj.value=timestart+timeinterval*i;
        dealzones.push(obj);
        obj={};
      }else if(data1[i-1]<=data2[i-1]&&(i-1)>0){
        obj.value=dealTime((timestart+timeinterval*(i-1)),(timestart+timeinterval*(i)),data1[i-1],data1[i],data2[i-1],data2[i]);
        dealzones.push(obj);
        obj={};
      }else{
        obj.value=timestart+timeinterval*i;
        dealzones.push(obj);
        obj={};
      }
      if(data1[i+1]<=data2[i+1]&&(i+1)<data1.length){
        obj.value=dealTime((timestart+timeinterval*i),(timestart+timeinterval*(i+1)),data1[i],data1[i+1],data2[i],data2[i+1]);
        obj.color="red";
        dealzones.push(obj);
        obj={};
      }else{
        obj.value=timestart+timeinterval*(i+1);
        obj.color="red";
        dealzones.push(obj);
      }
    };
  }
  return  dealzones;
};
// 2条线 计算低于基线部分的值并画成红色
function dealDataSlow(data1,data2,timestart,timeinterval){
  var dealzones=[];
  for(var i=0;i<data1.length;i++){
    var obj={};
    if(data1[i]>=data2[i]){
      obj.value=timestart+timeinterval*i;
      dealzones.push(obj);
      obj={};
      continue;
    }
    if(data1[i]<data2[i]){
      if(i==0){
        obj.value=timestart+timeinterval*i;
        // obj.color="red";
        dealzones.push(obj);
        obj={};
      }else if(data1[i-1]>=data2[i-1]&&(i-1)>=0){
        obj.value=dealTime((timestart+timeinterval*(i-1)),(timestart+timeinterval*(i)),data1[i-1],data1[i],data2[i-1],data2[i]);
        // obj.color="red";
        dealzones.push(obj);
        obj={};
      }else{
        obj.value=timestart+timeinterval*i;
        dealzones.push(obj);
        obj={};
      }
      if(data1[i+1]>=data2[i+1]&&(i+1)<data1.length){
        obj.value=dealTime((timestart+timeinterval*i),(timestart+timeinterval*(i+1)),data1[i],data1[i+1],data2[i],data2[i+1]);
        obj.color="red";
        dealzones.push(obj);
        obj={};
      }else{
        obj.value=timestart+timeinterval*(i+1);
        obj.color="red";
        dealzones.push(obj);
      }
    };
  }
  return  dealzones;
};
// 处理dashboard 相关页面 chart图线条数据
function disTargetData(data,matrix,id,baseData){
  var obj={};
  obj.seriesData=[];
  obj.title=matrix;
  obj.id=id;
  if(data["sla"]){
    obj.yAxis_min="1";
  }
  if(data.time){
    var pointStartTime=data["time"][0]*1000+8*60*60*1000;
    var pointIntervalTime=data["time"][1]*1000-data["time"][0]*1000
  };
  var count=0;
  for(var i in data){
    var seriesobj={};
    if(i=="time"){
      continue;
    };
    seriesobj.pointStart=pointStartTime;
    seriesobj.pointInterval=pointIntervalTime;
    seriesobj.name=i;
    seriesobj.color=chartColor[count];
    seriesobj.marker={};
    seriesobj.marker.enabled=false;
    seriesobj.data=data[i];
    // 判断并处理基线数据
    var baseDataLineArr=[];
    if(baseData[i]){
      // isArray  isString
      if(isArray(baseData[i].data)){
        baseDataLineArr=baseData[i].data;
        seriesobj.zoneAxis="x";
        if(baseData[i].cmp_opr==">"){
          seriesobj.zones=dealDataUp(data[i],baseData[i].data,pointStartTime,pointIntervalTime);
        }else if(baseData[i].cmp_opr=="<"){
          seriesobj.zones=dealDataSlow(data[i],baseData[i].data,pointStartTime,pointIntervalTime);
        }
      }else if(isNumber(baseData[i].data)){
        for(var k=0;k<data[i].length;k++){
          baseDataLineArr.push(baseData[i].data);
        };
        seriesobj.zoneAxis="y";
        seriesobj.zones=[];
        if(baseData[i].cmp_opr==">"){
          var zonesVal1={};
          zonesVal1.value=baseData[i].data;
          seriesobj.zones.push(zonesVal1);
          var zonesVal2={};
          zonesVal2.color="red";
          seriesobj.zones.push(zonesVal2);
        }else if(baseData[i].cmp_opr=="<"){
          var zonesVal1={};
          zonesVal1.value=0;
          seriesobj.zones.push(zonesVal1);
          var zonesVal2={};
          zonesVal2.value=baseData[i].data;
          zonesVal2.color="red";
          seriesobj.zones.push(zonesVal2);
        };
      }
    };
    obj.seriesData.push(seriesobj);
    if(baseData[i]){
      var baseobj={};
      baseobj.pointStart=pointStartTime;
      baseobj.pointInterval=pointIntervalTime;
      baseobj.name=i+"基线";
      baseobj.color=chartColor[count];
      baseobj.dashStyle="Dot";
      baseobj.marker={};
      baseobj.marker.enabled=false;
      baseobj.data=baseDataLineArr;
      obj.seriesData.push(baseobj);
    };
    count++;
  };
  return obj;
};
// 传入 name 和数据 返回 series 结构的 对象
// changeObjSeries("totalSizeAvgup",dealArr.totalSizeAvgup)
function changeObjSeries(name,data,pointStart,pointInterval,eventData,baseData,num){
  if(!num){
    num=0;
  };
  var seriesArr=[];
  var seriesobj={};
  seriesobj.name=name;
  seriesobj.marker={};
  seriesobj.color=chartColor[num];
  seriesobj.marker.enabled=false;
  seriesobj.data=data;
  // 当 changeObjSeries 不传入 eventData 或 eventData为空时不添加点击事件
  if(eventData){
    var clickUrl="";
    if(eventData.url){
      clickUrl=eventData.url
    };
    if(eventData.cluster){
      clickUrl+="&cluster="+eventData.cluster;
    };
    if(eventData.host){
      clickUrl+="&host="+eventData.host;
    };
    if(eventData.api){
      clickUrl+="&api="+eventData.api;
    };
    if(eventData.tag){
      clickUrl+="&tag="+eventData.tag;
    };
    clickUrl+="&counter="+seriesobj.name;
    seriesobj.events={
      click:function(e){  //点击事件  
        window.open(clickUrl+"&btime="+getDateStr(new Date(e.point.x-6*60*1000-8*60*60*1000))+"&etime="+getDateStr(new Date(e.point.x+6*60*1000-8*60*60*1000)));
      }
    }
  };
  if(pointStart){
    seriesobj.pointStart=pointStart+8*60*60*1000;
    seriesobj.pointInterval=pointInterval;
  };
  var baseDataLineArr=[];
  if(baseData){
    if(isArray(baseData.data)){
      baseDataLineArr=baseData.data;
      seriesobj.zoneAxis="x";
      // seriesobj.zones=dealDataUp(data,baseData.data,seriesobj.pointStart,seriesobj.pointInterval);
      if(baseData.cmp_opr==">"){
        seriesobj.zones=dealDataUp(data,baseData.data,seriesobj.pointStart,seriesobj.pointInterval);
      }else if(baseData.cmp_opr=="<"){
        seriesobj.zones=dealDataSlow(data,baseData.data,seriesobj.pointStart,seriesobj.pointInterval);
      }
    }else if(isNumber(baseData.data)){
      for(var k=0;k<data.length;k++){
        baseDataLineArr.push(baseData.data);
      };
      seriesobj.zoneAxis="y";
      seriesobj.zones=[];
      if(baseData.cmp_opr==">"){
        var zonesVal1={};
        zonesVal1.value=baseData.data;
        seriesobj.zones.push(zonesVal1);
        var zonesVal2={};
        zonesVal2.color="red";
        seriesobj.zones.push(zonesVal2);
      }else if(baseData.cmp_opr=="<"){
        var zonesVal1={};
        zonesVal1.value=0;
        seriesobj.zones.push(zonesVal1);
        var zonesVal2={};
        zonesVal2.value=baseData.data;
        zonesVal2.color="red";
        seriesobj.zones.push(zonesVal2);
      }
    };
  };
  seriesArr.push(seriesobj);
  if(baseData){
    var baseobj={};
    baseobj.pointStart=pointStart+8*60*60*1000;
    baseobj.pointInterval=pointInterval;
    baseobj.name=name+"基线";
    baseobj.color=chartColor[num];
    baseobj.dashStyle="Dot";//线条样式
    baseobj.marker={};
    baseobj.marker.enabled=false;
    baseobj.data=baseDataLineArr;
    seriesArr.push(baseobj)
  };
  return seriesArr;
}



// pangu白屏化 相关共用方法
// 规划 打开那个页面 具体方法
function showTabList(data,listdata){
  for(var i in listdata){
    if(i==data.index){
      listdata[i].showClass=true;
    }else{
      listdata[i].showClass=false;
    }
    
  };

  return listdata;
}




//自定义排序
//xxx.sort(compareTo("percent"));
function compareTo(name) {  
  return function(o, p) {  
      var a, b;  
      if (typeof o === "object" && typeof p === "object" && o && p) {
          a = o[name];  
          b = p[name];  
          if (a === b) {  
              return 0;  
          }  
          if(!isNaN(a)&&!isNaN(b)){  
              return parseInt(a) < parseInt(b) ? -1 : 1;  
          }  
          if (typeof a === typeof b) {  
              return a < b ? -1 : 1;  
          }  
          return typeof a < typeof b ? -1 : 1;  
      }  
  };  
};

// 排序 数组内key值排序
function arrCompareTo(name,order,type) {  
  return function(o, p) {  
    var a="", b="";  
    if (typeof o === "object" && typeof p === "object" && o && p) {
        a=o[name]?o[name]:"";
        b=p[name]?p[name]:"";
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
//传入参数，返回表格体数据结构
function dealTablebodyObj(name,url,button,a_class,id){
    var obj={};
    obj.name=name;
    if(url){
      obj.url=url;  
    }
    if(button){
      obj.button=button;  
    }
    if(a_class){
      obj.a_class=a_class;  
    }
    if(id){
      obj.id=id;  
    }
    return obj;
  };
  // 正则 判断只允许字母,数字,_
function panguRegular(str){
  var regFileName=/^[a-zA-Z0-9_\/\.]+$/;
  if(!regFileName.test(str)){
    alert("不要输入 字母数字 '_','/','.' 之外的字符");
    return false
  }
  return true
}  

//表单验证 
var validator = {
	isEmpty:function(data) {
		if(data) {
			if(data.length === 0) {
  			return {
  				"pass":false,
  				"errMsg":"不能为空！"
  			}
  		}else{
  			return {
  				"pass":true,
  			}
  		}
		}else{
			return {
				"pass":false,
				"errMsg":"不能为空！"
			}
		}
	},
	isNumber:function(data) {
		var reg = /^[0-9]*$/;
		if(reg.test(data)){
			return {
				"pass":true,
			}
		}else{
			return {
				"pass":false,
				"errMsg":"必须为数字！"
			}
		}
	},
  // 判断double类型
  isDouble:function(data){
    var reg=/^[-\+]?\d+(\.\d+)?$/;
    if(reg.test(data)){
      return {
        "pass":true,
      }
    }else{
      return {
        "pass":false,
        "errMsg":"不是double类型！"
      }
    }
  },
  // 判断 isInt32 类型
  isInt32:function(data){
    if(2147483647>data&&data>-2147483648){
      return {
        "pass":true,
      }
    }else{
      return {
        "pass":false,
        "errMsg":"不是int32类型！"
      }
    }
  },
  // 判断 isInt64 类型
  isInt64:function(data){
    if(9223372036854775807>data&&data>-9223372036854775808){
      return {
        "pass":true,
      }
    }else{
      return {
        "pass":false,
        "errMsg":"不是int64类型！"
      }
    }
  },
  // 判断 bool 类型
  isBool:function(data){
    if(data =="true" || data=="false"){
      return {
        "pass":true,
      }
    }else{
      return {
        "pass":false,
        "errMsg":"不是bool类型！"
      }
    }
  },
}

//表格精确查找
function multiFilter(data, searchKeyMap) {
    var result = [];
    if(data && data instanceof Array) {
	    data.map(function(item) {
				if(searchKeyMap && searchKeyMap instanceof Array) {
					var isAccord = true;
					var is_pass_key_arr = true;
					searchKeyMap.map(function(item1) {
						//搜索key为数组时，循环到当前项，如果不满足，则当前item下的key循环再遇到数组的情况则不处理，直接跳过
						if(item1.key instanceof Array) {
							if(item1.key.length && is_pass_key_arr) {
								var flag = false;
	  						item1.key.map(function(item2) {
	  							if(item[item1.id].name === item2) {
	  								flag = true;
	      					}
	  						})
	  						isAccord = flag ? true : false;
	  						is_pass_key_arr = flag ? true : false;
							}
						}else{
							//判断是否为精确查询还是模糊查询
							if(item1.key !== 'All' && item1.key !== '' && item1.key !== undefined) {
							  //判断表格数据的查找项是否是action
							  var str = '';
							  if(item1.action) {
							  	str = item[item1.id].button ? item[item1.id].button[0]+"" : '';
							  }else{
							  	str = item[item1.id].name ? item[item1.id].name+"" : '';
							  }
								if(item1.searchType === "vague") {
								  var reg = new RegExp(item1.key,"i");
								  //根据配置判断模糊查询是否从字符串的下标0开始
							    if(item1.searchFrom && item1.searchFrom === 'first') {
								    if(str.search(reg) === -1) {
											isAccord = false;
										}
								    if(str.search(reg) !== -1 && str.indexOf(item1.key) !== 0) {
											isAccord = false;
										}
									}else{
									  if(str.search(reg) === -1) {
											isAccord = false;
										}
									}
			  				}else{
			  					if(str !== item1.key) {
		  						  isAccord = false;
		  					  }
			  				}
		      		}
		  			}
		  		})
					if(isAccord) {
						result.push(item);
					}
	  		}
	  	})
    }
    return result;
}

//表格模糊查询封装
function vagueTable(data, key) {
	var result = [];
	var reg = new RegExp(key, "i");
	if(data.length) {
		data.map(function(item) {
			for(var Key1 in item) {
				var str = item[Key1].name ? item[Key1].name + '' : '';
				str = item[Key1].button ? jionArrItemToStr(item[Key1].button) : str;
        // str = item[Key1].render ? jionArrItemToStr(item[Key1].render.data) : str;
        if(item[Key1].render&&item[Key1].render.data){
          str = jionArrItemToStr(item[Key1].render.data);
        }else if(item[Key1].render&&item[Key1].render.versionData){
          var sourceVerData= item[Key1].render.versionData;
          sourceVerData.map(function(verItem){
            str += jionArrItemToStr(verItem);
          })
          
        }
				
				if(str.search(reg) !== -1) {
					result.push(item);
					break;
				}
			}
		})
	}
	return result;
}
//拼接数组项为字符串
function jionArrItemToStr(data) {
	var result = '';
	if(data.length) {
		data.map(function(item) {
			result = result + item;
		})
	}
	return result;
}

//根据传入的不同的key值 返回对应的url字符串
var portalUrlConfig={
  "get_sv_flag":{"portalUrl":"panguBlock_get_flag","url":"supervisor"},
  "set_sv_flag":{"portalUrl":"supervisor_set_sv_flag","url":"supervisor"},
  "open_dev":{"portalUrl":"panguBlock_querydev","url":"block_device"},
  "query_device":{"portalUrl":"panguBlock_querydevice","url":"block"},
  "query_device_segment":{"portalUrl":"panguBlock_query_device_segment","url":"block"},
  "query_device_snapshot":{"portalUrl":"panguBlock_query_device_snapshot","url":"block"},
  "get_bm_flag":{"portalUrl":"panguBlock_get_flag","url":"block"},
  "get_bs_flag":{"portalUrl":"panguBlock_get_flag","url":"block"},
  "get_gc_flag":{"portalUrl":"panguBlock_get_flag","url":"block"},
  "get_bmAll_flag":{"portalUrl":"panguBlock_get_flag","url":"block"},
  "get_bsAll_flag":{"portalUrl":"panguBlock_get_flag","url":"block"},
  "get_gcAll_flag":{"portalUrl":"panguBlock_get_flag","url":"block"},
  "get_bm_batch_Flag":{"portalUrl":"panguBlock_get_flag","url":"block"},
  "get_bs_batch_Flag":{"portalUrl":"panguBlock_get_flag","url":"block"},
  "get_gc_batch_Flag":{"portalUrl":"panguBlock_get_flag","url":"block"},
  "set_bmAll_flag":{"portalUrl":"panguBlock_get_flag","url":"block"},
  "set_bsAll_flag":{"portalUrl":"panguBlock_get_flag","url":"block"},
  "set_gcAll_flag":{"portalUrl":"panguBlock_get_flag","url":"block"},
  "list_cluster_dcgc":{"portalUrl":"panguBlock_list_cluster_dcgc","url":"block"},
  "list_ver_gbi_gc":{"portalUrl":"panguBlock_list_ver_gbi","url":"block"},
  "list_ver_gbi_bm":{"portalUrl":"panguBlock_list_ver_gbi","url":"block"},
  "list_ver_gbi_bs":{"portalUrl":"panguBlock_list_ver_gbi","url":"block"},
  "add_bs_schbs":{"portalUrl":"panguBlock_block_server_lsschbs","url":"block"},
  "set_bs_schbs":{"portalUrl":"panguBlock_block_server_lsschbs","url":"block"},
  "del_bs_schbs":{"portalUrl":"panguBlock_block_server_lsschbs","url":"block"},
  "check_status_chkbm":{"portalUrl":"panguBlock_block_server_lsschbs","url":"block"},
  "change_newbm_Leader":{"portalUrl":"panguBlock_block_server_lsschbs","url":"block"},
  "get_select_segment":{"portalUrl":"panguBlock_block_batch_segment","url":"block"},
  "get_select_snapshot":{"portalUrl":"panguBlock_block_batch_snapshot","url":"block"},
  "baksnap_device":{"portalUrl":"panguBlock_block_batch_snapshot","url":"block"},
  "flushdev_device":{"portalUrl":"panguBlock_block_batch_snapshot","url":"block"},
  "device_opendev":{"portalUrl":"panguBlock_block_batch_snapshot","url":"block"},
  "del_dev":{"portalUrl":"panguBlock_block_batch_snapshot","url":"block"},
  "close_dev":{"portalUrl":"panguBlock_block_batch_snapshot","url":"block"},
  "config_dev":{"portalUrl":"panguBlock_block_batch_snapshot","url":"block"},
  "device_segment_loaddev":{"portalUrl":"panguBlock_block_batch_snapshot","url":"block"},
  "device_segment_chkseg":{"portalUrl":"panguBlock_block_device_checkready","url":"block"},
  "device_segment_flushdev":{"portalUrl":"panguBlock_block_device_segment_flushdev","url":"block"},
  "device_snapshot_delsnap":{"portalUrl":"panguBlock_block_batch_snapshot","url":"block"},
  "device_snapshot_srnsnap":{"portalUrl":"panguBlock_block_batch_snapshot","url":"block"},
  "stat_config_dev":{"portalUrl":"panguBlock_block_stat_config_dev","url":"block"},
  "set_config_dev":{"portalUrl":"panguBlock_block_batch_snapshot","url":"block"},
  "cp_dev":{"portalUrl":"panguBlock_block_batch_snapshot","url":"block"},
  "flushdev_all_segment":{"portalUrl":"panguBlock_block_batch_snapshot","url":"block"},
  "load_select_opendev":{"portalUrl":"panguBlock_block_batch_snapshot","url":"block"},
  "close_select_opendev":{"portalUrl":"panguBlock_block_batch_snapshot","url":"block"},
  "del_select_opendev":{"portalUrl":"panguBlock_block_batch_snapshot","url":"block"},
  "clone_dev":{"portalUrl":"panguBlock_block_batch_snapshot","url":"block"},
  "crt_dev":{"portalUrl":"panguBlock_block_batch_snapshot","url":"block"},
  "crt_snap":{"portalUrl":"panguBlock_block_batch_snapshot","url":"block"},

  "distseg_device":{"portalUrl":"panguBlock_block_distseg","url":"block"},
  "segmentBasicList_lssegmd":{"portalUrl":"panguBlock_block_batch_segmentBasic","url":"block"},
  
}
function dealApiStr(str,bool){
  if(!portalUrlConfig[str]){
    return
  }
  if(bool){
    return portalUrlConfig[str].portalUrl
  }else{
    return portalUrlConfig[str].url
  }
}


function compareTo(name,order) {  
  return function(o, p) {  
    var a="", b="";  
      if (typeof o === "object" && typeof p === "object" && o && p) {
        var oname=o[name].name?o[name].name:"";
        var pname=p[name].name?p[name].name:"";
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

function dealSizeCompany(str){
  var num=0;
  if(isNumber(str)){
    num=str;
  }else{
    num=parseInt(str);
  };
  var resqStr="";
  var company=""
  if(num==0){
    resqStr=0
  }else if(num<1024){
    resqStr=num;
    company="B";
  }else if(num<1024*1024){
    resqStr=num/1024;
    company="KB";
  }else if(num<1024*1024*1024){
    resqStr=num/1024/1024
    company="MB";
  }else if(num<1024*1024*1024*1024){
    resqStr=num/1024/1024/1024
    company="GB";
  }else{
    resqStr=num/1024/1024/1024/1024
    company="TB";
  };;
  if(resqStr!=0){
    resqStr=manageNum(resqStr,0)
  }
  return resqStr+company;
}
// isClusBaseShowLoading($scope.showLoadingObj,"requestClusterInfo");
function isClusBaseShowLoading(obj,str,num){
  obj[str]=true;
  for(var i in obj){
    if(obj[i]==false){
      return true //当请求没有全部返回时，不隐藏loading图标
    }
  }
  // hiddenCluBaseLoading()//隐藏加载图标 num?num:300 全屏loading
  return false  //数据频loading
}