(function(Entity) {

  var Trap = Chip.Trap = function(tile, emap) {
    Chip.Entity.call(this, tile, emap);
  };

  Trap.extends(Entity);

  Trap.includes({
    collideWith: function (target) {
      this.moveHere(target);

      if (this.subtype === 'closed') {
        target.frozen = true;
      }
    },

    open: function() {
      this.subtype = 'open';
      this.spriteKey = 'trap:open';
      this.changeFrame(this.spriteKey);

      var above = this.entityAbove();

      if (above) {
        above.frozen = false;
      }
    },

    close: function() {
      this.subtype = 'closed';
      this.spriteKey = 'trap:closed';
      this.changeFrame(this.spriteKey);

      var above = this.entityAbove();
      if (above) {
        above.frozen = true;
      }
    },
  });
})(Chip.Entity);
