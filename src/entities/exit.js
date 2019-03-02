(function (Entity) {
  /*
   * The exit triggers the win screen and takes the player to the next level.
   */
  var Exit = Chip.Exit = function (tile, emap) {
    Chip.Entity.call(this, tile, emap);
    this.emap.exit = this; // TODO: don't do these here
    this.pulse = this.sprite.animations.add('pulse', [73, 80]);
    this.pulse.play(Exit.PULSE_FPS, true);
  };

  Exit.PULSE_FPS = 2;

  Exit.extends(Entity);

  Exit.includes({
    collideWith: function (target) {
      if (target.type === 'chip') {
        this.moveHere(target);
        this.pulse.stop();
        this.changeFrame('chip:exit');
        Chip.sfx.exit();

        target.triggerWin();
      }
    },
  });

})(Chip.Entity);
