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
