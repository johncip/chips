(function (Entity, Movable) {
  /*
   * Blocks can be pushed. They become dirt after colliding with water.
   */
  var Block = Chip.Block = function (tile, emap) {
    Chip.Entity.call(this, tile, emap)
  }

  Block.extends(Entity)
  Block.extends(Movable)

  Block.includes({
    frames: {
      '0,-1': 1,
      '-1,0': 1,
      '0,1': 1,
      '1,0': 1
    },

    /*
     * Blocks gets pushed on collide, depending on neighbors.
     */
    collideWith: function (target) {
      if (target.type === 'chip') {
        var dir = target.lastDir
        var dx = dir[0]
        var dy = dir[1]

        if (!this.isPushable(dx, dy)) {
          Chip.sfx.bump()
        } else {
          var oldX = this.x
          var oldY = this.y
          this.move(dx, dy)
          target.move(dx, dy)
        }
      }
    },

    /*
     * Blocks are only pushable if there's nothing in the way, or something
     * "flat" in the way.
     */
    isPushable: function (dx, dy) {
      var resident = this.emap.get(this.x + dx, this.y + dy)
      return resident === undefined || resident.isFlat
    }
  })
})(Chip.Entity, Chip.Mixins.Movable)
