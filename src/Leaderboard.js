import Phaser from "phaser";

class Leaderboard extends Phaser.Scene {
  constructor() {
    super({ key: "Leaderboard" });
  }

  create() {
    this.add
      .dom(this.cameras.main.width / 2, this.cameras.main.height / 2)
      .createFromCache(`leaderboard`);
  }
}

export default Leaderboard;
