import React, { Component } from "react";
// Material UI Imports
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { deepPurple } from "@material-ui/core/colors";

import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";
import * as ROUTES from "../constants/routes";

import "typeface-roboto";

import Authentication from "../screens/Auth";
import Main from "../screens/Main";

import "./App.css";

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <CssBaseline />
          <Route path={ROUTES.LANDING} exact component={Authentication} />
          <Route path={ROUTES.HOME} component={Main} />
        </Router>
      </MuiThemeProvider>
    );
  }
}

const theme = createMuiTheme({
  palette: {
    primary: deepPurple
  },
  typography: {
    useNextVariants: true
  }
});

export default App;
