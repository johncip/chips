import { extend } from 'lodash'
import config from './config.js'
import LCD from './lcd.js'

function DisplayPanel (game) {
  const { tsize } = config
  this.game = game
  this.left = 10.25 * tsize
  this.group = game.add.group(undefined, 'DisplayPanel')
  this.group.fixedToCamera = true

  this.createMask()

  this.levelLcd = new LCD(game, 'Level', this.left, 0, this.group)
  this.timeLcd = new LCD(game, 'Time', this.left, tsize * 2.25, this.group)
  this.chipsLcd = new LCD(game, 'Chips', this.left, tsize * 4.5, this.group)
}

extend(DisplayPanel.prototype, {
  createMask: function () {
    const { tsize, bgColor } = config
    const mask = this.game.add.graphics()
    mask.beginFill(bgColor, 1.0)
    mask.drawRect(9 * tsize, 0, 5 * tsize, 9 * tsize)
    this.group.add(mask)
  },

  setChipsLeft: function (val) {
    this.chipsLcd.display = val
  },

  setLevel: function (val) {
    this.levelLcd.display = val
  },

  setTimeLeft: function (val) {
    this.timeLcd.display = val
  }
})

export default DisplayPanel
