(function (Config) {
  /*
   * Mixin for floor types (fire, water, ice, force floor).
   * Expects the presence of an this.noShoes function, which
   */
  var Floor = Chip.Mixins.Floor = function () {}

  Floor.includes({
    collideWith: function (target) {
      if (target.type === 'chip') {
        this.moveHere(target)

        if (!this.hasShoes(target) && !Config.DEBUG) {
          this.noShoes(target)
        }
      }
    },

    hasShoes: function (player) {
      // TODO: move this to the player
      var shoe = 'shoe:' + this.type
      return player.inventory.contains(shoe)
    },

    noShoes: function (player) {

    }
  })
})(Chip.Config)
