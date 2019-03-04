import { spriteNamesByIndex } from './constants.js'

import Ball from './entities/ball.js'
import Block from './entities/block.js'
import Bluewall from './entities/bluewall.js'
import Bomb from './entities/bomb.js'
import Bug from './entities/bug.js'
import Button from './entities/button.js'
import Clonemachine from './entities/clonemachine.js'
import Collectible from './entities/collectible.js'
import Dirt from './entities/dirt.js'
import Door from './entities/door.js'
import Entity from './entities/entity.js'
import Exit from './entities/exit.js'
import Fire from './entities/fire.js'
import Fireball from './entities/fireball.js'
import Forcefloor from './entities/forcefloor.js'
import Glider from './entities/glider.js'
import Hint from './entities/hint.js'
import Ice from './entities/ice.js'
import Player from './entities/player.js'
import Socket from './entities/socket.js'
import Tank from './entities/tank.js'
import Togglewall from './entities/togglewall.js'
import Trap from './entities/trap.js'
import Wall from './entities/wall.js'
import Water from './entities/water.js'


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

function titleCase (str) {
  return str.replace(/\w\S*/g, s => (
    s.charAt(0).toUpperCase() + s.substr(1).toLowerCase()
  ))
}

/*
 * Creates an entity with class based on the type of the given tile.
 * Defaults to Entity.
 */
export default function entityFromTile (game, tile, emap) {
  const key = spriteNamesByIndex[tile.index - 1]
  if (!key) {
    throw new Error('no tile for: ' + (tile.index - 1))
  }

  const prefix = key.split(':')[0]
  const constructor = classMap[prefix] || titleCase(prefix)

  if (!entities[constructor]) {
    throw new Error('not a constructor: ' + constructor)
  }

  return new entities[constructor](game, tile, emap)
}
