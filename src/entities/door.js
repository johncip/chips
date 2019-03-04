import { extend } from 'lodash'
import Entity from './entity.js'
import config from '../config.js'
import sfx from '../sfx.js'

/*
 * Doors can only be opened when the right key is in the inventory.
 */
function Door (tile, emap) {
  Entity.call(this, tile, emap)
}

Door.extends(Entity)

extend(Door.prototype, {
  /*
   * On collide, doors check if Chip has the right key.
   */
  collideWith: function (player) {
    var inventory = player.inventory
    var key = 'key:' + this.subtype

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
