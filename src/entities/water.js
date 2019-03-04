import { extend } from 'lodash'

import Entity from './entity'
import Floor from './_floor'
import sfx from '../sfx'


/*
 * Water kills Chip unless he has the right footgear.
 * When dirt collides with water, they make mud.
 */
function Water (game, tile, emap) {
  Entity.call(this, game, tile, emap)
  this.isFlat = true
}

extend(
  Water.prototype,
  Entity.prototype,
  Floor.prototype
)

extend(Water.prototype, {
  /*
   * On collide with player, player loses.
   * On collide with block, dirt gets made.
   */
  collideWith: function (target) {
    if (target.type === 'chip') {
      Floor.prototype.collideWith.call(this, target)

      target.frames = {
        '0,-1': 87,
        '-1,0': 94,
        '0,1': 101,
        '1,0': 108
      }
      target.changeFrameDir(target.lastDir)
    } else if (target.type === 'fireball') {
      target.retire()
    } else if (target.type === 'block') {
      this.makeDirt(target)
    }
  },

  makeDirt: function (target) {
    target.retire()
    this.replaceWith('dirt')
  },

  noShoes: function (player) {
    sfx.splash()
    this.changeFrame('splash')
    player.triggerLose()
  }
})

export default Water
