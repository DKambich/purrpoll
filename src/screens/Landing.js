import React, { Component } from "react";
// Firebase Imports
import fire from "../constants/config";
// React Router Imports
import * as ROUTES from "../constants/routes";
import { withRouter } from "react-router-dom";

class Landing extends Component {
  constructor(props) {
    super(props);
    this.redirectUser = this.redirectUser.bind(this);
    fire.auth().onAuthStateChanged(this.redirectUser);
  }

  redirectUser(user) {
    if (user) {
      let profile = {
        email: user.email,
        name: user.displayName,
        photoURL: user.photoURL,
        uid: user.uid
      };
      this.props.history.push({
        pathname: ROUTES.MAIN,
        state: { user: profile }
      });
    } else {
      this.props.history.push(ROUTES.SIGN_IN);
    }
  }

  render() {
    return <div />;
  }
}

export default withRouter(Landing);
