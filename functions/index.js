const functions = require('firebase-functions');
const fetch = require("node-fetch");
const catNames = require('cat-names');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

var db = admin.firestore();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.getCats = functions.https.onRequest(async (request, response) => {
  for(var i = 0; i < 100; i++) {
    var resp = await fetch('https://api.thecatapi.com/v1/images/search');
    var cat = (await resp.json())[0];
    var index = i + "";
    console.log(cat);
    await db.collection("Cats").doc(index).set({
      "id": cat["id"],
      "index": index,
      "name": catNames.random(),
      "width": cat["width"],
      "height": cat["height"],
      "image": cat["url"],
      "totalVotes": 0,
      "votedFor": 0,
      "votedAgainst": 0,
      "votedBy": []
    });
  }
  response.send("success");
});
