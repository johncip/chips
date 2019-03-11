import { spriteNamesByIndex } from './constants'

import Ball from './entities/ball'
import Block from './entities/block'
import BlueWall from './entities/bluewall'
import Bomb from './entities/bomb'
import Bug from './entities/bug'
import Button from './entities/button'
import CloneMachine from './entities/clonemachine'
import Collectible from './entities/collectible'
import Dirt from './entities/dirt'
import Door from './entities/door'
import Entity from './entities/entity'
import Exit from './entities/exit'
import Fire from './entities/fire'
import Fireball from './entities/fireball'
import ForceFloor from './entities/forcefloor'
import Glider from './entities/glider'
import Hint from './entities/hint'
import Ice from './entities/ice'
import Player from './entities/player'
import Socket from './entities/socket'
import Tank from './entities/tank'
import ToggleWall from './entities/togglewall'
import Trap from './entities/trap'
import Wall from './entities/wall'
import Water from './entities/water'


const entities = {
  Ball,
  Block,
  BlueWall,
  Bomb,
  Bug,
  Button,
  CloneMachine,
  Collectible,
  Dirt,
  Door,
  Entity,
  Exit,
  Fire,
  Fireball,
  ForceFloor,
  Glider,
  Hint,
  Ice,
  Player,
  Socket,
  Tank,
  ToggleWall,
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
