import { each } from 'lodash'

import config from './config'
import LCD from './lcd'

/**
 * A container for the 3 LCDs (level, time left, chips left).
 */
export default class DisplayPanel {
  constructor (game) {
    this.game = game

    this.group = game.add.group()
    this.group.fixedToCamera = true

    const mask = createMask(game)
    this.group.add(mask)

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
  const lcds = {
    level: new LCD(game, 'Level'),
    time: new LCD(game, 'Time'),
    chips: new LCD(game, 'Chips')
  }

  let top = 0.1 * config.tsize
  each(lcds, lcd => {
    lcd.group.x += 10.25 * config.tsize
    lcd.group.y = top
    top += tsize * 2.25
  })

  return lcds
}
