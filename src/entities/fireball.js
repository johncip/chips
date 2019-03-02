(function (Entity, Marchable, Dir) {
  var Fireball = Chip.Fireball = function (tile, emap) {
    Entity.call(this, tile, emap)
    Marchable.call(this)

    this.lastDir = _.clone(Dir.LEFT)
  }

  Fireball.extends(Entity)
  Fireball.extends(Marchable)

  Fireball.includes({
    frames: {
      '0,-1': 32,
      '-1,0': 39,
      '0,1': 46,
      '1,0': 53
    },

    collideWith: function (target) {
      if (target.type === 'chip') {
        target.collideWith(this)
      }
    },

    march: function () {
      this.moveForward()
    }
  })
})(Chip.Entity, Chip.Mixins.Marchable, Chip.Dir)
