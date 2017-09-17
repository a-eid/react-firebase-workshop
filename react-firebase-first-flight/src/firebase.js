import firebase from "firebase";

const config = {
  apiKey: "AIzaSyBQwsLNYxMgZd03k_QiC6PI9vwiZ96NqHk",
  authDomain: "first-flight-4efe7.firebaseapp.com",
  databaseURL: "https://first-flight-4efe7.firebaseio.com",
  projectId: "first-flight-4efe7",
  storageBucket: "first-flight-4efe7.appspot.com",
  messagingSenderId: "131297549512"
};

firebase.initializeApp(config);

export default firebase;
export const database = firebase.database();
