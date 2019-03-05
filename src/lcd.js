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
  const g = game.add.graphics()
  const { tsize } = config
  const padding = tsize / 4
  const left = padding * -0.5
  const top = tsize * 0.4
  const width = tsize * 3 + padding
  const height = tsize * 1.5 + padding
  const radius = tsize / 12
  roundRect(g, left, top, width, height, radius, config.lcdBgColor)
  return g
}


/*
 * Returns a rounded rectangle.
 */
function roundRect (g, left, top, width, height, rad, color) {
  g.beginFill(color, 1.0)
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
