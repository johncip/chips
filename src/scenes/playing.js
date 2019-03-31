import Phaser from 'phaser'

import config from '../config'
import levels from '../levels'
import Level from '../level'
import { modInc, modDec } from '../util'
import HUD from './hud'

export default class Playing extends Phaser.Scene {
  constructor () {
    super('Playing')

    this.chipsLeft = null
    this.levelIndex = null
    this.timeLeft = null
    this.hud = null

    this.paused = false
  }

  init () {
    this.events.addListener('blur', () => this.pauseGame())

    this.time.addEvent({
      delay: 1000,
      callback: this.countDown,
      callbackScope: this,
      loop: true
    })

    const sbKey = 'HUD'
    this.hud = new HUD(sbKey)
    this.scene.add(sbKey, this.hud, true)
  }

  create () {
    const camera = this.cameras.main
    camera.setViewport(0, 0, 9 * config.tsize, 9 * config.tsize)

    this.levelIndex = config.startLevel
    this.createHotkeys()
    this.startCurrentLevel()
  }

  createHotkeys () {
    this.addHotkey('F1', () => this.startLastLevel())
    this.addHotkey('F2', () => this.startCurrentLevel())
    this.addHotkey('F3', () => this.startNextLevel())
    this.addHotkey('P', () => this.pauseGame())
    this.addHotkey('SPACE', () => this.resumeGame())
  }

  addHotkey (key, fn) {
    this.input.keyboard.on('keydown_' + key, () => (this.paused ? null : fn()))
  }

  // TODO: have an end state
  startLastLevel () {
    this.levelIndex = modDec(this.levelIndex, levels.length)
    this.startCurrentLevel()
  }

  startNextLevel () {
    this.levelIndex = modInc(this.levelIndex, levels.length)
    this.startCurrentLevel()
  }

  startCurrentLevel () {
    if (this.level) {
      this.level.destroy()
    }
    this.level = new Level(this, this.levelIndex)
    this.timeLeft = this.level.getTimeAllowed()

    this.hud.reset({
      level: this.levelIndex + 1,
      timeLeft: this.timeLeft,
      hint: this.level.getHint()
    })

    this.paused = false
  }

  pauseGame () {
    if (this.hud.modalIsShown()) {
      return
    }
    if (config.enableMusic) {
      window.XMPlayer.pause()
    }
    this.hud.showModal('Paused')
    this.paused = true

    this.input.keyboard.once('keydown_SPACE', () =>
      this.paused ? this.resumeGame() : null
    )
  }

  resumeGame () {
    if (config.enableMusic) {
      window.XMPlayer.play()
    }
    this.hud.hideModal()
    this.paused = false
  }

  countDown () {
    if (this.paused || this.timeLeft === 0) {
      return
    }

    this.timeLeft--
    this.hud.populate({ timeLeft: this.timeLeft })

    if (this.timeLeft === 0) {
      this.lose("Time's Up!")
    }
  }

  update (time, delta) {
    const { level, hud } = this

    const chipsLeft = level.getChipsNeeded() - hud.getChipsCollected()
    if (chipsLeft !== this.chipsLeft) {
      this.chipsLeft = chipsLeft
      hud.populate({ chipsLeft })
    }

    level.update(time, delta)
  }

  lose (msg) {
    this.paused = true
    this.hud.showModal(msg)
    this.input.keyboard.once('keydown_SPACE', () => this.startCurrentLevel())
  }

  win (msg) {
    this.paused = true
    this.hud.showModal(msg)
    this.input.keyboard.once('keydown_SPACE', () => this.startNextLevel())
  }

  // -- hud crap --

  hideHint () {
    this.hud.hideHint()
  }

  showHint () {
    this.hud.showHint()
  }

  addToInventory (val) {
    this.hud.inventory.add(val)
  }

  inventoryHas (key) {
    return this.hud.inventory.has(key)
  }

  removeFromInventory (key) {
    this.hud.inventory.remove(key)
  }

  hasEnoughChips () {
    return this.hud.getChipsCollected() === this.level.getChipsNeeded()
  }
}
