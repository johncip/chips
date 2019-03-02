(function () {
  /*
   * Doors can only be opened when the right key is in the inventory.
   */
  var Door = Chip.Door = function (tile, emap) {
    Chip.Entity.call(this, tile, emap)
  }

  Door.extends(Chip.Entity)

  Door.includes({

    /*
     * On collide, doors check if Chip has the right key.
     */
    collideWith: function (player) {
      var inventory = player.inventory
      var key = 'key:' + this.subtype

      if (inventory.contains(key) || Chip.Config.DEBUG) {
        this.useKey(key, inventory)
        this.moveHere(player)
      } else {
        Chip.sfx.bump()
      }
    },

    /*
     * Opens the door and removes non-green keys from inventory.
     */
    useKey: function (key, inventory) {
      this.retire()

      if (key !== 'key:green') {
        inventory.remove(key)
      }

      Chip.sfx.open()
    }
  })
})()
