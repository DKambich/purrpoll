import React, { Component } from "react";
// Material UI Imports
import {
  MuiThemeProvider,
  createMuiTheme,
  withStyles
} from "@material-ui/core/styles";
import { deepPurple, red } from "@material-ui/core/colors";
import CssBaseline from "@material-ui/core/CssBaseline";
import "typeface-roboto";
// React Router Imports
import { BrowserRouter as Router, Route } from "react-router-dom";
import * as ROUTES from "../constants/routes";
// Local Imports
import Authentication from "../screens/Authentication";
import Landing from "../screens/Landing";
import Main from "../screens/Main";
import Profile from "../screens/Profile";

const styles = theme => ({
  "@global": {
    "*::-webkit-scrollbar": {
      width: ".75em"
    },
    "*::-webkit-scrollbar-track": {
      background: "rgba(0,0,0,.2)"
    },
    "*::-webkit-scrollbar-thumb": {
      outline: "1px solid slategrey",
      backgroundColor: "rgba(0,0,0,.3)",
      borderRadius: 20
    }
  }
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider
        theme={theme}
        classes={this.props.classes.invisibleScrollbar}
      >
        <CssBaseline />
        <Router>
          <Route path={ROUTES.LANDING} exact component={Landing} />
          <Route path={ROUTES.SIGN_IN} component={Authentication} />
          <Route path={ROUTES.MAIN} component={Main} />
          <Route path={ROUTES.PROFILE} component={Profile} />
        </Router>
      </MuiThemeProvider>
    );
  }
}

// Create the Global App Theme
const theme = createMuiTheme({
  palette: {
    primary: deepPurple,
    secondary: red
  },
  typography: {
    useNextVariants: true
  }
});

export default withStyles(styles)(App);
