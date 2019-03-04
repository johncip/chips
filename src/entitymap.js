import { each, extend, filter, flatten, parseInt } from 'lodash'

import config from './config'
import entityFromTile from './entityFromTile'
import { spriteIndicesByName } from './constants'


/*
 * The EntityMap is a map from tile coordinate to a game entity.
 * It is a model of the given level, and the sprites are the view.
 */
function EntityMap (game, upper, lower) {
  this.game = game
  const tilemap = upper.map
  this.width = tilemap.width
  this.group = game.add.group(undefined, 'EntityMap')

  this._lower = this.mapFromLayer(lower)
  this._upper = this.mapFromLayer(upper)

  // post
  this.chipsNeeded = this.getChipsNeeded(tilemap.properties)
  this.createConnections(tilemap)
  this.createCloneMachines()
  this.promoteChip()
}

extend(EntityMap.prototype, {
  mapFromLayer: function (layer) {
    const tiles = flatten(layer.layer.data)
    const res = {}

    tiles.forEach(tile => {
      if (tile.index >= 0) {
        const key = this._key(tile.x, tile.y)
        res[key] = entityFromTile(this.game, tile, this)
      }
    })

    return res
  },

  createConnections: function (tilemap) {
    const connections = tilemap.objects['connections']
    if (!connections) return

    connections.forEach(obj => {
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
  },

  createCloneMachines: function () {
    this.eachOfType('clonemachine', machine => {
      const above = machine.entityAbove()

      // duplicate sprite
      this.group.create(
        above.x * config.tsize,
        above.y * config.tsize,
        'sprites',
        spriteIndicesByName[above.spriteKey]
      )

      machine.template = above.spriteKey
      above.retire()
    })
  },

  promoteChip: function () {
    this.eachOfType('chip', player => {
      this.group.bringToTop(player.sprite)
    })
  },

  getChipsNeeded: function (properties) {
    if (properties.chipsNeeded) {
      return parseInt(properties.chipsNeeded)
    } else {
      let total = 0
      this.eachOfType('ic', player => { total++ })
      return total
    }
  },

  get: function (x, y) {
    return this.getUpper(x, y) || this.getLower(x, y)
  },

  getUpper: function (x, y) {
    const key = this._key(x, y)
    const res = this._upper[key]

    if (res && res.exists()) {
      return res
    }
  },

  getLower: function (x, y) {
    const key = this._key(x, y)
    const res = this._lower[key]

    if (res && res.exists()) {
      return res
    }
  },

  moveEntity: function (entity, dx, dy) {
    const destX = entity.x + dx
    const destY = entity.y + dy
    this.moveEntityAbs(entity, destX, destY)
  },

  moveEntityAbs: function (entity, destX, destY) {
    const oldKey = this._key(entity.x, entity.y)
    const newKey = this._key(destX, destY)

    // var lastResident = this._upper[newKey]

    delete this._upper[oldKey]
    this._upper[newKey] = entity

    entity.x = destX
    entity.y = destY

    entity.spriteTo(destX, destY)
  },

  createEntity: function (tile, layer) {
    const key = this._key(tile.x, tile.y)
    const entity = entityFromTile(this.game, tile, this)
    layer[key] = entity

    return entity
  },

  createUpper: function (tile) {
    return this.createEntity(tile, this._upper)
  },

  createLower: function (tile) {
    return this.createEntity(tile, this._lower)
  },

  update: function () {
    this.eachEntity(entity => {
      if (!entity) return
      entity.update()
    })
  },

  eachEntity: function (fn) {
    each(this._lower, ent => fn(ent))
    each(this._upper, ent => fn(ent))
  },

  eachOfType: function (type, fn) {
    each(filter(this._lower, { type: type }), ent => fn(ent))
    each(filter(this._upper, { type: type }), ent => fn(ent))
  },

  resetTraps: function () {
    this.eachOfType('button', button => {
      if (button.subtype !== 'brown') {
        return
      }

      button.target.close()
      if (button.entityAbove()) {
        button.target.open()
      }
    })
  },

  _key: function (x, y) {
    return y * this.width + x
  }
})

export default EntityMap
