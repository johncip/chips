var Level = Chip.Level = function (index) {
  this.shortName = Chip.LEVELS[index];

  this.tilemap = this.createTilemap();
  this.bgLayer = this.tilemap.createLayer('bg');
  this.lowerLayer = this.tilemap.createLayer('lower');
  this.upperLayer = this.tilemap.createLayer('upper');

  this.entityMap = new Chip.EntityMap(this.upperLayer, this.lowerLayer);

  this.inventory = this.entityMap.player.inventory;

  this.bgLayer.resizeWorld();
  this.lowerLayer.exists = false;
  this.upperLayer.exists = false;
};

Level.includes({
  createTilemap: function() {
    var tilemap = Chip.game.add.tilemap(this.shortName);
    tilemap.addTilesetImage('chip-felix', 'tiles');
    return tilemap;
  },

  destroy: function() {
    this.entityMap.group.destroy();
    this.inventory.group.destroy();
    this.bgLayer.destroy();
    this.lowerLayer.destroy();
    this.upperLayer.destroy();
    this.tilemap.destroy();
  },

  update: function() {
    this.entityMap.update();
  },

  getTimeAllowed: function() {
    return _.parseInt(this.tilemap.properties.time);
  },

  getChipsNeeded: function() {
    return this.entityMap.chipsNeeded;
  },

  getHint: function() {
    return 'HINT\n\n' + this.tilemap.properties.hint;
  }
});
