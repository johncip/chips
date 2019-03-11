import Phaser from 'phaser'
import config from './config'
import { Preload, MainMenu, Playing } from './scenes'

import 'Assets/style/style.css'

// eslint-disable-next-line no-new
new Phaser.Game({
  type: Phaser.AUTO,
  width: config.width,
  height: config.height,
  parent: 'gameContainer',
  scenes: [Preload, MainMenu, Playing]
})

require('./music')
