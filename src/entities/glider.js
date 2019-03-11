import { Dir } from '../constants'
import Marchable from './marchable'

export default class Glider extends Marchable {
  constructor (game, tile, entityMap) {
    super(game, tile, entityMap)
    this.lastDir = [0, -1] // TODO: set based on frame
    this.marchDelay = 300
  }

  march () {
    const fwdNeighbor = this.neighbor(Dir.UP)

    if (fwdNeighbor && fwdNeighbor.type === 'wall') {
      this.turnAndMove(3)
    } else {
      this.moveForward()
    }
  }

  collideWith (target) {
    if (target.type === 'player') {
      target.collideWith(this)
    } else if (target.type === 'bomb') {
      this.retire()
      target.retire()
    }
  }
}

Glider.prototype.frames = {
  '0,-1': 5,
  '-1,0': 12,
  '0,1': 19,
  '1,0': 26
}
