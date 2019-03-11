import { parseInt } from 'lodash'

import EntityMap from './entitymap'
import levels from './levels'


export default class Level {
  constructor (game, index) {
    this.game = game
    this.shortName = levels[index]

    this.tilemap = this.createTilemap()
    this.bgLayer = this.tilemap.createLayer('bg')
    this.lowerLayer = this.tilemap.createLayer('lower')
    this.upperLayer = this.tilemap.createLayer('upper')
    this.entityMap = new EntityMap(game, this.upperLayer, this.lowerLayer)
    this.inventory = this.entityMap.player.inventory // read by playing state

    this.bgLayer.resizeWorld()
    this.lowerLayer.exists = false
    this.upperLayer.exists = false
  }

  createTilemap () {
    const tilemap = this.game.add.tilemap(this.shortName)
    tilemap.addTilesetImage('chip-felix', 'tiles')
    return tilemap
  }

  destroy () {
    this.entityMap.group.destroy()
    this.inventory.group.destroy()
    this.bgLayer.destroy()
    this.lowerLayer.destroy()
    this.upperLayer.destroy()
    this.tilemap.destroy()
  }

  update () {
    this.entityMap.update()
  }

  getTimeAllowed () {
    return parseInt(this.tilemap.properties.time)
  }

  getChipsNeeded () {
    return this.entityMap.chipsNeeded
  }

  getHint () {
    return 'HINT\n\n' + this.tilemap.properties.hint
  }
}
