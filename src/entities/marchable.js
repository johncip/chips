import findIndex from 'lodash/findIndex'

import config from '../config'
import { Dir } from '../constants'
import Movable from './movable'

/*
 * Marchable entities can be moved one tile according to their AI on a
 * specific time increment.
 */
export default class Marchable extends Movable {
  constructor (scene, tile, entityMap) {
    super(scene, tile, entityMap)
    this.timeSinceTick = 0
    this.marchDelay = config.moveDelay
  }

  update (time, delta) {
    if (this.scene.paused) {
      return
    }

    this.timeSinceTick += delta

    if (this.timeSinceTick > this.marchDelay) {
      this.march()
      this.timeSinceTick -= this.marchDelay
    }
  }

  neighbor (dir) {
    const absDir = this.toAbsolute(dir)
    const x2 = this.x + absDir[0]
    const y2 = this.y + absDir[1]
    return this.entityMap.get(x2, y2)
  }

  toAbsolute (dir) {
    const lastDirIndex = this.findDirIndex(this.lastDir)
    return this.rotateDir(dir, lastDirIndex)
  }

  rotateDir (dir, turns) {
    const idx = this.findDirIndex(dir)
    return Dir.MOVE_DIRS[(idx + turns) % 4]
  }

  findDirIndex (dir) {
    const res = findIndex(
      Dir.MOVE_DIRS,
      item => dir[0] === item[0] && dir[1] === item[1]
    )

    if (res === -1) {
      throw new Error('Not a valid direction.')
    }

    return res
  }

  turnAndMove (turns) {
    const dir = this.rotateDir(this.lastDir, turns)
    this.move(dir[0], dir[1])
  }

  moveForward () {
    this.move(this.lastDir[0], this.lastDir[1])
  }
}
