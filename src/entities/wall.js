import { extend } from 'lodash'

import Entity from './entity'
import sfx from '../sfx'


export default class Wall extends Entity {
  constructor (game, tile, emap) {
    super(game, tile, emap)
  }

  collideWith (target) {
    if (target.type === 'chip') {
      switch (this.subtype) {
        case 'basic':
          sfx.bump()
          break
        case 'invisible':
          sfx.bump()
          break
        case 'hidden':
          sfx.bump()
          this.changeFrame('wall:basic')
          break
      }
    }
  }
}
