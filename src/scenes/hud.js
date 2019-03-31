import { each } from 'lodash'
import Phaser from 'phaser'

import config from '../config'
import depths from '../depths'
import HintOverlay from '../hintoverlay'
import Inventory from '../inventory'
import LCD from '../lcd'
import Modal from '../modal'

const { tsize, bgColor } = config

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
    // TODO: get width, height from outside
    const { width, height } = this.game.canvas
    this.cameras.main.setViewport(0, 0, width, height)

    const group = this.add.group()
    group.add(createBackground(this))

    this.lcds = createLcds(this)
    each(this.lcds, lcd => {
      lcd.group.children.each(child => {
        group.add(child)
      })
    })

    this.hintOverlay = new HintOverlay(this)
    this.inventory = new Inventory(this)
    this.modal = new Modal(this)
  }

  // TODO: destroy?

  reset (opts) {
    this.inventory.reset()
    this.populate(opts)
    this.hideModal()
    this.hideHint()
  }

  populate ({ level, timeLeft, hint, chipsLeft }) {
    if (level) {
      this.lcds.level.display = level
    }

    if (timeLeft || timeLeft === 0) {
      this.lcds.time.display = timeLeft
    }

    if (hint) {
      this.hintOverlay.setHint(hint)
    }

    if (chipsLeft || chipsLeft === 0) {
      this.lcds.chips.display = chipsLeft
    }
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

function createBackground (scene) {
  const g = scene.add.graphics()
  g.fillStyle(bgColor, 1.0)
  g.fillRect(0, 9 * tsize, 9 * tsize, 4 * tsize)
  g.depth = depths.displayPanelBack
  return g
}

function createLcds (scene) {
  const lcds = {
    level: new LCD(scene, 'Level'),
    time: new LCD(scene, 'Time'),
    chips: new LCD(scene, 'Chips')
  }

  let x = 0
  each(lcds, lcd => {
    lcd.setX(x)
    lcd.setY(11 * tsize)
    x += tsize * 3
  })

  return lcds
}


