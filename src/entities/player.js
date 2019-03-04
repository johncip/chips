import { contains, extend } from 'lodash'

import Controllable from './_controllable.js'
import Entity from './entity.js'
import Marchable from './_marchable.js'
import Movable from './_movable.js'
import Inventory from '../inventory.js'
import config from '../config.js'
import sfx from '../sfx.js'


function Player (game, tile, emap) {
  Entity.call(this, game, tile, emap)
  Marchable.call(this)
  Controllable.call(this)

  // TODO: hopefully this.game works here
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

// TODO: might not need to extend Movable
Player.extends(Entity, Movable, Marchable, Controllable)

extend(Player.prototype, {
  march: function () {
    if (this.sliding) {
      var dx = this.marchDir[0]
      var dy = this.marchDir[1]
      this.move(dx, dy)
    }
  },

  move: function (dx, dy) {
    this.frames = Player.FRAMES

    // TODO: hopefully this.game works here
    this.game.hintPanel.hide()

    this.frozen = false

    Movable.prototype.move.call(this, dx, dy)

    // TODO: this might apply to all movables
    this.sliding = this.shouldSlide()
  },

  shouldSlide: function () {
    var floor = this.entityBelow()
    if (!floor) {
      return false
    }

    var slippery = floor.type === 'ice' || floor.type === 'force'
    return slippery && !floor.hasShoes(this)
  },

  hasAllChips: function () {
    return this.inventory.count('ic') === this.emap.chipsNeeded
  },

  collideWith: function (target) {
    var monsters = ['bug', 'fireball', 'ball', 'glider', 'tank']

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
    // TODO: hopefully this.game works here
    var state = this.game.state.getCurrentState()
    state.win(null, 1500)
  },

  triggerLose: function () {
    this.retire()
    // TODO: hopefully this.game works here
    var state = this.game.state.getCurrentState()
    state.lose('Oops!', 1500)
  }
})

export default Player
