(function(Entity) {

  var Bomb = Chip.Bomb = function(tile, emap) {
    Chip.Entity.call(this, tile, emap);
  };

  Bomb.extends(Entity);

  Bomb.includes({
    collideWith: function (target) {
      if (target.type === 'chip') {
        Chip.sfx.explode();
        target.triggerLose();
      } else {
        target.retire();
        this.retire();
      }
    }
  });
})(Chip.Entity);
