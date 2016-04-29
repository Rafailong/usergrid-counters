import _ from 'lodash'

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