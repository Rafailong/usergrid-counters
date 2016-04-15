
import Promise from 'bluebird'
import _ from 'lodash'
var validations = require('./validations')

const createEventsRequestBaseOptions = {
  method:'POST',
  endpoint:'events'
}

export function createEvent (client, counters = validations.require('counters', counters)) {
   let body = { 'timestamp': 0, 'counters': [] }
   if (counters instanceof Array) {
    body.counters = _.map(counters, (name) => { name: 0})
   } else {
     var counter = {}
     counter[counters.toString()] = 0
     body.counters.push(counter)
   }
   const reqOpts = Object.assign(createEventsRequestBaseOptions, { body })
   return  Promise.promisify(client.request)(reqOpts)
    .then((response) => {
      console.log(response)
      return response
    })
}
