import sfx from '../sfx'
import Entity from './entity'

/*
 * A Collectible entity can be put into inventory.
 * ICs, shoes, and keys are collectible.
 */
export default class Collectible extends Entity {
  collideWith (player) {
    this.scene.addToInventory(this.spriteKey)
    sfx.collect()
    this.retire()
    this.moveHere(player)
  }
}
