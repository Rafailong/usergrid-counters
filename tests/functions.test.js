import { createEvent } from '../lib/functions'
import UsergrindCounter from '../lib/index'
import { expect } from 'chai'

describe('index', () => {
  var _client =

  beforeEach(() => {
    const opts = {
      'orgName': process.env.ORG_NAME,
      'appName': process.env.APP_NAME,
      'authTyep': process.env.AUTH_TYPE,
      'clientSecret': process.env.CLIENT_SECRETE
    }
    _client = UsergrindCounter.configureClient(opts)
  })

  describe('create', () => {
    it('should exists', () => {
      expect(_client.createEvent).not.be.null
      expect(_client.createEvent).be.a('function')
    })

    it('should throw without counters param', () => {
      expect(_client.createEvent.bind(null)).to.throw('counters is required')
    });

  })
})
