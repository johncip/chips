import Entity from './entity'
import sfx from '../sfx'


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
