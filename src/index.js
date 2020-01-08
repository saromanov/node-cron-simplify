var CronJob = require('cron').CronJob;

function New(path, decl) {
    return parse(path, decl);
}

// parsing of the input data
var parse = function(data, decl) {
    if(typeof data != 'string') {
        return
    }
    // execute once
    if(data.startsWith('at')) {
        var result = data.split('at');
        var rawDate = result.slice(-1)[0].trim();
        var date = makeCronDate(rawDate);
        console.log(date);
        makeCronJob(date, decl);
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
    var minutes = result[1];
    if(result.length > 2) {
        var seconds = result[2];
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

function makeCronJob(cronTime, dec) {
    new CronJob(cronTime, dec, null, true, 'Asia/Yekaterinburg');
}

New('at 21:26', function(){
    console.log('YES');
});