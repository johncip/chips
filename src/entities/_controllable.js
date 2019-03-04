import { extend } from 'lodash'

import Movable from './_movable.js'
import config from '../config.js'


function Controllable () {
  this.createCursorKeys()
  this.enableMove()
}

Controllable.extends(Movable)

extend(Controllable.prototype, {
  enableMove: function () {
    this.moveSafe = true
    // hopefully this.game works here
    this.lastMove = this.game.time.now
  },

  createCursorKeys: function () {
    // hopefully this.game works here
    const keyboard = this.game.input.keyboard

    this.cursors = keyboard.createCursorKeys()
    keyboard.onUpCallback = () => this.enableMove()

    this.enableMove()
  },

  update: function () {
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
    // hopefully this.game works here
    const now = this.game.time.now
    const waited = (now - this.lastMove) > config.moveDelay

    if (waited) {
      this.enableMove()
    }
  },

  updateCamera: function () {
    // hopefully this.game works here
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

export default Controllable
