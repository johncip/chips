import Phaser from 'phaser'
import { each } from 'lodash'

import config from '../config'
import images from '../images'
import tilemaps from '../tilemaps'

export default class Preload extends Phaser.Scene {
  constructor () {
    super('Preload')
  }

  preload () {
    // individual images
    each(images, (val, key) => {
      this.load.image(key, val)
    })

    // level tilemaps
    this.load.image('tiles', images.spriteSheet)
    each(tilemaps, (val, key) => {
      this.load.tilemapTiledJSON(key, val)
    })

    // sprites
    const { tsize } = config
    this.load.spritesheet(
      'sprites',
      images.spriteSheet,
      { frameWidth: tsize, frameHeight: tsize }
    )
  }

  create () {
    this.scene.start(config.startState)
  }
}
