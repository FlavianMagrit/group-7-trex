import Phaser from 'phaser';
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
import { firebaseConfig } from './firebaseConfig.js';

firebase.initializeApp(firebaseConfig);

class RegisterForm extends Phaser.Scene {
    constructor() {
        super({ key: 'RegisterForm' });
    }

    create() {
        const registerForm = this.add.dom(this.cameras.main.width / 2, this.cameras.main.height / 2)
            .createFromCache(`register-form`);

        registerForm.addListener('submit');
        registerForm.on('submit', (event) => {
            event.preventDefault();

            const email = document.getElementById('register-email-input').value;
            const password = document.getElementById('register-password-input').value;

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

export default RegisterForm;
