import { each, extend } from 'lodash'
import config from './config.js'
import { spriteIndicesByName } from './constants.js'

const ITEMS = [
  'key:blue', 'key:green', 'key:red', 'key:yellow',
  'shoe:ice', 'shoe:water', 'shoe:force', 'shoe:fire'
]

const { tsize } = config

/*
 * A record of each item the player has collected, and the sprites to
 * display them.
 */
function Inventory (game) {
  this.group = game.add.group(undefined, 'Inventory')
  this.group.fixedToCamera = true

  this.left = 9.75 * tsize
  this.top = 7 * tsize
  this.counts = {}
  this.sprites = {}

  this.createBackground()
  ITEMS.forEach(item => this.createSprite(item))
}

extend(Inventory.prototype, {
  createBackground: function () {
    for (let row = 0; row < 2; row++) {
      for (let col = 0; col < 4; col++) {
        this.group.create(
          this.left + col * tsize,
          this.top + row * tsize,
          'sprites',
          spriteIndicesByName['floor']
        )
      }
    }
  },

  createSprite: function (spriteKey, idx) {
    this.sprites[spriteKey] = this.group.create(0, 0, 'sprites',
      spriteIndicesByName[spriteKey])

    extend(this.sprites[spriteKey], {
      x: this.left + (idx % 4) * tsize,
      y: this.top + Math.floor(idx / 4) * tsize,
      exists: false
    })
  },

  reset: function () {
    this.counts = {}
    each(this.sprites, item => { item.exists = false })
  },

  add: function (key) {
    if (!this.counts[key]) {
      this.counts[key] = 0
    }

    this.counts[key] += 1

    if (key !== 'ic') {
      this.sprites[key].exists = true
    }
  },

  remove: function (key) {
    this.counts[key] -= 1

    if (key !== 'ic' && !this.counts[key]) {
      this.sprites[key].exists = false
    }
  },

  count: function (key) {
    const num = this.counts[key]
    return num || 0
  },

  contains: function (key) {
    return this.count(key) > 0
  }
})

export default Inventory
