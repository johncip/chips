(function(Entity, Mixins) {

  var Tank = Chip.Tank = function(tile, emap) {
    Entity.call(this, tile, emap);
    Mixins.Marchable.call(this, tile, emap);

    this.marchDir = _.clone(Chip.Dir.UP);
    this.marchDelay = 300;
  };


  Tank.extends(Entity);
  Tank.extends(Mixins.Marchable);

  Tank.includes({
    frames: {
      '0,-1': 88,
      '-1,0': 95,
      '0,1': 102,
      '1,0': 109
    },

    collideWith: function(target) {
      if (target.type === 'chip') {
        target.collideWith(this);
      } else {
        Entity.prototype.collideWith.call(this, target);
      }
    },

    march: function() {
      var dx = this.marchDir[0];
      var dy = this.marchDir[1];
      this.move(dx, dy);
    }
  });
})(Chip.Entity, Chip.Mixins);
