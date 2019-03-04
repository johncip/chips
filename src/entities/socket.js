import { extend } from 'lodash'

import Entity from './entity.js'
import config from '../config.js'
import sfx from '../sfx.js'


/*
 * The socket is a special door which can only be opened by collecting
 * all of the chips.
 */
function Socket (game, tile, emap) {
  Entity.call(this, game, tile, emap)
}

extend(Socket.prototype, Entity.prototype)

extend(Socket.prototype, {
  collideWith: function (player) {
    if (player.hasAllChips() || config.debug) {
      this.openUp(player)
    } else {
      sfx.bump()
    }
  },

  openUp: function (player) {
    this.retire()
    sfx.open()
    this.moveHere(player)
  }
})

export default Socket
