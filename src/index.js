import PIXI from 'pixi' // eslint-disable-line no-unused-vars
import p2 from 'p2'// eslint-disable-line no-unused-vars
import Phaser from 'phaser'

import config from './config'
import { Preload, MainMenu, Playing } from './states/index'

import 'Assets/style/style.css'

const game = new Phaser.Game(
  config.width,
  config.height,
  Phaser.AUTO,
  'gameContainer',
  null
)
game.state.add('Preload', Preload)
game.state.add('MainMenu', MainMenu)
game.state.add('Playing', Playing)
game.state.start('Preload')

require('./music')
