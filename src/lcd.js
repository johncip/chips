import sprintf from 'sprintf'
import config from './config'
import depths from './depths'

/*
 * A 3-digit LCD display with a heading above it.
 */
export default class LCD {
  constructor (scene, labelText) {
    this.background = background(scene)
    this.heading = heading(scene, labelText)
    this.digits = digits(scene)

    this.group = scene.add.group()
    this.group.addMultiple([
      this.background,
      this.heading,
      this.digits
    ])

    this.display = 0
  }

  setX (val) {
    this.background.x = val
    this.heading.x = val
    this.digits.x = val
  }

  setY (val) {
    this.background.y = val
    this.heading.y = val
    this.digits.y = val + config.tsize * 0.5
  }

  get display () {
    return this.digits.text
  }

  set display (num) {
    this.digits.text = sprintf('%03d', num)
  }
}

function background (scene) {
  const { tsize, lcdBgColor } = config
  const g = scene.add.graphics()
  const padding = tsize / 4

  g.fillStyle(lcdBgColor, 1.0)
  g.fillRoundedRect(
    padding * -0.5,
    tsize * 0.4,
    tsize * 3 + padding,
    tsize * 1.5 + padding,
    tsize / 12
  )
  g.depth = depths.lcdBack

  return g
}

function heading (scene, str) {
  const headingStyle = {
    font: '20px lato',
    fill: '#ddddee'
  }
  const text = scene.add.text(0, 0, str, headingStyle)
  text.depth = depths.lcdFront
  return text
}

function digits (scene) {
  const dig = scene.add.bitmapText(0, config.tsize * 0.5, 'lcd', '000')
  dig.depth = depths.lcdFront
  return dig
}
