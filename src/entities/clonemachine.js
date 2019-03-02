(function (Entity) {
  var CloneMachine = Chip.CloneMachine = function (tile, emap) {
    Chip.Entity.call(this, tile, emap)
    this.template = null // set later by entityMap
  }

  CloneMachine.extends(Entity)

  CloneMachine.includes({
    clone: function () {
      this.emap.createUpper({
        x: this.x,
        y: this.y,
        index: Chip.SPRITE_INDICES[this.template] + 1
      })
    }
  })
})(Chip.Entity)
