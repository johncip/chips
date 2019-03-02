import Phaser from 'phaser'

class Sup extends Phaser.Scene {
  create() {
    this.add.text(300, 200, 'sup', { fill: 'red' })
  }
}

const config = {
  width: 680,
  height: 400,
  scene: Sup
}

new Phaser.Game(config)
