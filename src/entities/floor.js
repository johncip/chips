import config from '../config'
import Entity from './entity'

/*
 * Mixin for floor types (fire, water, ice, force floor).
 *
 * Expects the presence of an this.noShoes export default function.
 */
export default class Floor extends Entity {
  collideWith (target) {
    if (target.type === 'chip') {
      this.moveHere(target)

      if (!this.hasShoes(target) && !config.debug) {
        this.noShoes(target)
      }
    }
  }

  hasShoes (player) {
    // TODO: move this to the player
    const shoe = 'shoe:' + this.type
    return this.scene.inventoryHas(shoe)
  }

  noShoes (player) {}
}
