import Entity from './entity'
import sfx from '../sfx'


export default class Wall extends Entity {
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
