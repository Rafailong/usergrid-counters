import usergridClitn from 'usergrid'
import Promise from 'bluebird'

export default class Counter {
  constructor(name) {
    this.name = name
  }

  toString () {
    return this.name
  }
}