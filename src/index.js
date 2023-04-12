import Phaser from 'phaser';

import PlayScene from './PlayScene';
import RegisterForm from './RegisterForm.js';
import PreloadScene from './PreloadScene';
import LoginForm from "./LoginForm";

const config = {
  type: Phaser.AUTO,
  width: 1000,
  height: 400,
  parent: "game-container",
  pixelArt: true,
  transparent: true,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },
  scene: [PreloadScene, PlayScene, RegisterForm, LoginForm],
  dom: {
    createContainer: true,
  },
};

new Phaser.Game(config);
