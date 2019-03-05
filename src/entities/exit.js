import { extend } from 'lodash'
import Entity from './entity'
import sfx from '../sfx'
import config from '../config'

/*
 * The exit triggers the win screen and takes the player to the next level.
 */
function Exit (game, tile, emap) {
  Entity.call(this, game, tile, emap)
  this.emap.exit = this // TODO: don't do these here
  this.pulse = this.sprite.animations.add('pulse', [73, 80])
  this.pulse.play(config.exitFps, true)
}

extend(Exit.prototype, Entity.prototype)

extend(Exit.prototype, {
  collideWith: function (target) {
    if (target.type === 'chip') {
      this.moveHere(target)
      this.pulse.stop()
      this.changeFrame('chip:exit')
      sfx.exit()

      target.triggerWin()
    }
  }
})

export default Exit
