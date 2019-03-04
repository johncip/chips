import { extend } from 'lodash'

import Entity from './entity'
import sfx from '../sfx'


function Bomb (game, tile, emap) {
  Entity.call(this, game, tile, emap)
}

extend(Bomb.prototype, Entity.prototype)

extend(Bomb.prototype, {
  collideWith: function (target) {
    if (target.type === 'chip') {
      sfx.explode()
      target.triggerLose()
    } else {
      target.retire()
      this.retire()
    }
  }
})

export default Bomb
