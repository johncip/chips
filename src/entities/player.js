import { throttle } from 'lodash'
import config from '../config'
import depths from '../depths'
import sfx from '../sfx'
import Marchable from './marchable'

const FRAMES = {
  '0,-1': 90,
  '-1,0': 97,
  '0,1': 104,
  '1,0': 111
}

export default class Player extends Marchable {
  constructor (scene, tile, entityMap) {
    super(scene, tile, entityMap)

    this.cursors = this.scene.input.keyboard.createCursorKeys()
    this.marchDelay = config.floorDelay
    this.sprite.depth = depths.chip

    this.scene.game.events.on('swipe', throttle(dir => {
      switch (dir) {
        case 'up': this.move(0, -1); break
        case 'left': this.move(-1, 0); break
        case 'down': this.move(0, 1); break
        case 'right': this.move(1, 0); break
      }
    }, 250))

    // exports
    entityMap.player = this // TODO: don't do this here
  }

  march () {
    if (!this.sliding) {
      return
    }

    this.move(...this.marchDir)
  }

  move (dx, dy) {
    this.frames = FRAMES
    this.scene.hideHint() // TODO: this should not be in player.js
    this.frozen = false
    super.move(dx, dy)

    // TODO: this might apply to all movables
    this.sliding = this.shouldSlide()
  }

  shouldSlide () {
    const floor = this.entityBelow()
    if (!floor) {
      return false
    }

    const slippery = floor.type === 'ice' || floor.type === 'force'
    return slippery && !floor.hasShoes(this)
  }

  collideWith (target) {
    const monsters = ['bug', 'fireball', 'ball', 'glider', 'tank']

    if (monsters.includes(target.type)) {
      sfx.lose()
      this.triggerLose()
    }
  }

  destroy () {
    super.destroy()
  }

  update (time, delta) {
    super.update(time, delta)

    if (!this.scene.paused && !this.frozen) {
      checkCursorKeys({
        keyboard: this.scene.input.keyboard,
        cursors: this.cursors,
        delay: 250,
        moveFn: this.move.bind(this)
      })
    }
    this.updateCamera()
  }

  // TODO: move to playing.js
  triggerWin () {
    this.retire()
    this.scene.win('Yowzer! You win!', 1500)
  }

  // TODO: move to playing.js
  triggerLose () {
    this.retire()
    this.scene.lose('Oops!', 1500)
  }

  // TODO: use startFollow
  updateCamera () {
    const { x, y } = this.sprite
    const { tsize } = config
    const camera = this.scene.cameras.main
    camera.centerOn(x + tsize / 2, y + tsize / 2)
  }
}

function checkCursorKeys ({ keyboard, cursors, delay, moveFn }) {
  const { up, down, left, right } = cursors

  if (keyboard.checkDown(up, delay)) { moveFn(0, -1) }
  if (keyboard.checkDown(left, delay)) { moveFn(-1, 0) }
  if (keyboard.checkDown(down, delay)) { moveFn(0, 1) }
  if (keyboard.checkDown(right, delay)) { moveFn(1, 0) }
}
