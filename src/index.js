import PIXI from 'pixi' // eslint-disable-line no-unused-vars
import p2 from 'p2'// eslint-disable-line no-unused-vars
import Phaser, { Group } from 'phaser'
import { extend } from 'lodash'

import config from './config.js'
import Preload from './states/preload.js' // TODO: namespace states
import MainMenu from './states/mainmenu.js'
import Playing from './states/playing.js'


extend(Group.prototype, {
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
