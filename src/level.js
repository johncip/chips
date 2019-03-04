import { extend, parseInt } from 'lodash'

import EntityMap from './entitymap'
import levels from './levels'


function Level (game, index) {
  this.game = game
  this.shortName = levels[index]

  this.tilemap = this.createTilemap()
  this.bgLayer = this.tilemap.createLayer('bg')
  this.lowerLayer = this.tilemap.createLayer('lower')
  this.upperLayer = this.tilemap.createLayer('upper')
  this.entityMap = new EntityMap(game, this.upperLayer, this.lowerLayer)
  this.inventory = this.entityMap.player.inventory

  this.bgLayer.resizeWorld()
  this.lowerLayer.exists = false
  this.upperLayer.exists = false
}

extend(Level.prototype, {
  createTilemap: function () {
    const tilemap = this.game.add.tilemap(this.shortName)
    tilemap.addTilesetImage('chip-felix', 'tiles')
    return tilemap
  },

  destroy: function () {
    this.entityMap.group.destroy()
    this.inventory.group.destroy()
    this.bgLayer.destroy()
    this.lowerLayer.destroy()
    this.upperLayer.destroy()
    this.tilemap.destroy()
  },

  update: function () {
    this.entityMap.update()
  },

  getTimeAllowed: function () {
    return parseInt(this.tilemap.properties.time)
  },

  getChipsNeeded: function () {
    return this.entityMap.chipsNeeded
  },

  getHint: function () {
    return 'HINT\n\n' + this.tilemap.properties.hint
  }
})

export default Level
