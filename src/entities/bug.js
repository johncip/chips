import { clone, extend } from 'lodash'
import { Dir } from '../static.js'
import Entity from './entity.js'
import Marchable from './_marchable.js'

function Bug (tile, emap) {
  Entity.call(this, tile, emap)
  Marchable.call(this)

  this.lastDir = clone(Dir.UP)
}

Bug.extends(Entity, Marchable)

extend(Bug.prototype, {
  frames: {
    '0,-1': 4,
    '-1,0': 11,
    '0,1': 18,
    '1,0': 25
  },

  march: function () {
    var leftNeighbor = this.neighbor(Dir.LEFT)
    var fwdNeighbor = this.neighbor(Dir.UP)

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
