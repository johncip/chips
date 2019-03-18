import { reduce } from 'lodash'

/*
 * Returns the inverse of an object. The inverse will have the original's
 * keys as its values, and the values as its keys. The original should be
 * one-to-one and have strings for values.
 *
 * Converts integer-strings to integers.
 */
export function invert (obj) {
  const reducer = (acc, val, key) => {
    acc[val] = isNaN(key) ? key : parseInt(key)
    return acc
  }

  return reduce(obj, reducer, {})
}

/*
 * Increments n, modulo base.
 */
export function modInc (n, base) {
  return modPlus(n, 1, base)
}

/*
 * Decrements n, modulo base.
 */
export function modDec (n, base) {
  return modPlus(n, -1, base)
}

/*
 * Returns a + b, modulo base.
 */
function modPlus (a, b, base) {
  return (base + a + b) % base
}
