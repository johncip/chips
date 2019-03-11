import { clone, extend } from 'lodash'

import Marchable from './marchable'
import { Dir } from '../constants'


export default class Tank extends Marchable {
  constructor (game, tile, emap) {
    super(game, tile, emap)

    this.marchDir = clone(Dir.UP)
    this.marchDelay = 300
  }

  collideWith (target) {
    if (target.type === 'chip') {
      target.collideWith(this)
    } else {
      // TODO: what does this mean? is it just reversing who collides with who?
      super.collideWith.call(this, target)
    }
  }

  march () {
    const dx = this.marchDir[0]
    const dy = this.marchDir[1]
    this.move(dx, dy)
  }
}

extend(Tank.prototype, {
  frames: {
    '0,-1': 88,
    '-1,0': 95,
    '0,1': 102,
    '1,0': 109
  }
})
