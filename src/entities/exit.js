import config from '../config'
import sfx from '../sfx'
import Entity from './entity'

/*
 * The exit triggers the win screen and takes the player to the next level.
 */
export default class Exit extends Entity {
  constructor (scene, tile, entityMap) {
    super(scene, tile, entityMap)
    this.entityMap.exit = this // TODO: don't do these here
    this.pulse = scene.anims.add('pulse', [73, 80])
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
