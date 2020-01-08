var CronJob = require('cron').CronJob;
var moment = require('moment');

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
        return parseAt(data);
    }

    // execute after soem time
    if(data.startsWith('after')) {
        return parseAfter(data);
    }
}

var parseAt = function(data) {
    var result = data.split('at');
    var rawDate = result.slice(-1)[0].trim();
    return makeCronDate(rawDate);
}

var parseAfter = function(data){
    var result = data.split('after');
    var rawDate = result.slice(-1)[0].trim();
    makeDateAfter(rawDate);
}

var makeDateAfter = function(data) {
    var num = data.slice(0, data.length-1);
    var attr = data.slice(-1)[0].trim();
    var mom = moment();
    var result = mom.add(1, 'week')
    return makeCronDate(result.toDate());
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

New('after 10s', function(){
    console.log('YES');
});