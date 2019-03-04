import { clone, extend } from 'lodash'

import Entity from './entity'
import Marchable from './_marchable'
import { Dir } from '../constants'


function Ball (game, tile, emap) {
  Entity.call(this, game, tile, emap)
  Marchable.call(this, tile, emap)

  this.lastDir = clone(Dir.RIGHT) // TODO: set based on frame
}

extend(
  Ball.prototype,
  Entity.prototype,
  Marchable.prototype
)

extend(Ball.prototype, {
  frames: {
    '0,-1': 60,
    '-1,0': 67,
    '0,1': 74,
    '1,0': 81
  },

  collideWith: function (target) {
    if (target.type === 'chip') {
      target.collideWith(this)
    }
  },

  march: function () {
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
})

export default Ball
