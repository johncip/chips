(function (Entity) {

  var BlueWall = Chip.BlueWall = function (tile, emap) {
    Chip.Entity.call(this, tile, emap);
  };

  BlueWall.extends(Entity);

  BlueWall.includes({
    collideWith: function (target) {
      if (target.type === 'chip') {
        switch (this.subtype) {
        case 'fake':
          this.retire();
          this.moveHere(target);
          break;
        case 'real':
          var wall = this.replaceWith('wall:basic', false);
          wall.collideWith(target);
          break;
        }
      }
    },
  });
})(Chip.Entity);
