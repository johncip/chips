import { extend } from 'lodash'

import Entity from './entity'
import sfx from '../sfx'


function Wall (game, tile, emap) {
  Entity.call(this, game, tile, emap)
}

extend(Wall.prototype, Entity.prototype)

extend(Wall.prototype, {
  collideWith: function (target) {
    if (target.type === 'chip') {
      switch (this.subtype) {
        case 'basic':
          sfx.bump()
          break
        case 'invisible':
          sfx.bump()
          break
        case 'hidden':
          sfx.bump()
          this.changeFrame('wall:basic')
          break
      }
    }
  }
})

export default Wall
