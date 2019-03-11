import { each } from 'lodash'
import config from './config'
import { spriteIndicesByName } from './constants'

const itemKeys = [
  'key:blue',
  'key:green',
  'key:red',
  'key:yellow',
  'shoe:ice',
  'shoe:water',
  'shoe:force',
  'shoe:fire'
]

const { debug, tsize } = config

/*
 * A record of each item the player has collected, and the sprites to
 * display them.
 */
export default class Inventory {
  constructor (game) {
    this.group = game.add.group(undefined, 'Inventory')
    this.group.fixedToCamera = true

    this.left = 9.75 * tsize
    this.top = 7 * tsize
    this.counts = {}
    this.sprites = {}

    this.createBackground()
    itemKeys.forEach((key, idx) => {
      this.counts[key] = debug ? 99 : 0
      this.createSprite(key, idx)
    })

    this.counts.ic = 0
  }

  createBackground () {
    for (let row = 0; row < 2; row++) {
      for (let col = 0; col < 4; col++) {
        this.group.create(
          this.left + col * tsize,
          this.top + row * tsize,
          'sprites',
          spriteIndicesByName.floor
        )
      }
    }
  }

  createSprite (key, idx) {
    const sprite = this.group.create(0, 0, 'sprites', spriteIndicesByName[key])

    sprite.x = this.left + (idx % 4) * tsize
    sprite.y = this.top + Math.floor(idx / 4) * tsize
    sprite.exists = Boolean(this.counts[key])

    this.sprites[key] = sprite
  }

  reset () {
    this.counts = {}
    each(this.sprites, item => {
      item.exists = false
    })
  }

  add (key) {
    this.counts[key] += 1

    if (key !== 'ic') {
      this.sprites[key].exists = true
    }
  }

  remove (key) {
    if (key !== 'key:green') {
      this.counts[key] -= 1
    }

    if (key !== 'ic' && !this.counts[key]) {
      this.sprites[key].exists = false
    }
  }

  count (key) {
    const num = this.counts[key]
    return num || 0
  }

  contains (key) {
    return this.count(key) > 0
  }
}
