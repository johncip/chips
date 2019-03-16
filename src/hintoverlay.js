import config from './config'
import depths from './depths'
import Overlay, { createText } from './overlay'

/*
 * Translucent modal that is used for the hint.
 */
export default class HintOverlay extends Overlay {
  constructor (scene, bounds) {
    super(scene, bounds)

    const { width, centerX, centerY } = bounds

    this.bg.depth = depths.hintBack

    this.hintText = createText(scene, '', centerX, centerY, style(width * 0.8))
    this.hintText.lineSpacing = 10
    this.hintText.depth = depths.hintFront

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
    align: 'center',
    fill: 'rgb(220, 220, 220)',
    fontFamily: config.fontFamily,
    fontSize: 34,
    fontWeight: 'bold',
    wordWrap: {
      width,
      useAdvancedWrap: true
    }
  }
}
