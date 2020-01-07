function New(path) {

}

// parsing of the input data
var parse = function(data) {
    if(typeof data != 'string') {
        return
    }
    if(data.startsWith('at')) {
        var result = data.split('at');
        var date = result.slice(-1);

    }
}

// parsing of the datetime in format 12:50 
var parsedateTime = function(dateTime) {

}

parse('at 12:50');