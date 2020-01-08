var CronJob = require('cron').CronJob;

function New(path) {

}

// parsing of the input data
var parse = function(data) {
    if(typeof data != 'string') {
        return
    }
    if(data.startsWith('at')) {
        var result = data.split('at');
        var rawDate = result.slice(-1)[0].trim();
        var date = makeCronDate(rawDate);
        console.log(date);
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

function Date(value) {
   var hours = value.getHour;
   var minutes = value.getMinutes;
   var seconds = value.getSeconds;

}

function makeCronDate(data) {
    var result = parseDateTime(data);
    var resultStr = '';
    console.log(result);
    if (result.getSeconds !== undefined) {
        resultStr += result.getSeconds + ' ';
    } else {
        resultStr += "* "
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
    return new Date(result);
}

function makeCronJob(cronTime, dec) {
    new CronJob(cronTime, dec, null, true, 'America/Los_Angeles');
}

parse('at 12:50');