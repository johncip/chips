import { clone, extend } from 'lodash'

import { Dir } from '../constants'
import Marchable from './marchable'


function Bug (game, tile, emap) {
  Marchable.call(this, game, tile, emap)
  this.lastDir = clone(Dir.UP)
}

extend(Bug.prototype, Marchable.prototype)

extend(Bug.prototype, {
  frames: {
    '0,-1': 4,
    '-1,0': 11,
    '0,1': 18,
    '1,0': 25
  },

  march: function () {
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
  },

  collideWith: function (target) {
    if (target.type === 'chip') {
      target.collideWith(this)
    }
  }
})

export default Bug
