import { extend } from 'lodash'

import { Dir } from '../constants.js'
import Entity from './entity.js'
import Marchable from './_marchable.js'
import Movable from './_movable.js'


function Glider (game, tile, emap) {
  Entity.call(this, game, tile, emap)
  Marchable.call(this)
  this.lastDir = [0, -1] // TODO: set based on frame
  this.marchDelay = 300
}

extend(
  Glider.prototype,
  Entity.prototype,
  Movable.prototype, // TODO: might not need Movable
  Marchable.prototype
)

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

export default Glider
