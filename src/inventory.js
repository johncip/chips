(function (TILE_SIZE) {
  var ITEMS = [
    'key:blue', 'key:green', 'key:red', 'key:yellow',
    'shoe:ice', 'shoe:water', 'shoe:force', 'shoe:fire'
  ]

  /*
   * A record of each item the player has collected, and the sprites to
   * display them.
   */
  var Inventory = Chip.Inventory = function () {
    this.group = Chip.game.add.group(undefined, 'Inventory')
    this.group.fixedToCamera = true

    this.left = 9.75 * TILE_SIZE
    this.top = 7 * TILE_SIZE
    this.counts = {}
    this.sprites = {}

    this.createBackground()
    ITEMS.forEach(this.createSprite.bind(this))
  }

  Inventory.includes({

    createBackground: function () {
      for (var row = 0; row < 2; row++) {
        for (var col = 0; col < 4; col++) {
          this.group.create(
            this.left + col * TILE_SIZE,
            this.top + row * TILE_SIZE,
            'sprites',
            Chip.SPRITE_INDICES['floor']
          )
        }
      }
    },

    createSprite: function (spriteKey, idx) {
      this.sprites[spriteKey] = this.group.create(0, 0, 'sprites',
        Chip.SPRITE_INDICES[spriteKey])

      _.extend(this.sprites[spriteKey], {
        x: this.left + (idx % 4) * TILE_SIZE,
        y: this.top + Math.floor(idx / 4) * TILE_SIZE,
        exists: false
      })
    },

    reset: function () {
      this.counts = {}

      _.each(this.sprites, function (item) {
        item.exists = false
      })
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
      var num = this.counts[key]
      return num || 0
    },

    contains: function (key) {
      return this.count(key) > 0
    }
  })
})(Chip.Config.TILE_SIZE)
