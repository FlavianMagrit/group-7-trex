import Phaser from "phaser";

import PlayScene from "./PlayScene";
import PreloadScene from "./PreloadScene";
import Leaderboard from "./Leaderboard";

const config = {
  type: Phaser.AUTO,
  width: screen.width - 200,
  height: 340,
  pixelArt: true,
  transparent: true,
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
  scene: [PreloadScene, PlayScene, Leaderboard],
};

new Phaser.Game(config);
