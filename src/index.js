import Phaser from "phaser";
import firebase from "firebase/compat/app";
import { getFirestore } from "firebase/firestore";

import PlayScene from "./PlayScene";
import RegisterForm from "./RegisterForm.js";
import PreloadScene from "./PreloadScene";
import LoginForm from "./LoginForm";
import Menu from "./Menu";
import Instructions from "./Instructions";
import { firebaseConfig } from "./firebaseConfig";
import Leaderboard from "./Leaderboard";

firebase.initializeApp(firebaseConfig);

export const db = getFirestore(firebase.initializeApp(firebaseConfig));

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
