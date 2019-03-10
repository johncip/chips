import { includes } from 'lodash'

import Marchable from './marchable'
import Inventory from '../inventory'
import config from '../config'
import sfx from '../sfx'

const FRAMES = {
  '0,-1': 90,
  '-1,0': 97,
  '0,1': 104,
  '1,0': 111
}

export default class Player extends Marchable {
  constructor (game, tile, emap) {
    super(game, tile, emap)
    this.createCursorKeys()

    this.inventory = new Inventory(this.game)
    this.marchDelay = config.floorDelay

    // exports
    emap.player = this
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
    this.game.hintPanel.hide()
    this.frozen = false
    super.move.call(this, dx, dy)

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
    return this.inventory.count('ic') === this.emap.chipsNeeded
  }

  collideWith (target) {
    const monsters = ['bug', 'fireball', 'ball', 'glider', 'tank']

    if (includes(monsters, target.type)) {
      sfx.lose()
      this.triggerLose()
    }
  }

  destroy () {
    super.destroy.call(this)
    this.inventory.destroy()
  }

  update () {
    super.update.call(this)
    this.updatePosition()
    this.updateCamera()
  }

  triggerWin () {
    this.retire()
    const state = this.game.state.getCurrentState()
    state.win(null, 1500)
  }

  triggerLose () {
    this.retire()
    const state = this.game.state.getCurrentState()
    state.lose('Oops!', 1500)
  }

  createCursorKeys () {
    const keyboard = this.game.input.keyboard

    this.cursors = keyboard.createCursorKeys()
    keyboard.onUpCallback = () => this.enableMove()

    this.enableMove()
  }

  enableMove () {
    this.moveSafe = true
    this.lastMove = this.game.time.now
  }

  updatePosition () {
    this.updateThrottle()

    if (!this.exists() || !this.moveSafe || this.frozen) {
      return
    }

    if (this.cursors.up.isDown) {
      this.move(0, -1)
      this.moveSafe = false
    }
    if (this.cursors.left.isDown) {
      this.move(-1, 0)
      this.moveSafe = false
    }
    if (this.cursors.down.isDown) {
      this.move(0, 1)
      this.moveSafe = false
    }
    if (this.cursors.right.isDown) {
      this.move(1, 0)
      this.moveSafe = false
    }
  }

  updateThrottle () {
    const now = this.game.time.now
    const waited = (now - this.lastMove) > config.moveDelay

    if (waited) {
      this.enableMove()
    }
  }

  updateCamera () {
    const game = this.game

    let cx = this.sprite.x - 4 * config.tsize
    let cy = this.sprite.y - 4 * config.tsize

    if (cx < 0) { cx = 0 }

    if (cy < 0) { cy = 0 }

    if (cx > game.world.width - 9 * config.tsize) {
      cx = game.world.width - 9 * config.tsize
    }

    if (cy > game.world.height - 9 * config.tsize) {
      cy = game.world.height - 9 * config.tsize
    }

    game.camera.view.x = cx
    game.camera.view.y = cy
  }
}
