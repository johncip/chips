(function (LCD, TSIZE) {
  var DisplayPanel = Chip.DisplayPanel = function () {
    this.left = 10.25 * TSIZE
    this.group = Chip.game.add.group(undefined, 'DisplayPanel')
    this.group.fixedToCamera = true

    this.createMask()

    this.levelLCD = new LCD('Level', this.left, 0, this.group)
    this.timeLCD = new LCD('Time', this.left, TSIZE * 2.25, this.group)
    this.chipsLCD = new LCD('Chips', this.left, TSIZE * 4.5, this.group)
  }

  DisplayPanel.includes({
    createMask: function () {
      var mask = Chip.game.add.graphics()
      mask.beginFill(Chip.Config.BG_COLOR, 1.0)
      mask.drawRect(9 * TSIZE, 0, 5 * TSIZE, 9 * TSIZE)

      this.group.add(mask)
    },

    setChipsLeft: function (chipsNeeded) {
      this.chipsLCD.display = chipsNeeded
    },

    setLevel: function (levelIndex) {
      this.levelLCD.display = levelIndex
    },

    setTimeLeft: function (timeLeft) {
      this.timeLCD.display = timeLeft
    }
  })
})(Chip.LCD, Chip.Config.TILE_SIZE)
