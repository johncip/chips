import { Dir } from '../constants'
import Marchable from './marchable'

/*
 * Bugs are monsters which always hug the wall to their left.
 */
export default class Bug extends Marchable {
  constructor (game, tile, entityMap) {
    super(game, tile, entityMap)
    this.lastDir = [...Dir.UP]
  }

  march () {
    const leftNeighbor = this.neighbor(Dir.LEFT)
    const fwdNeighbor = this.neighbor(Dir.UP)

    if (!leftNeighbor) {
      this.turnAndMove(3)
    } else if (fwdNeighbor) {
      if (fwdNeighbor.type === 'chip') {
        this.moveForward()
      } else {
        this.turnAndMove(1)
      }
    } else if (leftNeighbor.type === 'chip') {
      this.turnAndMove(3)
    } else {
      this.moveForward()
    }
  }

  collideWith (target) {
    if (target.type === 'chip') {
      target.collideWith(this)
    }
  }
}

Bug.prototype.frames = {
  '0,-1': 4,
  '-1,0': 11,
  '0,1': 18,
  '1,0': 25
}
