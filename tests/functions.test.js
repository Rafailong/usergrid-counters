import { createEvent } from '../lib/functions'
import UsergrindCounter from '../lib/index'
import { expect } from 'chai'
import faker from 'faker'
import _ from 'lodash'

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
        .then((counters) => {
          expect(counters).not.to.be.null
          expect(counters).be.a('array')
          expect(counters).not.to.be.empty
          expect(counters.length).equals(1)
          done()
        })
        .catch(done)
    })

    it('should create 3 counters at once', (done) => {
      const names = [
        faker.random.uuid(),
        faker.random.uuid(),
        faker.random.uuid()
      ]
      _client.createEvent(names)
        .then((event) => {
          expect(event).not.to.be.null
          expect(event).be.a('array')
          expect(event).not.to.be.empty
          expect(event.length).equals(1)
          _.each(names, (c) => expect(event[0].counters.hasOwnProperty(c)).to.be.true)
          done()
        })
        .catch(done)
    });

  })
})
