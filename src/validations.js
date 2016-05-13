import _ from 'lodash'

const timeResolutions = ['all','minute','five_minutes','half_hour','hour','six_day','day','week','month']

export function required (name = 'the property', data) {
  const error = new Error(`${name} is required`)
  if (!data) {
    throw error
  }
  return data
}
export function validIncrement (name = 'the property', increment) {
  let int = parseInt(increment, 10)
  const error = new Error(`${name} is an invalid increment`)

  if (_.isNaN(int)) {
    throw error
  }
  if (int <= 0) {
    throw error
  }

  return int
}

export function validInterval (name = 'the property', interval) {
  var properties = new Array()
  
  const error = () => {
    return new Error(properties.join(',') + 'required')
  }

  if(!interval) {
    throw error()
  }

  if(interval.hasOwnProperty('start_time')) {
    if(_.isNan(interval.start_time)) {
      properties.push('start_time')
    }
  } else {
    properties.push('start_time');
  }

  if(interval.hasOwnProperty('end_time')) {
    if(_.isNan(interval.start_time)) {
      properties.push('end_time')
    }
  } else {
    properties.push('end_time');
  }

  if(interval.hasOwnProperty('resolution')) {
     if(!_.indexOf(timeResolutions, interval.resolution)) {
       properties.push('resolution')
     }
  } else {
    properties.push('resolution');
  }

  if(properties.length > 0) {
    throw error()
  }

  return interval
}