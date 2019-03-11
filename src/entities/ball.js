import { Dir } from '../constants'
import Marchable from './marchable'

/**
 * The (pink) ball is a monster which moves in a straight line.
 */
export default class Ball extends Marchable {
  constructor (game, tile, entityMap) {
    super(game, tile, entityMap)
    this.lastDir = [...Dir.RIGHT] // TODO: set based on frame
  }

  collideWith (target) {
    if (target.type === 'chip') {
      target.collideWith(this)
    }
  }

  march () {
    const obstacle = this.neighbor(Dir.FWD)

    if (!obstacle) {
      this.moveForward()
    } else if (obstacle.type === 'wall') {
      this.turnAndMove(2)
    } else if (obstacle.type === 'togglewall' && obstacle.subtype === 'closed') {
      this.turnAndMove(2)
    } else {
      this.moveForward()
    }
  }
}

Ball.prototype.frames = {
  '0,-1': 60,
  '-1,0': 67,
  '0,1': 74,
  '1,0': 81
}
