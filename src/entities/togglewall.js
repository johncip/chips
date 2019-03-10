import { extend } from 'lodash'

import Entity from './entity'
import sfx from '../sfx'


export default function ToggleWall (game, tile, emap) {
  Entity.call(this, game, tile, emap)
}

extend(ToggleWall.prototype, Entity.prototype)

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
