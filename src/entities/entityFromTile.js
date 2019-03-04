import { spriteNamesByIndex } from '../static.js'

import Ball from './ball.js'
import Block from './block.js'
import Bluewall from './bluewall.js'
import Bomb from './bomb.js'
import Bug from './bug.js'
import Button from './button.js'
import Clonemachine from './clonemachine.js'
import Collectible from './collectible.js'
import Dirt from './dirt.js'
import Door from './door.js'
import Entity from './entity.js'
import Exit from './exit.js'
import Fire from './fire.js'
import Fireball from './fireball.js'
import Forcefloor from './forcefloor.js'
import Glider from './glider.js'
import Hint from './hint.js'
import Ice from './ice.js'
import Player from './player.js'
import Socket from './socket.js'
import Tank from './tank.js'
import Togglewall from './togglewall.js'
import Trap from './trap.js'
import Wall from './wall.js'
import Water from './water.js'


const entities = {
  Ball,
  Block,
  Bluewall,
  Bomb,
  Bug,
  Button,
  Clonemachine,
  Collectible,
  Dirt,
  Door,
  Entity,
  Exit,
  Fire,
  Fireball,
  Forcefloor,
  Glider,
  Hint,
  Ice,
  Player,
  Socket,
  Tank,
  Togglewall,
  Trap,
  Wall,
  Water
}

const classMap = {
  key: 'Collectible',
  shoe: 'Collectible',
  ic: 'Collectible',
  force: 'ForceFloor',
  chip: 'Player',
  clonemachine: 'CloneMachine',
  togglewall: 'ToggleWall',
  bluewall: 'BlueWall'
}

/*
 * Creates an entity with class based on the type of the given tile.
 * Defaults to Entity.
 */
export default function entityFromTile (game, tile, emap) {
  var key = spriteNamesByIndex[tile.index - 1]
  if (!key) {
    throw new Error('no tile for: ' + (tile.index - 1))
  }

  var prefix = key.split(':')[0]
  var constructor = classMap[prefix] || prefix.toTitleCase()

  if (!entities[constructor]) {
    throw new Error('not a constructor: ' + constructor)
  }

  return new entities[constructor](game, tile, emap)
}
