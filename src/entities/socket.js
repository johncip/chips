import config from '../config'
import sfx from '../sfx'
import Entity from './entity'

/*
 * The socket is a special door which can only be opened by collecting
 * all of the chips.
 */
export default class Socket extends Entity {
  collideWith (player) {
    if (this.scene.hasEnoughChips() || config.debug) {
      this.openUp(player)
    } else {
      sfx.bump()
    }
  }

  openUp (player) {
    this.retire()
    sfx.open()
    this.moveHere(player)
  }
}
