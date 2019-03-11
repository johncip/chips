import { Easing } from 'phaser'
import config from '../config'
import { spriteNamesByIndex, spriteIndicesByName } from '../constants'

/*
 * A game Entity is an item on the tile map -- it could be a wall,
 * a key, a monster, etc.
 */
export default class Entity {
  constructor (game, tile, emap) {
    this.game = game
    this.emap = emap
    this.isFlat = false
    this.x = tile.x
    this.y = tile.y

    this.spriteKey = spriteNamesByIndex[tile.index - 1]

    const parts = this.spriteKey.split(':')
    this.type = parts[0]
    this.subtype = parts[1]

    this.sprite = this.emap.group.create(
      tile.x * config.tsize,
      tile.y * config.tsize,
      'sprites',
      tile.index - 1
    )
  }

  retire () {
    this.sprite.exists = false
  }

  update () {
  }

  reset () {
    this.timeSinceTick = 0
  }

  exists () {
    return this.sprite.exists
  }

  replaceWith (type, isUpper) {
    const tile = {
      x: this.x,
      y: this.y,
      index: spriteIndicesByName[type] + 1
    }
    const createFunc = isUpper ? 'createUpper' : 'createLower'

    this.retire()
    return this.emap[createFunc](tile)
  }

  changeFrame (frame) {
    if (isNaN(frame)) {
      this.sprite.frame = spriteIndicesByName[frame]
    } else {
      this.sprite.frame = frame
    }
  }

  entityAbove () {
    return this.emap.getUpper(this.x, this.y)
  }

  entityBelow () {
    return this.emap.getLower(this.x, this.y)
  }

  moveHere (entity) {
    this.emap.moveEntityAbs(entity, this.x, this.y)
  }

  spriteTo (tileX, tileY) {
    const x = tileX * config.tsize
    const y = tileY * config.tsize

    if (config.smoothMoves) {
      const duration = config.floorDelay * 1.1
      this.game.add.tween(this.sprite).to(
        { x, y },
        duration,
        Easing.Quadratic.Out,
        true
      )
    } else {
      this.sprite.x = x
      this.sprite.y = y
    }
  }

  destroy () {
    this.sprite.destroy()
  }
}
