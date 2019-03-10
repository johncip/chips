import config from '../config'
import Entity from './entity'
import sfx from '../sfx'

/*
 * The exit triggers the win screen and takes the player to the next level.
 */
export default class Exit extends Entity {
  constructor (game, tile, emap) {
    super(game, tile, emap)
    this.emap.exit = this // TODO: don't do these here
    this.pulse = this.sprite.animations.add('pulse', [73, 80])
    this.pulse.play(config.exitFps, true)
  }

  collideWith (target) {
    if (target.type === 'chip') {
      this.moveHere(target)
      this.pulse.stop()
      this.changeFrame('chip:exit')
      sfx.exit()

      target.triggerWin()
    }
  }
}
