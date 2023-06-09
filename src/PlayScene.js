import Phaser from "phaser";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { firebaseConfig } from "./firebaseConfig.js";

class PlayScene extends Phaser.Scene {
  constructor() {
    super("PlayScene");
  }

  create() {
    this.cameras.main.setBackgroundColor('#87CEEB');
    const { height, width } = this.game.config;
    this.gameSpeed = 10;
    this.isGameRunning = false;
    this.respawnTime = 0;
    this.peachRespawnTime = 0;
    this.score = 0;
    this.bonusRespawnTime = 0;
    this.lives = 1;
    this.musicStarted = false;
    this.currentUser = null;

    if (firebase.auth().currentUser) {
      this.currentUser = firebase.auth().currentUser.email;
    }

    this.livesText = this.add
      .text(
        0,
        0,
        this.lives > 1 ? `Lives: ${this.lives}` : `Life: ${this.lives}`,
        {
          fill: "#535353",
          font: "900 35px Courier",
          resolution: 5,
        }
      )
      .setOrigin(0, 0)
      .setAlpha(1);

    this.usserText = this.add
      .text(
        250,
        0,
        this.currentUser !== null ? `Current User: ${this.currentUser}` : "",
        {
          fill: "#535353",
          font: "900 35px Courier",
          resolution: 5,
        }
      )
      .setOrigin(0, 0)
      .setAlpha(1);

    this.bonuses = this.physics.add.group();

    this.load.audio("music", "assets/sounds/music.m4a");
    this.load.once("complete", () => {
      this.input.keyboard.on(
        "keydown_SPACE",
        () => {
          if (!this.musicStarted) {
            this.music.play();
            this.musicStarted = true;
          }
        },
        this
      );
    });
    this.load.start();

    this.music = this.sound.add("music", { volume: 0.4, loop: true });
    this.hitSound = this.sound.add("hit", { volume: 0.2 });
    this.reachSound = this.sound.add("reach", { volume: 0.2 });

    this.startTrigger = this.physics.add
      .sprite(0, 400)
      .setOrigin(0, 1)
      .setImmovable();
    this.ground = this.add
      .tileSprite(0, height, 88, 40, "ground")
      .setOrigin(0, 0.5);
    this.mario = this.physics.add
      .sprite(0, height, "mario-idle")
      .setCollideWorldBounds(true)
      .setGravityY(5000)
      .setBodySize(44, 92)
      .setDepth(1)
      .setOrigin(0, 1);

    this.scoreText = this.add
      .text(width, 0, "00000", {
        fill: "#535353",
        font: "900 35px Courier",
        resolution: 5,
      })
      .setOrigin(1, 0)
      .setAlpha(0);

    this.highScoreText = this.add
      .text(0, 0, "00000", {
        fill: "#535353",
        font: "900 35px Courier",
        resolution: 5,
      })
      .setOrigin(1, 0)
      .setAlpha(0);

    this.environment = this.add.group();

    const getRandomCloud = () => {
      const randomWidth = Phaser.Math.Between(10, width);
      const randomHeight = Phaser.Math.Between(15, height / 2);
      return this.add.image(randomWidth, randomHeight, "cloud");
    };
    for (let i = 0; i < 15; i++) {
      this.environment.add(getRandomCloud());
    }

    this.environment.setAlpha(0);

    this.gameOverScreen = this.add
      .container(width / 2, height / 2 - 50)
      .setAlpha(0);

    this.gameOverText = this.add.image(0, 0, "game-over");
    this.restart = this.add.image(0, 80, "restart").setInteractive();
    this.menu = this.add.image(0, 120, "menu").setInteractive();
    if (firebase.auth().currentUser) {
      this.logout = this.add.image(0, 160, "logout").setInteractive();
      this.gameOverScreen.add([
        this.gameOverText,
        this.restart,
        this.menu,
        this.logout,
      ]);
    } else {
      this.gameOverScreen.add([this.gameOverText, this.restart, this.menu]);
    }

    this.obsticles = this.physics.add.group();
    this.peachs = this.physics.add.group();

    this.initAnims();
    this.initStartTrigger();
    this.initColliders();
    this.handleInputs();
    this.handleScore();
  }

