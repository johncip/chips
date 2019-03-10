import { extend } from 'lodash'

import Entity from './entity'
import { spriteIndicesByName } from '../constants'


export default function CloneMachine (game, tile, emap) {
  Entity.call(this, game, tile, emap)
  this.template = null // set later by emap
}

extend(CloneMachine.prototype, Entity.prototype)

extend(CloneMachine.prototype, {
  clone: function () {
    this.emap.createUpper({
      x: this.x,
      y: this.y,
      index: spriteIndicesByName[this.template] + 1
    })
  }
})
