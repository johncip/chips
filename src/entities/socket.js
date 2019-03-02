(function(Config, Entity) {

  /*
   * The socket is a special door which can only be opened by collecting
   * all of the chips.
   */
  var Socket = Chip.Socket = function(tile, emap) {
    Entity.call(this, tile, emap);
  };

  Socket.extends(Entity);

  Socket.includes({
    collideWith: function(player) {
      if (player.hasAllChips() || Config.DEBUG) {
        this.openUp(player);
      } else {
        Chip.sfx.bump();
      }
    },

    openUp: function(player) {
      this.retire();
      Chip.sfx.open();
      this.moveHere(player);
    },

  });
})(Chip.Config, Chip.Entity);
