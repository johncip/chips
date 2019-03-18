import config from './config'
import depths from './depths'
import Overlay, { createText } from './overlay'

/*
 * Translucent overlay that is used for the as pause screen, level end, etc.
 */
export default class Modal extends Overlay {
  constructor (scene, bounds) {
    super(scene, bounds)

    const { centerX, centerY } = bounds
    const { fontFamily } = config

    this.bg.depth = depths.modalBack

    this.message = createText(
      scene,
      '',
      centerX,
      centerY * 0.8,
      { fontFamily, fontSize: 48, fill: '#dde' }
    )
    this.message.depth = depths.modalFront

    const subtext = createText(
      scene,
      'Press SPACE to continue',
      centerX,
      centerY * 1.25,
      { fontFamily, fontSize: 24, fill: '#ccd' }
    )
    subtext.depth = depths.modalFront

    this.group.addMultiple([this.message, subtext])
    this.group.children.each(child => child.setScrollFactor(0))
    this.group.children.each(child => child.setVisible(false))
    this.shown = false
  }

  showMessage (text) {
    this.message.text = text
    super.show()
  }
}
