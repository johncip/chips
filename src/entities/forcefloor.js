import { extend } from 'lodash'

import { Dir } from '../constants'
import Entity from './entity'
import Floor from './_floor'


/*
 * Force floors push Chip unless he has the suction boots.
 */
function ForceFloor (game, tile, emap) {
  Entity.call(this, game, tile, emap)
}

extend(
  ForceFloor.prototype,
  Entity.prototype,
  Floor.prototype
)

extend(ForceFloor.prototype, {
  noShoes: function (player) {
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
})

export default ForceFloor
