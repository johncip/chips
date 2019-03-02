/*
 * The attract screen and main menu.
 */
Chip.MainMenu = function () {};

Chip.MainMenu.includes({
  init: function (score) {
    this.startTime = this.time.now;
  },

  create: function () {
    var width = this.game.cache.getImage('boxart').width;
    var left = (this.game.width - width) / 2;
    this.boxart = this.add.image(left, 0, 'boxart');
    this.createStartText();
  },

  createStartText: function () {
    var text = "Click to continue!";
    var style = {
      font: "30px Lato",
      fill: "#fff",
      align: "center"
    };
    var t = this.game.add.text(this.game.width / 2, this.game.height - 50,
      text, style);
    t.anchor.set(0.5);
  },

  update: function () {
    if (this.time.now - this.startTime > 600) {
      this.boxart.y -= this.game.time.elapsed / 25;

      if (this.boxart.y < -850) {
        this.boxart.y = 650;
      }
    }

    if (this.game.input.activePointer.justPressed()) {
      this.game.state.start('Playing');
    }
  }
});
