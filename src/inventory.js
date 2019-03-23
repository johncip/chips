import { each } from 'lodash'
import config from './config'
import { spriteIndicesByName } from './constants'
import depths from './depths'

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

// TODO: extend group?

/*
 * A record of each item the player has collected, and the sprites to
 * display them.
 */
export default class Inventory {
  constructor (scene) {
    this.group = scene.add.group()

    this.left = 10 * tsize
    this.top = 7.5 * tsize
    this.counts = {}
    this.sprites = {}

    this.createBackground()

    itemKeys.forEach((key, idx) => {
      this.sprites[key] = this.createSprite(key, idx)
    })

    this.group.children.each(child => {
      child.setScrollFactor(0)
    })

    this.reset()
  }

  initCounts () {
    this.counts.ic = 0

    itemKeys.forEach(key => {
      this.counts[key] = debug ? 99 : 0
    })
  }

  // TODO: move out of class
  createBackground () {
    for (let row = 0; row < 2; row++) {
      for (let col = 0; col < 4; col++) {
        const sprite = this.group.create(
          this.left + col * tsize,
          this.top + row * tsize,
          'sprites',
          spriteIndicesByName.floor
        )
        sprite.depth = depths.inventoryBack
      }
    }
  }

  // TODO: move out of class
  createSprite (key, idx) {
    const sprite = this.group.create(0, 0, 'sprites', spriteIndicesByName[key])
    sprite.x = this.left + (idx % 4) * tsize
    sprite.y = this.top + Math.floor(idx / 4) * tsize
    sprite.depth = depths.inventoryFront
    return sprite
  }

  add (key) {
    this.counts[key] += 1

    if (key !== 'ic') {
      this.sprites[key].setVisible(true)
    }
  }

  remove (key) {
    if (key !== 'key:green') {
      this.counts[key] -= 1
    }

    if (key !== 'ic' && !this.counts[key]) {
      this.sprites[key].setVisible(false)
    }
  }

  count (key) {
    const num = this.counts[key]
    return num || 0
  }

  has (key) {
    return this.count(key) > 0
  }

  reset () {
    this.initCounts()
    each(this.sprites, (val, key) => val.setVisible(this.counts[key]))
  }
}
