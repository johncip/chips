(function () {
  var ToggleWall = Chip.ToggleWall = function (tile, emap) {
    Chip.Entity.call(this, tile, emap);
  };

  ToggleWall.extends(Chip.Entity);

  ToggleWall.includes({

    collideWith: function (target) {
      if (this.subtype === 'open') {
        this.moveHere(target);
      } else {
        Chip.sfx.bump();
      }
    },

    toggle: function() {
      this.subtype = (this.subtype === 'open') ? 'closed' : 'open';
      this.changeFrame(this.type + ':' + this.subtype);
    },
  });
})();
