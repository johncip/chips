(function () {
  /*
   * A Collectible entity can be put into inventory.
   * ICs, shoes, and keys are collectible.
   */
  var Collectible = Chip.Collectible = function (tile, emap) {
    Chip.Entity.call(this, tile, emap)
  }

  Collectible.extends(Chip.Entity)

  Collectible.includes({
    /*
     * On collide, collectibles move from the map to the inventory.
     */
    collideWith: function (player) {
      player.inventory.add(this.spriteKey)
      Chip.sfx.collect()
      this.moveHere(player)

      setTimeout(function () {
        this.retire()
      }.bind(this), 75)
    }
  })
})()
