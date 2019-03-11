import sfx from '../sfx'
import Entity from './entity'

export default class Button extends Entity {
  constructor (game, tile, entityMap) {
    super(game, tile, entityMap)
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
      default:
        throw new Error('missing button type')
    }
  }

  moveTanks () {
    this.entityMap.eachOfType('tank', tank => {
      tank.marchDir = [...tank.marchDir]
      tank.marchDir[0] *= -1
      tank.marchDir[1] *= -1
    })
  }

  toggleTheWalls () {
    this.entityMap.eachOfType('togglewall', wall => wall.toggle())
  }
}
