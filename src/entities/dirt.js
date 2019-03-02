/*
 * Dirt is produced when blocks and water collide. It disappears when Chip
 * collides with it.
 */
var Dirt = Chip.Dirt = function (tile, emap) {
  Chip.Entity.call(this, tile, emap);
};

Dirt.extends(Chip.Entity);

Dirt.includes({
  collideWith: function (player) {
    this.retire();
    this.moveHere(player);
  }
});
