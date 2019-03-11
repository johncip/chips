import Phaser from 'phaser'
import config from './config'
import { Preload, MainMenu, Playing } from './states'

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
