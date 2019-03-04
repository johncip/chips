import { extend } from 'lodash'
import Entity from './entity.js'

/*
 * Dirt is produced when blocks and water collide. It disappears when Chip
 * collides with it.
 */
function Dirt (game, tile, emap) {
  Entity.call(this, game, tile, emap)
}

Dirt.extends(Entity)

extend(Dirt.prototype, {
  collideWith: function (player) {
    this.retire()
    this.moveHere(player)
  }
})

export default Dirt
