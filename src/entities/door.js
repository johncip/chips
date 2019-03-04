import { extend } from 'lodash'

import Entity from './entity'
import config from '../config'
import sfx from '../sfx'


/*
 * Doors can only be opened when the right key is in the inventory.
 */
function Door (game, tile, emap) {
  Entity.call(this, game, tile, emap)
}

extend(Door.prototype, Entity.prototype)

extend(Door.prototype, {
  /*
   * On collide, doors check if Chip has the right key.
   */
  collideWith: function (player) {
    const inventory = player.inventory
    const key = 'key:' + this.subtype

    if (inventory.contains(key) || config.debug) {
      this.useKey(key, inventory)
      this.moveHere(player)
    } else {
      sfx.bump()
    }
  },

  /*
   * Opens the door and removes non-green keys from inventory.
   */
  useKey: function (key, inventory) {
    this.retire()

    if (key !== 'key:green') {
      inventory.remove(key)
    }

    sfx.open()
  }
})

export default Door
