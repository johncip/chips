import each from 'lodash/each'
import filter from 'lodash/filter'
import flatten from 'lodash/flatten'

import config from './config'
import entityFromTile from './entityfromtile'
import { spriteIndicesByName } from './constants'

/*
 * The EntityMap is a map from tile coordinate to an Entity.
 * It is a model of the given level, and the sprites are the view.
 */
export default class EntityMap {
  constructor (scene, upper, lower) {
    this.scene = scene
    this.tilemap = upper.tilemap
    this.group = scene.add.group()

    this._lower = this.mapFromLayer(lower)
    this._upper = this.mapFromLayer(upper)

    // requires layers to be loaded
    this.chipsNeeded = this.getChipsNeeded(this.tilemap.properties)

    const connectionsLayer = this.tilemap.objects.find(x => x.name === 'connections')
    if (connectionsLayer) {
      this.createConnections(connectionsLayer)
    }

    this.createCloneMachines()
  }

  mapFromLayer (layer) {
    const tiles = flatten(layer.layer.data)
    const res = {}

    tiles.forEach(tile => {
      if (tile.index >= 0) {
        const key = this._key(tile.x, tile.y)
        // TODO: set depth
        res[key] = entityFromTile(this.scene, tile, this)
      }
    })

    return res
  }

  createConnections (connectionsLayer) {
    connectionsLayer.objects.forEach(obj => {
      const props = obj.properties

      const x = obj.x / obj.width
      const y = obj.y / obj.height
      const button = this.getLower(x, y)

      const targetX = parseInt(props.targetX)
      const targetY = parseInt(props.targetY)
      const target = this.getLower(targetX, targetY)

      if (!target) {
        throw new Error("Couldn't find button target in entity map.")
      }

      button.target = target
    })
  }

  createCloneMachines () {
    this.eachOfType('clonemachine', machine => {
      const above = machine.entityAbove()

      // duplicate sprite
      const stamp = this.group.create(
        above.x * config.tsize,
        above.y * config.tsize,
        'sprites',
        spriteIndicesByName[above.spriteKey]
      )
      stamp.setOrigin(0)

      machine.template = above.spriteKey
      above.retire()
    })
  }

  getChipsNeeded (properties) {
    if (properties.chipsNeeded) {
      return parseInt(properties.chipsNeeded)
    }

    let total = 0
    this.eachOfType('ic', player => { total++ })
    return total
  }

  get (x, y) {
    return this.getUpper(x, y) || this.getLower(x, y)
  }

  getUpper (x, y) {
    const res = this._upper[this._key(x, y)]
    return res && res.exists() ? res : null
  }

  getLower (x, y) {
    const res = this._lower[this._key(x, y)]
    return res && res.exists() ? res : null
  }

  moveEntity (entity, dx, dy) {
    const destX = entity.x + dx
    const destY = entity.y + dy
    this.moveEntityAbs(entity, destX, destY)
  }

  removeEntity (entity) {
    const key = this._key(entity.x, entity.y)
    // TODO: only delete from the right one
    delete this._upper[key]
    delete this._lower[key]
  }

  moveEntityAbs (entity, destX, destY) {
    const oldKey = this._key(entity.x, entity.y)
    const newKey = this._key(destX, destY)

    delete this._upper[oldKey]
    this._upper[newKey] = entity

    entity.x = destX
    entity.y = destY

    entity.spriteTo(destX, destY)
  }

  createEntity (tile, layer) {
    const key = this._key(tile.x, tile.y)
    const entity = entityFromTile(this.scene, tile, this)
    layer[key] = entity

    return entity
  }

  update (time, delta) {
    this.eachEntity(entity => {
      if (!entity) {
        return
      }
      entity.update(time, delta)
    })
  }

  eachEntity (fn) {
    each(this._lower, ent => fn(ent))
    each(this._upper, ent => fn(ent))
  }

  eachOfType (type, fn) {
    each(filter(this._lower, { type }), ent => fn(ent))
    each(filter(this._upper, { type }), ent => fn(ent))
  }

  resetTraps () {
    this.eachOfType('button', button => {
      if (button.subtype !== 'brown') {
        return
      }

      button.target.close()
      if (button.entityAbove()) {
        button.target.open()
      }
    })
  }

  _key (x, y) {
    return y * this.tilemap.width + x
  }
}
