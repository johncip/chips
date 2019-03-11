import PIXI from 'pixi' // eslint-disable-line no-unused-vars
import p2 from 'p2' // eslint-disable-line no-unused-vars
import Phaser from 'phaser'
import { each } from 'lodash'

import config from '../config'
import images from '../images'
import tilemaps from '../tilemaps'

export default class Preload {
  preload () {
    const { tsize } = config

    this.game.stage.backgroundColor = config.bgColor

    each(images, (fname, key) =>
      this.load.image(key, fname)
    )
    each(tilemaps, (val, key) => {
      this.load.tilemap(key, null, val, Phaser.Tilemap.TILED_JSON)
    })
    this.load.image('tiles', images.spriteSheet)
    this.load.spritesheet('sprites', images.spriteSheet, tsize, tsize, 112)
  }

  create () {
    this.state.start(config.startState)
  }
}
