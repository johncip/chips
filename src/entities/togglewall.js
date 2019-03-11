import sfx from '../sfx'
import Entity from './entity'


export default class ToggleWall extends Entity {
  collideWith (target) {
    if (this.subtype === 'open') {
      this.moveHere(target)
    } else {
      sfx.bump()
    }
  }

  toggle () {
    this.subtype = (this.subtype === 'open') ? 'closed' : 'open'
    this.changeFrame(this.type + ':' + this.subtype)
  }
}
