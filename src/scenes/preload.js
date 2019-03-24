import Phaser from 'phaser'
import { each } from 'lodash'

import config from '../config'
import tilemaps from '../tilemaps'
import spriteSheet from 'Assets/images/felix-64.png'

export default class Preload extends Phaser.Scene {
  constructor () {
    super('Preload')
  }

  preload () {
    // level tilemaps
    this.load.image('tiles', spriteSheet)
    each(tilemaps, (val, key) => {
      this.load.tilemapTiledJSON(key, val)
    })

    // sprites
    const { tsize } = config
    this.load.spritesheet(
      'sprites',
      spriteSheet,
      { frameWidth: tsize, frameHeight: tsize }
    )
  }

  create () {
    this.scene.start(config.startState)
  }
}
