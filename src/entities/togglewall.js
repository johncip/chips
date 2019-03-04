import { extend } from 'lodash'

import Entity from './entity.js'
import sfx from '../sfx.js'


function ToggleWall (tile, emap) {
  Entity.call(this, tile, emap)
}

ToggleWall.extends(Entity)

extend(ToggleWall.prototype, {
  collideWith: function (target) {
    if (this.subtype === 'open') {
      this.moveHere(target)
    } else {
      sfx.bump()
    }
  },

  toggle: function () {
    this.subtype = (this.subtype === 'open') ? 'closed' : 'open'
    this.changeFrame(this.type + ':' + this.subtype)
  }
})

export default ToggleWall
