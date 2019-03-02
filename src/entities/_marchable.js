(function (Movable, MOVE_DIRS) {

  /*
   * Marchable entities can be moved one tile according to their AI on a
   * specific time increment.
   *
   * Marchable depends on Movable.
   */
  var Marchable = Chip.Mixins.Marchable = function () {
    Movable.call(this);
    this.timeSinceTick = 0;
    this.marchDelay = Chip.Config.MOVE_DELAY;
  };

  Marchable.extends(Chip.Mixins.Movable);

  Marchable.includes({
    update: function () {
      this.timeSinceTick += Chip.game.time.elapsed;

      if (this.timeSinceTick > this.marchDelay) {
        this.march();
        this.timeSinceTick -= this.marchDelay;
      }
    },

    hasNeighbor: function (dir) {
      return !!this.neighbor(dir);
    },

    neighbor: function (dir) {
      var absDir = this.toAbsolute(dir);
      var x2 = this.x + absDir[0];
      var y2 = this.y + absDir[1];
      return this.emap.get(x2, y2);
    },

    /*
     * changes a relative direction (forward) to an absolute one (north)
     */
    toAbsolute: function (dir) {
      var lastDirIndex = this.findDirIndex(this.lastDir);
      return this.rotateDir(dir, lastDirIndex);
    },

    rotateDir: function (dir, turns) {
      var idx = this.findDirIndex(dir);
      return MOVE_DIRS[(idx + turns) % 4];
    },

    findDirIndex: function (dir) {
      var res = _.findIndex(MOVE_DIRS, function (item) {
        return dir[0] === item[0] && dir[1] === item[1];
      });

      if (res === -1) {
        throw 'Not a valid direction.';
      }

      return res;
    },

    turnAndMove: function (turns) {
      var dir = this.rotateDir(this.lastDir, turns);
      this.move(dir[0], dir[1]);
    },

    moveForward: function () {
      this.move(this.lastDir[0], this.lastDir[1]);
    },
  });

})(Chip.Mixins.Movable, Chip.Dir.MOVE_DIRS);
