import sprintf from 'sprintf'
import config from './config'

/*
 * A 3-digit LCD display with a heading above it.
 */
export default class LCD {
  constructor (game, labelText) {
    this.font = game.add.retroFont('lcd', 64, 100, '0123456789', 0)
    this.display = 0
    this.group = game.add.group()

    this.group.addMultiple([
      background(game),
      heading(game, labelText),
      digits(game, this.font)
    ])
  }

  get display () {
    return this.font.text
  }

  set display (num) {
    this.font.text = sprintf('%03d', num)
  }
}

function digits (game, font) {
  return game.add.image(0, config.tsize * 0.5, font)
}

function heading (game, text) {
  const headingStyle = {
    font: '20px lato',
    fill: '#ddddee'
  }
  return game.add.text(0, 0, text, headingStyle)
}

function background (game) {
  const { tsize, lcdBgColor } = config
  const g = game.add.graphics()
  const padding = tsize / 4

  roundRect(g, {
    left: padding * -0.5,
    top: tsize * 0.4,
    width: tsize * 3 + padding,
    height: tsize * 1.5 + padding,
    radius: tsize / 12,
    color: lcdBgColor
  })

  return g
}

/*
 * Draws a rounded rectangle in the given graphics context.
 */
function roundRect (g, { left, top, width, height, radius, color }) {
  g.beginFill(color, 1.0)
  g.moveTo(left + radius, top)
  g.lineTo(left + width - radius, top)
  g.quadraticCurveTo(left + width, top, left + width, top + radius)
  g.lineTo(left + width, top + height - radius)
  g.quadraticCurveTo(left + width, top + height, left + width - radius, top + height)
  g.lineTo(left + radius, top + height)
  g.quadraticCurveTo(left, top + height, left, top + height - radius)
  g.lineTo(left, top + radius)
  g.quadraticCurveTo(left, top, left + radius, top)
  g.endFill()
}
