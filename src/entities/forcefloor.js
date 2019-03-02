(function (Entity, Mixins) {
  var RIGHT = Chip.Dir.RIGHT
  var LEFT = Chip.Dir.LEFT
  var DOWN = Chip.Dir.DOWN
  var UP = Chip.Dir.UP

  /*
   * Force floors push Chip unless he has the suction boots.
   */
  var ForceFloor = Chip.ForceFloor = function (tile, emap) {
    Chip.Entity.call(this, tile, emap)
  }

  ForceFloor.extends(Entity, Mixins.Floor)

  ForceFloor.includes({
    noShoes: function (player) {
      switch (this.subtype) {
        case 'left':
          player.marchDir = LEFT
          break
        case 'right':
          player.marchDir = RIGHT
          break
        case 'up':
          player.marchDir = UP
          break
        case 'down':
          player.marchDir = DOWN
          break
        case 'random':
        // TODO: random
          break
      }
    }
  })
})(Chip.Entity, Chip.Mixins)
