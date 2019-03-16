import Phaser from 'phaser'
import config from './config'
import { Preload, Playing } from './scenes'
import 'Assets/style/style.css'


const ratio = window.devicePixelRatio || 1

// eslint-disable-next-line no-new
new Phaser.Game({
  type: Phaser.AUTO,
  parent: 'gameContainer',
  width: config.width,
  height: config.height,
  resolution: ratio,
  scene: [Preload, Playing],
  scale: {
    parent: 'gameContainer',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: config.width / ratio,
    height: config.height / ratio
  }
})

require('./music')
