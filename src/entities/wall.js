import { extend } from 'lodash'

import Entity from './entity.js'
import sfx from '../sfx.js'


function Wall (game, tile, emap) {
  Entity.call(this, game, tile, emap)
}

Wall.extends(Entity)

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
