import Phaser from 'phaser';

class Menu extends Phaser.Scene {
  constructor() {
    super({ key: 'Menu' });
  }

  create() {
    const menu = this.add.dom(this.cameras.main.width / 2, this.cameras.main.height / 2).createFromCache(`menu`);

    const login = document.getElementById('login');
    login.addEventListener('click', () => {
      this.scene.start('LoginForm');
    });

    const play = document.getElementById('play');
    play.addEventListener('click', () => {
      this.scene.start('PlayScene');
    });

    const leaderboard = document.getElementById('leaderboard');
    leaderboard.addEventListener('click', () => {
      this.scene.start('Leaderboard');
    });
    
    const howToPlay = document.getElementById('howtoplayqm');
    howToPlay.addEventListener('click', () => {
      this.scene.start('Instructions');
    });
  }
}

export default Menu;