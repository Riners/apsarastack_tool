myApp.constant('api',{
	initPageSize: 20,
	mapChart:{
		MIN_STR:'"min":0',
	},
	strChart:{
		title: {
			text: 'Styled color zones'
		},
		yAxis:{
			
	    },
	    xAxis:{
	    	type: 'datetime',
			},
	    series: [
	    {	
	    	zoneAxis:'x',
	    	zones: [
	    	{
            	// value:500,
            	value:1509694830000,
            	color:'blue',
            },
	    	 {
            	value:1509694860000,
            	color:'yellow',
            },
	    	{
                value: 1509694890000,
                color:'red'
            },{
                value: 1509694920000,
                color:'#00FFCC',
            }, {
            	value:  1509694950000,
            	color:'pink',
            }],
            marker:{enabled:false},
	        type: 'line',
	        pointStart:1509694815000,
	        pointInterval:15000,
	        data: [-3211,2150,3674,3453,2564,1345,5344,1235,-2454,4456]
	    }
	    ]
	}
})