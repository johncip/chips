import { extend } from 'lodash'

import Entity from './entity'
import sfx from '../sfx'


/*
 * A Collectible entity can be put into inventory.
 * ICs, shoes, and keys are collectible.
 */
function Collectible (game, tile, emap) {
  Entity.call(this, game, tile, emap)
}

extend(Collectible.prototype, Entity.prototype)

extend(Collectible.prototype, {
  /*
   * On collide, collectibles move from the map to the inventory.
   */
  collideWith: function (player) {
    player.inventory.add(this.spriteKey)
    sfx.collect()
    this.moveHere(player)
    this.retire()
  }
})

export default Collectible
