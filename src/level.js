import EntityMap from './entitymap'
import depths from './depths'
import levels from './levels'

/*
 * Wraps a tilemap and some game state (entity map, inventory).
 */
export default class Level {
  constructor (scene, index) {
    this.shortName = levels[index]

    this.map = scene.add.tilemap(this.shortName)
    const tileset = this.map.addTilesetImage('chip-felix', 'tiles')

    this.bgLayer = this.map.createStaticLayer('bg', tileset)
    this.bgLayer.depth = depths.bgLayer

    // the layer data is used to create entities, but not rendered directly
    const lower = this.map.createDynamicLayer('lower', null)
    const upper = this.map.createDynamicLayer('upper', null)

    this.entityMap = new EntityMap(scene, upper, lower)

    const camera = scene.cameras.main
    camera.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels)
  }

  destroy () {
    [
      this.entityMap.group,
      this.map
    ].forEach(x => x.destroy(true))
  }

  update (time, delta) {
    this.entityMap.update(time, delta)
  }

  getTimeAllowed () {
    return parseInt(this.map.properties.time)
  }

  getChipsNeeded () {
    return this.entityMap.chipsNeeded
  }

  getHint () {
    return this.map.properties.hint
  }
}
