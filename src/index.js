import Phaser from 'phaser';

import PlayScene from './PlayScene';
import LoginForm from './LoginForm';
import Menu from './Menu';
import Instructions from './Instructions';
import PreloadScene from './PreloadScene';

const config = {
  type: Phaser.AUTO,
  width: 1000,
  height: 340,
  parent: "game-container",
  pixelArt: true,
  transparent: true,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },
  scene: [PreloadScene, LoginForm, Menu, Instructions, PlayScene],
  dom: {
    createContainer: true,
  },
};

new Phaser.Game(config);
