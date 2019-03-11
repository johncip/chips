import Phaser from 'phaser'
import config from './config'
import { Preload, MainMenu, Playing } from './states'

import 'Assets/style/style.css'

var gameConfig = {
  type: Phaser.AUTO,
  width: config.width,
  height: config.height,
  parent: 'gameContainer',
  scenes: [Preload, MainMenu, Playing]
}

new Phaser.Game(gameConfig) // eslint-disable-line no-new

require('./music')
