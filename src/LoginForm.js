import Phaser from 'phaser';
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
import { firebaseConfig } from './firebaseConfig.js';

firebase.initializeApp(firebaseConfig);

class RegisterForm extends Phaser.Scene {
    constructor() {
        super({ key: 'LoginForm' });
    }

    create() {
        const loginForm = this.add.dom(this.cameras.main.width / 2, this.cameras.main.height / 2)
            .createFromCache(`login-form`);

        loginForm.addListener('submit');
        loginForm.on('submit', (event) => {
            event.preventDefault();

            const email = document.getElementById('login-email-input').value;
            const password = document.getElementById('login-password-input').value;

            firebase.auth().signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    // L'utilisateur s'est connecté avec succès
                    console.log('Utilisateur connecté avec succès :', userCredential.user);
                })
                .catch((error) => {
                    // Gérer les erreurs de connexion
                    console.error('Erreur de connexion :', error);
                });
        });
    }
}

export default RegisterForm;
