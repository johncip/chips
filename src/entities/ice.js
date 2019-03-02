(function (Entity, Mixins) {
  var RIGHT = Chip.Dir.RIGHT
  var LEFT = Chip.Dir.LEFT
  var DOWN = Chip.Dir.DOWN
  var UP = Chip.Dir.UP

  /*
   * Ice makes chip slide unless he has the skates.
   */
  var Ice = Chip.Ice = function (tile, emap) {
    Chip.Entity.call(this, tile, emap)
  }

  Ice.extends(Entity, Mixins.Floor)

  Ice.includes({
    noShoes: function (player) {
      var floor = player.entityBelow().spriteKey

      player.marchDelay = 75
      player.sliding = true
      player.frozen = true

      switch (floor) {
        case 'ice':
          player.marchDir = player.lastDir
          break
        case 'ice:ne':
          this.cornerNE(player)
          break
        case 'ice:nw':
          this.cornerNW(player)
          break
        case 'ice:se':
          this.cornerSE(player)
          break
        case 'ice:sw':
          this.cornerSW(player)
          break
        default:
          player.sliding = false
          Chip.sfx.bump()
      }
    },

    cornerSE: function (player) {
      if (player.isFacing(RIGHT)) {
        player.marchDir = UP
      } else if (player.isFacing(DOWN)) {
        player.marchDir = LEFT
      }
    },

    cornerSW: function (player) {
      if (player.isFacing(LEFT)) {
        player.marchDir = UP
      } else if (player.isFacing(DOWN)) {
        player.marchDir = RIGHT
      }
    },

    cornerNW: function (player) {
      if (player.isFacing(UP)) {
        player.marchDir = RIGHT
      } else if (player.isFacing(LEFT)) {
        player.marchDir = DOWN
      }
    },

    cornerNE: function (player) {
      if (player.isFacing(RIGHT)) {
        player.marchDir = DOWN
      } else if (player.isFacing(UP)) {
        player.marchDir = LEFT
      }
    }
  })
})(Chip.Entity, Chip.Mixins)
