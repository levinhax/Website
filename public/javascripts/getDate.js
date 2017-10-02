window.onload = function() {
    var timeNow = document.getElementById('time_now');

    function getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        var strHour = date.getHours();
        var strMin = date.getMinutes();
        var strSec = date.getSeconds();
        var strDay = date.getDay();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        if (strHour >= 0 && strHour <= 9) {
            strHour = "0" + strHour;
        }
        if (strMin >= 0 && strMin <= 9) {
            strMin = "0" + strMin;
        }
        if (strSec >= 0 && strSec <= 9) {
            strSec = "0" + strSec;
        }
        switch (strDay) {
            case 0:
                strDay = "日";
                break;
            case 1:
                strDay = "一";
                break;
            case 2:
                strDay = "二";
                break;
            case 3:
                strDay = "三";
                break;
            case 4:
                strDay = "四";
                break;
            case 5:
                strDay = "五";
                break;
            case 6:
                strDay = "六";
                break;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + " " + strHour + seperator2 + strMin + seperator2 + strSec + " " + "星期" + strDay;
        return currentdate;
    }


    setInterval(function() {
        timeNow.innerHTML = getNowFormatDate();
    }, 1000);
}