import { Dir } from '../constants'
import Floor from './floor'
import sfx from '../sfx'


const { UP, DOWN, LEFT, RIGHT } = Dir

/*
 * Ice makes chip slide unless he has the skates.
 */
export default class Ice extends Floor {
  noShoes (player) {
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
  }

  cornerSE (player) {
    if (player.isFacing(RIGHT)) {
      player.marchDir = UP
    } else if (player.isFacing(DOWN)) {
      player.marchDir = LEFT
    }
  }

  cornerSW (player) {
    if (player.isFacing(LEFT)) {
      player.marchDir = UP
    } else if (player.isFacing(DOWN)) {
      player.marchDir = RIGHT
    }
  }

  cornerNW (player) {
    if (player.isFacing(UP)) {
      player.marchDir = RIGHT
    } else if (player.isFacing(LEFT)) {
      player.marchDir = DOWN
    }
  }

  cornerNE (player) {
    if (player.isFacing(RIGHT)) {
      player.marchDir = DOWN
    } else if (player.isFacing(UP)) {
      player.marchDir = LEFT
    }
  }
}
