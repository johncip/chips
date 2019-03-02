(function (Entity, Mixins, TILE_SIZE) {
  var Player = Chip.Player = function (tile, emap) {
    Entity.call(this, tile, emap);
    Mixins.Marchable.call(this);
    Mixins.Controllable.call(this);

    this.inventory = new Chip.Inventory();
    this.marchDelay = Chip.Config.FLOOR_DELAY;

    // exports
    emap.player = this;
  };

  Player.FRAMES = {
    '0,-1': 90,
    '-1,0': 97,
    '0,1': 104,
    '1,0': 111
  };

  Player.extends(Entity);
  Player.extends(Mixins.Movable);
  Player.extends(Mixins.Marchable);
  Player.extends(Mixins.Controllable);

  Player.includes({
    march: function () {
      if (this.sliding) {
        var dx = this.marchDir[0];
        var dy = this.marchDir[1];
        this.move(dx, dy);
      }
    },

    move: function (dx, dy) {
      this.frames = Player.FRAMES;
      Chip.game.hintPanel.hide();

      this.frozen = false;

      Mixins.Movable.prototype.move.call(this, dx, dy);

      // TODO: this might apply to all movables
      this.sliding = this.shouldSlide();
    },

    shouldSlide: function () {
      var floor = this.entityBelow();
      if (!floor) {
        return false;
      }

      var slippery = floor.type === 'ice' || floor.type === 'force';
      return slippery && !floor.hasShoes(this);
    },

    hasAllChips: function () {
      return this.inventory.count('ic') === this.emap.chipsNeeded;
    },

    collideWith: function (target) {
      var monsters = ['bug', 'fireball', 'ball', 'glider', 'tank'];

      if (_.contains(monsters, target.type)) {
        Chip.sfx.lose();
        this.triggerLose();
      }
    },

    destroy: function () {
      Entity.prototype.destroy.call(this);
      this.inventory.destroy();
    },

    update: function () {
      Mixins.Marchable.prototype.update.call(this);
      Mixins.Controllable.prototype.update.call(this);
      this.updateCamera();
    },

    triggerWin: function () {
      this.retire();
      var state = Chip.game.state.getCurrentState();
      state.win(null, 1500);
    },

    triggerLose: function () {
      this.retire();
      var state = Chip.game.state.getCurrentState();
      state.lose('Oops!', 1500);
    }
  });

})(Chip.Entity, Chip.Mixins, Chip.Config.TILE_SIZE);
