import Overlay, { createText } from './overlay'

/*
 * Translucent modal that is used for the hint.
 */
export default class HintOverlay extends Overlay {
  constructor (scene, bounds) {
    super(scene, bounds)

    const { width, centerX, centerY } = bounds

    this.hintText = createText(
      scene,
      '',
      centerX,
      centerY,
      style(width * 0.8)
    )
    this.hintText.lineSpacing = 10

    this.group.add(this.hintText)
    this.group.children.each(child => child.setScrollFactor(0))
    this.group.children.each(child => child.setVisible(false))
    this.shown = false
  }

  setHint (text) {
    this.hintText.text = text
  }
}

/*
 * Default style for text within the modal.
 */
function style (width) {
  return {
    fontFamily: 'lato',
    align: 'center',
    fontSize: 34,
    fontWeight: 'bold',
    fill: 'white',
    wordWrap: {
      width,
      useAdvancedWrap: true
    }
  }
}
