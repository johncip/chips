import PIXI from 'pixi' // eslint-disable-line no-unused-vars
import p2 from 'p2'// eslint-disable-line no-unused-vars
import Phaser from 'phaser'
import { each, extend } from 'lodash'
import config from '../config.js'
import levels from '../levels.js'

const images = {
  black: 'assets/images/black.png',
  boxart: 'assets/images/boxart.jpg',
  inventorybg: 'assets/images/inventorybg.png',
  lcd: 'assets/fonts/lcd.png',
  tiles: config.SPRITE_SHEET
}

const Preload = function () {}

extend(Preload.prototype, {
  preload: function () {
    this.game.stage.backgroundColor = config.BG_COLOR
    this.load.spritesheet(
      'sprites',
      config.SPRITE_SHEET,
      config.TILE_SIZE,
      config.TILE_SIZE,
      112
    )

    each(images, this.loadImage, this)
    each(levels, this.loadTilemap, this)
  },

  loadTilemap: function (name) {
    this.load.tilemap(
      name,
      `assets/tilemaps/${name}.json`,
      null,
      Phaser.Tilemap.TILED_JSON
    )
  },

  loadImage: function (fname, key) {
    this.load.image(key, fname)
  },

  create: function () {
    this.state.start(config.START_STATE)
  }
})

export default Preload
