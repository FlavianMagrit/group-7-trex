import Phaser from "phaser";
import firebase from "firebase/compat/app";
import { collection } from "firebase/firestore";
import { db } from "./index";

class Leaderboard extends Phaser.Scene {
  constructor() {
    super({ key: "Leaderboard" });
  }

  create() {
    this.add
      .dom(this.cameras.main.width / 2, this.cameras.main.height / 2)
      .createFromCache(`leaderboard`);

    const collectionRef = firebase.firestore().collection("scores");
    const backButton = document.getElementById("back-menu");

    backButton.addEventListener("click", () => {
      this.scene.start("Menu");
    });

    collectionRef
      .orderBy("score", "desc")
      .get()
      .then((querySnapshot) => {
        const leaderboardTable = document.querySelector("table");
        let position = 1;
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const row = leaderboardTable.insertRow(-1);
          const positionCell = row.insertCell(0);
          const nameCell = row.insertCell(1);
          const scoreCell = row.insertCell(2);
          positionCell.textContent = position;
          nameCell.textContent = data.name;
          scoreCell.textContent = data.score;
          position++;
        });
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données:", error);
      });
  }
}

export default Leaderboard;
