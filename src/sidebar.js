import { each } from 'lodash'

import config from './config'
import LCD from './lcd'

/**
 * The sidebar is a container for the 3 LCDs.
 */
export default class Sidebar {
  constructor (game) {
    this.game = game

    const group = game.add.group()
    group.fixedToCamera = true

    const mask = createMask(game)
    group.add(mask)

    this.lcds = createLcds(game)
    each(this.lcds, lcd => this.group.add(lcd.group))
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

const { tsize, bgColor } = config

function createMask (game) {
  const mask = game.add.graphics()
  mask.beginFill(bgColor, 1.0)
  mask.drawRect(9 * tsize, 0, 5 * tsize, 9 * tsize)

  return mask
}

function createLcds (game) {
  this.lcds = {
    level: new LCD(this.game, 'Level'),
    time: new LCD(this.game, 'Time'),
    chips: new LCD(this.game, 'Chips')
  }

  let top = 0.1 * config.tsize
  each(this.lcds, (lcd) => {
    lcd.group.x += 10.25 * config.tsize
    lcd.group.y = top
    top += tsize * 2.25
  })
}

