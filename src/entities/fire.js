(function () {
  /*
   * Doors can only be opened when the right key is in the inventory.
   */
  var Fire = Chip.Fire = function (tile, emap) {
    Chip.Entity.call(this, tile, emap)
    this.burn = this.sprite.animations.add('burn', [31, 38])
  }

  Fire.BURN_FPS = 2

  Fire.extends(Chip.Entity)
  Fire.extends(Chip.Mixins.Floor)

  Fire.includes({
    collideWith: function (target) {
      Chip.Mixins.Floor.prototype.collideWith.call(this, target)

      if (target.type === 'fireball') {
        this.moveHere(target)
      }
    },

    noShoes: function (player) {
      this.burn.play(Fire.BURN_FPS, false)
      Chip.sfx.splash()
      player.triggerLose()
    }
  })
})()
