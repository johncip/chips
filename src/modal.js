import depths from './depths'

/*
 * Translucent modal that is used for the hint as well as pause screen, level end, etc.
 *
 * Given styles are applied as overrides to the default.
 */
export default class Modal {
  constructor (scene, bounds, subtext = 'Press SPACE to continue', style = {}) {
    const { width } = bounds

    this.scene = scene
    this.group = scene.add.group()
    this.mainText = createMainText(scene, bounds, mainTextStyle(width, style))

    const bg = createBackground(scene, bounds)
    const subtext_ = createSubtext(
      scene,
      subtext,
      bounds,
      subtextStyle(width, style)
    )

    this.group.addMultiple([bg, this.mainText, subtext_])
    this.group.children.each(child => child.setScrollFactor(0))
    this.group.children.each(child => child.setVisible(false))
    this.shown = false
  }

  setText (text) {
    this.mainText.text = text
  }

  show () {
    if (this.shown) return
    this.group.children.each(child => child.setVisible(true))
    this.shown = true
  }

  hide () {
    if (!this.shown) return
    this.group.children.each(child => child.setVisible(false))
    this.shown = false
  }
}

/*
 * Default style for text within the modal.
 */
function mainTextStyle (width, overrides = {}) {
  return {
    font: '48px lato',
    fill: '#dde',
    boundsAlignH: 'center',
    boundsAlignV: 'middle',
    align: 'center',
    wordWrap: { width, useAdvancedWrap: true },
    ...overrides
  }
}

/*
 * Default style for text within the modal.
 */
function subtextStyle (width, overrides = {}) {
  return {
    ...mainTextStyle(width),
    fontSize: 24,
    fill: '#ccd',
    ...overrides
  }
}

/*
 * Adds and returns a translucent black background sprite.
 */
function createBackground (scene, { x, y, width, height }) {
  const g = scene.add.graphics()
  g.fillStyle('black', 0.8)
  g.fillRect(x, y, width, height)
  g.depth = depths.modalBack
  return g
}

/*
 * Adds and returns a blank text object.
 */
function createMainText (scene, { x, y, width, height }, style) {
  const text = scene.add.text(x, y, '', style)
  text.setFixedSize(width, height)
  text.depth = depths.modalFront
  return text
}

// TODO: can I just pass in the height and divide by 2?
/*
 * Adds and returns a text sprite that's half the size.
 */
function createSubtext (scene, str, { left, top, width, halfHeight }, style) {
  const text = scene.add.text(left, top, str, style)
  text.setFixedSize(width, halfHeight)
  text.depth = depths.modalFront
  return text
}
