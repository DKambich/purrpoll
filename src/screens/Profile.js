import React, { Component, Fragment } from "react";
// Material UI Imports
import {
  AppBar,
  Avatar,
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
  ListItemIcon,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from "@material-ui/core";
import {
  ArrowBackRounded,
  ExitToApp,
  DeleteForever,
  MoreVert
} from "@material-ui/icons";
// Firebase Imports
import firebase from "firebase/app";
import "firebase/auth";
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
      menuAnchor: null,
      dialogOpen: false
    };

    // Function Binding
    this.signOut = this.signOut.bind(this);
    this.deleteAccount = this.deleteAccount.bind(this);

    this.renderMenu = this.renderMenu.bind(this);
    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);

    this.renderDialog = this.renderDialog.bind(this);
    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
  }

  render() {
    const { classes, history, location, theme } = this.props;
    const { user } = location.state;
    const { menuAnchor } = this.state;
    const open = Boolean(menuAnchor);

    return (
      <Fragment>
        <AppBar color="primary" position="fixed">
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
            {this.renderMenu(menuAnchor, open)}
            {this.renderDialog()}
          </Toolbar>
        </AppBar>

        <div style={{ paddingTop: 64 }} />

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

  signOut() {
    this.closeMenu();
    fire.auth().signOut();
    this.props.history.push(LANDING);
  }

  async deleteAccount() {
    this.closeDialog();
    let user = fire.auth().currentUser;
    try {
      await user.delete();
      this.props.history.push(LANDING);
    } catch (error) {
      console.error(error.code, error.message);
      let provider = new firebase.auth.GoogleAuthProvider();
      await user.reauthenticateWithPopup(provider);
      await user.delete();
      this.props.history.push(LANDING);
    }
  }

  renderDialog() {
    return (
      <Dialog open={this.state.dialogOpen} onClose={this.closeDialog}>
        <DialogTitle>Delete your account?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            By deleting your account, all your personal data and account details
            will be deleted and you will have to create a new account to log in.
            Do you wish to proceed?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.closeDialog} color="inherit" autoFocus>
            Cancel
          </Button>
          <Button onClick={this.deleteAccount} color="secondary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  openDialog() {
    this.closeMenu();
    this.setState({ dialogOpen: true });
  }

  closeDialog() {
    this.setState({ dialogOpen: false });
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
        <MenuItem onClick={this.openDialog}>
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
    this.setState({ menuAnchor: event.currentTarget });
  }

  closeMenu() {
    this.setState({ menuAnchor: null });
  }
}

export default withStyles(styles, { withTheme: true })(Profile);
