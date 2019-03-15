import sfx from '../sfx'
import Entity from './entity'

/*
 * The exit triggers the win screen and takes the player to the next level.
 */
export default class Exit extends Entity {
  constructor (scene, tile, entityMap) {
    super(scene, tile, entityMap)
    this.entityMap.exit = this // TODO: don't do these here

    const frames = scene.anims.generateFrameNumbers('sprites', { frames: [73, 80] })

    this.pulse = scene.anims.create({
      key: 'pulse',
      frames,
      frameRate: 2,
      repeat: -1
    })

    this.sprite.anims.load(this.pulse)
    this.sprite.play('pulse')
  }

  collideWith (target) {
    if (target.type === 'chip') {
      this.moveHere(target)
      this.sprite.anims.pause()
      this.changeFrame('chip:exit')
      sfx.exit()

      target.triggerWin()
    }
  }
}
