import { extend } from 'lodash'
import Entity from './entity.js'
import Movable from './_movable.js'
import sfx from '../sfx.js'

/*
 * Blocks can be pushed. They become dirt after colliding with water.
 */
function Block (game, tile, emap) {
  Entity.call(this, game, tile, emap)
}

Block.extends(Entity)
Block.extends(Movable)

extend(Block.prototype, {
  frames: {
    '0,-1': 1,
    '-1,0': 1,
    '0,1': 1,
    '1,0': 1
  },

  /*
   * Blocks gets pushed on collide, depending on neighbors.
   */
  collideWith: function (target) {
    if (target.type === 'chip') {
      var dir = target.lastDir
      var dx = dir[0]
      var dy = dir[1]

      if (this.isPushable(dx, dy)) {
        this.move(dx, dy)
        target.move(dx, dy)
      } else {
        sfx.bump()
      }
    }
  },

  /*
   * Blocks are only pushable if there's nothing in the way, or something
   * "flat" in the way.
   */
  isPushable: function (dx, dy) {
    var resident = this.emap.get(this.x + dx, this.y + dy)
    return resident === undefined || resident.isFlat
  }
})

export default Block
