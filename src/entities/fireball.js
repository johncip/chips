import { clone, extend } from 'lodash'

import { Dir } from '../constants'
import Marchable from './marchable'


function Fireball (game, tile, emap) {
  Marchable.call(this, game, tile, emap)
  this.lastDir = clone(Dir.LEFT)
}

extend(Fireball.prototype, Marchable.prototype)

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
