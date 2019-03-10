import { extend } from 'lodash'

import { Dir } from '../constants'
import Floor from './floor'


/*
 * Force floors push Chip unless he has the suction boots.
 */
export default class ForceFloor extends Floor {
  constructor (game, tile, emap) {
    super(game, tile, emap)
  }

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
