'use strict';
myApp.factory('panguClusterService', function($http,$q) {
	var mapsParam=get_pangu_urlParameter(window.location.href);
	var service = {};
	service.getUrlRequest=function (data) {		
		var d = $q.defer();
		var url=data.url;
		var timestamp=new Date().getTime()
		if(data.url.split("?")[1]){
			url+="&app=portal&timestamp="+timestamp;
		}else{
			url+="?app=portal&timestamp="+timestamp;
		}
		var method=data.method?data.method:'GET';
	    $http({
	        method: method,
	        url:url,
	    }).then(function(data){
	    	
	    	var responseData=data.data.Content;//Content
	    	if(data.data.Success==false){
	    		responseData={}
	    		responseData.err=data.data.ErrorMessage?data.data.ErrorMessage:""
	    	}
	    	if(mapsParam.portal){
	    		responseData=data.data;
	    	}
	    	d.resolve(responseData);  
	    },function error(data){
	    	d.reject(data.data);   
	    })
	    return d.promise;   
    };

    


    return service;
  
    // 请求模板
    // function reqEnvCheck(){
    //   var reqStr=$scope.mapsParam.portal?"availability_get":"availability";
    //   var url='/api/v1/health/'+reqStr;
    //   var data={};;
    //   data.url=url;
    //   panguClusterService.getUrlRequest(data).then(function (response) {
    //     dealRespEnvCheck(response.result); 
    //     $scope.envCheckTime=response.time    
    //     console.log("success");
    //   }).catch(function(data,status){
    //     console.log("error",data);
    //   })
    // }
});