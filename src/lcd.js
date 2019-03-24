import sprintf from 'sprintf'
import config from './config'
import depths from './depths'

/*
 * A 3-digit LCD display with a heading above it.
 */
export default class LCD {
  constructor (scene, labelText) {
    this.background = createBackground(scene)
    this.heading = createHeading(scene, labelText)
    this.digitsBg = createDigitsBg(scene)
    this.digits = createDigits(scene)

    this.group = scene.add.group()
    this.group.addMultiple([
      this.background,
      this.heading,
      this.digitsBg,
      this.digits
    ])

    this.display = 0
  }

  setX (val) {
    this.group.children.each(child => {
      child.x = val
    })

    this.digits.x += 5
    this.digitsBg.x += 5
  }

  setY (val) {
    this.group.children.each(child => {
      child.y = val
    })
  }

  get display () {
    return this.digits.text
  }

  set display (num) {
    this.digits.text = sprintf('%03d', num)
  }
}

function createBackground (scene) {
  const { tsize, lcdBgColor } = config
  const g = scene.add.graphics()

  g.fillStyle(lcdBgColor, 1.0)
  g.fillRoundedRect(
    0,
    tsize * 0.5,
    tsize * 3,
    tsize * 1.5,
    tsize / 12
  )
  g.depth = depths.lcdBack

  return g
}

function createHeading (scene, str) {
  const headingStyle = {
    fontFamily: config.fontFamily,
    fontSize: 20,
    fill: 'rgb(220, 220, 240)'
  }
  const text = scene.add.text(0, 0, str, headingStyle)
  text.depth = depths.lcdFront
  return text
}

function createDigitsBg (scene) {
  const style = {
    fontFamily: 'lcd',
    fontSize: 110,
    color: 'rgb(64, 0, 0)',
    padding: 20
  }
  const text = scene.add.text(0, 0, '888', style)
  text.depth = depths.lcdFront
  return text
}

function createDigits (scene) {
  const style = {
    fontFamily: 'lcd',
    fontSize: 110,
    color: 'rgb(235, 10, 10)',
    padding: 20,
    shadow: {
      color: 'rgb(180, 10, 10)',
      blur: 20,
      fill: true,
      offsetX: 0,
      offsetY: 0
    }
  }
  const text = scene.add.text(0, 0, '000', style)
  text.depth = depths.lcdFront
  return text
}
