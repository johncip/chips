import { extend } from 'lodash'

import Entity from './entity'
import config from '../config'
import sfx from '../sfx'


/*
 * The socket is a special door which can only be opened by collecting
 * all of the chips.
 */
export default class Socket extends Entity {
  constructor (game, tile, emap) {
    super(game, tile, emap)
  }

  collideWith (player) {
    if (player.hasAllChips() || config.debug) {
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
