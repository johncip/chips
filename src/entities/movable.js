import { isEqual } from 'lodash'
import Entity from './entity'


export default class Movable extends Entity {
  constructor (game, tile, emap) {
    super(game, tile, emap)
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
    this.changeFrameDir([dx, dy])
    const resident = this.emap.get(this.x + dx, this.y + dy)

    if (resident) {
      resident.collideWith(this)
    } else {
      this.emap.moveEntity(this, dx, dy)
    }

    this.emap.resetTraps()
  }

  changeFrameDir (dir) {
    this.sprite.frame = this.frames[dir.toString()]
  }

  retire () {
    this.frozen = true
    super.retire.call(this)
  }

  isFacing (dir) {
    return isEqual(this.lastDir, dir)
  }
}
