(function (TILE_SIZE) {
  var LCD = Chip.LCD = function (labelText, left, top, group) {
    this.labelText = labelText
    this.left = left
    this.top = top

    this.font = Chip.game.add.retroFont('lcd', 64, 100, '0123456789', 0)
    this.group = group

    this.createLabel()
    this.createBackground()
    this.createDigits()

    this.display = 0
  }

  LCD.includes({
    createLabel: function () {
      var label = Chip.game.add.text(this.left, this.top, this.labelText, {
        font: '20px lato',
        fill: '#dde'
      })

      this.group.add(label)
    },

    createBackground: function () {
      var g = Chip.game.add.graphics()
      var padding = TILE_SIZE / 4

      var color = Chip.Config.LCD_BG_COLOR
      var left = this.left - (padding / 2)
      var top = this.top + (TILE_SIZE / 1.9) - (padding / 2)
      var width = TILE_SIZE * 3 + padding
      var height = TILE_SIZE * 1.5 + padding
      var radius = TILE_SIZE / 12

      this.roundRect(g, left, top, width, height, radius)

      this.group.add(g)
    },

    roundRect: function (g, left, top, width, height, rad) {
      g.beginFill(Chip.Config.LCD_BG_COLOR, 1.0)

      g.moveTo(left + rad, top)
      g.lineTo(left + width - rad, top)
      g.quadraticCurveTo(left + width, top, left + width, top + rad)
      g.lineTo(left + width, top + height - rad)
      g.quadraticCurveTo(left + width, top + height, left + width - rad, top + height)
      g.lineTo(left + rad, top + height)
      g.quadraticCurveTo(left, top + height, left, top + height - rad)
      g.lineTo(left, top + rad)
      g.quadraticCurveTo(left, top, left + rad, top)

      g.endFill()
    },

    createDigits: function () {
      var middle = this.top + (TILE_SIZE / 2)
      var digits = Chip.game.add.image(this.left, middle, this.font)

      this.group.add(digits)
    }
  })

  Object.defineProperty(LCD.prototype, 'display', {
    get: function () {
      return this.font.text
    },

    set: function (num) {
      this.font.text = window.sprintf('%03d', num)
    }
  })
})(Chip.Config.TILE_SIZE)
