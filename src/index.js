import PIXI from 'pixi' // eslint-disable-line no-unused-vars
import p2 from 'p2'// eslint-disable-line no-unused-vars
import Phaser, { Sprite, Group } from 'phaser'
import { extend } from 'lodash'

import config from './config.js'
import Preload from './states/preload.js' // TODO: namespace states
import MainMenu from './states/mainmenu.js'
import Playing from './states/playing.js'


// TODO: these might need to be run everywhere Sprite / Group are imported
extend(Sprite.prototype, {
  bringToFront: function () {
    if (this.parent) {
      var parent = this.parent
      parent.removeChild(this)
      parent.addChild(this)
    }
  }
})

extend(Group.prototype, {
  promote: function () {
    this.game.world.bringToTop(this)
  },

  hide: function () {
    this.forEach(item => { item.exists = false })
  },

  show: function () {
    this.forEach(item => { item.exists = true })
  }
})

const game = new Phaser.Game(
  config.width,
  config.height,
  Phaser.AUTO,
  'canvasContainer',
  null
)
game.state.add('Preload', Preload)
game.state.add('MainMenu', MainMenu)
game.state.add('Playing', Playing)
game.state.start('Preload')
