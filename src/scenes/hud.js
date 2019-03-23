import Phaser from 'phaser'

import config from '../config'
import DisplayPanel from '../displaypanel'
import HintOverlay from '../hintoverlay'
import Inventory from '../inventory'
import Modal from '../modal'


export default class HUD extends Phaser.Scene {
  constructor (key) {
    super(key)

    this.hintOverlay = null
    this.levelIndex = null
    this.displayPanel = null
    this.inventory = null
    this.modal = null
  }

  create () {
    this.displayPanel = new DisplayPanel(this)
    this.hintOverlay = new HintOverlay(this)
    this.inventory = new Inventory(this)
    this.modal = new Modal(this)

    const camera = this.cameras.main
    camera.setViewport(0, 0, config.width, config.height)
  }

  // TODO: destroy?

  populate ({ level, timeLeft, hint, chipsLeft }) {
    if (level) {
      this.displayPanel.setLevel(level)
    }

    if (timeLeft || timeLeft === 0) {
      this.displayPanel.setTimeLeft(timeLeft)
    }

    if (hint) {
      this.hintOverlay.setHint(hint)
    }

    if (chipsLeft || chipsLeft === 0) {
      this.displayPanel.setChipsLeft(chipsLeft)
    }
  }

  addToInventory (val) {
    this.inventory.add(val)
  }

  inventoryHas (key) {
    return this.inventory.has(key)
  }

  removeFromInventory (key) {
    this.inventory.remove(key)
  }

  resetInventory () {
    this.inventory.reset()
  }

  getChipsCollected () {
    return this.inventory.count('ic')
  }

  hideHint () {
    this.hintOverlay.hide()
  }

  showHint () {
    this.hintOverlay.show()
  }

  hideModal () {
    this.modal.hide()
  }

  showModal (msg) {
    this.modal.show(msg)
  }

  modalIsShown () {
    return this.modal.shown
  }
}
