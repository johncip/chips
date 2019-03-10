import Floor from './floor'
import sfx from '../sfx'

const BURN_FPS = 2

/*
 * Doors can only be opened when the right key is in the inventory.
 */
export default class Fire extends Floor {
  constructor (game, tile, emap) {
    super(game, tile, emap)
    this.burn = this.sprite.animations.add('burn', [31, 38])
  }

  collideWith (target) {
    Floor.prototype.collideWith.call(this, target)

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

