import Phaser from "phaser";
import firebase from "firebase/compat/app";
import { collection} from "firebase/firestore";
import {db} from "./index";

class Leaderboard extends Phaser.Scene {
  constructor() {
    super({ key: "Leaderboard" });
  }

  create() {




    // db.collection("scores")
    //     .orderBy("score", "desc")
    //     .limit(10)
    //     .get()
    //     .then((querySnapshot) => {
    //       const leaderboardTable = document.querySelector("table");
    //       let position = 1;
    //       querySnapshot.forEach((doc) => {
    //         const data = doc.data();
    //         const row = leaderboardTable.insertRow(-1);
    //         const positionCell = row.insertCell(0);
    //         const nameCell = row.insertCell(1);
    //         const scoreCell = row.insertCell(2);
    //         positionCell.textContent = position;
    //         nameCell.textContent = data.name;
    //         scoreCell.textContent = data.score;
    //         position++;
    //       });
    //     });
    // console.log('db', db.collection("scores"));

    const collectionRef = firebase.firestore().collection('scores');

    // Récupérer les données de la collection
    collectionRef.get()
        .then((querySnapshot) => {
          // Parcourir les documents dans la collection
          querySnapshot.forEach((doc) => {
            // Accéder aux données du document
            const data = doc.data();
            console.log('Données du document:', data);
            // Utiliser les données pour votre logique de jeu
          });
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération des données:', error);
        });

    this.add
      .dom(this.cameras.main.width / 2, this.cameras.main.height / 2)
      .createFromCache(`leaderboard`);


  }
}

export default Leaderboard;
