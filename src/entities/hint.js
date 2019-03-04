import { extend } from 'lodash'
import Entity from './entity.js'

/*
 * The hint tile offers a hint when the player steps on it.
 */
function Hint (tile, emap) {
  Entity.call(this, tile, emap)
  this.isFlat = true
}

Hint.extends(Entity)

extend(Hint.prototype, {
  collideWith: function (target) {
    this.moveHere(target)

    // TODO: hopefully this.game works here
    this.game.hintPanel.show()
  }
})

export default Hint
