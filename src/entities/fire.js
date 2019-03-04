import { extend } from 'lodash'
import Entity from './entity.js'
import Floor from './_floor.js'
import sfx from '../sfx.js'

/*
 * Doors can only be opened when the right key is in the inventory.
 */
function Fire (game, tile, emap) {
  Entity.call(this, game, tile, emap)
  this.burn = this.sprite.animations.add('burn', [31, 38])
}

Fire.BURN_FPS = 2

extend(
  Fire.prototype,
  Entity.prototype,
  Floor.prototype
)

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

export default Fire
