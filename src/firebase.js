import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
var firebaseConfig = {
  apiKey: "AIzaSyCEh2N7aEdfyo4RqMww6kcSsKu2-UeGAdU",
  authDomain: "temp-70e0d.firebaseapp.com",
  databaseURL: "https://temp-70e0d.firebaseio.com",
  projectId: "temp-70e0d",
  storageBucket: "temp-70e0d.appspot.com",
  messagingSenderId: "964737825173",
  appId: "1:964737825173:web:91b0d36bd914774d97de9c"
};
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();

export const db = firebase.firestore();