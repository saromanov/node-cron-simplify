var CronJob = require('cron').CronJob
var moment = require('moment')

function New (path, decl, onCompleted) {
  if (path === '' || decl === undefined) {
    return this
  }
  var parsed = parse(path, decl)
  this.pattern = parsed
  return makeCronJob(parsed, decl, onCompleted)
}

// parsing of the input data
var parse = function (data) {
  if (typeof data !== 'string') {
    return
  }
  // execute once
  if (data.startsWith('at')) {
    return parseAt(data)
  }

  // execute after soem time
  if (data.startsWith('after')) {
    return parseAfter(data)
  }

  if (data.startsWith('every')) {
    return parseEvery(data)
  }
}

var parseAt = function (data) {
  var result = data.split('at')
  var rawDate = result.slice(-1)[0].trim()
  return makeCronDate(parseDateTime(rawDate))
}

var parseAfter = function (data) {
  var rawDate = parseExpression(data, 'after')
  return makeCronDate(makeDateAfter(rawDate))
}

var makeDateAfter = function (data) {
  var num = data.slice(0, data.length - 1)
  var attr = data.slice(-1)[0].trim()
  if (attr === undefined) {
    return
  }
  var param = ''
  if (attr === 'seconds') {
    param = 'seconds'
  }
  if (attr === 'm') {
    param = 'minutes'
  }
  if (attr === 'h') {
    param = 'hours'
  }
  if (attr === 'd') {
    param = 'days'
  }
  if (attr === 'w') {
    param = 'week'
  }
  if (attr === 'y') {
    param = 'years'
  }

  var mom = moment()
  var result = mom.add(num, attr)
  return parseDateTimeAfter(result.toDate())
}

// parsing of the datetime in format 12:50
var parseDateTime = function (dateTime) {
  if (typeof dateTime !== 'string') {
    return
  }

  var result = dateTime.split(':')
  if (result.length < 2) {
    return
  }
  var hour = result[0]
  if (!validateHour(hour)) {
    return
  }
  var minutes = result[1]
  if (!validateMinAndSec(minutes)) {
    return
  }
  if (result.length > 2) {
    var seconds = result[2]
    if (!validateMinAndSec(seconds)) {
      return
    }
  }
  return {
    getHour: hour,
    getMinutes: minutes,
    getSeconds: seconds,
    once: true
  }
}

function parseDateTimeAfter (dateTime) {
  return {
    getHour: dateTime.getHours(),
    getMinutes: dateTime.getMinutes(),
    getSeconds: dateTime.getSeconds()
  }
}

var parseEvery = function (data) {
  var rawDate = parseExpression(data, 'every')
  return makeCronDate(makeCronDateEvery(rawDate))
}

var parseExpression = function (data, str) {
  var result = data.split(str)
  return result.slice(-1)[0].trim()
}

var makeCronDateEvery = function (data) {
  var num = data.slice(0, data.length - 1)
  var attr = data.slice(-1)[0].trim()
  if (attr === undefined) {
    return
  }
  if (attr === 's') {
    return {
      getSeconds: makeEveryPattern(num)
    }
  }
  if (attr === 'm') {
    return {
      getMinutes: makeEveryPattern(num)
    }
  }
  if (attr === 'h') {
    return {
      getHours: makeEveryPattern(num)
    }
  }
  if (attr === 'd') {
    return {
      getDays: makeEveryPattern(num)
    }
  }
  if (attr === 'm') {
    return {
      getMonths: makeEveryPattern(num)
    }
  }
}

// retruns string for cron for recurring schedule
// in format like 0 */1 * * * *
var makeEveryPattern = function (num) {
  return '*/' + num
}

function makeCronDate (result) {
  var resultStr = ''
  if (result.getSeconds !== undefined) {
    resultStr += result.getSeconds + ' '
  } else {
    resultStr += '0 '
  }
  if (result.getMinutes !== undefined) {
    resultStr += result.getMinutes + ' '
  } else {
    resultStr += '* '
  }
  if (result.getHour !== undefined) {
    resultStr += result.getHour + ' '
  } else {
    resultStr += '* '
  }
  resultStr += '* * *'
  return resultStr
}

function validateHour (hour) {
  if (hour > 24 || hour < 0) {
    return false
  }

  return true
}

function validateMinAndSec (data) {
  if (data > 59 || data < 0) {
    return false
  }

  return true
}

function makeCronJob (cronTime, dec, onCompleted) {
  return new CronJob(cronTime, dec, onCompleted, true, 'Asia/Yekaterinburg');
}

exports.New = function (path, decl) {
  return New(path, decl)
}
