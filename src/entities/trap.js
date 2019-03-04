import { extend } from 'lodash'
import Entity from './entity'


function Trap (game, tile, emap) {
  Entity.call(this, game, tile, emap)
}

extend(Trap.prototype, Entity.prototype)

extend(Trap.prototype, {
  collideWith: function (target) {
    this.moveHere(target)

    if (this.subtype === 'closed') {
      target.frozen = true
    }
  },

  open: function () {
    this.subtype = 'open'
    this.spriteKey = 'trap:open'
    this.changeFrame(this.spriteKey)

    const above = this.entityAbove()

    if (above) {
      above.frozen = false
    }
  },

  close: function () {
    this.subtype = 'closed'
    this.spriteKey = 'trap:closed'
    this.changeFrame(this.spriteKey)

    const above = this.entityAbove()
    if (above) {
      above.frozen = true
    }
  }
})

export default Trap
