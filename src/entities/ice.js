import { extend } from 'lodash'
import { Dir } from '../constants.js'
import Entity from './entity.js'
import Floor from './_floor.js'
import sfx from '../sfx.js'

const { UP, DOWN, LEFT, RIGHT } = Dir

/*
 * Ice makes chip slide unless he has the skates.
 */
function Ice (game, tile, emap) {
  Entity.call(this, game, tile, emap)
}

Ice.extends(Entity, Floor)

extend(Ice.prototype, {
  noShoes: function (player) {
    const floor = player.entityBelow().spriteKey

    player.marchDelay = 75
    player.sliding = true
    player.frozen = true

    switch (floor) {
      case 'ice':
        player.marchDir = player.lastDir
        break
      case 'ice:ne':
        this.cornerNE(player)
        break
      case 'ice:nw':
        this.cornerNW(player)
        break
      case 'ice:se':
        this.cornerSE(player)
        break
      case 'ice:sw':
        this.cornerSW(player)
        break
      default:
        player.sliding = false
        sfx.bump()
    }
  },

  cornerSE: function (player) {
    if (player.isFacing(RIGHT)) {
      player.marchDir = UP
    } else if (player.isFacing(DOWN)) {
      player.marchDir = LEFT
    }
  },

  cornerSW: function (player) {
    if (player.isFacing(LEFT)) {
      player.marchDir = UP
    } else if (player.isFacing(DOWN)) {
      player.marchDir = RIGHT
    }
  },

  cornerNW: function (player) {
    if (player.isFacing(UP)) {
      player.marchDir = RIGHT
    } else if (player.isFacing(LEFT)) {
      player.marchDir = DOWN
    }
  },

  cornerNE: function (player) {
    if (player.isFacing(RIGHT)) {
      player.marchDir = DOWN
    } else if (player.isFacing(UP)) {
      player.marchDir = LEFT
    }
  }
})

export default Ice
