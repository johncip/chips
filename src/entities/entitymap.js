(function (TILE_SIZE) {
  /*
   * The EntityMap is a map from tile coordinate to a game entity.
   * It is a model of the given level, and the sprites are the view.
   */
  var EntityMap = Chip.EntityMap = function (upper, lower) {
    var tilemap = upper.map
    this.width = tilemap.width
    this.group = Chip.game.add.group(undefined, 'EntityMap')

    this._lower = this.mapFromLayer(lower)
    this._upper = this.mapFromLayer(upper)

    // post
    this.chipsNeeded = this.getChipsNeeded(tilemap.properties)
    this.createConnections(tilemap)
    this.createCloneMachines()
    this.promoteChip()
  }

  EntityMap.includes({
    mapFromLayer: function (layer) {
      var tiles = _.flatten(layer.layer.data)
      var res = {}

      tiles.forEach(function (tile) {
        if (tile.index >= 0) {
          var key = this._key(tile.x, tile.y)
          res[key] = Chip.Entity.fromTile(tile, this)
        }
      }, this)

      return res
    },

    createConnections: function (tilemap) {
      var connections = tilemap.objects['connections']
      if (!connections) {
        return
      }

      connections.forEach(function (object) {
        var props = object.properties

        var x = object.x / object.width
        var y = object.y / object.height
        var button = this.getLower(x, y)

        var targetX = _.parseInt(props.targetX)
        var targetY = _.parseInt(props.targetY)
        var target = this.getLower(targetX, targetY)

        if (!target) {
          throw new Error("Couldn't find button target in entity map.")
        }

        button.target = target
      }, this)
    },

    createCloneMachines: function () {
      this.eachOfType('clonemachine', function (machine) {
        var above = machine.entityAbove()

        // duplicate sprite
        this.group.create(
          above.x * TILE_SIZE,
          above.y * TILE_SIZE,
          'sprites',
          Chip.SPRITE_INDICES[above.spriteKey]
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
        return _.parseInt(properties.chipsNeeded)
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

      var lastResident = this._upper[newKey]

      delete this._upper[oldKey]
      this._upper[newKey] = entity

      entity.x = destX
      entity.y = destY

      entity.spriteTo(destX, destY)
    },

    createEntity: function (tile, layer) {
      var key = this._key(tile.x, tile.y)
      var entity = Chip.Entity.fromTile(tile, this)
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
      this.eachEntity(function (entity) {
        if (entity) {
          entity.update()
        }
      })
    },

    eachEntity: function (callback, context) {
      context = context || this
      _.each(this._lower, callback.bind(context))
      _.each(this._upper, callback.bind(context))
    },

    eachOfType: function (type, callback, context) {
      _.each(_.where(this._lower, {
        type: type
      }), callback.bind(context))

      _.each(_.where(this._upper, {
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
})(Chip.Config.TILE_SIZE)
