import Entity from './entity'

/*
 * The hint tile offers a hint when the player steps on it.
 */
export default class Hint extends Entity {
  constructor (scene, tile, entityMap) {
    super(scene, tile, entityMap)
    this.isFlat = true
  }

  collideWith (target) {
    this.moveHere(target)
    this.scene.showHint()
  }
}
