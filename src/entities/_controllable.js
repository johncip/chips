var Controllable = Chip.Mixins.Controllable = function () {
  this.createCursorKeys()
  this.enableMove()
}

Controllable.extends(Chip.Mixins.Movable)

Controllable.includes({
  enableMove: function () {
    this.moveSafe = true
    this.lastMove = Chip.game.time.now
  },

  createCursorKeys: function () {
    var keyboard = Chip.game.input.keyboard

    this.cursors = keyboard.createCursorKeys()
    keyboard.onUpCallback = this.enableMove.bind(this)

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
    var now = Chip.game.time.now
    var waited = (now - this.lastMove) > Chip.Config.MOVE_DELAY

    if (waited) {
      this.enableMove()
    }
  },

  updateCamera: function () {
    var game = Chip.game
    var TSZ = Chip.Config.TILE_SIZE

    var cx = this.sprite.x - 4 * TSZ
    var cy = this.sprite.y - 4 * TSZ

    if (cx < 0) {
      cx = 0
    }

    if (cy < 0) {
      cy = 0
    }

    if (cx > game.world.width - 9 * TSZ) {
      cx = game.world.width - 9 * TSZ
    }

    if (cy > game.world.height - 9 * TSZ) {
      cy = game.world.height - 9 * TSZ
    }

    game.camera.view.x = cx
    game.camera.view.y = cy
  }
})
