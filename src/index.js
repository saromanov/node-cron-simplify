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
        var date = makeDate(rawDate);
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

    return function() {
        getHour: {
            return hour;
        }

        getMinutes: {
            return minutes;
        }

        getSeconds: {
            return seconds;
        }
    }
}

function Date() {
   
}

function makeDate(data) {
    var result = parseDateTime(data);
    return new Date(result);
}

parse('at 12:50');