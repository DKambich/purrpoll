import React, { Component } from "react";
// Material UI Imports
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
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

import "./App.css";
import Profile from "../screens/Profile";

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <CssBaseline />
          <Route path={ROUTES.LANDING} exact component={Landing} />
          <Route path={ROUTES.SIGN_IN} component={Authentication} />
          <Route path={ROUTES.MAIN} component={Main} />
          <Route path={ROUTES.PROFILE} component={Profile} />
        </Router>
      </MuiThemeProvider>
    );
  }
}

const theme = createMuiTheme({
  palette: {
    primary: deepPurple,
    secondary: red
  },
  typography: {
    useNextVariants: true
  }
});

export default App;
