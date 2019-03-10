import Entity from './entity'
import sfx from '../sfx'


export default class Button extends Entity {
  constructor (game, tile, emap) {
    super(game, tile, emap)
    this.target = null
  }

  collideWith (target) {
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
  }

  moveTanks () {
    this.emap.eachOfType('tank', tank => {
      tank.marchDir = [...tank.marchDir]
      tank.marchDir[0] *= -1
      tank.marchDir[1] *= -1
    })
  }

  toggleTheWalls () {
    this.emap.eachOfType('togglewall', wall => wall.toggle())
  }
}
