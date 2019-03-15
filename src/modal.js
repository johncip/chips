import { each } from 'lodash'
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

    const bg = createBg(this.group, bounds)
    const subtext_ = createSubtext(
      scene,
      subtext,
      bounds,
      subtextStyle(width, style)
    )

    this.group.addMultiple([bg, this.mainText, subtext_])

    this.group.children.each(child => {
      child.setScrollFactor(0)
    })

    this.hide()
  }

  setText (text) {
    this.mainText.text = text
  }

  show () {
    this.group.children.each(child => {
      child.setVisible(true)
    })
  }

  hide () {
    this.group.children.each(child => {
      child.setVisible(false)
    })
  }

  destroy () {
    this.group.children.each(child => {
      child.destroy()
    })
  }

  /*
   * Displays the modal with the given message. Takes an optional delay
   * (during which time the scene is paused) and a fn which should
   * hide the modal and unpause the scene.
   */
  flash (message, delay, fn) {
    fn = fn || (() => unpause(this.scene, this))
    delay = delay || 0

    this.setText(message)
    this.scene.halfPaused = true

    setTimeout(() => {
      this.scene.input.keyboard.onPressCallback = fn
      this.show()
      this.scene.paused = true
    }, delay)
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
function createBg (group, { left, top, width, height }) {
  const bg = group.create(left, top, 'black')
  bg.width = width
  bg.height = height
  bg.alpha = 0.8
  bg.depth = depths.modalBack
  return bg
}

/*
 * Adds and returns a blank text object.
 */
function createMainText (scene, { left, top, width, height }, style) {
  const text = scene.add.text(left, top, '', style)
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

/*
 * Resume the scene and music and hide the modal.
 */
function unpause (scene, modal) {
  if (scene.music) {
    scene.music.resume()
  }

  modal.hide()
  scene.paused = false
  scene.halfPaused = false
}
