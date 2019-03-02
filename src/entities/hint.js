/*
 * The hint tile offers a hint when the player steps on it.
 */
var Hint = Chip.Hint = function (tile, emap) {
  Chip.Entity.call(this, tile, emap);
  this.isFlat = true;
};

Hint.extends(Chip.Entity);

Hint.includes({
  collideWith: function (target) {
    this.moveHere(target);
    Chip.game.hintPanel.show();
  }
});
