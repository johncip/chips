import { clone, extend } from 'lodash'
import Entity from './entity.js'
import sfx from '../sfx.js'

function Button (tile, emap) {
  Entity.call(this, tile, emap)
  this.target = null
}

Button.extends(Entity)

extend(Button.prototype, {
  collideWith: function (target) {
    sfx.press()
    this.moveHere(target)

    switch (this.subtype) {
      case 'blue':
        return this.moveTanks()
      case 'green':
        return this.toggleTheWalls()
      case 'brown':
        return this.target.open()
      case 'red':
        return this.target.clone()
    }
  },

  moveTanks: function () {
    this.emap.eachOfType('tank', function (tank) {
      tank.marchDir = clone(tank.marchDir)
      tank.marchDir[0] *= -1
      tank.marchDir[1] *= -1
    })
  },

  toggleTheWalls: function () {
    this.emap.eachOfType('togglewall', function (wall) {
      wall.toggle()
    })
  }
})

export default Button
