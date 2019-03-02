(function (Entity) {
  var Button = Chip.Button = function (tile, emap) {
    Entity.call(this, tile, emap);
    this.target = null;
  };

  Button.extends(Entity);

  Button.includes({
    collideWith: function (target) {
      Chip.sfx.press();
      this.moveHere(target);

      switch (this.subtype) {
      case 'blue':
        return this.moveTanks();
      case 'green':
        return this.toggleTheWalls();
      case 'brown':
        return this.target.open();
      case 'red':
        return this.target.clone();
      }
    },

    moveTanks: function () {
      this.emap.eachOfType('tank', function (tank) {
        tank.marchDir = _.clone(tank.marchDir);
        tank.marchDir[0] *= -1;
        tank.marchDir[1] *= -1;
      });
    },

    toggleTheWalls: function () {
      this.emap.eachOfType('togglewall', function (wall) {
        wall.toggle();
      });
    }
  });
})(Chip.Entity);
