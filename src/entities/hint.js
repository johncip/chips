import { extend } from 'lodash'
import Entity from './entity.js'

/*
 * The hint tile offers a hint when the player steps on it.
 */
function Hint (game, tile, emap) {
  Entity.call(this, game, tile, emap)
  this.isFlat = true
}

extend(Hint.prototype, Entity.prototype)

extend(Hint.prototype, {
  collideWith: function (target) {
    this.moveHere(target)

    // TODO: hopefully this.game works here
    this.game.hintPanel.show()
  }
})

export default Hint
