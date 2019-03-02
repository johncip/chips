var Modal = Chip.Modal = function (bounds, subtext, style) {
  if (subtext === undefined) {
    subtext = 'Press SPACE to continue';
  }
  this.setBounds(bounds);
  this.setStyle(style);
  this.subtext = subtext;
  this.group = Chip.game.add.group(undefined, 'Modal');

  this.background = this.createBackground();
  this.mainText = this.createMainText();
  this.subtext = this.createSubtext();

  this.group.add(this.background);
  this.group.add(this.mainText);
  this.group.add(this.subtext);

  this.group.fixedToCamera = true;
  this.group.hide();
};

Modal.includes({

  setBounds: function (bounds) {
    this.bounds = bounds;

    var props = ['left', 'top', 'height', 'width', 'halfHeight'];
    _.each(props, function (property) {
      this[property] = bounds[property];
    }, this);
  },

  setStyle: function (style) {
    if (style === undefined) {
      style = {};
    }

    this.style = {
      font: '48px lato',
      fill: '#dde',
      boundsAlignH: 'center',
      boundsAlignV: 'middle',
      wordWrap: 'true',
      align: 'center',
      wordWrapWidth: this.width
    };

    _.extend(this.style, style);
  },

  createBackground: function () {
    var bgSprite = this.group.create(this.left, this.top, 'black');
    return _.extend(bgSprite, {
      width: this.width,
      height: this.height,
      alpha: 0.8
    });
  },

  createMainText: function () {
    var main = Chip.game.add.text(0, 0, '', this.style);
    main.setTextBounds(this.left, this.top, this.width, this.height);
    return main;
  },

  createSubtext: function () {
    var subStyle = _.extend({}, this.style, {
      fontSize: 24,
      fill: '#ccd',
    });

    var sub = Chip.game.add.text(0, 0, this.subtext, subStyle);
    sub.setTextBounds(this.left, this.halfHeight, this.width, this.halfHeight);

    return sub;
  },

  hide: function () {
    this.group.hide();
  },

  show: function () {
    this.group.promote();
    this.group.show();
  },

  destroy: function () {
    this.group.forEach(function (sprite) {
      sprite.destroy();
    });
  },

  setText: function (text) {
    this.mainText.text = text;
  },

  /*
   * Displays the modal with the given message. Takes an optional delay
   * (during which time the game is paused) and a callback which should
   * hide the modal and unpause the game.
   */
  flash: function (message, delay, callback) {
    callback = callback || this._unpause.bind(this);
    delay = delay || 0;

    this.setText(message);
    Chip.game.halfPaused = true;

    setTimeout(function () {
      Chip.game.input.keyboard.onPressCallback = callback;
      this.show();
      Chip.game.paused = true;
    }.bind(this), delay);
  },

  _unpause: function () {
    if (Chip.game.music) {
      Chip.game.music.resume();
    }

    this.hide();
    Chip.game.paused = false;
    Chip.game.halfPaused = false;
  }
});
