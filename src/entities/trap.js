import Entity from './entity'

export default class Trap extends Entity {
  collideWith (target) {
    this.moveHere(target)

    if (this.subtype === 'closed') {
      target.frozen = true
    }
  }

  open () {
    this.subtype = 'open'
    this.spriteKey = 'trap:open'
    this.changeFrame(this.spriteKey)

    const above = this.entityAbove()

    if (above) {
      above.frozen = false
    }
  }

  close () {
    this.subtype = 'closed'
    this.spriteKey = 'trap:closed'
    this.changeFrame(this.spriteKey)

    const above = this.entityAbove()
    if (above) {
      above.frozen = true
    }
  }
}
