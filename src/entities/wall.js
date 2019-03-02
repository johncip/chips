(function (Entity) {
  var Wall = Chip.Wall = function (tile, emap) {
    Chip.Entity.call(this, tile, emap)
  }

  Wall.extends(Entity)

  Wall.includes({
    collideWith: function (target) {
      if (target.type === 'chip') {
        switch (this.subtype) {
          case 'basic':
            Chip.sfx.bump()
            break
          case 'invisible':
            Chip.sfx.bump()
            break
          case 'hidden':
            Chip.sfx.bump()
            this.changeFrame('wall:basic')
            break
        }
      }
    }
  })
})(Chip.Entity)
