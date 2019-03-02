// TODO: import from Chip:
// - DisplayPanel
// - Modal
// - Level

import Phaser, { Rectangle } from 'phaser'
import { extend, throttle } from 'lodash'
import config from '../config.js'
import levels from '../levels.js'

const Playing = function () {}

extend(Playing.prototype, {
  init: function () {
    this.game.onBlur.add(this.pause, this)
    this.game.renderer.resize(14 * config.TILE_SIZE, 9 * config.TILE_SIZE)
    this.game.bounds = new Rectangle(0, 0, 9 * config.TILE_SIZE, 9 * config.TILE_SIZE)
    this.game.camera.bounds = null
  },

  create: function () {
    this.levelIndex = config.START_LEVEL
    this.displayPanel = new DisplayPanel()

    this.createModals()
    this.createHotkeys()

    this.startCurrentLevel()
    this.playMusic()
  },

  createModals: function () {
    const tsize = config.TILE_SIZE
    this.modal = new Modal(new Rectangle(0, 0, 14 * tsize, 9 * tsize))

    var hintBounds = new Rectangle(9.5 * tsize, 0, 5 * tsize, 9 * tsize)
    this.hintPanel = new Modal(hintBounds, '', {
      boundsAlignV: 'top',
      font: '30px Lato',
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
    const { addHotkey } = this

    addHotkey('F1', this.startLastLevel)
    addHotkey('F2', this.startCurrentLevel)
    addHotkey('F3', this.startNextLevel)
    addHotkey('P', this.pause)
  },

  addHotkey: function (keyString, callback) {
    var keyObj = this.game.input.keyboard.addKey(Phaser.Keyboard[keyString])

    keyObj.onDown.add(function () {
      if (this.game.paused || this.game.halfPaused) {
        return
      }
      callback.call(this, keyObj)
    }.bind(this))
  },

  startLastLevel: function () {
    var numLevels = levels.length
    this.levelIndex = (this.levelIndex - 1 + numLevels) % numLevels
    this.startCurrentLevel()
  },

  startNextLevel: function () {
    var numLevels = levels.length
    this.levelIndex = (this.levelIndex + 1) % numLevels
    this.startCurrentLevel()
  },

  startCurrentLevel: function () {
    this.resetState()
    this.level = new Level(this.levelIndex)

    // post-load
    this.displayPanel.setLevel(this.levelIndex + 1)
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
    this.displayPanel.group.promote()
    this.level.inventory.group.promote()
  },

  pause: function () {
    if (this.game.paused) {
      return
    }

    if (this.game.music) {
      this.game.music.pause()
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
    var chipsLeft = this.level.getChipsNeeded() - this.level.inventory.count('ic')

    this.updateTimeLeft()
    this.displayPanel.setTimeLeft(this.timeLeft)
    this.displayPanel.setChipsLeft(chipsLeft)
    this.level.update()
  },

  lose: function (msg, delay) {
    this.modal.flash(msg, delay, this.startCurrentLevel.bind(this))
  },

  win: function (msg, delay) {
    msg = msg || 'Yowzer! You win!'
    this.modal.flash(msg, delay, this.startNextLevel.bind(this))
  },

  playMusic: function () {
    if (!config.ENABLE_MUSIC) {
      return
    }

    this.asyncLoad('forest', 'assets/audio/great_forest.mp3', function () {
      this.game.music = this.game.add.audio('forest')
      this.game.music.volume = config.MUSIC_VOLUME
      this.game.music.play()
    })
  },

  asyncLoad: function (cacheKey, path, onLoad) {
    this.load.audio(cacheKey, path)
    this.load.start()

    var index = window.setInterval(function () {
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
