var CronJob = require('cron').CronJob;

function New(path, decl) {
    var parsed = parse(path, decl);
    return makeCronJob(parsed, decl);
}

// parsing of the input data
var parse = function(data) {
    if(typeof data != 'string') {
        return
    }
    // execute once
    if(data.startsWith('at')) {
        var result = data.split('at');
        var rawDate = result.slice(-1)[0].trim();
        return makeCronDate(rawDate);
    }
}

// parsing of the datetime in format 12:50 
var parseDateTime = function(dateTime) {
    if(typeof dateTime != 'string') {
        return
    }

    var result = dateTime.split(':');
    if(result.length < 2) {
        return
    }
    var hour = result[0];
    if(!validateHour(hour)){
        return
    }
    var minutes = result[1];
    if(!validateMinAndSec(minutes)){
        return
    }
    if(result.length > 2) {
        var seconds = result[2];
        if(!validateMinAndSec(seconds)){
            return
        }
    }
    return  {
        getHour: hour,
        getMinutes: minutes,
        getSeconds: seconds,
        once: true,
    }
}

function makeCronDate(data) {
    var result = parseDateTime(data);
    var resultStr = '';
    if (result.getSeconds !== undefined) {
        resultStr += result.getSeconds + ' ';
    } else {
        resultStr += "0 "
    }
    if (result.getMinutes !== undefined) {
        resultStr += result.getMinutes + ' ';
    } else {
        resultStr += "* "
    }
    if (result.getHour !== undefined) {
        resultStr += result.getHour + ' ';
    } else {
        resultStr += "* "
    }
    resultStr += '* * *';
    return resultStr;
}

function validateHour(hour) {
    if (hour > 24 || hour < 0) {
        return false;
    }

    return true;
}

function validateMinAndSec(data) {
    if (data > 59 || data < 0) {
        return false;
    }

    return true;
}

function makeCronJob(cronTime, dec) {
    new CronJob(cronTime, dec, null, true, 'Asia/Yekaterinburg');
}

New('at 21:38:10', function(){
    console.log('YES');
});