import { spriteIndicesByName } from '../constants'
import Entity from './entity'

export default class CloneMachine extends Entity {
  constructor (scene, tile, entityMap) {
    super(scene, tile, entityMap)
    this.template = null // set later by the EntityMap
  }

  clone () {
    this.entityMap.createEntity({
      x: this.x,
      y: this.y,
      index: spriteIndicesByName[this.template] + 1
    }, this.entityMap._upper)
  }
}
