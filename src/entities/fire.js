import sfx from '../sfx'
import Floor from './floor'

const BURN_FPS = 2

/*
 * Doors can only be opened when the right key is in the inventory.
 */
export default class Fire extends Floor {
  constructor (game, tile, entityMap) {
    super(game, tile, entityMap)
    this.burn = this.sprite.animations.add('burn', [31, 38])
  }

  collideWith (target) {
    super.collideWith.call(this, target)

    if (target.type === 'fireball') {
      this.moveHere(target)
    }
  }

  noShoes (player) {
    this.burn.play(BURN_FPS, false)
    sfx.splash()
    player.triggerLose()
  }
}

