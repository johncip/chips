import { extend } from 'lodash'
import Entity from './entity'

function BlueWall (game, tile, emap) {
  Entity.call(this, game, tile, emap)
}

extend(BlueWall.prototype, Entity.prototype)

extend(BlueWall.prototype, {
  collideWith: function (target) {
    if (target.type === 'chip') {
      switch (this.subtype) {
        case 'fake':
          this.retire()
          this.moveHere(target)
          break
        case 'real':
          const wall = this.replaceWith('wall:basic', false)
          wall.collideWith(target)
          break
      }
    }
  }
})

export default BlueWall
