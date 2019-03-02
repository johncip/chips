import Phaser, { Sprite, Group } from 'phaser'
import { extend } from 'lodash'

import config from './config.js'
// TODO: namespace states
import Preload from './states/preload.js'
import MainMenu from './states/mainmenu.js'
import Playing from './states/playing.js'

Sprite.prototype.bringToFront = function () {
  if (this.parent) {
    var parent = this.parent
    parent.removeChild(this)
    parent.addChild(this)
  }
}

extend(Group.prototype, {
  promote: function () {
    this.game.world.bringToTop(this)
  },

  hide: function () {
    this.forEach(function (item) {
      item.exists = false
    })
  },

  show: function () {
    this.forEach(function (item) {
      item.exists = true
    })
  }
})

function start (canvasParentId) {
  const game = new Phaser.Game(
    config.WIDTH,
    config.HEIGHT,
    Phaser.AUTO,
    canvasParentId,
    null
  )

  game.state.add('Preload', Preload)
  game.state.add('MainMenu', MainMenu)
  game.state.add('Playing', Playing)
  game.state.start('Preload')
}

start('canvasContainer')
