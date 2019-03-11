import Entity from './entity'
import sfx from '../sfx'


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
