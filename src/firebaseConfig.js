// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAWaR74CQIpQC3EZ4ANtRDkhqbSaV_IsVI",
    authDomain: "t-rex-7a5e1.firebaseapp.com",
    projectId: "t-rex-7a5e1",
    storageBucket: "t-rex-7a5e1.appspot.com",
    messagingSenderId: "45729220216",
    appId: "1:45729220216:web:9f235bdf8bf6ff272dcf8d",
    measurementId: "G-XYMRDDVWMV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
