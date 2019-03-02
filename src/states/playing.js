(function (Config, TSIZE, Rectangle) {
  var game

  var Playing = Chip.Playing = function () {}

  Playing.includes({
    init: function () {
      game = this.game
      game.onBlur.add(this.pause, this)
      game.renderer.resize(14 * TSIZE, 9 * TSIZE)
      game.bounds = new Rectangle(0, 0, 9 * TSIZE, 9 * TSIZE)
      game.camera.bounds = null
    },

    create: function () {
      this.levelIndex = Config.START_LEVEL
      this.displayPanel = new Chip.DisplayPanel()

      this.createModals()
      this.createHotkeys()

      this.startCurrentLevel()
      this.playMusic()
    },

    createModals: function () {
      var modalBounds = new Rectangle(0, 0, 14 * TSIZE, 9 * TSIZE)
      this.modal = new Chip.Modal(modalBounds)

      var hintBounds = new Rectangle(9.5 * TSIZE, 0, 5 * TSIZE, 9 * TSIZE)
      this.hintPanel = new Chip.Modal(hintBounds, '', {
        boundsAlignV: 'top',
        font: '30px Lato',
        wordWrapWidth: hintBounds.width - TSIZE
      })

      // twerkz
      this.modal.mainText.y -= TSIZE
      this.hintPanel.mainText.x -= 0.25 * TSIZE
      this.hintPanel.mainText.y += TSIZE

      // exports
      game.hintPanel = this.hintPanel
    },

    createHotkeys: function () {
      this.addHotkey('F1', this.startLastLevel)
      this.addHotkey('F2', this.startCurrentLevel)
      this.addHotkey('F3', this.startNextLevel)
      this.addHotkey('P', this.pause)
    },

    addHotkey: function (keyString, callback) {
      var keyObj = game.input.keyboard.addKey(Phaser.Keyboard[keyString])

      keyObj.onDown.add(function () {
        if (game.paused || game.halfPaused) {
          return
        }
        callback.call(this, keyObj)
      }.bind(this))
    },

    startLastLevel: function () {
      var numLevels = Chip.LEVELS.length
      this.levelIndex = (this.levelIndex - 1 + numLevels) % numLevels
      this.startCurrentLevel()
    },

    startNextLevel: function () {
      var numLevels = Chip.LEVELS.length
      this.levelIndex = (this.levelIndex + 1) % numLevels
      this.startCurrentLevel()
    },

    startCurrentLevel: function () {
      this.resetState()
      this.level = new Chip.Level(this.levelIndex)

      // post-load
      this.displayPanel.setLevel(this.levelIndex + 1)
      this.hintPanel.setText(this.level.getHint())
      this.timeLeft = this.level.getTimeAllowed()
      this.fixLayering()
    },

    resetState: function () {
      if (this.level) {
        this.level.destroy()
      }

      game.paused = false
      game.halfPaused = false
      this.input.keyboard.onPressCallback = null
    },

    fixLayering: function () {
      this.displayPanel.group.promote()
      this.level.inventory.group.promote()
    },

    pause: function () {
      if (game.paused) {
        return
      }

      if (Chip.game.music) {
        game.music.pause()
      }

      this.modal.flash('Paused...')
    },

    countDown: function () {
      if (game.halfPaused || game.paused || this.timeLeft === 0) {
        return
      }

      this.timeLeft--

      if (this.timeLeft === 0) {
        this.lose("Time's Up!")
      }
    },

    update: function () {
      var chipsLeft = this.level.getChipsNeeded() - this.level.inventory.count('ic')

      this.updateTimeLeft()
      this.displayPanel.setTimeLeft(this.timeLeft)
      this.displayPanel.setChipsLeft(chipsLeft)
      this.level.update()
    },

    lose: function (msg, delay) {
      this.modal.flash(msg, delay, this.startCurrentLevel.bind(this))
    },

    win: function (msg, delay) {
      msg = msg || 'Yowzer! You win!'
      this.modal.flash(msg, delay, this.startNextLevel.bind(this))
    },

    playMusic: function () {
      if (!Config.ENABLE_MUSIC) {
        return
      }

      this.asyncLoad('forest', 'assets/audio/great_forest.mp3', function () {
        game.music = game.add.audio('forest')
        game.music.volume = Chip.Config.MUSIC_VOLUME
        game.music.play()
      })
    },

    asyncLoad: function (cacheKey, path, onLoad) {
      this.load.audio(cacheKey, path)
      this.load.start()

      var index = window.setInterval(function () {
        if (game.load.isLoading) {
          return
        }

        onLoad()
        window.clearInterval(index)
      }, 1000)
    }
  })

  Playing.prototype.updateTimeLeft = _.throttle(Playing.prototype.countDown, 1000)
})(Chip.Config, Chip.Config.TILE_SIZE, Phaser.Rectangle)
