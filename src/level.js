import { parseInt } from 'lodash'
import EntityMap from './entitymap'
import config from './config'
import depths from './depths'
import levels from './levels'

/*
 * Wraps a tilemap and some game state (entity map, inventory).
 */
export default class Level {
  constructor (scene, index) {
    this.shortName = levels[index]

    const map = scene.add.tilemap(this.shortName)
    map.addTilesetImage('chip-felix', 'tiles')

    const camera = scene.cameras.main
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
    camera.setViewport(0, 0, config.width, config.height)

    this.bgLayer = map.createStaticLayer('bg')
    this.bgLayer.depth = depths.bgLayer

    this.lower = map.createDynamicLayer('lower')
    this.lower.depth = depths.lowerLayer

    this.upper = map.createDynamicLayer('upper')
    this.upper.depth = depths.upperLayer

    this.entityMap = new EntityMap(scene, this.upper, this.lower)

    // read by playing state
    // TODO: don't create this in the player
    this.inventory = this.entityMap.player.inventory

    // this.bgLayer.resizeWorld()
    this.bgLayer.setVisible(true)
    this.lower.setVisible(true)
    this.upper.setVisible(true)

    this.map = map
  }

  destroy () {
    [
      this.entityMap.group,
      this.inventory.group,
      this.map
    ].forEach(x => x.destroy(true))
  }

  update () {
    this.entityMap.update()
  }

  getTimeAllowed () {
    return parseInt(this.map.properties.time)
  }

  getChipsNeeded () {
    return this.entityMap.chipsNeeded
  }

  getHint () {
    return 'HINT\n\n' + this.map.properties.hint
  }
}
