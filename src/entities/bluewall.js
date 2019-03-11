import Entity from './entity'

/*
 * Blue walls turn into either floor wall tiles when Chip pushes them.
 */
export default class BlueWall extends Entity {
  collideWith (target) {
    if (target.type === 'chip') {
      switch (this.subtype) {
        case 'fake':
          this.retire()
          this.moveHere(target)
          break
        case 'real': {
          const wall = this.replaceWith('wall:basic', false)
          wall.collideWith(target)
          break
        }
        default:
          throw new Error('missing blue wall type')
      }
    }
  }
}
