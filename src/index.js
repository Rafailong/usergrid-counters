
import usergrid from 'usergrid_'
import Promise from 'bluebird'
import _ from 'lodash'
var functions = require('./functions')
var validations = require('./validations')

var ORG_NAME
var APP_NAME
var CLIENT_ID
var CLIENT_SECRETE

var AUTH_TYPE = usergrid.AUTH_CLIENT_ID
var CLIENT_LOGGING = false
var CLIENT_BUILD_CURL = true

var _client

function configureClient (opts = validations.required('opts', opts)) {
  const finder = _.partial(findConfigValue, opts)
  const clientOpts = {
    'URI': opts.uri,
    'orgName': finder(ORG_NAME, 'orgName'),
    'appName': finder(APP_NAME, 'appName'),
    'authType': finder(AUTH_TYPE, 'authType'),
    'clientId': finder(CLIENT_ID, 'clientId'),
    'clientSecret': finder(CLIENT_SECRETE, 'clientSecret'),
    'logging': finder(CLIENT_LOGGING, 'logging'),
    'buildCurl': finder(CLIENT_BUILD_CURL, 'buildCurl')
  }
  _client = new usergrid.client(clientOpts)
  const requestFuncPromisified = Promise.promisify(_client.request, { 'context': _client })

  return {
    'createEvent': _.partial(functions.createEvent, requestFuncPromisified),
    'getCounter': _.partial(functions.getCounter, requestFuncPromisified),
    'incrementCounter': _.partial(functions.incrementCounter, requestFuncPromisified),
    'resetCounter': _.partial(functions.resetCounter, requestFuncPromisified),
    'timeResolutions': {
      'ALL': 'all',
      'MINUTE': 'minute',
      'FIVE_M': 'five_minutes',
      'HALF_H': 'half_hour',
      'HOUR': 'hour',
      'SIX_D': 'six_day',
      'DAY': 'day',
      'WEEK': 'week',
      'MONTH': 'month'
    }
  }
}

function findConfigValue (opts, defaultValue, key) {
  if (opts.hasOwnProperty(key) && !_.isEmpty(opts[key])) {
    return opts[key]
  }

  return defaultValue
}

export default { configureClient }