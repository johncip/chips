import { each } from 'lodash'

import config from './config'
import LCD from './lcd'

export default class Sidebar {
  constructor (game) {
    this.game = game
    this.group = game.add.group()
    this.group.fixedToCamera = true
    this.createMask()
    this.createLcds()
  }

  createLcds () {
    const { tsize } = config

    this.lcds = {
      level: new LCD(this.game, 'Level'),
      time: new LCD(this.game, 'Time'),
      chips: new LCD(this.game, 'Chips')
    }

    let top = 0.1 * tsize
    each(this.lcds, (lcd) => {
      lcd.group.x += 10.25 * tsize
      lcd.group.y = top
      top += tsize * 2.25
      this.group.add(lcd.group)
    })
  }

  createMask () {
    const { tsize, bgColor } = config
    const mask = this.game.add.graphics()
    mask.beginFill(bgColor, 1.0)
    mask.drawRect(9 * tsize, 0, 5 * tsize, 9 * tsize)
    this.group.add(mask)
  }

  setChipsLeft (val) {
    this.lcds.chips.display = val
  }

  setLevel (val) {
    this.lcds.level.display = val
  }

  setTimeLeft (val) {
    this.lcds.chips.display = val
  }
}
