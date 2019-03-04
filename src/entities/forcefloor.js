import { extend } from 'lodash'
import { Dir } from '../static.js'
import Entity from './entity.js'
import Floor from './_floor.js'

/*
 * Force floors push Chip unless he has the suction boots.
 */
function ForceFloor (game, tile, emap) {
  Entity.call(this, game, tile, emap)
}

ForceFloor.extends(Entity, Floor)

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
