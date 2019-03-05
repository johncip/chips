import { extend } from 'lodash'
import sprintf from 'sprintf'

import config from './config'

const { tsize, lcdBgColor } = config
const headingStyle = {
  font: '20px lato',
  fill: '#ddddee'
}

function LCD (game, labelText) {
  this.game = game
  this.font = game.add.retroFont('lcd', 64, 100, '0123456789', 0)
  this.group = game.add.group()

  this.createLabel(labelText)
  this.createBackground()
  this.createDigits()

  this.display = 0
}

extend(LCD.prototype, {
  createLabel: function (text) {
    const label = this.game.add.text(0, 0, text, headingStyle)
    this.group.add(label)
  },

  createBackground: function () {
    const padding = tsize / 4
    const g = this.game.add.graphics()
    const left = padding * -0.5
    const top = tsize * 0.4
    const width = tsize * 3 + padding
    const height = tsize * 1.5 + padding
    const radius = tsize / 12
    roundRect(g, left, top, width, height, radius)
    this.group.add(g)
  },

  createDigits: function () {
    const digits = this.game.add.image(0, tsize * 0.5, this.font)
    this.group.add(digits)
  }
})

Object.defineProperty(LCD.prototype, 'display', {
  get: function () {
    return this.font.text
  },

  set: function (num) {
    this.font.text = sprintf('%03d', num)
  }
})

function roundRect (g, left, top, width, height, rad) {
  g.beginFill(lcdBgColor, 1.0)
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
}

export default LCD
