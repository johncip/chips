import sfx from '../sfx'
import Floor from './floor'

/*
 * Water kills Chip unless he has the right footgear.
 * When dirt collides with water, they make mud.
 */
export default class Water extends Floor {
  constructor (scene, tile, entityMap) {
    super(scene, tile, entityMap)
    this.isFlat = true
  }

  collideWith (target) {
    if (target.type === 'chip') {
      super.collideWith.call(this, target)

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
  }

  makeDirt (target) {
    target.retire()
    this.replaceWith('dirt')
  }

  noShoes (player) {
    sfx.splash()
    this.changeFrame('splash')
    player.triggerLose()
  }
}
