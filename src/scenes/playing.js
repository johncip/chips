import Phaser, { Geom } from 'phaser'
import { throttle } from 'lodash'

import config from '../config'
import levels from '../levels'
import DisplayPanel from '../displaypanel'
import Modal from '../modal'
import HintOverlay from '../hintoverlay'
import Level from '../level'

export default class Playing extends Phaser.Scene {
  constructor () {
    super('Playing')
    this.paused = false
  }

  init () {
    this.events.addListener('blur', () => this.pauseGame())
    this.cameras.main.setBackgroundColor(config.bgColor)
  }

  create () {
    this.levelIndex = config.startLevel
    this.displayPanel = new DisplayPanel(this)

    this.createOverlays()
    this.createHotkeys()

    this.startCurrentLevel()
  }

  createOverlays () {
    const { tsize } = config
    this.modal = new Modal(
      this,
      new Geom.Rectangle(0, 0, 14 * tsize, 9 * tsize)
    )

    // currently hidden and shown in entity collision code
    this.hintOverlay = new HintOverlay(
      this,
      new Geom.Rectangle(9 * tsize, 0, 5 * tsize, 9 * tsize)
    )
  }

  createHotkeys () {
    this.addHotkey('F1', () => this.startLastLevel())
    this.addHotkey('F2', () => this.startCurrentLevel())
    this.addHotkey('F3', () => this.startNextLevel())
    this.addHotkey('P', () => this.pauseGame())
    this.addHotkey('SPACE', () => this.resumeGame())

    this.input.keyboard.on(
      'keydown_SPACE',
      () => this.paused ? this.resumeGame() : null
    )
  }

  addHotkey (key, fn) {
    this.input.keyboard.on(
      'keydown_' + key,
      () => this.paused ? null : fn()
    )
  }

  // TODO: extract wrap
  // TODO: have an end state
  startLastLevel () {
    const num = levels.length
    this.levelIndex = (this.levelIndex - 1 + num) % num
    this.startCurrentLevel()
  }

  startNextLevel () {
    const num = levels.length
    this.levelIndex = (this.levelIndex + 1) % num
    this.startCurrentLevel()
  }

  startCurrentLevel () {
    this.resetState()
    this.level = new Level(this, this.levelIndex)

    // post-load
    this.displayPanel.setLevel(this.levelIndex + 1)
    this.hintOverlay.setHint(this.level.getHint())
    this.timeLeft = this.level.getTimeAllowed()
  }

  resetState () {
    if (this.level) {
      this.level.destroy()
    }

    this.scene.resume()
    this.paused = false
  }

  pauseGame () {
    if (config.enableMusic) {
      window.XMPlayer.pause()
    }
    this.modal.setMessage('Paused')
    this.modal.show()
    this.paused = true
  }

  resumeGame () {
    if (config.enableMusic) {
      window.XMPlayer.play()
    }
    this.modal.hide()
    this.paused = false
  }

  countDown () {
    if (this.paused || this.timeLeft === 0) {
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
    this.modal.setMessage(msg)
    this.modal.show()
    // this.modal.flash(msg, delay, () => this.startCurrentLevel())
  }

  win (msg, delay) {
    this.modal.setMessage(msg)
    this.modal.show()
    // this.modal.flash(msg, delay, () => this.startNextLevel())
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
