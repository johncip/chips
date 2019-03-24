import config from '../config'
import sfx from '../sfx'
import Entity from './entity'

/*
 * Doors can only be opened when the right key is in the inventory.
 */
export default class Door extends Entity {
  collideWith (player) {
    const key = 'key:' + this.subtype

    if (this.scene.inventoryHas(key) || config.debug) {
      this.useKey(key)
      this.moveHere(player)
    } else {
      sfx.bump()
    }
  }

  useKey (key, inventory) {
    this.retire()
    this.scene.removeFromInventory(key)
    sfx.open()
  }
}
