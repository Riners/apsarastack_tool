function FormateDate(oDate)
{
    var year = oDate.getFullYear();       //年   
    var month = oDate.getMonth() + 1;     //月   
    var day = oDate.getDate();            //日

    var hh = oDate.getHours(); //时
    var mm = oDate.getMinutes();
    var ss = oDate.getSeconds();

    strCurrTime = year + "-";    
    if(month < 10)   
        strCurrTime += "0";   

    strCurrTime += month + "-";   

    if(day < 10)   
        strCurrTime += "0";   
    strCurrTime += day + " ";   

    if(hh < 10)   
        strCurrTime += "0";   
    strCurrTime += hh + ":";   

    if (mm < 10) 
        strCurrTime += '0';   
    strCurrTime += mm + ":";   

    if (ss < 10)
        strCurrTime += '0';
    strCurrTime += ss;

    return(strCurrTime);
}

