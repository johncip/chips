import { includes, extend } from 'lodash'

import Marchable from './marchable'
import Inventory from '../inventory'
import config from '../config'
import sfx from '../sfx'


function Player (game, tile, emap) {
  Marchable.call(this, game, tile, emap)
  this.createCursorKeys()

  this.inventory = new Inventory(this.game)
  this.marchDelay = config.floorDelay

  // exports
  emap.player = this
}

Player.FRAMES = {
  '0,-1': 90,
  '-1,0': 97,
  '0,1': 104,
  '1,0': 111
}

extend(Player.prototype, Marchable.prototype)

extend(Player.prototype, {
  march: function () {
    if (this.sliding) {
      const dx = this.marchDir[0]
      const dy = this.marchDir[1]
      this.move(dx, dy)
    }
  },

  move: function (dx, dy) {
    this.frames = Player.FRAMES
    this.game.hintPanel.hide()
    this.frozen = false
    Marchable.prototype.move.call(this, dx, dy)

    // TODO: this might apply to all movables
    this.sliding = this.shouldSlide()
  },

  shouldSlide: function () {
    const floor = this.entityBelow()
    if (!floor) {
      return false
    }

    const slippery = floor.type === 'ice' || floor.type === 'force'
    return slippery && !floor.hasShoes(this)
  },

  hasAllChips: function () {
    return this.inventory.count('ic') === this.emap.chipsNeeded
  },

  collideWith: function (target) {
    const monsters = ['bug', 'fireball', 'ball', 'glider', 'tank']

    if (includes(monsters, target.type)) {
      sfx.lose()
      this.triggerLose()
    }
  },

  destroy: function () {
    Marchable.prototype.destroy.call(this)
    this.inventory.destroy()
  },

  update: function () {
    Marchable.prototype.update.call(this)
    this.updatePosition()
    this.updateCamera()
  },

  triggerWin: function () {
    this.retire()
    const state = this.game.state.getCurrentState()
    state.win(null, 1500)
  },

  triggerLose: function () {
    this.retire()
    const state = this.game.state.getCurrentState()
    state.lose('Oops!', 1500)
  },

  createCursorKeys: function () {
    const keyboard = this.game.input.keyboard

    this.cursors = keyboard.createCursorKeys()
    keyboard.onUpCallback = () => this.enableMove()

    this.enableMove()
  },

  enableMove: function () {
    this.moveSafe = true
    this.lastMove = this.game.time.now
  },

  updatePosition: function () {
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
  },

  updateThrottle: function () {
    const now = this.game.time.now
    const waited = (now - this.lastMove) > config.moveDelay

    if (waited) {
      this.enableMove()
    }
  },

  updateCamera: function () {
    const game = this.game

    let cx = this.sprite.x - 4 * config.tsize
    let cy = this.sprite.y - 4 * config.tsize

    if (cx < 0) {
      cx = 0
    }

    if (cy < 0) {
      cy = 0
    }

    if (cx > game.world.width - 9 * config.tsize) {
      cx = game.world.width - 9 * config.tsize
    }

    if (cy > game.world.height - 9 * config.tsize) {
      cy = game.world.height - 9 * config.tsize
    }

    game.camera.view.x = cx
    game.camera.view.y = cy
  }
})

export default Player
