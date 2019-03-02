(function(Entity, Mixins, Dir) {

  var Glider = Chip.Glider = function(tile, emap) {
    Chip.Entity.call(this, tile, emap);
    Chip.Mixins.Marchable.call(this);
    this.lastDir = [0, -1]; // TODO: set based on frame
    this.marchDelay = 300;
  };

  Glider.extends(Entity);
  Glider.extends(Mixins.Movable);
  Glider.extends(Mixins.Marchable);

  Glider.includes({

    frames: {
      '0,-1': 5,
      '-1,0': 12,
      '0,1': 19,
      '1,0': 26
    },

    march: function() {
      var fwdNeighbor = this.neighbor(Dir.UP);

      if (fwdNeighbor && fwdNeighbor.type === 'wall') {
        this.turnAndMove(3);
      } else {
        this.moveForward();
      }
    },

    collideWith: function(target) {
      if (target.type === 'player') {
        target.collideWith(this);
      } else if (target.type === 'bomb') {
        this.retire();
        target.retire();
      }
    }
  });
})(Chip.Entity, Chip.Mixins, Chip.Dir);
