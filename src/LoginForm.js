import Phaser from 'phaser';
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"


class RegisterForm extends Phaser.Scene {
    constructor() {
        super({ key: 'LoginForm' });
    }

    create() {
        const loginForm = this.add.dom(this.cameras.main.width / 2, this.cameras.main.height / 2)
            .createFromCache(`login-form`);

        const registerButton = document.getElementById("to-register-form");
        registerButton.addEventListener("click", () => {
            this.scene.start('RegisterForm')}
        );

        const backButton = document.getElementById("back-menu");
        backButton.addEventListener("click", () => {
            this.scene.start('Menu')}
        );

        loginForm.addListener('submit');
        loginForm.on('submit', (event) => {
            event.preventDefault();

            const email = document.getElementById('login-email-input').value;
            const password = document.getElementById('login-password-input').value;
            const error = document.getElementById("login-error");

            firebase.auth().signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    console.log('Utilisateur connecté avec succès :', userCredential.user);
                    this.scene.start('PlayScene');
                })
                .catch((err) => {
                    const passwordError = document.querySelector('.password');
                    passwordError.classList.toggle('password-error');

                    if (err.code === 'auth/user-not-found') {
                        console.log('Erreur : Le compte n\'existe pas.');
                        error.innerHTML = "Le compte n\'existe pas.";
                    } else if (err.code === 'auth/wrong-password') {
                        console.log('Erreur : Le mot de passe est incorrect.');
                        error.innerHTML = "Le mot de passe est incorrect.";
                    } else if (err.code === 'auth/too-many-requests') {
                        console.log('Erreur : Le compte est temporairement indisponible.');
                        error.innerHTML = "Le compte est temporairement indisponible.";
                    }
                    else {
                        console.log('Erreur de connexion :', err);
                        error.innerHTML = "Erreur de connexion.";
                    }
                });
        });
    }
}

export default RegisterForm;
