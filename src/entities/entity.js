import Phaser from 'phaser'
import config from '../config'
import { spriteNamesByIndex, spriteIndicesByName } from '../constants'

/*
 * An item on the tile map -- it could be a wall, a key, a monster, etc.
 */
export default class Entity {
  constructor (scene, tile, entityMap) {
    this.scene = scene
    this.entityMap = entityMap
    this.isFlat = false
    this.x = tile.x
    this.y = tile.y

    this.spriteKey = spriteNamesByIndex[tile.index - 1]

    const parts = this.spriteKey.split(':')
    this.type = parts[0]
    this.subtype = parts[1]

    this.sprite = this.entityMap.group.create(
      tile.x * config.tsize,
      tile.y * config.tsize,
      'sprites',
      tile.index - 1
    )

    this.sprite.setOrigin(0)
  }

  update () {}

  exists () {
    return this.sprite.visible
  }

  retire () {
    this.entityMap.removeEntity(this)
    this.sprite.destroy()
  }

  reset () {
    this.timeSinceTick = 0
  }

  replaceWith (type, isUpper) {
    this.retire()

    // TODO: handle this a better way
    const layer = isUpper ? this.entityMap._upper : this.entityMap._lower

    return this.entityMap.createEntity({
      x: this.x,
      y: this.y,
      index: spriteIndicesByName[type] + 1
    }, layer)
  }

  changeFrame (frame) {
    if (isNaN(frame)) {
      this.sprite.setFrame(spriteIndicesByName[frame])
    } else {
      this.sprite.setFrame(frame)
    }
  }

  entityAbove () {
    return this.entityMap.getUpper(this.x, this.y)
  }

  entityBelow () {
    return this.entityMap.getLower(this.x, this.y)
  }

  moveHere (entity) {
    this.entityMap.moveEntityAbs(entity, this.x, this.y)
  }

  spriteTo (tileX, tileY) {
    const x = tileX * config.tsize
    const y = tileY * config.tsize

    if (config.smoothMoves) {
      const duration = config.floorDelay * 1.1
      this.scene.add.tween({
        x,
        y,
        duration,
        targets: this.sprite,
        ease: Phaser.Math.Easing.Quadratic.Out
      })
    } else {
      this.sprite.x = x
      this.sprite.y = y
    }
  }

  destroy () {
    this.sprite.destroy()
  }
}
