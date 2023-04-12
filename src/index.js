import Phaser from 'phaser';

import PreloadScene from './PreloadScene';
import PlayScene from './PlayScene';
import LoginForm from './LoginForm';
import Menu from './Menu';
import Instructions from './Instructions';


const config = {
  type: Phaser.AUTO,
  width: screen.width - 200,
  height: 340,
  parent: "game-container",
  pixelArt: true,
  transparent: true,
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
  scene: [PreloadScene, LoginForm, Menu, Instructions, PlayScene],
  dom: {
    createContainer: true,
  },
};

new Phaser.Game(config);
