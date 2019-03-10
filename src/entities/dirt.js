import Entity from './entity'

/*
 * Dirt is produced when blocks and water collide. It disappears when Chip
 * collides with it.
 */
export default class Dirt extends Entity {
  collideWith (player) {
    this.retire()
    this.moveHere(player)
  }
}
