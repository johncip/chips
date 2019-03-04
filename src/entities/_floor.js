import { extend } from 'lodash'
import config from '../config.js'

/*
 * Mixin for floor types (fire, water, ice, force floor).
 *
 * Expects the presence of an this.noShoes function.
 */
function Floor () {}

extend(Floor.prototype, {
  collideWith: function (target) {
    if (target.type === 'chip') {
      this.moveHere(target)

      if (!this.hasShoes(target) && !config.debug) {
        this.noShoes(target)
      }
    }
  },

  hasShoes: function (player) {
    // TODO: move this to the player
    const shoe = 'shoe:' + this.type
    return player.inventory.contains(shoe)
  },

  noShoes: function (player) {}
})

export default Floor
