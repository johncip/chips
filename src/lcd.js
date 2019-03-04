import config from './config.js'
import { extend } from 'lodash'
import sprintf from 'sprintf'

function LCD (game, label, left, top, group) {
  this.label = label
  this.left = left
  this.top = top
  this.game = game

  this.font = game.add.retroFont('lcd', 64, 100, '0123456789', 0)
  this.group = group

  this.createLabel()
  this.createBackground()
  this.createDigits()

  this.display = 0
}

extend(LCD.prototype, {
  createLabel: function () {
    const label = this.game.add.text(this.left, this.top, this.label, {
      font: '20px lato',
      fill: '#dde'
    })

    this.group.add(label)
  },

  createBackground: function () {
    const g = this.game.add.graphics()
    const padding = config.tsize / 4

    const left = this.left - (padding / 2)
    const top = this.top + (config.tsize / 1.9) - (padding / 2)
    const width = config.tsize * 3 + padding
    const height = config.tsize * 1.5 + padding
    const radius = config.tsize / 12

    this.roundRect(g, left, top, width, height, radius)

    this.group.add(g)
  },

  roundRect: function (g, left, top, width, height, rad) {
    g.beginFill(config.lcdBgColor, 1.0)

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
    const middle = this.top + (config.tsize / 2)
    const digits = this.game.add.image(this.left, middle, this.font)

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

export default LCD
