import { clone, extend } from 'lodash'

import Entity from './entity.js'
import Marchable from './_marchable.js'
import { Dir } from '../static.js'


function Tank (game, tile, emap) {
  Entity.call(this, game, tile, emap)
  Marchable.call(this, tile, emap)

  this.marchDir = clone(Dir.UP)
  this.marchDelay = 300
}

Tank.extends(Entity, Marchable)

extend(Tank.prototype, {
  frames: {
    '0,-1': 88,
    '-1,0': 95,
    '0,1': 102,
    '1,0': 109
  },

  collideWith: function (target) {
    if (target.type === 'chip') {
      target.collideWith(this)
    } else {
      // TODO: what does this mean? is it just reversing who collides with who?
      Entity.prototype.collideWith.call(this, target)
    }
  },

  march: function () {
    const dx = this.marchDir[0]
    const dy = this.marchDir[1]
    this.move(dx, dy)
  }
})

export default Tank