  initColliders() {
    this.canCollide = true;
    this.physics.add.collider(
      this.mario,
      this.obsticles,
      () => {
        if (!this.canCollide) return;
        this.canCollide = false;
        this.lives--;

        if (this.lives > 0) {
          this.livesText.setText(`Lives: ${this.lives}`);
          this.mario.setTint(0xff0000);
          this.time.delayedCall(
            1000,
            () => {
              this.mario.clearTint();
              this.canCollide = true;
            },
            [],
            this
          );
        } else {
          this.hitSound.play();
          this.lives = 0;
          this.livesText.setText(`Lives: ${this.lives}`);
          this.highScoreText.x = this.scoreText.x - this.scoreText.width - 20;

          const highScore = this.highScoreText.text.substr(
            this.highScoreText.text.length - 5
          );
          const newScore =
            Number(this.scoreText.text) > Number(highScore)
              ? this.scoreText.text
              : highScore;

          this.highScoreText.setText("HI " + newScore);
          if (this.currentUser !== null) {
            this.addHighScore(this.currentUser, newScore);
          }
          this.highScoreText.setAlpha(1);

          this.physics.pause();
          this.isGameRunning = false;
          this.anims.pauseAll();
          this.mario.setTexture("mario-hurt");
          this.respawnTime = 0;
          this.gameSpeed = 10;
          this.gameOverScreen.setAlpha(1);
          this.score = 0;
          this.music.stop();
        }
      },
      null,
      this
    );

    this.physics.add.overlap(
      this.mario,
      this.bonuses,
      (mario, bonus) => {
        this.lives++;
        this.livesText.setText(`Lives: ${this.lives}`);
        this.reachSound.play();
        bonus.disableBody(true, true);
      },
      null,
      this
    );

    this.physics.add.overlap(
      this.mario,
      this.peachs,
      (mario, peach) => {
        this.score += 100;
        peach.disableBody(true, true);
      },
      null,
      this
    );
  }
  addHighScore(name, score) {
    // Récupérer la référence à la base de données Firestore
    const db = firebase.firestore();

    // Ajouter un nouveau document à la collection "highscores" avec les données fournies
    db.collection("scores")
      .add({
        name: name,
        score: score,
      })
      .then((docRef) => {
        console.log("Score ajouté avec succès :", docRef.id);
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout du score :", error);
      });
  }

  initStartTrigger() {
    const { width, height } = this.game.config;
    this.physics.add.overlap(
      this.startTrigger,
      this.mario,
      () => {
        if (this.startTrigger.y === 10) {
          this.startTrigger.body.reset(0, height);
          return;
        }

        this.startTrigger.disableBody(true, true);

        const startEvent = this.time.addEvent({
          delay: 1000 / 60,
          loop: true,
          callbackScope: this,
          callback: () => {
            this.mario.setVelocityX(80);
            this.mario.play("mario-run", 1);

            if (this.ground.width < width) {
              this.ground.width += 17 * 2;
            }

            if (this.ground.width >= 1000) {
              this.ground.width = width;
              this.isGameRunning = true;
              this.mario.setVelocityX(0);
              this.scoreText.setAlpha(1);
              this.environment.setAlpha(1);
              startEvent.remove();
            }
          },
        });
      },
      null,
      this
    );
  }

