import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyDzlbmnO6OOqatx8ymojFGolzVHeXCGrbM",
    authDomain: "tp7-forum-ff04b.firebaseapp.com",
    projectId: "tp7-forum-ff04b",
    storageBucket: "tp7-forum-ff04b.firebasestorage.app",
    messagingSenderId: "683483088903",
    appId: "1:683483088903:web:64b45810b4e03ad85782a2"
};

firebase.initializeApp(firebaseConfig);
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

export { projectFirestore, projectAuth };