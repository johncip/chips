import depths from './depths'

/*
 * Translucent overlay that is used for the hint as well as pause screen, level end, etc.
 */
export default class Overlay {
  constructor (scene, bounds) {
    this.scene = scene
    this.group = scene.add.group()
    const bg = createBackground(scene, bounds)
    this.group.add(bg)
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
 * Adds and returns a blank text object with the default style.
 */
export function createText (scene, str, centerX, centerY, style) {
  const text = scene.add.text(centerX, centerY, str, style)
  text.setOrigin(0.5)
  text.depth = depths.modalFront

  return text
}
