import sfx from '../sfx'
import Floor from './floor'

/*
 * Doors can only be opened when the right key is in the inventory.
 */
export default class Fire extends Floor {
  constructor (scene, tile, entityMap) {
    super(scene, tile, entityMap)

    const frames = scene.anims.generateFrameNumbers('sprites', {
      frames: [31, 38]
    })
    this.burn = scene.anims.create({
      key: 'burn',
      frames,
      frameRate: 2,
      repeat: -1
    })
    this.sprite.anims.load(this.burn)
  }

  collideWith (target) {
    super.collideWith(target)

    if (target.type === 'fireball') {
      this.moveHere(target)
    }
  }

  noShoes (player) {
    this.sprite.play('burn')
    sfx.splash()
    player.triggerLose()
  }
}
