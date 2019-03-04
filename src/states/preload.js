import PIXI from 'pixi' // eslint-disable-line no-unused-vars
import p2 from 'p2' // eslint-disable-line no-unused-vars
import Phaser from 'phaser'
import { each, extend } from 'lodash'

import config from '../config.js'
import images from '../images.js'
import tilemaps from '../tilemaps.js'


function Preload () {}

extend(Preload.prototype, {
  preload: function () {
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
  },

  create: function () {
    this.state.start(config.startState)
  }
})

export default Preload
