var Chip = Chip || {};

Phaser.Sprite.prototype.bringToFront = function () {
  if (this.parent) {
    var parent = this.parent;
    parent.removeChild(this);
    parent.addChild(this);
  }
};

Phaser.Group.includes({
  promote: function () {
    this.game.world.bringToTop(this);
  },

  hide: function () {
    this.forEach(function (item) {
      item.exists = false;
    });
  },

  show: function () {
    this.forEach(function (item) {
      item.exists = true;
    });
  }
});

Chip.start = function (canvasParentId) {
  Chip.game = new Phaser.Game(Chip.Config.WIDTH, Chip.Config.HEIGHT,
    Phaser.AUTO, canvasParentId, null);

  Chip.game.state.add('Preload', Chip.Preload);
  Chip.game.state.add('MainMenu', Chip.MainMenu);
  Chip.game.state.add('Playing', Chip.Playing);
  Chip.game.state.start('Preload');
};
