import { each, extend, flatten, parseInt, where } from 'lodash'

import config from '../config.js'
import entityFromTile from './entityFromTile.js'
import { spriteIndicesByName } from '../static.js'


/*
 * The EntityMap is a map from tile coordinate to a game entity.
 * It is a model of the given level, and the sprites are the view.
 */
function EntityMap (game, upper, lower) {
  this.game = game
  var tilemap = upper.map
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
    var tiles = flatten(layer.layer.data)
    var res = {}

    tiles.forEach(tile => {
      if (tile.index >= 0) {
        var key = this._key(tile.x, tile.y)
        res[key] = entityFromTile(this.game, tile, this)
      }
    })

    return res
  },

  createConnections: function (tilemap) {
    var connections = tilemap.objects['connections']
    if (!connections) return

    connections.forEach(obj => {
      var props = obj.properties

      var x = obj.x / obj.width
      var y = obj.y / obj.height
      var button = this.getLower(x, y)

      var targetX = parseInt(props.targetX)
      var targetY = parseInt(props.targetY)
      var target = this.getLower(targetX, targetY)

      if (!target) {
        throw new Error("Couldn't find button target in entity map.")
      }

      button.target = target
    })
  },

  createCloneMachines: function () {
    this.eachOfType('clonemachine', function (machine) {
      var above = machine.entityAbove()

      // duplicate sprite
      this.group.create(
        above.x * config.tsize,
        above.y * config.tsize,
        'sprites',
        spriteIndicesByName[above.spriteKey]
      )

      machine.template = above.spriteKey
      above.retire()
    }, this)
  },

  promoteChip: function () {
    this.eachOfType('chip', function (player) {
      this.group.bringToTop(player.sprite)
    }, this)
  },

  getChipsNeeded: function (properties) {
    if (properties.chipsNeeded) {
      return parseInt(properties.chipsNeeded)
    } else {
      var total = 0
      this.eachOfType('ic', function (player) {
        total++
      }, this)
      return total
    }
  },

  get: function (x, y) {
    return this.getUpper(x, y) || this.getLower(x, y)
  },

  getUpper: function (x, y) {
    var key = this._key(x, y)
    var res = this._upper[key]

    if (res && res.exists()) {
      return res
    }
  },

  getLower: function (x, y) {
    var key = this._key(x, y)
    var res = this._lower[key]

    if (res && res.exists()) {
      return res
    }
  },

  moveEntity: function (entity, dx, dy) {
    var destX = entity.x + dx
    var destY = entity.y + dy
    this.moveEntityAbs(entity, destX, destY)
  },

  moveEntityAbs: function (entity, destX, destY) {
    var oldKey = this._key(entity.x, entity.y)
    var newKey = this._key(destX, destY)

    // var lastResident = this._upper[newKey]

    delete this._upper[oldKey]
    this._upper[newKey] = entity

    entity.x = destX
    entity.y = destY

    entity.spriteTo(destX, destY)
  },

  createEntity: function (tile, layer) {
    var key = this._key(tile.x, tile.y)
    var entity = entityFromTile(this.game, tile, this)
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

  eachEntity: function (callback, context) {
    context = context || this
    each(this._lower, callback.bind(context))
    each(this._upper, callback.bind(context))
  },

  eachOfType: function (type, callback, context) {
    each(where(this._lower, {
      type: type
    }), callback.bind(context))

    each(where(this._upper, {
      type: type
    }), callback.bind(context))
  },

  resetTraps: function () {
    this.eachOfType('button', function (button) {
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
