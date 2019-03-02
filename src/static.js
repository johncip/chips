var Chip = Chip || {
  Mixins: {},

  Config: {
    animateMoves: true,
    //
    BG_COLOR: 0x333344,
    FLOOR_DELAY: (1000 / 10),
    HEIGHT: 576,
    LCD_BG_COLOR: 0x301010,
    MOVE_DELAY: (1000 / 3),
    MUSIC_VOLUME: 0.25,
    SPRITE_SHEET: 'assets/tilemaps/sets/felix-big.png',
    TILE_SIZE: 64,
    WIDTH: 896,
    //
    DEBUG: false,
    ENABLE_MUSIC: true,
    START_LEVEL: 0,
    START_STATE: 'MainMenu',
  },

  Dir: {
    UP: [0, -1],
    RIGHT: [1, 0],
    DOWN: [0, 1],
    LEFT: [-1, 0],
    FWD: [0, -1],
    BACK: [0, 1]
  },

  INDEX_SPRITES: {
    0: 'floor',
    1: 'block',
    3: 'thinwall:se',
    4: 'bug:up',
    5: 'glider:up',
    6: 'paramecium:up',
    7: 'wall:basic',
    8: 'block:up',
    9: 'thief',
    10: 'clonemachine',
    11: 'bug:left',
    12: 'glider:left',
    13: 'paramecium:left',
    14: 'ic',
    15: 'force:up',
    16: 'socket',
    17: 'force:random',
    18: 'bug:down',
    19: 'glider:down',
    20: 'paramecium:down',
    21: 'water',
    22: 'force:right',
    23: 'button:green',
    24: 'splash',
    25: 'bug:right',
    26: 'glider:right',
    27: 'paramecium:right',
    28: 'fire',
    29: 'force:left',
    30: 'button:red',
    31: 'chip:fire',
    32: 'fireball:up',
    34: 'key:blue',
    36: 'exit:0',
    37: 'togglewall:closed',
    38: 'chip:ash',
    39: 'fireball:left',
    41: 'key:red',
    42: 'thinwall:up',
    43: 'door:blue',
    44: 'togglewall:open',
    45: 'wall:invisible',
    46: 'fireball:down',
    48: 'key:green',
    49: 'thinwall:left',
    50: 'door:red',
    51: 'button:brown',
    52: 'wall:hidden',
    53: 'fireball:right',
    55: 'key:yellow',
    56: 'thinwall:down',
    57: 'door:green',
    58: 'button:blue',
    60: 'ball:up',
    61: 'blueball:up',
    62: 'shoe:water',
    63: 'thinwall:right',
    64: 'door:yellow',
    66: 'chip:exit',
    67: 'ball:left',
    68: 'blueball:left',
    69: 'shoe:fire',
    70: 'block:left',
    71: 'ice:nw',
    72: 'bomb',
    73: 'exit:1',
    74: 'ball:down',
    75: 'blueball:down',
    76: 'shoe:ice',
    77: 'dirt',
    78: 'ice:ne',
    79: 'trap:closed',
    80: 'exit',
    81: 'ball:right',
    82: 'blueball:right',
    83: 'shoe:force',
    84: 'ice',
    85: 'ice:se',
    87: 'swim:up',
    88: 'tank:up',
    90: 'chip:up',
    91: 'force:down',
    92: 'ice:sw',
    93: 'gravel',
    94: 'swim:left',
    95: 'tank:left',
    97: 'chip:left',
    98: 'block:down',
    99: 'bluewall:real',
    100: 'trap:open',
    101: 'swim:down',
    102: 'tank:down',
    104: 'chip:down',
    105: 'block:right',
    106: 'bluewall:fake',
    107: 'hint',
    108: 'swim:right',
    109: 'tank:right',
    111: 'chip:right'
  },

  LEVELS: ['lesson1',
    'lesson2',
    'lesson3',
    'lesson4',
    'lesson5',
    'lesson6'
  ]
};

// TODO: replace with bimap
Chip.Util = {
  /*
   * Returns the inverse of a map. The inverse will have the original's keys
   * as its values, and the values as its keys. The original should be
   * one-to-one and have strings for values.
   *
   * Convert integer-strings to integers for convenience.
   */
  inverse: function (obj) {
    var res = {};
    _.each(obj, function (value, key) {
      res[value] = isNaN(key) ? key : _.parseInt(key);
    });

    return res;
  },
};

Chip.SPRITE_INDICES = Chip.Util.inverse(Chip.INDEX_SPRITES);
Chip.Dir.MOVE_DIRS = [Chip.Dir.UP, Chip.Dir.RIGHT, Chip.Dir.DOWN, Chip.Dir.LEFT];

/* eslint-disable no-extend-native */

Function.prototype.extends = function () {
  var args = Array.prototype.slice.call(arguments);

  _.each(args, function (arg) {
    _.extend(this.prototype, arg.prototype);
  }, this);
};

Function.prototype.includes = function (obj) {
  _.extend(this.prototype, obj);
};

String.prototype.toTitleCase = function (str) {
  return this.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};