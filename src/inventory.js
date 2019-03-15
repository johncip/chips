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

/*
 * A record of each item the player has collected, and the sprites to
 * display them.
 */
export default class Inventory {
  constructor (scene) {
    this.group = scene.add.group()

    // this.left = 9.75 * tsize
    // this.top = 7 * tsize
    this.left = 10.25 * tsize
    this.top = 7.5 * tsize
    this.counts = {}
    this.sprites = {}

    this.createBackground()
    itemKeys.forEach((key, idx) => {
      this.counts[key] = debug ? 99 : 0
      this.createItem(key, idx)
    })
    this.counts.ic = 0

    this.group.children.each(child => {
      child.setScrollFactor(0)
    })
  }

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

  createItem (key, idx) {
    const sprite = this.group.create(0, 0, 'sprites', spriteIndicesByName[key])

    sprite.x = this.left + (idx % 4) * tsize
    sprite.y = this.top + Math.floor(idx / 4) * tsize
    sprite.setVisible(this.counts[key])
    sprite.depth = depths.inventoryFront

    this.sprites[key] = sprite
  }

  reset () {
    this.counts = {}
    this.sprites.forEach(item => {
      item.setVisible(false)
    })
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

  contains (key) {
    return this.count(key) > 0
  }

  each (fn) {
    this.group.children.each(child => fn(child))
  }
}
