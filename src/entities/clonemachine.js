import Entity from './entity'
import { spriteIndicesByName } from '../constants'


export default class CloneMachine extends Entity {
  constructor (game, tile, emap) {
    super(game, tile, emap)
    this.template = null // set later by emap
  }

  clone () {
    this.emap.createUpper({
      x: this.x,
      y: this.y,
      index: spriteIndicesByName[this.template] + 1
    })
  }
}
