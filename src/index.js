
import usergrid from 'usergrid_'
import Promise from 'bluebird'
import _ from 'lodash'
var functions = require('./functions')
var validations = require('./validations')

var ORG_NAME
var APP_NAME
var CLIENT_ID
var CLIENT_SECRETE

var AUTH_TYPE = "CLIENT_ID"
var CLIENT_LOGGING = false
var CLIENT_BUILD_CURL = true

var _client

function configureClient (opts = validations.required('opts', opts)) {
  const finder = _.partial(findConfigValue, opts)
  const clientOpts = {
    'orgName': finder(ORG_NAME, 'orgName'),
    'appName': finder(APP_NAME, 'appName'),
    'authTyep': finder(AUTH_TYPE, 'authType'),
    'clientId': finder(CLIENT_ID, 'clientId'),
    'clientSecret': finder(CLIENT_SECRETE, 'clientSecrete'),
    'logging': finder(CLIENT_LOGGING, 'logging'),
    'buildCurl': finder(CLIENT_BUILD_CURL, 'buildCurl')
  }

  _client = new usergrid.client(clientOpts)
  return {
    'createEvent': _.partial(functions.createEvent, _client)
  }
}

function findConfigValue (opts, defaultValue, key) {
  if (!opts.hasOwnProperty(key)) {
    return defaultValue
  }

  return opts[key]
}

export default { configureClient }