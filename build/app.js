!(function (e) {
  function t(t) {
    for (
      var i, n, o = t[0], h = t[1], c = t[2], d = 0, m = [];
      d < o.length;
      d++
    )
      (n = o[d]),
        Object.prototype.hasOwnProperty.call(a, n) && a[n] && m.push(a[n][0]),
        (a[n] = 0);
    for (i in h) Object.prototype.hasOwnProperty.call(h, i) && (e[i] = h[i]);
    for (l && l(t); m.length; ) m.shift()();
    return r.push.apply(r, c || []), s();
  }
  function s() {
    for (var e, t = 0; t < r.length; t++) {
      for (var s = r[t], i = !0, o = 1; o < s.length; o++) {
        var h = s[o];
        0 !== a[h] && (i = !1);
      }
      i && (r.splice(t--, 1), (e = n((n.s = s[0]))));
    }
    return e;
  }
  var i = {},
    a = { 0: 0 },
    r = [];
  function n(t) {
    if (i[t]) return i[t].exports;
    var s = (i[t] = { i: t, l: !1, exports: {} });
    return e[t].call(s.exports, s, s.exports, n), (s.l = !0), s.exports;
  }
  (n.m = e),
    (n.c = i),
    (n.d = function (e, t, s) {
      n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: s });
    }),
    (n.r = function (e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (n.t = function (e, t) {
      if ((1 & t && (e = n(e)), 8 & t)) return e;
      if (4 & t && "object" == typeof e && e && e.__esModule) return e;
      var s = Object.create(null);
      if (
        (n.r(s),
        Object.defineProperty(s, "default", { enumerable: !0, value: e }),
        2 & t && "string" != typeof e)
      )
        for (var i in e)
          n.d(
            s,
            i,
            function (t) {
              return e[t];
            }.bind(null, i)
          );
      return s;
    }),
    (n.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return n.d(t, "a", t), t;
    }),
    (n.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (n.p = "");
  var o = (window.webpackJsonp = window.webpackJsonp || []),
    h = o.push.bind(o);
  (o.push = t), (o = o.slice());
  for (var c = 0; c < o.length; c++) t(o[c]);
  var l = h;
  r.push([16, 1]), s();
})({
  16: function (e, t, s) {
    "use strict";
    s.r(t);
    var i = s(4),
      a = s.n(i),
      r = s(8),
      n = (s(11), s(12), s(14));
    const o = {
      apiKey: "AIzaSyAWaR74CQIpQC3EZ4ANtRDkhqbSaV_IsVI",
      authDomain: "t-rex-7a5e1.firebaseapp.com",
      projectId: "t-rex-7a5e1",
      storageBucket: "t-rex-7a5e1.appspot.com",
      messagingSenderId: "45729220216",
      appId: "1:45729220216:web:9f235bdf8bf6ff272dcf8d",
      measurementId: "G-XYMRDDVWMV",
    };
    Object(n.a)(o);
    class h extends a.a.Scene {
      constructor() {
        super("PlayScene");
      }
      create() {
        const { height: e, width: t } = this.game.config;
        (this.gameSpeed = 10),
          (this.isGameRunning = !1),
          (this.respawnTime = 0),
          (this.peachRespawnTime = 0),
          (this.score = 0),
          (this.bonusRespawnTime = 0),
          (this.lives = 1),
          (this.musicStarted = !1),
          (this.currentUser = null),
          r.a.auth().currentUser &&
            (this.currentUser = r.a.auth().currentUser.email),
          (this.livesText = this.add
            .text(
              0,
              0,
              this.lives > 1 ? "Lives: " + this.lives : "Life: " + this.lives,
              { fill: "#535353", font: "900 35px Courier", resolution: 5 }
            )
            .setOrigin(0, 0)
            .setAlpha(1)),
          (this.usserText = this.add
            .text(
              250,
              0,
              null !== this.currentUser
                ? "Current User: " + this.currentUser
                : "",
              { fill: "#535353", font: "900 35px Courier", resolution: 5 }
            )
            .setOrigin(0, 0)
            .setAlpha(1)),
          (this.bonuses = this.physics.add.group()),
          this.load.audio("music", "assets/sounds/music.m4a"),
          this.load.once("complete", () => {
            this.input.keyboard.on(
              "keydown_SPACE",
              () => {
                this.musicStarted ||
                  (this.music.play(), (this.musicStarted = !0));
              },
              this
            );
          }),
          this.load.start(),
          (this.music = this.sound.add("music", { volume: 0.4, loop: !0 })),
          (this.hitSound = this.sound.add("hit", { volume: 0.2 })),
          (this.reachSound = this.sound.add("reach", { volume: 0.2 })),
          (this.startTrigger = this.physics.add
            .sprite(0, 400)
            .setOrigin(0, 1)
            .setImmovable()),
          (this.ground = this.add
            .tileSprite(0, e, 88, 40, "ground")
            .setOrigin(0, 0.5)),
          (this.mario = this.physics.add
            .sprite(0, e, "mario-idle")
            .setCollideWorldBounds(!0)
            .setGravityY(5e3)
            .setBodySize(44, 92)
            .setDepth(1)
            .setOrigin(0, 1)),
          (this.scoreText = this.add
            .text(t, 0, "00000", {
              fill: "#535353",
              font: "900 35px Courier",
              resolution: 5,
            })
            .setOrigin(1, 0)
            .setAlpha(0)),
          (this.highScoreText = this.add
            .text(0, 0, "00000", {
              fill: "#535353",
              font: "900 35px Courier",
              resolution: 5,
            })
            .setOrigin(1, 0)
            .setAlpha(0)),
          (this.environment = this.add.group());
        const s = () => {
          const s = a.a.Math.Between(10, t),
            i = a.a.Math.Between(15, e / 2);
          return this.add.image(s, i, "cloud");
        };
        for (let e = 0; e < 15; e++) this.environment.add(s());
        this.environment.setAlpha(0),
          (this.gameOverScreen = this.add
            .container(t / 2, e / 2 - 50)
            .setAlpha(0)),
          (this.gameOverText = this.add.image(0, 0, "game-over")),
          (this.restart = this.add.image(0, 80, "restart").setInteractive()),
          (this.menu = this.add.image(0, 120, "menu").setInteractive()),
          r.a.auth().currentUser
            ? ((this.logout = this.add
                .image(0, 160, "logout")
                .setInteractive()),
              this.gameOverScreen.add([
                this.gameOverText,
                this.restart,
                this.menu,
                this.logout,
              ]))
            : this.gameOverScreen.add([
                this.gameOverText,
                this.restart,
                this.menu,
              ]),
          (this.obsticles = this.physics.add.group()),
          (this.peachs = this.physics.add.group()),
          this.initAnims(),
          this.initStartTrigger(),
          this.initColliders(),
          this.handleInputs(),
          this.handleScore();
      }
      initColliders() {
        (this.canCollide = !0),
          this.physics.add.collider(
            this.mario,
            this.obsticles,
            () => {
              if (this.canCollide)
                if (((this.canCollide = !1), this.lives--, this.lives > 0))
                  this.livesText.setText("Lives: " + this.lives),
                    this.mario.setTint(16711680),
                    this.time.delayedCall(
                      1e3,
                      () => {
                        this.mario.clearTint(), (this.canCollide = !0);
                      },
                      [],
                      this
                    );
                else {
                  this.hitSound.play(),
                    (this.lives = 0),
                    this.livesText.setText("Lives: " + this.lives),
                    (this.highScoreText.x =
                      this.scoreText.x - this.scoreText.width - 20);
                  const e = this.highScoreText.text.substr(
                      this.highScoreText.text.length - 5
                    ),
                    t =
                      Number(this.scoreText.text) > Number(e)
                        ? this.scoreText.text
                        : e;
                  this.highScoreText.setText("HI " + t),
                    this.highScoreText.setAlpha(1),
                    this.physics.pause(),
                    (this.isGameRunning = !1),
                    this.anims.pauseAll(),
                    this.mario.setTexture("mario-hurt"),
                    (this.respawnTime = 0),
                    (this.gameSpeed = 10),
                    this.gameOverScreen.setAlpha(1),
                    (this.score = 0),
                    this.music.stop();
                }
            },
            null,
            this
          ),
          this.physics.add.overlap(
            this.mario,
            this.bonuses,
            (e, t) => {
              this.lives++,
                this.livesText.setText("Lives: " + this.lives),
                this.reachSound.play(),
                t.disableBody(!0, !0);
            },
            null,
            this
          ),
          this.physics.add.overlap(
            this.mario,
            this.peachs,
            (e, t) => {
              (this.score += 100), t.disableBody(!0, !0);
            },
            null,
            this
          );
      }
      initStartTrigger() {
        const { width: e, height: t } = this.game.config;
        this.physics.add.overlap(
          this.startTrigger,
          this.mario,
          () => {
            if (10 === this.startTrigger.y)
              return void this.startTrigger.body.reset(0, t);
            this.startTrigger.disableBody(!0, !0);
            const s = this.time.addEvent({
              delay: 1e3 / 60,
              loop: !0,
              callbackScope: this,
              callback: () => {
                this.mario.setVelocityX(80),
                  this.mario.play("mario-run", 1),
                  this.ground.width < e && (this.ground.width += 34),
                  this.ground.width >= 1e3 &&
                    ((this.ground.width = e),
                    (this.isGameRunning = !0),
                    this.mario.setVelocityX(0),
                    this.scoreText.setAlpha(1),
                    this.environment.setAlpha(1),
                    s.remove());
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
          frames: this.anims.generateFrameNumbers("mario", {
            start: 2,
            end: 3,
          }),
          frameRate: 10,
          repeat: -1,
        }),
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
          delay: 100,
          loop: !0,
          callbackScope: this,
          callback: () => {
            if (!this.isGameRunning) return;
            this.score++,
              (this.gameSpeed += 0.01),
              this.score % 100 == 0 &&
                (this.reachSound.play(),
                this.tweens.add({
                  targets: this.scoreText,
                  duration: 100,
                  repeat: 3,
                  alpha: 0,
                  yoyo: !0,
                }));
            const e = Array.from(String(this.score), Number);
            for (let t = 0; t < 5 - String(this.score).length; t++)
              e.unshift(0);
            this.scoreText.setText(e.join(""));
          },
        });
      }
      handleInputs() {
        this.restart.on("pointerdown", () => {
          (this.lives = 1),
            this.livesText.setText("Lives: " + this.lives),
            this.scoreText.setText("00000"),
            (this.canCollide = !0),
            this.mario.setVelocityY(0),
            (this.mario.body.height = 92),
            (this.mario.body.offset.y = 0),
            this.physics.resume(),
            this.obsticles.clear(!0, !0),
            (this.isGameRunning = !0),
            this.gameOverScreen.setAlpha(0),
            this.anims.resumeAll(),
            this.music.play();
        }),
          this.menu.on("pointerdown", () => {
            this.scene.start("Menu");
          }),
          r.a.auth().currentUser &&
            this.logout.on("pointerdown", () => {
              r.a
                .auth()
                .signOut()
                .then(() => {
                  console.log("Utilisateur déconnecté avec succès"),
                    this.scene.start("Menu");
                })
                .catch((e) => {
                  console.error("Erreur de déconnexion :", e);
                });
            });
        const e = [
          { n: "jump", v: 0.2 },
          { n: "jump2", v: 0.8 },
        ];
        this.input.keyboard.on("keydown_SPACE", () => {
          if (
            !this.mario.body.onFloor() ||
            this.mario.body.velocity.x > 0 ||
            1 === this.gameOverScreen.alpha
          )
            return;
          const t = e[Math.floor(Math.random() * e.length)];
          this.sound.play(t.n, { volume: t.v }),
            (this.mario.body.height = 92),
            (this.mario.body.offset.y = 0),
            this.mario.setVelocityY(-1600),
            this.mario.setTexture("mario-jump", 0);
        }),
          this.input.keyboard.on("keyup_DOWN", () => {
            (0 === this.score || this.isGameRunning) &&
              ((this.mario.body.height = 92), (this.mario.body.offset.y = 0));
          });
      }
      placeObsticle() {
        const e = Math.floor(8 * Math.random()) + 1,
          t = a.a.Math.Between(600, 900);
        let s;
        if ((console.log(e), 7 == e)) {
          const e = [-10, 70, 140];
          (s = this.obsticles
            .create(
              this.game.config.width + t,
              this.game.config.height - e[Math.floor(3 * Math.random())],
              "enemy-bill"
            )
            .setOrigin(0, 1)),
            s.play("enemy-mario-fly", 1),
            (s.body.height = s.body.height / 1.5);
        } else
          8 == e
            ? (s = this.obsticles
                .create(
                  this.game.config.width + t,
                  this.game.config.height - 50,
                  "tuyau"
                )
                .setOrigin(0, 2))
            : ((s = this.obsticles
                .create(
                  this.game.config.width + t,
                  this.game.config.height,
                  "obsticle-" + e
                )
                .setOrigin(0, 1)),
              (s.body.offset.y = 10));
        s.setImmovable();
      }
      spawnBonus() {
        const e = this.bonuses.create(
          this.game.config.width + a.a.Math.Between(800, 1500),
          this.game.config.height - a.a.Math.Between(100, 300),
          "bonus"
        );
        e.setOrigin(0, 1), e.setImmovable();
      }
      placePeach() {
        const e = a.a.Math.Between(600, 900);
        let t;
        (t = this.peachs
          .create(this.game.config.width + e, this.game.config.height, "peach")
          .setOrigin(0, 1)),
          (t.body.offset.y = 10),
          t.setImmovable();
      }
      update(e, t) {
        this.isGameRunning &&
          ((this.ground.tilePositionX += this.gameSpeed),
          a.a.Actions.IncX(this.obsticles.getChildren(), -this.gameSpeed),
          a.a.Actions.IncX(this.peachs.getChildren(), -this.gameSpeed),
          a.a.Actions.IncX(this.environment.getChildren(), -0.5),
          (this.respawnTime += t * this.gameSpeed * 0.08),
          (this.peachRespawnTime += t * this.gameSpeed * 0.08),
          this.respawnTime >= 1500 &&
            (this.placeObsticle(), (this.respawnTime = 0)),
          this.peachRespawnTime >= 13e3 &&
            (this.placePeach(), (this.peachRespawnTime = 0)),
          this.obsticles.getChildren().forEach((e) => {
            e.getBounds().right < 0 && this.obsticles.killAndHide(e);
          }),
          this.peachs.getChildren().forEach((e) => {
            e.getBounds().right < 0 && this.peachs.killAndHide(e);
          }),
          this.environment.getChildren().forEach((e) => {
            e.getBounds().right < 0 && (e.x = this.game.config.width + 30);
          }),
          this.mario.body.deltaAbsY() > 0
            ? (this.mario.anims.stop(), this.mario.setTexture("mario-jump", 0))
            : this.mario.body.height <= 58
            ? this.mario.play("mario-down-anim", !0)
            : this.mario.play("mario-run", !0),
          (this.bonusRespawnTime += t * this.gameSpeed * 0.08),
          this.bonusRespawnTime >= 3e4 &&
            (this.spawnBonus(), (this.bonusRespawnTime = 0)),
          a.a.Actions.IncX(this.bonuses.getChildren(), -this.gameSpeed),
          this.bonuses.getChildren().forEach((e) => {
            e.getBounds().right < 0 && this.bonuses.killAndHide(e);
          }));
      }
    }
    var c = h;
    class l extends a.a.Scene {
      constructor() {
        super({ key: "RegisterForm" });
      }
      create() {
        const e = this.add
          .dom(this.cameras.main.width / 2, this.cameras.main.height / 2)
          .createFromCache("register-form");
        document
          .getElementById("to-login-scene")
          .addEventListener("click", () => {
            this.scene.start("Menu");
          });
        document.getElementById("back-menu").addEventListener("click", () => {
          this.scene.start("Menu");
        }),
          e.addListener("submit"),
          e.on("submit", (e) => {
            e.preventDefault();
            const t = document.getElementById("register-email-input").value,
              s = document.getElementById("register-password-input").value,
              i = document.getElementById("register-error");
            r.a
              .auth()
              .createUserWithEmailAndPassword(t, s)
              .then((e) => {
                console.log("Inscription réussie !", e),
                  this.scene.start("PlayScene");
              })
              .catch((e) => {
                document
                  .querySelector(".register")
                  .classList.toggle("register-error"),
                  "auth/email-already-in-use" === e.code
                    ? (console.log("Erreur : Le compte existe déjà."),
                      (i.innerHTML = "Le compte existe déjà."))
                    : "auth/weak-password" === e.code
                    ? (console.log("Erreur : Le mot de passe est trop faible."),
                      (i.innerHTML = "Le mot de passe est trop faible."))
                    : (console.log("Erreur d'inscription :", e),
                      (i.innerHTML = "Erreur d'inscription."));
              });
          });
      }
    }
    var d = l;
    class m extends a.a.Scene {
      constructor() {
        super({ key: "Menu" });
      }
      create() {
        this.add
          .dom(this.cameras.main.width / 2, this.cameras.main.height / 2)
          .createFromCache("menu");
        document.getElementById("login").addEventListener("click", () => {
          this.scene.start("LoginForm");
        });
        document.getElementById("play").addEventListener("click", () => {
          this.scene.start("PlayScene");
        });
        document.getElementById("leaderboard").addEventListener("click", () => {
          this.scene.start("Leaderboard");
        });
        document.getElementById("howtoplayqm").addEventListener("click", () => {
          this.scene.start("Instructions");
        });
      }
    }
    var u = m;
    class g extends a.a.Scene {
      constructor() {
        super("PreloadScene");
      }
      preload() {
        this.load.audio("music", "assets/sounds/music.m4a"),
          this.load.audio("jump", "assets/sounds/jump.m4a"),
          this.load.audio("jump2", "assets/sounds/jump2.m4a"),
          this.load.audio("hit", "assets/sounds/hit.m4a"),
          this.load.audio("reach", "assets/sounds/reach.m4a"),
          this.load.audio("coin", "assets/sounds/coin.m4a"),
          this.load.audio("powerup", "assets/sounds/powerup.m4a"),
          this.load.image("mario-idle", "assets/mario-idle.png"),
          this.load.image("mario-hurt", "assets/mario-hurt.png"),
          this.load.image("mario-jump", "assets/mario-jump.png"),
          this.load.image("ground", "assets/ground.png"),
          this.load.image("restart", "assets/restart.png"),
          this.load.image("menu", "assets/menu.png"),
          this.load.image("logout", "assets/logout.png"),
          this.load.image("game-over", "assets/game-over.png"),
          this.load.image("cloud", "assets/cloud.png"),
          this.load.image("bonus", "assets/bonus_life.png"),
          this.load.spritesheet("star", "assets/stars.png", {
            frameWidth: 9,
            frameHeight: 9,
          }),
          this.load.image("moon", "assets/moon.png"),
          this.load.spritesheet("mario", "assets/mario-run.png", {
            frameWidth: 88,
            frameHeight: 94,
          }),
          this.load.image("mario-jump", "assets/mario-jump.png"),
          this.load.spritesheet("mario-down", "assets/mario-down.png", {
            frameWidth: 118,
            frameHeight: 94,
          }),
          this.load.spritesheet("enemy-bill", "assets/enemy-bill.png", {
            frameWidth: 92,
            frameHeight: 77,
          }),
          this.load.image("obsticle-1", "assets/enemy_small_1.png"),
          this.load.image("obsticle-2", "assets/enemy_small_2.png"),
          this.load.image("obsticle-3", "assets/enemy_small_3.png"),
          this.load.image("obsticle-4", "assets/enemy_big_1.png"),
          this.load.image("obsticle-5", "assets/enemy_big_2.png"),
          this.load.image("obsticle-6", "assets/enemy_big_3.png"),
          this.load.html("signup-form", "assets/text/loginform.html"),
          this.load.html("menu", "assets/text/menu.html"),
          this.load.html("instructions", "assets/text/instructions.html"),
          this.load.image("tuyau", "assets/tuyau.png"),
          this.load.image("peach", "assets/peach.png"),
          this.load.html("register-form", "assets/text/registerform.html"),
          this.load.html("login-form", "assets/text/loginform.html");
      }
      create() {
        this.scene.start("Menu");
      }
    }
    var p = g;
    class y extends a.a.Scene {
      constructor() {
        super({ key: "LoginForm" });
      }
      create() {
        const e = this.add
          .dom(this.cameras.main.width / 2, this.cameras.main.height / 2)
          .createFromCache("login-form");
        document
          .getElementById("to-register-form")
          .addEventListener("click", () => {
            this.scene.start("RegisterForm");
          });
        document.getElementById("back-menu").addEventListener("click", () => {
          this.scene.start("Menu");
        }),
          e.addListener("submit"),
          e.on("submit", (e) => {
            e.preventDefault();
            const t = document.getElementById("login-email-input").value,
              s = document.getElementById("login-password-input").value,
              i = document.getElementById("login-error");
            r.a
              .auth()
              .signInWithEmailAndPassword(t, s)
              .then((e) => {
                console.log("Utilisateur connecté avec succès :", e.user),
                  this.scene.start("PlayScene");
              })
              .catch((e) => {
                document
                  .querySelector(".password")
                  .classList.toggle("password-error"),
                  "auth/user-not-found" === e.code
                    ? (console.log("Erreur : Le compte n'existe pas."),
                      (i.innerHTML = "Le compte n'existe pas."))
                    : "auth/wrong-password" === e.code
                    ? (console.log("Erreur : Le mot de passe est incorrect."),
                      (i.innerHTML = "Le mot de passe est incorrect."))
                    : "auth/too-many-requests" === e.code
                    ? (console.log(
                        "Erreur : Le compte est temporairement indisponible."
                      ),
                      (i.innerHTML =
                        "Le compte est temporairement indisponible."))
                    : (console.log("Erreur de connexion :", e),
                      (i.innerHTML = "Erreur de connexion."));
              });
          });
      }
    }
    var f = y;
    class b extends a.a.Scene {
      constructor() {
        super({ key: "Instructions" });
      }
      create() {
        this.add
          .dom(this.cameras.main.width / 2, this.cameras.main.height / 2)
          .createFromCache("instructions");
      }
    }
    var v = b;
    r.a.initializeApp(o);
    const x = {
      type: a.a.AUTO,
      width: screen.width - 200,
      height: 600,
      parent: "game-container",
      pixelArt: !0,
      transparent: !0,
      physics: { default: "arcade", arcade: { debug: !1 } },
      scene: [p, f, d, u, v, c],
      dom: { createContainer: !0 },
    };
    new a.a.Game(x);
  },
});
