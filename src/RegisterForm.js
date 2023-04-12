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

        const loginButton = document.getElementById("to-login-scene");
        loginButton.addEventListener("click", () => {
            this.scene.start('LoginForm')}
        );

        registerForm.addListener('submit');
        registerForm.on('submit', (event) => {
            event.preventDefault();

            const email = document.getElementById('register-email-input').value;
            const password = document.getElementById('register-password-input').value;
            const error = document.getElementById("register-error");

            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    console.log('Inscription réussie !', userCredential);
                    this.scene.start('PlayScene');
                })
                .catch((err) => {
                    const passwordError = document.querySelector('.register');
                    passwordError.classList.toggle('register-error');

                    if (err.code === 'auth/email-already-in-use') {
                        console.log('Erreur : Le compte existe déjà.');
                        error.innerHTML = "Le compte existe déjà.";

                    } else if (err.code === 'auth/weak-password') {
                        console.log('Erreur : Le mot de passe est trop faible.');
                        error.innerHTML = "Le mot de passe est trop faible.";
                    }
                    else {
                        console.log('Erreur d\'inscription :', err);
                        error.innerHTML = "Erreur d\'inscription.";
                    }
                });
        });
    }
}

export default RegisterForm;
