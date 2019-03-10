import { extend } from 'lodash'
import Entity from './entity'

/*
 * Dirt is produced when blocks and water collide. It disappears when Chip
 * collides with it.
 */
export default function Dirt (game, tile, emap) {
  Entity.call(this, game, tile, emap)
}

extend(Dirt.prototype, Entity.prototype)

extend(Dirt.prototype, {
  collideWith: function (player) {
    this.retire()
    this.moveHere(player)
  }
})
