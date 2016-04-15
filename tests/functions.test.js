import { createEvent } from '../lib/functions'
import UsergrindCounter from '../lib/index'
import { expect } from 'chai'
import faker from 'faker'

describe('index', () => {
  var _client =
  require('dotenv').config()
  before(() => {
    const opts = {
      'uri': process.env.URI,
      'orgName': process.env.ORG_NAME,
      'appName': process.env.APP_NAME,
      'clientId': process.env.CLIENT_ID,
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
    })

    it('should create a event', (done) => {
      const eventName = faker.random.uuid()
      _client.createEvent(eventName)
        .then((counter) => {
          expect(counter).not.to.be.null
          expect(counter).be.a('object')
          done()
        })
        .catch(done)
    })

  })
})
