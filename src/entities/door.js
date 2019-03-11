import Entity from './entity'
import config from '../config'
import sfx from '../sfx'


/*
 * Doors can only be opened when the right key is in the inventory.
 */
export default class Door extends Entity {
  collideWith (player) {
    const inventory = player.inventory
    const key = 'key:' + this.subtype

    if (inventory.contains(key) || config.debug) {
      this.useKey(key, inventory)
      this.moveHere(player)
    } else {
      sfx.bump()
    }
  }

  useKey (key, inventory) {
    this.retire()
    inventory.remove(key)
    sfx.open()
  }
}
