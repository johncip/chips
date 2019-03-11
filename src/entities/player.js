import { includes } from 'lodash'
import Inventory from '../inventory'
import config from '../config'
import sfx from '../sfx'
import Marchable from './marchable'

const FRAMES = {
  '0,-1': 90,
  '-1,0': 97,
  '0,1': 104,
  '1,0': 111
}

export default class Player extends Marchable {
  constructor (game, tile, entityMap) {
    super(game, tile, entityMap)
    this.createCursorKeys()

    this.inventory = new Inventory(this.game)
    this.marchDelay = config.floorDelay

    // exports
    entityMap.player = this // TODO: don't do this here
  }

  march () {
    if (this.sliding) {
      const dx = this.marchDir[0]
      const dy = this.marchDir[1]
      this.move(dx, dy)
    }
  }

  move (dx, dy) {
    this.frames = FRAMES
    this.game.hintPanel.hide()
    this.frozen = false
    super.move.call(this, dx, dy)

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

  hasAllChips () {
    return this.inventory.count('ic') === this.entityMap.chipsNeeded
  }

  collideWith (target) {
    const monsters = ['bug', 'fireball', 'ball', 'glider', 'tank']

    if (includes(monsters, target.type)) {
      sfx.lose()
      this.triggerLose()
    }
  }

  destroy () {
    super.destroy.call(this)
    this.inventory.destroy()
  }

  update () {
    super.update.call(this)
    this.updatePosition()
    this.updateCamera()
  }

  triggerWin () {
    this.retire()
    const state = this.game.state.getCurrentState()
    state.win(null, 1500)
  }

  triggerLose () {
    this.retire()
    const state = this.game.state.getCurrentState()
    state.lose('Oops!', 1500)
  }

  createCursorKeys () {
    const { keyboard } = this.game.input

    this.cursors = keyboard.createCursorKeys()
    keyboard.onUpCallback = () => this.enableMove()

    this.enableMove()
  }

  enableMove () {
    this.moveSafe = true
    this.lastMove = this.game.time.now
  }

  updatePosition () {
    this.updateThrottle()

    if (!this.exists() || !this.moveSafe || this.frozen) {
      return
    }

    if (this.cursors.up.isDown) {
      this.move(0, -1)
      this.moveSafe = false
    }
    if (this.cursors.left.isDown) {
      this.move(-1, 0)
      this.moveSafe = false
    }
    if (this.cursors.down.isDown) {
      this.move(0, 1)
      this.moveSafe = false
    }
    if (this.cursors.right.isDown) {
      this.move(1, 0)
      this.moveSafe = false
    }
  }

  updateThrottle () {
    const waited = (now - this.lastMove) > config.moveDelay
    const { now } = this.game.time

    if (waited) {
      this.enableMove()
    }
  }

  updateCamera () {
    const {
      game: { world, camera },
      sprite
    } = this
    const { tsize } = config

    let cx = sprite.x - 4 * tsize
    let cy = sprite.y - 4 * tsize

    if (cx < 0) {
      cx = 0
    }

    if (cy < 0) {
      cy = 0
    }

    if (cx > world.width - 9 * tsize) {
      cx = world.width - 9 * tsize
    }

    if (cy > world.height - 9 * tsize) {
      cy = world.height - 9 * tsize
    }

    camera.view.x = cx
    camera.view.y = cy
  }
}
