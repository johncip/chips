import { extend } from 'lodash'
import Entity from './entity.js'
import sfx from '../sfx.js'

/*
 * A Collectible entity can be put into inventory.
 * ICs, shoes, and keys are collectible.
 */
function Collectible (game, tile, emap) {
  Entity.call(this, game, tile, emap)
}

Collectible.extends(Entity)

extend(Collectible.prototype, {
  /*
   * On collide, collectibles move from the map to the inventory.
   */
  collideWith: function (player) {
    player.inventory.add(this.spriteKey)
    sfx.collect()
    this.moveHere(player)

    setTimeout(function () {
      this.retire()
    }.bind(this), 75)
  }
})

export default Collectible
