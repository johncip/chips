import Entity from './entity'

/*
 * The hint tile offers a hint when the player steps on it.
 */
export default class Hint extends Entity {
  constructor (game, tile, emap) {
    super(game, tile, emap)
    this.isFlat = true
  }

  collideWith (target) {
    this.moveHere(target)
    this.game.hintPanel.show()
  }
}
