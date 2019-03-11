import sfx from '../sfx'
import Entity from './entity'

/**
 * Bombs destroy anything that collide with them.
 */
export default class Bomb extends Entity {
  collideWith (target) {
    if (target.type === 'chip') {
      sfx.explode()
      target.triggerLose()
    } else {
      target.retire()
      this.retire()
    }
  }
}
