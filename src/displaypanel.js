import { each } from 'lodash'
import config from './config'
import depths from './depths'
import LCD from './lcd'

// TODO: try extending Group
/**
 * A group for the 3 LCDs (level, time left, chips left).
 */
export default class DisplayPanel {
  constructor (scene) {
    this.group = scene.add.group()

    const bg = createBg(scene)
    this.group.add(bg)

    this.lcds = createLcds(scene)
    each(this.lcds, lcd => {
      lcd.group.children.each(lcdChild => {
        this.group.add(lcdChild)
      })
    })

    this.each(child => child.setScrollFactor(0))
  }

  setChipsLeft (val) {
    this.lcds.chips.display = val
  }

  setLevel (val) {
    this.lcds.level.display = val
  }

  setTimeLeft (val) {
    this.lcds.time.display = val
  }

  each (fn) {
    this.group.children.each(fn)
  }
}

const { tsize, bgColor } = config

function createBg (scene) {
  const g = scene.add.graphics()
  g.fillStyle(bgColor, 1.0)
  g.fillRect(9 * tsize, 0, 5 * tsize, 9 * tsize)
  g.depth = depths.displayPanelBack
  return g
}

function createLcds (scene) {
  const lcds = {
    level: new LCD(scene, 'Level'),
    time: new LCD(scene, 'Time'),
    chips: new LCD(scene, 'Chips')
  }

  let y = 0.1 * tsize
  each(lcds, lcd => {
    lcd.setX(10 * tsize)
    lcd.setY(y)
    y += tsize * 2.25
  })

  return lcds
}
