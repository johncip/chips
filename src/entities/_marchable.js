import { extend, findIndex } from 'lodash'

import Movable from './_movable.js'
import config from '../config.js'
import { Dir } from '../constants.js'


/*
 * Marchable entities can be moved one tile according to their AI on a
 * specific time increment.
 *
 * Marchable depends on Movable.
 */
function Marchable () {
  Movable.call(this)
  this.timeSinceTick = 0
  this.marchDelay = config.moveDelay
}

extend(Marchable.prototype, Movable.prototype)

extend(Marchable.prototype, {
  update: function () {
    // I hope this.game works here...
    this.timeSinceTick += this.game.time.elapsed

    if (this.timeSinceTick > this.marchDelay) {
      this.march()
      this.timeSinceTick -= this.marchDelay
    }
  },

  hasNeighbor: function (dir) {
    return !!this.neighbor(dir)
  },

  neighbor: function (dir) {
    const absDir = this.toAbsolute(dir)
    const x2 = this.x + absDir[0]
    const y2 = this.y + absDir[1]
    return this.emap.get(x2, y2)
  },

  /*
   * changes a relative direction (forward) to an absolute one (north)
   */
  toAbsolute: function (dir) {
    const lastDirIndex = this.findDirIndex(this.lastDir)
    return this.rotateDir(dir, lastDirIndex)
  },

  rotateDir: function (dir, turns) {
    const idx = this.findDirIndex(dir)
    return Dir.MOVE_DIRS[(idx + turns) % 4]
  },

  findDirIndex: function (dir) {
    const res = findIndex(Dir.MOVE_DIRS, item => dir[0] === item[0] && dir[1] === item[1])

    if (res === -1) {
      throw new Error('Not a valid direction.')
    }

    return res
  },

  turnAndMove: function (turns) {
    const dir = this.rotateDir(this.lastDir, turns)
    this.move(dir[0], dir[1])
  },

  moveForward: function () {
    this.move(this.lastDir[0], this.lastDir[1])
  }
})

export default Marchable
