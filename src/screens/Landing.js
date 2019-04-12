import React, { Component, Fragment } from "react";
// Firebase Imports
import fire from "../constants/config";
// React Router Imports
import * as ROUTES from "../constants/routes";

class Landing extends Component {
  constructor(props) {
    super(props);
    this.redirectUser = this.redirectUser.bind(this);
    // Register authentication state change listener
    fire.auth().onAuthStateChanged(this.redirectUser);
  }

  redirectUser(user) {
    // If the user exists...
    if (user) {
      // Get their profile data
      let profile = {
        email: user.email,
        name: user.displayName,
        photoURL: user.photoURL,
        uid: user.uid
      };
      // Navigate to the main page, passing on user data
      this.props.history.push({
        pathname: ROUTES.MAIN,
        state: { user: profile }
      });
    } else {
      // Otherwise, navigate to the sign in page
      this.props.history.push(ROUTES.SIGN_IN);
    }
  }

  render() {
    return <Fragment />;
  }
}

export default Landing;
