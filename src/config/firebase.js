import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import 'firebase/storage';
const config = {
  apiKey: "AIzaSyCy_0S_rsb8MQJRuEAUwB-YME-4Nl6nEFw",
  authDomain: "event-management-app-9f3ab.firebaseapp.com",
  databaseURL: "https://event-management-app-9f3ab.firebaseio.com",
  projectId: "event-management-app-9f3ab",
  storageBucket: "event-management-app-9f3ab.appspot.com",
  messagingSenderId: "976750584787",
  appId: "1:976750584787:web:4a33fc4aa2bd6b34dec526"
};

firebase.initializeApp(config);
firebase.firestore();

export default firebase;
