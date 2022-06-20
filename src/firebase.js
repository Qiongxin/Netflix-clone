import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCRO9JMbOB6eomFnH2oL8acfAEXBRrXsII",
    authDomain: "netflix-clone-d67b9.firebaseapp.com",
    projectId: "netflix-clone-d67b9",
    storageBucket: "netflix-clone-d67b9.appspot.com",
    messagingSenderId: "592340186819",
    appId: "1:592340186819:web:84d12d5e14dcbe03cd9476",
    measurementId: "G-QTZY83K5ZM"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth()

export {auth}
export default db