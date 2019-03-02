(function (TILE_SIZE) {
  /*
   * A game Entity is an item on the tile map -- it could be a wall,
   * a key, a monster, etc.
   */
  var Entity = Chip.Entity = function (tile, emap) {
    this.emap = emap;
    this.isFlat = false;
    this.x = tile.x;
    this.y = tile.y;

    this.spriteKey = Chip.INDEX_SPRITES[tile.index - 1];

    var parts = this.spriteKey.split(':');
    this.type = parts[0];
    this.subtype = parts[1];

    this.sprite = this.emap.group.create(
      tile.x * TILE_SIZE,
      tile.y * TILE_SIZE,
      'sprites',
      tile.index - 1
    );
  };

  var classMap = {
    key: 'Collectible',
    shoe: 'Collectible',
    ic: 'Collectible',
    force: 'ForceFloor',
    chip: 'Player',
    clonemachine: 'CloneMachine',
    togglewall: 'ToggleWall',
    bluewall: 'BlueWall',
  };

  Entity.getConstructor = function (prefix) {
    return classMap[prefix] || prefix.toTitleCase();
  };

  /*
   * Creates an entity with class based on the type of the given tile.
   * Defaults to Chip.Entity.
   */
  Entity.fromTile = function (tile, emap) {
    var key = Chip.INDEX_SPRITES[tile.index - 1];
    if (!key) {
      throw new Error('no tile for: ' + (tile.index - 1));
    }

    var prefix = key.split(':')[0];
    var constructor = Entity.getConstructor(prefix);

    if (!Chip[constructor]) {
      throw new Error('not a constructor: ' + constructor);
    }

    return new Chip[constructor](tile, emap);
  };

  Entity.extends(Chip.Mixins.Collidable);

  Entity.includes({
    retire: function () {
      this.sprite.exists = false;
    },

    update: function () {
      return;
    },

    reset: function () {
      this.timeSinceTick = 0;
    },

    exists: function () {
      return this.sprite.exists;
    },

    replaceWith: function(type, isUpper) {
      var tile = {
        x: this.x,
        y: this.y,
        index: Chip.SPRITE_INDICES[type] + 1
      };
      var createFunc = isUpper ? 'createUpper' : 'createLower';

      this.retire();
      return this.emap[createFunc](tile);
    },

    changeFrame: function (frame) {
      if (isNaN(frame)) {
        this.sprite.frame = Chip.SPRITE_INDICES[frame];
      } else {
        this.sprite.frame = frame;
      }
    },

    entityAbove: function () {
      return this.emap.getUpper(this.x, this.y);
    },

    entityBelow: function () {
      return this.emap.getLower(this.x, this.y);
    },

    moveHere: function (entity) {
      this.emap.moveEntityAbs(entity, this.x, this.y);
    },

    spriteTo: function(tileX, tileY) {
      var x = tileX * TILE_SIZE;
      var y = tileY * TILE_SIZE;

      if (Chip.Config.animateMoves) {
        var duration = Chip.Config.FLOOR_DELAY * 1.1;
        var tween = Chip.game.add.tween(this.sprite).to({
          x: x,
          y: y
        }, duration, Phaser.Easing.Quadratic.Out, true);
      } else {
        this.sprite.x = x;
        this.sprite.y = y;
      }
    },

    destroy: function () {
      this.sprite.destroy();
    },
  });

})(Chip.Config.TILE_SIZE);
