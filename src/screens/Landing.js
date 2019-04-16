import React, { Component, Fragment } from "react";
// Firebase Imports
import fire from "../constants/config";
// React Router Imports
import * as ROUTES from "../constants/routes";

class Landing extends Component {
  constructor(props) {
    super(props);
    this.redirectUser = this.redirectUser.bind(this);
    this.getUserData = this.getUserData.bind(this);

    // Register authentication state change listener
    fire.auth().onAuthStateChanged(this.redirectUser);
  }

  async redirectUser(user) {
    // If the user exists...
    if (user) {
      // Get user data from firebase
      let userData = await this.getUserData(user.uid);

      // Set the profile data
      let profile = {
        name: user.displayName,
        photoURL: user.photoURL,
        ...userData
      };

      console.log(profile);
      // Navigate to the main page, passing the user data
      this.props.history.push({
        pathname: ROUTES.MAIN,
        state: { user: profile }
      });
    } else {
      // Otherwise, navigate to the sign in page
      this.props.history.push(ROUTES.SIGN_IN);
    }
  }

  async getUserData(uid) {
    // etet the Firebase firestore database
    let db = fire.firestore();
    // Get the user from the database
    let fireUser = await db.doc(`Users/${uid}`).get();
    // If the user does not exist...
    if (!fireUser.exists) {
      try {
        // Make a call to create the user
        let res = await fetch(
          "https://us-central1-purrpoll.cloudfunctions.net/addUser",
          {
            method: "post",
            body: await JSON.stringify({ uid: uid }),
            headers: {
              "Content-Type": "application/json"
            }
          }
        );
        // Parse the response
        res = await res.json();
        // If the the user was created succesfully...
        if (res.status === "success") {
          // Get a reference to the created user
          fireUser = await db.doc(`Users/${uid}`).get();
        }
      } catch (error) {
        // Catch and print errors
        console.error(error.code, error.message);
        return null;
      }
    }
    // Return the user
    return fireUser.data();
  }

  render() {
    return <Fragment />;
  }
}

export default Landing;
