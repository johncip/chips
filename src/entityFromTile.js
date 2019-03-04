import { spriteNamesByIndex } from './constants'

import Ball from './entities/ball'
import Block from './entities/block'
import Bluewall from './entities/bluewall'
import Bomb from './entities/bomb'
import Bug from './entities/bug'
import Button from './entities/button'
import Clonemachine from './entities/clonemachine'
import Collectible from './entities/collectible'
import Dirt from './entities/dirt'
import Door from './entities/door'
import Entity from './entities/entity'
import Exit from './entities/exit'
import Fire from './entities/fire'
import Fireball from './entities/fireball'
import Forcefloor from './entities/forcefloor'
import Glider from './entities/glider'
import Hint from './entities/hint'
import Ice from './entities/ice'
import Player from './entities/player'
import Socket from './entities/socket'
import Tank from './entities/tank'
import Togglewall from './entities/togglewall'
import Trap from './entities/trap'
import Wall from './entities/wall'
import Water from './entities/water'


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
