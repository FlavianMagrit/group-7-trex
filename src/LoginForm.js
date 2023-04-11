
import Phaser from 'phaser';
import * as firebase from 'firebase/app';
import 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyAWaR74CQIpQC3EZ4ANtRDkhqbSaV_IsVI",
    authDomain: "t-rex-7a5e1.firebaseapp.com",
    projectId: "t-rex-7a5e1",
    storageBucket: "t-rex-7a5e1.appspot.com",
    messagingSenderId: "45729220216",
    appId: "1:45729220216:web:9f235bdf8bf6ff272dcf8d",
    measurementId: "G-XYMRDDVWMV"
};

firebase.initializeApp(firebaseConfig);

class LoginForm extends Phaser.Scene {
    constructor() {
        super({ key: 'LoginForm' });
    }

    create() {
        const signupForm = this.add.dom(this.cameras.main.width / 2, this.cameras.main.height / 2)
            .createFromHTML(`
        <form id="signup-form">
          <h1>Inscription</h1>
          <input type="email" id="email-input" placeholder="Email" required>
          <input type="password" id="password-input" placeholder="Mot de passe" required>
          <button type="submit">S'inscrire</button>
        </form>
      `);


        signupForm.addListener('submit');
        signupForm.on('submit', (event) => {
            event.preventDefault();

            const email = document.getElementById('email-input').value;
            const password = document.getElementById('password-input').value;

            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    console.log('Inscription réussie !', userCredential);
                })
                .catch((error) => {
                    console.log('Erreur d\'inscription :', error.message);
                });
        });
    }
}

export default LoginForm;
