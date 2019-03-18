import { includes } from 'lodash'
import Inventory from '../inventory'
import config from '../config'
import depths from '../depths'
import sfx from '../sfx'
import Marchable from './marchable'

const FRAMES = {
  '0,-1': 90,
  '-1,0': 97,
  '0,1': 104,
  '1,0': 111
}

export default class Player extends Marchable {
  constructor (scene, tile, entityMap) {
    super(scene, tile, entityMap)

    this.cursors = this.scene.input.keyboard.createCursorKeys()
    this.inventory = new Inventory(this.scene)
    this.marchDelay = config.floorDelay
    this.sprite.depth = depths.chip

    // exports
    entityMap.player = this // TODO: don't do this here
  }

  march () {
    if (this.sliding) {
      const dx = this.marchDir[0]
      const dy = this.marchDir[1]
      this.move(dx, dy)
    }
  }

  move (dx, dy) {
    this.frames = FRAMES
    this.scene.hintOverlay.hide() // TODO: this should not be in player.js
    this.frozen = false
    super.move(dx, dy)

    // TODO: this might apply to all movables
    this.sliding = this.shouldSlide()
  }

  shouldSlide () {
    const floor = this.entityBelow()
    if (!floor) {
      return false
    }

    const slippery = floor.type === 'ice' || floor.type === 'force'
    return slippery && !floor.hasShoes(this)
  }

  hasAllChips () {
    return this.inventory.count('ic') === this.entityMap.chipsNeeded
  }

  collideWith (target) {
    const monsters = ['bug', 'fireball', 'ball', 'glider', 'tank']

    if (includes(monsters, target.type)) {
      sfx.lose()
      this.triggerLose()
    }
  }

  destroy () {
    super.destroy()
    this.inventory.destroy()
  }

  update () {
    super.update()
    this.checkCursorKeys()
    this.updateCamera()
  }

  // TODO: move to playing.js
  triggerWin () {
    this.retire()
    this.scene.win('Yowzer! You win!', 1500)
  }

  // TODO: move to playing.js
  triggerLose () {
    this.retire()
    this.scene.lose('Oops!', 1500)
  }

  checkCursorKeys () {
    if (this.frozen) return

    const { keyboard } = this.scene.input
    const { up, down, left, right } = this.cursors
    const delay = 250 // TODO: config.floorDelay?

    if (keyboard.checkDown(up, delay)) {
      this.move(0, -1)
    }

    if (keyboard.checkDown(left, delay)) {
      this.move(-1, 0)
    }

    if (keyboard.checkDown(down, delay)) {
      this.move(0, 1)
    }

    if (keyboard.checkDown(right, delay)) {
      this.move(1, 0)
    }
  }

  updateCamera () {
    const { x, y } = this.sprite
    const { tsize } = config
    const camera = this.scene.cameras.main
    camera.centerOn(x, y + tsize / 2)
  }
}
