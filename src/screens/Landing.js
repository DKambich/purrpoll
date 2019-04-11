import React, { Component } from "react";
import fire from "../constants/config";
import * as ROUTES from "../constants/routes";

class Landing extends Component {
  constructor(props) {
    super(props);
    fire.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        console.log("signed in");
        props.history.push(ROUTES.MAIN);
      } else {
        // No user is signed in.
        console.log("not signed in");
        props.history.push(ROUTES.SIGN_IN);
      }
    });
  }
  render() {
    return <div />;
  }
}

export default Landing;
