import Movable from './movable'
import sfx from '../sfx'

/*
 * Blocks can be pushed by Chip. They become dirt after colliding with water.
 */
export default class Block extends Movable {
  collideWith (target) {
    if (target.type === 'chip') {
      const dir = target.lastDir
      const dx = dir[0]
      const dy = dir[1]

      if (this.isPushable(dx, dy)) {
        this.move(dx, dy)
        target.move(dx, dy)
      } else {
        sfx.bump()
      }
    }
  }

  isPushable (dx, dy) {
    const resident = this.entityMap.get(this.x + dx, this.y + dy)
    return resident === undefined || resident.isFlat
  }
}

Block.prototype.frames = {
  '0,-1': 1,
  '-1,0': 1,
  '0,1': 1,
  '1,0': 1
}
