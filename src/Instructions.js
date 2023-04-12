import Phaser from 'phaser';

class Instructions extends Phaser.Scene {
  constructor() {
    super({ key: 'Instructions' });
  }

  create() {
    this.add.dom(this.cameras.main.width / 2, this.cameras.main.height / 2).createFromCache(`instructions`);
  }
}

export default Instructions;