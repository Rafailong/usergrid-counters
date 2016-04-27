import Promise from 'bluebird'
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

export function createEvent (client, counters = validations.required('counters', counters)) {
  let body = { 'timestamp': 0, 'counters': {} }
  if (counters instanceof Array) {
    _.each(counters, (name) => body.counters[name] = 0)
  } else {
    body.counters[counters.toString()] = 0
  }
  const reqOpts = Object.assign(createEventsRequestBaseOptions, { body})
  return Promise.promisify(client.request, { 'context': client })(reqOpts)
    .then((response) => response.entities)
}

export function getCounter (client, counterName = validations.required('counterName', counterName)) {
  if (counterName instanceof Array) {
    counterName = counterName.join(',')
  }
  let reqOpts = Object.assign(getCounterRequestBaseOptions, {
    qs: {
      'counter': counterName
    }
  })
  return Promise.promisify(client.request, { 'context': client })(reqOpts)
    .then((response) => response.count)
}
