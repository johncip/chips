import { contains, extend } from 'lodash'

import Controllable from './_controllable'
import Entity from './entity'
import Marchable from './_marchable'
import Movable from './_movable'
import Inventory from '../inventory'
import config from '../config'
import sfx from '../sfx'


function Player (game, tile, emap) {
  Entity.call(this, game, tile, emap)
  Marchable.call(this)
  Controllable.call(this)

  this.inventory = new Inventory(this.game)
  this.marchDelay = config.floorDelay

  // exports
  emap.player = this
}

Player.FRAMES = {
  '0,-1': 90,
  '-1,0': 97,
  '0,1': 104,
  '1,0': 111
}

extend(
  Player.prototype,
  Entity.prototype,
  Movable.prototype, // TODO: might not need Movable
  Marchable.prototype,
  Controllable.prototype
)

extend(Player.prototype, {
  march: function () {
    if (this.sliding) {
      const dx = this.marchDir[0]
      const dy = this.marchDir[1]
      this.move(dx, dy)
    }
  },

  move: function (dx, dy) {
    this.frames = Player.FRAMES
    this.game.hintPanel.hide()
    this.frozen = false
    Movable.prototype.move.call(this, dx, dy)

    // TODO: this might apply to all movables
    this.sliding = this.shouldSlide()
  },

  shouldSlide: function () {
    const floor = this.entityBelow()
    if (!floor) {
      return false
    }

    const slippery = floor.type === 'ice' || floor.type === 'force'
    return slippery && !floor.hasShoes(this)
  },

  hasAllChips: function () {
    return this.inventory.count('ic') === this.emap.chipsNeeded
  },

  collideWith: function (target) {
    const monsters = ['bug', 'fireball', 'ball', 'glider', 'tank']

    if (contains(monsters, target.type)) {
      sfx.lose()
      this.triggerLose()
    }
  },

  destroy: function () {
    Entity.prototype.destroy.call(this)
    this.inventory.destroy()
  },

  update: function () {
    Marchable.prototype.update.call(this)
    Controllable.prototype.update.call(this)
    this.updateCamera()
  },

  triggerWin: function () {
    this.retire()
    const state = this.game.state.getCurrentState()
    state.win(null, 1500)
  },

  triggerLose: function () {
    this.retire()
    const state = this.game.state.getCurrentState()
    state.lose('Oops!', 1500)
  }
})

export default Player
