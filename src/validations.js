
export function required (name = 'the property', data) {
  const error = new Error(`${name} is required`)
  if (!data) {
    throw error
  }
  return data
}
