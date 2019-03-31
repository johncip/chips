import Phaser from 'phaser'
import SwipePlugin from 'phaser3-swipe-plugin'
import config from './config'
import { Preload, Playing } from './scenes'
import 'Assets/style/style.css'

const { width, height } = config

const ratio = window.devicePixelRatio || 1

// eslint-disable-next-line no-new
new Phaser.Game({
  type: Phaser.AUTO,
  parent: 'gameContainer',
  width: width,
  height: height,
  resolution: ratio,
  scene: [Preload, Playing],
  transparent: true,
  scale: {
    parent: 'gameContainer',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: width / ratio,
    height: height / ratio
  },
  plugins: {
    global: [
      {
        key: 'SwipePlugin',
        plugin: SwipePlugin,
        start: true
      }
    ]
  }
})

require('./music')
