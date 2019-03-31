import { Geom } from 'phaser'
import config from './config'
import depths from './depths'
import Overlay, { createText } from './overlay'

const baseTextStyle = {
  fontFamily: config.fontFamily,
  stroke: 'black',
  strokeThickness: 8
}

/*
 * Translucent overlay that is used for the as pause screen, level end, etc.
 */
export default class Modal extends Overlay {
  constructor (scene) {
    const { width, height } = scene.game.canvas
    const bounds = new Geom.Rectangle(0, 0, width, height)
    super(scene, bounds)
    this.bg.depth = depths.modalBack

    const { centerX, centerY } = bounds
    this.message = createText(
      scene,
      '',
      centerX,
      centerY * 0.8,
      { ...baseTextStyle, fontSize: 64, fill: '#dde' }
    )
    this.message.depth = depths.modalFront

    const subtext = createText(
      scene,
      'Press SPACE to continue',
      centerX,
      centerY * 1.25,
      { ...baseTextStyle, fontSize: 32, fill: '#ccd' }
    )
    subtext.depth = depths.modalFront

    this.group.addMultiple([this.message, subtext])
    this.group.children.each(child => child.setVisible(false))
    this.shown = false
  }

  show (text) {
    this.message.text = text
    super.show()
  }
}
