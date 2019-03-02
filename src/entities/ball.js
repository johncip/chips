(function (Entity, Marchable, Dir) {
  var Ball = Chip.Ball = function (tile, emap) {
    Chip.Entity.call(this, tile, emap)
    Chip.Mixins.Marchable.call(this, tile, emap)

    this.lastDir = _.clone(Dir.RIGHT) // TODO: set based on frame
  }

  Ball.extends(Entity)
  Ball.extends(Marchable)

  Ball.includes({
    frames: {
      '0,-1': 60,
      '-1,0': 67,
      '0,1': 74,
      '1,0': 81
    },

    collideWith: function (target) {
      if (target.type === 'chip') {
        target.collideWith(this)
      }
    },

    march: function () {
      var obstacle = this.neighbor(Dir.FWD)

      if (!obstacle) {
        this.moveForward()
      } else if (obstacle.type === 'wall') {
        this.turnAndMove(2)
      } else if (obstacle.type === 'togglewall' && obstacle.subtype === 'closed') {
        this.turnAndMove(2)
      } else {
        this.moveForward()
      }
    }
  })
})(Chip.Entity, Chip.Mixins.Marchable, Chip.Dir)
