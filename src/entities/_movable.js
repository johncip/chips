import { extend, isEqual } from 'lodash'
import Entity from './entity.js'

function Movable () {
  // TODO: get movement dir
  this.lastDir = [0, 0]
  this.frozen = false
}

extend(Movable.prototype, {
  move: function (dx, dy) {
    // TODO: this should be a list of valid moves
    if (this.frozen) {
      return
    }

    this.lastDir = [dx, dy]
    this.changeFrameDir([dx, dy])
    var resident = this.emap.get(this.x + dx, this.y + dy)

    if (resident) {
      resident.collideWith(this)
    } else {
      this.emap.moveEntity(this, dx, dy)
    }

    this.emap.resetTraps()
  },

  changeFrameDir: function (dir) {
    this.sprite.frame = this.frames[dir.toString()]
  },

  retire: function () {
    this.frozen = true
    Entity.prototype.retire.call(this)
  },

  isFacing: function (dir) {
    return isEqual(this.lastDir, dir)
  }
})

export default Movable
