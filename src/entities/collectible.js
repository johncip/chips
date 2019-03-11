import sfx from '../sfx'
import Entity from './entity'

/*
 * A Collectible entity can be put into inventory.
 * ICs, shoes, and keys are collectible.
 */
export default class Collectible extends Entity {
  collideWith (player) {
    player.inventory.add(this.spriteKey)
    sfx.collect()
    this.moveHere(player)
    this.retire()
  }
}
