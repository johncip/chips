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
    const { tsize, bgColor } = config

    this.game.stage.backgroundColor = bgColor

    each(images, (fname, key) => this.load.image(key, fname))
    each(tilemaps, (val, key) => {
      this.load.tilemap(key, null, val, Phaser.Tilemap.TILED_JSON)
    })
    this.load.image('tiles', images.spriteSheet)
    this.load.spritesheet('sprites', images.spriteSheet, tsize, tsize, 112)
  }

  create () {
    this.scene.start(config.startState)
  }
}
