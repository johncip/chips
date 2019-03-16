import Overlay, { createText } from './overlay'

/*
 * Translucent overlay that is used for the as pause screen, level end, etc.
 */
export default class Modal extends Overlay {
  constructor (scene, bounds) {
    super(scene, bounds)

    const { centerX, centerY } = bounds

    this.message = createText(
      scene,
      '',
      centerX,
      centerY * 0.8,
      { fontFamily: 'lato', fontSize: 48, fill: '#dde' }
    )

    const subtext = createText(
      scene,
      'Press SPACE to continue',
      centerX,
      centerY * 1.25,
      { fontFamily: 'lato', fontSize: 24, fill: '#ccd' }
    )

    this.group.addMultiple([this.message, subtext])
    this.group.children.each(child => child.setScrollFactor(0))
    this.group.children.each(child => child.setVisible(false))
    this.shown = false
  }

  setMessage (text) {
    this.message.text = text
  }
}
