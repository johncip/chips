import { each, extend } from 'lodash'

function Modal (game, bounds, subtext, style) {
  if (subtext === undefined) {
    subtext = 'Press SPACE to continue'
  }
  this.game = game
  this.setBounds(bounds)
  this.setStyle(style)
  this.subtext = subtext
  this.group = game.add.group(undefined, 'Modal')

  this.background = this.createBackground()
  this.mainText = this.createMainText()
  this.subtext = this.createSubtext()

  this.group.add(this.background)
  this.group.add(this.mainText)
  this.group.add(this.subtext)

  this.group.fixedToCamera = true
  this.group.hide()
}

extend(Modal.prototype, {
  setBounds: function (bounds) {
    this.bounds = bounds

    var props = ['left', 'top', 'height', 'width', 'halfHeight']
    each(props, property => {
      this[property] = bounds[property]
    })
  },

  setStyle: function (style) {
    if (style === undefined) {
      style = {}
    }

    this.style = {
      font: '48px lato',
      fill: '#dde',
      boundsAlignH: 'center',
      boundsAlignV: 'middle',
      wordWrap: 'true',
      align: 'center',
      wordWrapWidth: this.width
    }

    extend(this.style, style)
  },

  createBackground: function () {
    var bgSprite = this.group.create(this.left, this.top, 'black')
    return extend(bgSprite, {
      width: this.width,
      height: this.height,
      alpha: 0.8
    })
  },

  createMainText: function () {
    var main = this.game.add.text(0, 0, '', this.style)
    main.setTextBounds(this.left, this.top, this.width, this.height)
    return main
  },

  createSubtext: function () {
    var subStyle = extend({}, this.style, {
      fontSize: 24,
      fill: '#ccd'
    })

    var sub = this.game.add.text(0, 0, this.subtext, subStyle)
    sub.setTextBounds(this.left, this.halfHeight, this.width, this.halfHeight)

    return sub
  },

  hide: function () {
    this.group.hide()
  },

  show: function () {
    this.group.promote()
    this.group.show()
  },

  destroy: function () {
    this.group.forEach(sprite => { sprite.destroy() })
  },

  setText: function (text) {
    this.mainText.text = text
  },

  /*
   * Displays the modal with the given message. Takes an optional delay
   * (during which time the game is paused) and a fn which should
   * hide the modal and unpause the game.
   */
  flash: function (message, delay, fn) {
    fn = fn || (() => this._unpause())
    delay = delay || 0

    this.setText(message)
    this.game.halfPaused = true

    setTimeout(() => {
      this.game.input.keyboard.onPressCallback = fn
      this.show()
      this.game.paused = true
    }, delay)
  },

  _unpause: function () {
    if (this.game.music) {
      this.game.music.resume()
    }

    this.hide()
    this.game.paused = false
    this.game.halfPaused = false
  }
})

export default Modal
