import { extend } from 'lodash'

import Floor from './floor'
import sfx from '../sfx'


/*
 * Doors can only be opened when the right key is in the inventory.
 */
export default function Fire (game, tile, emap) {
  Floor.call(this, game, tile, emap)
  this.burn = this.sprite.animations.add('burn', [31, 38])
}

extend(Fire.prototype, Floor.prototype)

extend(Fire.prototype, {
  collideWith: function (target) {
    Floor.prototype.collideWith.call(this, target)

    if (target.type === 'fireball') {
      this.moveHere(target)
    }
  },

  noShoes: function (player) {
    this.burn.play(Fire.BURN_FPS, false)
    sfx.splash()
    player.triggerLose()
  }
})

Fire.BURN_FPS = 2
