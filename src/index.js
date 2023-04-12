import Phaser from "phaser";

import PlayScene from "./PlayScene";
import RegisterForm from "./RegisterForm.js";
import PreloadScene from "./PreloadScene";
import LoginForm from "./LoginForm";
import Menu from "./Menu";
import Instructions from "./Instructions";
import Leaderboard from "./Leaderboard";
import {firebaseConfig} from "./firebaseConfig";

firebase.initializeApp(firebaseConfig);

const config = {
  type: Phaser.AUTO,
  width: screen.width - 200,
  height: 600,
  parent: "game-container",
  pixelArt: true,
  transparent: true,
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
  scene: [
    PreloadScene,
    LoginForm,
    RegisterForm,
    Menu,
    Instructions,
    PlayScene,
    Leaderboard,
  ],
  dom: {
    createContainer: true,
  },
};

new Phaser.Game(config);
