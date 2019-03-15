import Phaser, { Geom } from 'phaser'
import { throttle } from 'lodash'

import config from '../config'
import levels from '../levels'
import DisplayPanel from '../displaypanel'
import Modal from '../modal'
import Level from '../level'

export default class Playing extends Phaser.Scene {
  constructor () {
    super('Playing')
  }

  init () {
    this.events.addListener('blur', () => this.pause())
    this.cameras.main.setBackgroundColor(config.bgColor)
  }

  create () {
    this.levelIndex = config.startLevel
    this.displayPanel = new DisplayPanel(this)

    this.createModals()
    this.createHotkeys()

    this.startCurrentLevel()
  }

  createModals () {
    const { tsize } = config
    this.modal = new Modal(
      this,
      new Geom.Rectangle(0, 0, 14 * tsize, 9 * tsize)
    )

    const hintBounds = new Geom.Rectangle(9.5 * tsize, 0, 5 * tsize, 9 * tsize)
    this.hintPanel = new Modal(this, hintBounds, '', {
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
  }

  createHotkeys () {
    this.addHotkey('F1', () => this.startLastLevel())
    this.addHotkey('F2', () => this.startCurrentLevel())
    this.addHotkey('F3', () => this.startNextLevel())
    this.addHotkey('P', () => this.pause())
  }

  addHotkey (str, fn) {
    this.input.keyboard.on(`keydown_${str}`, event => {
      if (this.game.paused || this.game.halfPaused) {
        return
      }
      fn()
    })
  }

  startLastLevel () {
    const numLevels = levels.length
    this.levelIndex = (this.levelIndex - 1 + numLevels) % numLevels
    this.startCurrentLevel()
  }

  startNextLevel () {
    const numLevels = levels.length
    this.levelIndex = (this.levelIndex + 1) % numLevels
    this.startCurrentLevel()
  }

  startCurrentLevel () {
    this.resetState()
    this.level = new Level(this, this.levelIndex)

    // post-load
    this.displayPanel.setLevel(this.levelIndex + 1)
    this.hintPanel.setText(this.level.getHint())
    this.timeLeft = this.level.getTimeAllowed()
  }

  resetState () {
    if (this.level) {
      this.level.destroy()
    }

    this.game.paused = false
    this.game.halfPaused = false
    this.input.keyboard.onPressCallback = null
  }

  pause () {
    if (this.game.paused) {
      return
    }

    this.modal.flash('Paused...')
  }

  countDown () {
    if (this.game.halfPaused || this.game.paused || this.timeLeft === 0) {
      return
    }

    this.timeLeft--

    if (this.timeLeft === 0) {
      this.lose("Time's Up!")
    }
  }

  update () {
    const chipsLeft =
      this.level.getChipsNeeded() - this.level.inventory.count('ic')

    this.updateTimeLeft()
    this.displayPanel.setTimeLeft(this.timeLeft)
    this.displayPanel.setChipsLeft(chipsLeft)
    this.level.update()
  }

  lose (msg, delay) {
    this.modal.flash(msg, delay, () => this.startCurrentLevel())
  }

  win (msg, delay) {
    msg = msg || 'Yowzer! You win!'
    this.modal.flash(msg, delay, () => this.startNextLevel())
  }

  asyncLoad (cacheKey, path, onLoad) {
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
}

Playing.prototype.updateTimeLeft = throttle(Playing.prototype.countDown, 1000)
