import React, { Component } from "react";
import fire from "../constants/config";
import * as ROUTES from "../constants/routes";

class Main extends Component {
  constructor(props) {
    super(props);
    if (!fire.auth().currentUser) {
      this.props.history.push(ROUTES.LANDING);
    }
  }
  render() {
    return <div>Hello world</div>;
  }
}

export default Main;
