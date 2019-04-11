import firebase from "firebase";
var config = {
  apiKey: "AIzaSyDm_fcPoubTbRoEGCe6aCZFlrFvDFjxD54",
  authDomain: "purrpoll.firebaseapp.com",
  databaseURL: "https://purrpoll.firebaseio.com",
  projectId: "purrpoll",
  storageBucket: "purrpoll.appspot.com",
  messagingSenderId: "502676779248"
};
var fire = firebase.initializeApp(config);
fire.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

export default fire;