  initAnims() {
    this.anims.create({
      key: "mario-run",
      frames: this.anims.generateFrameNumbers("mario", { start: 2, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "enemy-mario-fly",
      frames: this.anims.generateFrameNumbers("enemy-bill", {
        start: 0,
        end: 1,
      }),
      frameRate: 6,
      repeat: -1,
    });
  }

  handleScore() {
    this.time.addEvent({
      delay: 1000 / 10,
      loop: true,
      callbackScope: this,
      callback: () => {
        if (!this.isGameRunning) {
          return;
        }

        this.score++;
        this.gameSpeed += 0.01;

        if (this.score % 100 === 0) {
          this.reachSound.play();

          this.tweens.add({
            targets: this.scoreText,
            duration: 100,
            repeat: 3,
            alpha: 0,
            yoyo: true,
          });
        }

        const score = Array.from(String(this.score), Number);
        for (let i = 0; i < 5 - String(this.score).length; i++) {
          score.unshift(0);
        }

        this.scoreText.setText(score.join(""));
      },
    });
  }

  handleInputs() {
    this.restart.on("pointerdown", () => {
      this.lives = 1;
      this.livesText.setText(`Lives: ${this.lives}`);
      this.scoreText.setText("00000");
      this.canCollide = true;
      this.mario.setVelocityY(0);
      this.mario.body.height = 92;
      this.mario.body.offset.y = 0;
      this.physics.resume();
      this.obsticles.clear(true, true);
      this.isGameRunning = true;
      this.gameOverScreen.setAlpha(0);
      this.anims.resumeAll();
      this.music.play();
    });

    this.menu.on("pointerdown", () => {
      this.scene.start("Menu");
    });

    if (firebase.auth().currentUser) {
      this.logout.on("pointerdown", () => {
        firebase
          .auth()
          .signOut()
          .then(() => {
            // L'utilisateur s'est déconnecté avec succès
            console.log("Utilisateur déconnecté avec succès");
            this.scene.start("Menu");
          })
          .catch((error) => {
            // Gérer les erreurs de déconnexion
            console.error("Erreur de déconnexion :", error);
          });
      });
    }

    const jumpSounds = [
      { n: "jump", v: 0.2 },
      { n: "jump2", v: 0.8 },
    ];

    this.input.keyboard.on("keydown_SPACE", () => {
      if (
        !this.mario.body.onFloor() ||
        this.mario.body.velocity.x > 0 ||
        this.gameOverScreen.alpha === 1
      )
        return;

      const randomJumpSound =
        jumpSounds[Math.floor(Math.random() * jumpSounds.length)];
      this.sound.play(randomJumpSound.n, { volume: randomJumpSound.v });

      this.mario.body.height = 92;
      this.mario.body.offset.y = 0;
      this.mario.setVelocityY(-1600);
      this.mario.setTexture("mario-jump", 0);
    });

    this.input.keyboard.on("keyup_DOWN", () => {
      if (this.score !== 0 && !this.isGameRunning) {
        return;
      }

      this.mario.body.height = 92;
      this.mario.body.offset.y = 0;
    });
  }

  placeObsticle() {
    const obsticleNum = Math.floor(Math.random() * 8) + 1;
    const distance = Phaser.Math.Between(600, 900);
    console.log(obsticleNum);
    let obsticle;
    if (obsticleNum == 7) {
      const enemyHeight = [-10, 70, 140];
      obsticle = this.obsticles
          .create(
              this.game.config.width + distance,
              this.game.config.height - enemyHeight[Math.floor(Math.random() * 3)],
              `enemy-bill`
          )
          .setOrigin(0, 1);
      obsticle.play("enemy-mario-fly", 1);
      obsticle.body.height = obsticle.body.height / 1.5;
    } else if (obsticleNum == 8) {
      obsticle = this.obsticles
        .create(
          this.game.config.width + distance,
          this.game.config.height - 50,
          `tuyau`
        )
        .setOrigin(0, 1.8);

        obsticle.setImmovable();

        obsticle = this.obsticles
        .create(
          this.game.config.width + distance,
          this.game.config.height - 50,
          `tuyau_v2`
        )
        .setOrigin(0, 6.3);

        obsticle.setImmovable();

        obsticle = this.obsticles
        .create(
          this.game.config.width + distance,
          this.game.config.height - 50,
          `tuyau_v2`
        )
        .setOrigin(0, 7);

        obsticle.setImmovable();

        obsticle = this.obsticles
        .create(
          this.game.config.width + distance,
          this.game.config.height - 50,
          `tuyau_v2`
        )
        .setOrigin(0, 8);

        obsticle.setImmovable();
    } else {
      obsticle = this.obsticles
        .create(
          this.game.config.width + distance,
          this.game.config.height,
          `obsticle-${obsticleNum}`
        )
        .setOrigin(0, 1);

      obsticle.body.offset.y = +10;
    }

    obsticle.setImmovable();
  }

  spawnBonus() {
    const bonus = this.bonuses.create(
      this.game.config.width + Phaser.Math.Between(800, 1500),
      this.game.config.height - Phaser.Math.Between(100, 300),
      "bonus"
    );
    bonus.setOrigin(0, 1);
    bonus.setImmovable();
  }

  placePeach() {
    const distance = Phaser.Math.Between(600, 900);
    let peach;
    peach = this.peachs
      .create(
        this.game.config.width + distance,
        this.game.config.height,
        `peach`
      )
      .setOrigin(0, 1.2);

    peach.body.offset.y = +10;

    peach.setImmovable();
  }

  update(time, delta) {
    if (!this.isGameRunning) {
      return;
    }

    this.ground.tilePositionX += this.gameSpeed;
    Phaser.Actions.IncX(this.obsticles.getChildren(), -this.gameSpeed);
    Phaser.Actions.IncX(this.peachs.getChildren(), -this.gameSpeed);
    Phaser.Actions.IncX(this.environment.getChildren(), -0.5);

    this.respawnTime += delta * this.gameSpeed * 0.08;
    this.peachRespawnTime += delta * this.gameSpeed * 0.08;
    if (this.respawnTime >= 1500) {
      this.placeObsticle();
      this.respawnTime = 0;
    }
    if (this.peachRespawnTime >= 13000) {
      this.placePeach();
      this.peachRespawnTime = 0;
    }

    this.obsticles.getChildren().forEach((obsticle) => {
      if (obsticle.getBounds().right < 0) {
        this.obsticles.killAndHide(obsticle);
      }
    });
    this.peachs.getChildren().forEach((peach) => {
      if (peach.getBounds().right < 0) {
        this.peachs.killAndHide(peach);
      }
    });

    this.environment.getChildren().forEach((env) => {
      if (env.getBounds().right < 0) {
        env.x = this.game.config.width + 30;
      }
    });

    if (this.mario.body.deltaAbsY() > 0) {
      this.mario.anims.stop();
      this.mario.setTexture("mario-jump", 0);
    } else {
      this.mario.body.height <= 58
        ? this.mario.play("mario-down-anim", true)
        : this.mario.play("mario-run", true);
    }

    this.bonusRespawnTime += delta * this.gameSpeed * 0.08;
    if (this.bonusRespawnTime >= 30000) {
      this.spawnBonus();
      this.bonusRespawnTime = 0;
    }

    Phaser.Actions.IncX(this.bonuses.getChildren(), -this.gameSpeed);

    this.bonuses.getChildren().forEach((bonus) => {
      if (bonus.getBounds().right < 0) {
        this.bonuses.killAndHide(bonus);
      }
    });
  }
}

export default PlayScene;
