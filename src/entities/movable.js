import { isEqual } from 'lodash'
import Entity from './entity'

export default class Movable extends Entity {
  constructor (scene, tile, entityMap) {
    super(scene, tile, entityMap)
    // TODO: get movement dir
    this.lastDir = [0, 0]
    this.frozen = false
  }

  move (dx, dy) {
    // TODO: this should be a list of valid moves
    if (this.frozen) {
      return
    }

    this.lastDir = [dx, dy]
    this.sprite.setFrame(this.frames[this.lastDir.toString()])
    const resident = this.entityMap.get(this.x + dx, this.y + dy)

    if (resident) {
      resident.collideWith(this)
    } else {
      this.entityMap.moveEntity(this, dx, dy)
    }

    this.entityMap.resetTraps()
  }

  retire () {
    super.retire()
    this.frozen = true
  }

  isFacing (dir) {
    return isEqual(this.lastDir, dir)
  }
}
