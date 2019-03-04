import { extend } from 'lodash'
import Entity from './entity.js'

function BlueWall (tile, emap) {
  Entity.call(this, tile, emap)
}

BlueWall.extends(Entity)

extend(BlueWall.prototype, {
  collideWith: function (target) {
    if (target.type === 'chip') {
      switch (this.subtype) {
        case 'fake':
          this.retire()
          this.moveHere(target)
          break
        case 'real':
          var wall = this.replaceWith('wall:basic', false)
          wall.collideWith(target)
          break
      }
    }
  }
})

export default BlueWall
