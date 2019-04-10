import React, { Component } from "react";
// Material UI Imports
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { deepPurple } from "@material-ui/core/colors";

import "typeface-roboto";

import Authentification from "./Auth";

import "./App.css";

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Authentification />
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
