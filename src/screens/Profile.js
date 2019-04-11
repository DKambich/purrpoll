import React, { Component, Fragment } from "react";
import fire from "../constants/config";
import * as ROUTES from "../constants/routes";
import { withStyles, Button } from "@material-ui/core";

const styles = {};

class Profile extends Component {
  constructor(props) {
    super(props);
    this.signout = this.signout.bind(this);
    if (!fire.auth().currentUser) {
      this.props.history.push(ROUTES.LANDING);
    }
  }
  render() {
    return (
      <Fragment>
        <div>PROFILE</div>
        <Button variant="contained" onClick={this.signout}>
          Logout
        </Button>
      </Fragment>
    );
  }

  signout() {
    fire.auth().signOut();
    this.props.history.push(ROUTES.LANDING);
  }
}

export default withStyles(styles)(Profile);
