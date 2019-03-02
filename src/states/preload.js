(function (Config, SPRITE_SHEET, TILE_SIZE) {
  var IMAGES = {
    black: 'assets/images/black.png',
    boxart: 'assets/images/boxart.jpg',
    inventorybg: 'assets/images/inventorybg.png',
    lcd: 'assets/fonts/lcd.png',
    tiles: SPRITE_SHEET,
  };

  var Preload = Chip.Preload = function () {};

  Preload.includes({
    preload: function () {
      this.game.plugins.add(new Phaser.Plugin.SaveCPU(this.game));
      this.game.stage.backgroundColor = Config.BG_COLOR;
      this.load.spritesheet('sprites', SPRITE_SHEET, TILE_SIZE, TILE_SIZE, 112);

      _.each(IMAGES, this.loadImage, this);
      _.each(Chip.LEVELS, this.loadTilemap, this);
    },

    loadTilemap: function (name) {
      var path = 'assets/tilemaps/' + name + '.json';
      var format = Phaser.Tilemap.TILED_JSON;
      this.load.tilemap(name, path, null, format);
    },

    loadImage: function (fname, key) {
      this.load.image(key, fname);
    },

    create: function () {
      this.state.start(Chip.Config.START_STATE);
    },
  });

})(Chip.Config, Chip.Config.SPRITE_SHEET, Chip.Config.TILE_SIZE);
