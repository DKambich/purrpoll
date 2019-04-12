import React, { Component, Fragment } from "react";
// Material UI Imports
import {
  AppBar,
  Avatar,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  withStyles,
  ListItemText,
  ListItemIcon
} from "@material-ui/core";
import {
  ArrowBackRounded,
  ExitToApp,
  DeleteForever,
  MoreVert
} from "@material-ui/icons";
// Firebase Imports
import fire from "../constants/config";
// React Router Imports
import { LANDING } from "../constants/routes";

const styles = theme => {
  return {
    grow: {
      flexGrow: 1,
      marginLeft: theme.spacing.unit
    },
    avatar: {
      marginRight: theme.spacing.unit
    },
    deleteIcon: {
      color: "red"
    }
  };
};

const testArr = new Array(51).fill(0);

class Profile extends Component {
  constructor(props) {
    super(props);

    if (!props.location.state) {
      this.props.history.push(LANDING);
    }

    this.state = {
      anchorEl: null
    };

    // Function Binding
    this.signOut = this.signOut.bind(this);
    this.deleteAccount = this.deleteAccount.bind(this);
    this.renderMenu = this.renderMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.openMenu = this.openMenu.bind(this);
  }

  render() {
    const { classes, history, location, theme } = this.props;
    const { user } = location.state;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <Fragment>
        <AppBar position="static" color="primary">
          <Toolbar>
            <IconButton color="inherit" onClick={history.goBack}>
              <ArrowBackRounded />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              {user.name}
            </Typography>
            <Avatar src={user.photoURL} className={classes.avatar} />
            <IconButton color="inherit" onClick={this.openMenu}>
              <MoreVert />
            </IconButton>
            {this.renderMenu(anchorEl, open)}
          </Toolbar>
        </AppBar>

        <Grid container direction="column" justify="center" alignItems="center">
          <Typography variant="h4">Your Voted Cats</Typography>
        </Grid>
        <Grid container direction="row" justify="center" alignItems="center">
          {testArr.map((element, index) => (
            <Card
              style={{
                display: "inline-block",
                width: 250,
                margin: theme.spacing.unit * 3
              }}
            >
              <CardContent>{index}</CardContent>
            </Card>
          ))}
        </Grid>
      </Fragment>
    );
  }

  renderMenu(element, open) {
    return (
      <Menu
        id="long-menu"
        anchorEl={element}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        open={open}
        onClose={this.closeMenu}
      >
        {/* MenuItem to sign the user out */}
        <MenuItem onClick={this.signOut} selected={false}>
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText primary="Sign Out" />
        </MenuItem>
        {/* MenuItem to delete the user's account */}
        <MenuItem onClick={this.deleteAccount}>
          <ListItemIcon>
            <DeleteForever color="secondary" />
          </ListItemIcon>
          <ListItemText
            primary="Delete Account"
            className={this.props.classes.deleteIcon}
          />
        </MenuItem>
      </Menu>
    );
  }

  openMenu(event) {
    // this.setState({ anchorEl: event.currentTarget.children[0] });
    this.setState({ anchorEl: event.currentTarget });
  }

  closeMenu() {
    this.setState({ anchorEl: null });
  }

  signOut() {
    this.closeMenu();
    fire.auth().signOut();
    this.props.history.push(LANDING);
  }

  deleteAccount() {}
}

export default withStyles(styles, { withTheme: true })(Profile);
