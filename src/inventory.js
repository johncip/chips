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

/*
 * A record of each item the player has collected, and the sprites to
 * display them.
 */
export default class Inventory {
  constructor (scene) {
    const group = scene.add.group()
    const left = 10 * tsize
    const top = 7.5 * tsize

    this.counts = {}
    this.sprites = {}

    createBackground(group, left, top)

    itemKeys.forEach((key, idx) => {
      this.sprites[key] = createSprite(group, key, idx, left, top)
    })

    this.reset()
  }

  initCounts () {
    this.counts.ic = 0

    itemKeys.forEach(key => {
      this.counts[key] = debug ? 99 : 0
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

  has (key) {
    return this.count(key) > 0
  }

  reset () {
    this.initCounts()
    each(this.sprites, (val, key) => val.setVisible(this.counts[key]))
  }
}

function createBackground (group, x, y) {
  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 4; col++) {
      const sprite = group.create(
        x + col * tsize,
        y + row * tsize,
        'sprites',
        spriteIndicesByName.floor
      )
      sprite.depth = depths.inventoryBack
    }
  }
}

function createSprite (group, key, index, x, y) {
  const sprite = group.create(0, 0, 'sprites', spriteIndicesByName[key])
  sprite.x = x + (index % 4) * tsize
  sprite.y = y + Math.floor(index / 4) * tsize
  sprite.depth = depths.inventoryFront
  return sprite
}
