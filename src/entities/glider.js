import { extend } from 'lodash'

import { Dir } from '../constants'
import Marchable from './marchable'


export default function Glider (game, tile, emap) {
  Marchable.call(this, game, tile, emap)
  this.lastDir = [0, -1] // TODO: set based on frame
  this.marchDelay = 300
}

extend(Glider.prototype, Marchable.prototype)

extend(Glider.prototype, {
  frames: {
    '0,-1': 5,
    '-1,0': 12,
    '0,1': 19,
    '1,0': 26
  },

  march: function () {
    const fwdNeighbor = this.neighbor(Dir.UP)

    if (fwdNeighbor && fwdNeighbor.type === 'wall') {
      this.turnAndMove(3)
    } else {
      this.moveForward()
    }
  },

  collideWith: function (target) {
    if (target.type === 'player') {
      target.collideWith(this)
    } else if (target.type === 'bomb') {
      this.retire()
      target.retire()
    }
  }
})
