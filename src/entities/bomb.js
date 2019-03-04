import { extend } from 'lodash'
import Entity from './entity.js'
import sfx from '../sfx.js'

function Bomb (game, tile, emap) {
  Entity.call(this, game, tile, emap)
}

Bomb.extends(Entity)

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
