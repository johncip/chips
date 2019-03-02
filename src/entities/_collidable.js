(function (Mixins) {

  var Collidable = Chip.Mixins.Collidable = function () {};

  var classMap = {
    key: 'Collectible',
    shoe: 'Collectible',
    ic: 'Collectible',
    force: 'ForceFloor',
    chip: 'Player',
    togglewall: 'ToggleWall',
    wall: 'Entity',
    glider: 'Entity',
    bomb: 'Entity'
  };

  var typeOf = function(entity) {
    var prefix = entity.type;
    return classMap[prefix] || prefix.toTitleCase();
  };

  var joinedTypes = function (entity, intruder) {
    var types = [typeOf(entity), typeOf(intruder)];
    var res = types.sort().join(' + ');

    return res;
  };

  Collidable.prototype.collideWith2 = multimethod()
    .dispatch(joinedTypes)
    //
    .when('Player + Water', function() {
      target.frames = {
        '0,-1': 87,
        '-1,0': 94,
        '0,1': 101,
        '1,0': 108
      };
      target.changeFrameDir(target.lastDir);
      Mixins.Floor.prototype.collideWith.call(this, target);

    });

})(Chip.Mixins);
