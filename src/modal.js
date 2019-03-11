import { each } from 'lodash'

/*
 * Translucent modal that is used for the hint as well as pause screen, level end, etc.
 *
 * Given styles are applied as overrides to the default.
 */
export default class Modal {
  constructor (game, bounds, subtext = 'Press SPACE to continue', style = {}) {
    const { width } = bounds

    this.game = game
    this.group = game.add.group()
    this.mainText = createText(game, bounds, mainTextStyle(width, style))

    const bg = createBg(this.group, bounds)
    createSubtext(game, bounds, subtextStyle(width, style))

    each([bg, this.mainText], x => this.group.add(x))
    this.group.fixedToCamera = true

    this.hide()
  }

  setText (text) {
    this.mainText.text = text
  }

  show () {
    this.game.world.bringToTop(this.group)
    this.group.forEach(item => { item.exists = true })
  }

  hide () {
    this.group.forEach(item => { item.exists = false })
  }

  destroy () {
    this.group.forEach(sprite => { sprite.destroy() })
  }

  /*
   * Displays the modal with the given message. Takes an optional delay
   * (during which time the game is paused) and a fn which should
   * hide the modal and unpause the game.
   */
  flash (message, delay, fn) {
    fn = fn || (() => unpause(this.game, this))
    delay = delay || 0

    this.setText(message)
    this.game.halfPaused = true

    setTimeout(() => {
      this.game.input.keyboard.onPressCallback = fn
      this.show()
      this.game.paused = true
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
    wordWrap: 'true',
    wordWrapWidth: width,
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

  return bg
}

/*
 * Adds and returns a blank text sprite.
 */
function createText (game, { left, top, width, height }, style) {
  const sprite = game.add.text(0, 0, '', style)
  sprite.setTextBounds(left, top, width, height)
  return sprite
}

/*
 * Adds and returns a text sprite that's half the size.
 */
function createSubtext (game, text, { left, halfHeight, width }, style) {
  const sprite = game.add.text(0, 0, text, style)
  sprite.setTextBounds(left, halfHeight, width, halfHeight)
  return sprite
}

/*
 * Resume the game and music and hide the modal.
 */
function unpause (game, modal) {
  if (game.music) {
    game.music.resume()
  }

  modal.hide()
  game.paused = false
  game.halfPaused = false
}
