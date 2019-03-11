import { clone, extend } from 'lodash'

import { Dir } from '../constants'
import Marchable from './marchable'


export default class Fireball extends Marchable {
  constructor (game, tile, emap) {
    super(game, tile, emap)
    this.lastDir = clone(Dir.LEFT)
  }

  collideWith (target) {
    if (target.type === 'chip') {
      target.collideWith(this)
    }
  }

  march () {
    this.moveForward()
  }
}

extend(Fireball.prototype, {
  frames: {
    '0,-1': 32,
    '-1,0': 39,
    '0,1': 46,
    '1,0': 53
  }
})
