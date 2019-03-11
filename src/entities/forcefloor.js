import { Dir } from '../constants'
import Floor from './floor'

/*
 * Force floors push Chip unless he has the suction boots.
 */
export default class ForceFloor extends Floor {
  noShoes (player) {
    switch (this.subtype) {
      case 'left':
        player.marchDir = Dir.LEFT
        break
      case 'right':
        player.marchDir = Dir.RIGHT
        break
      case 'up':
        player.marchDir = Dir.UP
        break
      case 'down':
        player.marchDir = Dir.DOWN
        break
      case 'random':
        // TODO: random
        break
    }
  }
}
