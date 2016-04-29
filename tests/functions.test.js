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
    })
  })

  describe('getCounter', () => {
    const eventName = faker.random.uuid()
    before((done) => {
      _client.createEvent(eventName)
        .then((counters) => {
          done()
        })
        .catch(done)
    })

    it('should exists', () => {
      expect(_client.getCounter).not.be.null
      expect(_client.getCounter).be.a('function')
    })

    it('should throw without counter name', () => {
      expect(_client.getCounter.bind(null)).to.throw('counterName is required')
    })

    it('should get the counter with a 0 value', (done) => {
      _client.getCounter(eventName)
        .then((counter) => {
          expect(counter).not.to.be.null
          expect(counter).to.be.a('number')
          expect(counter).to.equal(0)
          done()
        })
        .catch(done)
    })

    it('should return a value of 0 when requesting a a counter that does not exist', (done) => {
      const counterName = faker.random.uuid()
      _client.getCounter(counterName)
        .then(counter => {
          expect(counter).not.to.be.null
          expect(counter).to.be.a('number')
          expect(counter).to.equal(0)
          done()
        })
        .catch(done)
    })
  })

  describe('incrementCounter', () => {
    let eventName
    beforeEach((done) => {
      eventName = faker.random.uuid()
      _client.createEvent(eventName)
        .then((counters) => {
          done()
        })
        .catch(done)
    })

    it('should exists', () => {
      expect(_client.incrementCounter).not.be.null
      expect(_client.incrementCounter).be.a('function')
    })

    it('should throw without counters param', () => {
      expect(_client.incrementCounter.bind(null)).to.throw('counterName is required')
    })

    it('should increment by defautl the counter', (done) => {
      _client.incrementCounter(eventName)
        .then(counters => {
          expect(counters).not.to.be.null
          expect(counters).be.a('object')
          expect(counters).not.to.be.empty
          expect(counters[eventName]).to.equal(1)
          done()
        })
        .catch(done)
    })

    it('should increment by 10 the counter', (done) => {
      const increment = 10
      _client.incrementCounter(eventName, increment)
        .then(counters => {
          expect(counters).not.to.be.null
          expect(counters).be.a('object')
          expect(counters).not.to.be.empty
          expect(counters[eventName]).to.equal(increment)
          done()
        })
        .catch(done)
    })

    it('should crearte a counter with the default increment', (done) => {
      _client.incrementCounter(eventName)
        .then(counters => {
          expect(counters).not.to.be.null
          expect(counters).be.a('object')
          expect(counters).not.to.be.empty
          expect(counters[eventName]).to.equal(1)
          done()
        })
        .catch(done)
    })
  })

})
