// import multimethod from ...

const Collidable = function () {}

const classMap = {
  key: 'Collectible',
  shoe: 'Collectible',
  ic: 'Collectible',
  force: 'ForceFloor',
  chip: 'Player',
  togglewall: 'ToggleWall',
  wall: 'Entity',
  glider: 'Entity',
  bomb: 'Entity'
}

const typeOf = function (entity) {
  var prefix = entity.type
  return classMap[prefix] || prefix.toTitleCase()
}

// eslint-disable-next-line no-unused-vars
const joinedTypes = function (entity, intruder) {
  var types = [typeOf(entity), typeOf(intruder)]
  var res = types.sort().join(' + ')

  return res
}

// Collidable.prototype.collideWith2 = multimethod()
//   .dispatch(joinedTypes)
//   //
//   .when('Player + Water', function () {
//     target.frames = {
//       '0,-1': 87,
//       '-1,0': 94,
//       '0,1': 101,
//       '1,0': 108
//     }
//     target.changeFrameDir(target.lastDir)
//     Mixins.Floor.prototype.collideWith.call(this, target)
//   })

export default Collidable
