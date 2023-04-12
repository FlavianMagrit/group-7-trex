import Phaser from "phaser";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { firebaseConfig } from "./firebaseConfig.js";

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

class Leaderboard extends Phaser.Scene {
  constructor() {
    super({ key: "Leaderboard" });
  }

  create() {
    // Récupérer les scores des joueurs depuis Firestore et les trier par ordre décroissant
    db.collection("scores")
      .orderBy("score", "desc")
      .get()
      .then((querySnapshot) => {
        // Créer le tableau de leaderboard HTML et l'ajouter à la scène Phaser
        const leaderboard = document.createElement("table");
        leaderboard.innerHTML = `
                    <caption>Classement</caption>
                    <thead>
                        <tr>
                            <th>Position</th>
                            <th>Joueur</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                `;
        this.add
          .dom(this.cameras.main.width / 2, this.cameras.main.height / 2)
          .appendChild(leaderboard);

        // Ajouter chaque joueur au tableau de leaderboard HTML
        let position = 1;
        querySnapshot.forEach((doc) => {
          const player = doc.data();
          const row = document.createElement("tr");
          row.innerHTML = `
                        <td>${position}</td>
                        <td>${player.name}</td>
                        <td>${player.score}</td>
                    `;
          leaderboard.querySelector("tbody").appendChild(row);
          position++;
        });
      })
      .catch((error) => {
        console.error("Erreur de récupération des scores :", error);
      });
  }
}

export default Leaderboard;
