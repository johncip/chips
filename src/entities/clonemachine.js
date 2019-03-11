import Entity from './entity'
import { spriteIndicesByName } from '../constants'


export default class CloneMachine extends Entity {
  constructor (game, tile, entityMap) {
    super(game, tile, entityMap)
    this.template = null // set later by the EntityMap
  }

  clone () {
    this.entityMap.createUpper({
      x: this.x,
      y: this.y,
      index: spriteIndicesByName[this.template] + 1
    })
  }
}
