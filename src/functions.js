import _ from 'lodash'
var validations = require('./validations')

const createEventsRequestBaseOptions = {
  method: 'POST',
  endpoint: 'events'
}

const getCounterRequestBaseOptions = {
  method: 'GET',
  endpoint: 'counters'
}

export function createEvent (request, counters = validations.required('counters', counters)) {
  let body = { 'timestamp': 0, 'counters': {} }
  if (counters instanceof Array) {
    _.each(counters, (name) => body.counters[name] = 0)
  } else {
    body.counters[counters.toString()] = 0
  }
  const reqOpts = Object.assign(createEventsRequestBaseOptions, { body})
  return request(reqOpts)
    .then((response) => response.entities)
}

export function getCounter (request, counterName = validations.required('counterName', counterName)) {
  if (counterName instanceof Array) {
    counterName = counterName.join(',')
  }
  let reqOpts = Object.assign(getCounterRequestBaseOptions, {
    qs: {
      'counter': counterName
    }
  })
  return request(reqOpts)
    .then((response) => response.count)
}

export function incrementCounter (request, counterName = validations.required('counterName', counterName) , increment = validations.validIncrement('increment', increment = 1)) {
  let body = { 'timestamp': 0, 'counters': {} }
  body.counters[counterName] = increment
  return postRequestWrapper(body, request)
}

export function resetCounter (request, counterName = validations.required('counterName', counterName)) {
  let body = { 'timestamp': 0, 'counters': {} }
  body.counters[counterName] = 0
  return postRequestWrapper(body, request)
}

function postRequestWrapper (body, request) {
  const reqOpts = Object.assign(createEventsRequestBaseOptions, { body})
  return request(reqOpts)
    .then((response) => {
      let entities = response.entities
      if (_.isEmpty(entities)) { return undefined }
      return entities[0].counters
    })
}

export function getCounterInterval(request, counterName = validations.required('counterName', counterName), interval) {
  interval = validations.validInterval('interval', interval)
  
  if (counterName instanceof Array) {
    counterName = counterName.join(',')
  }
  
  let reqOpts = Object.assign(getCounterRequestBaseOptions, {
    qs: {
      'counter': counterName,
      'start_time': interval.start_time,
      'end_time': interval.end_time,
      'resolution': interval.resolution
    }
  });
  return request(reqOpts) 
    .then( (response) => {
      return response.count
    });
}


