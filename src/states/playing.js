import Phaser, { Rectangle } from 'phaser'
import { extend, throttle } from 'lodash'

import config from '../config'
import levels from '../levels'
import Sidebar from '../sidebar'
import Modal from '../modal'
import Level from '../level'


function Playing () {}

extend(Playing.prototype, {
  init: function () {
    this.game.onBlur.add(this.pause, this)
    this.game.renderer.resize(14 * config.tsize, 9 * config.tsize)
    this.game.bounds = new Rectangle(0, 0, 9 * config.tsize, 9 * config.tsize)
    this.game.camera.bounds = null
  },

  create: function () {
    this.levelIndex = config.startLevel
    this.sidebar = new Sidebar(this.game)

    this.createModals()
    this.createHotkeys()

    this.startCurrentLevel()
  },

  createModals: function () {
    const tsize = config.tsize
    this.modal = new Modal(this.game, new Rectangle(0, 0, 14 * tsize, 9 * tsize))

    const hintBounds = new Rectangle(9.5 * tsize, 0, 5 * tsize, 9 * tsize)
    this.hintPanel = new Modal(this.game, hintBounds, '', {
      boundsAlignV: 'top',
      font: '30px lato',
      wordWrapWidth: hintBounds.width - tsize
    })

    // twerkz
    this.modal.mainText.y -= tsize
    this.hintPanel.mainText.x -= 0.25 * tsize
    this.hintPanel.mainText.y += tsize

    // exports
    this.game.hintPanel = this.hintPanel
  },

  createHotkeys: function () {
    this.addHotkey('F1', this.startLastLevel)
    this.addHotkey('F2', this.startCurrentLevel)
    this.addHotkey('F3', this.startNextLevel)
    this.addHotkey('P', this.pause)
  },

  addHotkey: function (keyString, fn) {
    const keyObj = this.game.input.keyboard.addKey(Phaser.Keyboard[keyString])

    keyObj.onDown.add(() => {
      if (this.game.paused || this.game.halfPaused) {
        return
      }
      fn.call(this, keyObj)
    })
  },

  startLastLevel: function () {
    const numLevels = levels.length
    this.levelIndex = (this.levelIndex - 1 + numLevels) % numLevels
    this.startCurrentLevel()
  },

  startNextLevel: function () {
    const numLevels = levels.length
    this.levelIndex = (this.levelIndex + 1) % numLevels
    this.startCurrentLevel()
  },

  startCurrentLevel: function () {
    this.resetState()
    this.level = new Level(this.game, this.levelIndex)

    // post-load
    this.sidebar.setLevel(this.levelIndex + 1)
    this.hintPanel.setText(this.level.getHint())
    this.timeLeft = this.level.getTimeAllowed()
    this.fixLayering()
  },

  resetState: function () {
    if (this.level) {
      this.level.destroy()
    }

    this.game.paused = false
    this.game.halfPaused = false
    this.input.keyboard.onPressCallback = null
  },

  fixLayering: function () {
    this.game.world.bringToTop(this.sidebar.group)
    this.game.world.bringToTop(this.level.inventory.group)
  },

  pause: function () {
    if (this.game.paused) {
      return
    }

    this.modal.flash('Paused...')
  },

  countDown: function () {
    if (this.game.halfPaused || this.game.paused || this.timeLeft === 0) {
      return
    }

    this.timeLeft--

    if (this.timeLeft === 0) {
      this.lose("Time's Up!")
    }
  },

  update: function () {
    const chipsLeft = this.level.getChipsNeeded() - this.level.inventory.count('ic')

    this.updateTimeLeft()
    this.sidebar.setTimeLeft(this.timeLeft)
    this.sidebar.setChipsLeft(chipsLeft)
    this.level.update()
  },

  lose: function (msg, delay) {
    this.modal.flash(msg, delay, () => this.startCurrentLevel())
  },

  win: function (msg, delay) {
    msg = msg || 'Yowzer! You win!'
    this.modal.flash(msg, delay, () => this.startNextLevel())
  },

  asyncLoad: function (cacheKey, path, onLoad) {
    this.load.audio(cacheKey, path)
    this.load.start()

    const index = window.setInterval(function () {
      if (this.game.load.isLoading) {
        return
      }

      onLoad()
      window.clearInterval(index)
    }, 1000)
  }
})

Playing.prototype.updateTimeLeft = throttle(Playing.prototype.countDown, 1000)

export default Playing
