import { extend } from 'lodash'
import Entity from './entity.js'
import { spriteIndicesByName } from '../static.js'

function CloneMachine (tile, emap) {
  Entity.call(this, tile, emap)
  this.template = null // set later by emap
}

CloneMachine.extends(Entity)

extend(CloneMachine.prototype, {
  clone: function () {
    this.emap.createUpper({
      x: this.x,
      y: this.y,
      index: spriteIndicesByName[this.template] + 1
    })
  }
})

export default CloneMachine
