import { clone, extend } from 'lodash'

import Entity from './entity'
import sfx from '../sfx'


function Button (game, tile, emap) {
  Entity.call(this, game, tile, emap)
  this.target = null
}

extend(Button.prototype, Entity.prototype)

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
    this.emap.eachOfType('tank', tank => {
      tank.marchDir = clone(tank.marchDir)
      tank.marchDir[0] *= -1
      tank.marchDir[1] *= -1
    })
  },

  toggleTheWalls: function () {
    this.emap.eachOfType('togglewall', wall => wall.toggle())
  }
})

export default Button
