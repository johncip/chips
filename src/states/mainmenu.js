/*
 * The attract screen and main menu.
 */
export default class MainMenu {
  init (score) {
    this.startTime = this.time.now
  }

  create () {
    const width = this.game.cache.getImage('boxart').width
    const left = (this.game.width - width) / 2
    this.boxart = this.add.image(left, 0, 'boxart')
    this.createStartText()
  }

  createStartText () {
    const text = 'Click to continue!'
    const style = {
      font: '30px lato',
      fill: '#fff',
      align: 'center'
    }
    const t = this.game.add.text(
      this.game.width / 2,
      this.game.height - 50,
      text,
      style
    )
    t.anchor.set(0.5)
  }

  update () {
    if (this.time.now - this.startTime > 600) {
      this.boxart.y -= this.game.time.elapsed / 25

      if (this.boxart.y < -850) {
        this.boxart.y = 650
      }
    }

    if (this.game.input.activePointer.justPressed()) {
      this.game.state.start('Playing')
    }
  }
}
