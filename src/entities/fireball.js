import { clone, extend } from 'lodash'
import { Dir } from '../constants.js'
import Entity from './entity.js'
import Marchable from './_marchable.js'

function Fireball (game, tile, emap) {
  Entity.call(this, game, tile, emap)
  Marchable.call(this)

  this.lastDir = clone(Dir.LEFT)
}

extend(
  Fireball.prototype,
  Entity.prototype,
  Marchable.prototype
)

extend(Fireball.prototype, {
  frames: {
    '0,-1': 32,
    '-1,0': 39,
    '0,1': 46,
    '1,0': 53
  },

  collideWith: function (target) {
    if (target.type === 'chip') {
      target.collideWith(this)
    }
  },

  march: function () {
    this.moveForward()
  }
})

export default Fireball
