(function (Entity, Mixins) {
  /*
   * Water kills Chip unless he has the right footgear.
   * When dirt collides with water, they make mud.
   */
  var Water = Chip.Water = function (tile, emap) {
    Chip.Entity.call(this, tile, emap);
    this.isFlat = true;
  };

  Water.extends(Entity, Mixins.Floor);

  Water.includes({
    /*
     * On collide with player, player loses.
     * On collide with block, dirt gets made.
     */
    collideWith: function (target) {
      if (target.type === 'chip') {
        Mixins.Floor.prototype.collideWith.call(this, target);

        target.frames = {
          '0,-1': 87,
          '-1,0': 94,
          '0,1': 101,
          '1,0': 108
        };
        target.changeFrameDir(target.lastDir);

      } else if (target.type === 'fireball') {
        target.retire();
      } else if (target.type === 'block') {
        this.makeDirt(target);
      }
    },

    makeDirt: function (target) {
      target.retire();
      this.replaceWith('dirt');
    },

    noShoes: function (player) {
      Chip.sfx.splash();
      this.changeFrame('splash');
      player.triggerLose();
    }
  });

})(Chip.Entity, Chip.Mixins);
