import Phaser from "phaser";

class PreloadScene extends Phaser.Scene {
  constructor() {
    super("PreloadScene");
  }

  preload() {
    this.load.audio("music", "assets/sounds/music.m4a");
    this.load.audio("jump", "assets/sounds/jump.m4a");
    this.load.audio("jump2", "assets/sounds/jump2.m4a");
    this.load.audio("hit", "assets/sounds/hit.m4a");
    this.load.audio("reach", "assets/sounds/reach.m4a");
    this.load.audio("coin", "assets/sounds/coin.m4a");
    this.load.audio("powerup", "assets/sounds/powerup.m4a");

    this.load.image("mario-idle", "assets/mario-idle.png");
    this.load.image("mario-hurt", "assets/mario-hurt.png");
    this.load.image("mario-jump", "assets/mario-jump.png")

    this.load.image("ground", "assets/ground.png");
    this.load.image("restart", "assets/restart.png");
    this.load.image("game-over", "assets/game-over.png");
    this.load.image("cloud", "assets/cloud.png");

    this.load.image("moon", "assets/moon.png");

    this.load.image("obsticle-1", "assets/enemy_small_1.png");
    this.load.image("obsticle-2", "assets/enemy_small_2.png");
    this.load.image("obsticle-3", "assets/enemy_small_3.png");
    this.load.image("obsticle-4", "assets/enemy_big_1.png");
    this.load.image("obsticle-5", "assets/enemy_big_2.png");
    this.load.image("obsticle-6", "assets/enemy_big_3.png");

    this.load.spritesheet("star", "assets/stars.png", {
      frameWidth: 9,
      frameHeight: 9,
    });

    this.load.spritesheet("mario", "assets/mario-run.png", {
      frameWidth: 88,
      frameHeight: 94,
    });

    this.load.spritesheet("mario-down", "assets/mario-down.png", {
      frameWidth: 118,
      frameHeight: 94,
    });

    this.load.spritesheet("enemy-bill", "assets/enemy-bill.png", {
      frameWidth: 92,
      frameHeight: 77,
    });
  }

  create() {
    this.scene.start("PlayScene");
  }
}

export default PreloadScene;
