import React, { Component, Fragment } from "react";
// Material UI Imports
import {
  AppBar,
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  withStyles
} from "@material-ui/core";
// Material UI Icon Imports
import {
  ArrowBackRounded,
  DeleteForever,
  ExitToApp,
  MoreVert
} from "@material-ui/icons";
// Firebase Imports
import firebase from "firebase/app";
import "firebase/auth";
import fire from "../constants/config";
// React Router Imports
import { LANDING } from "../constants/routes";
import CatCard from "../components/CatCard";
import CatLoading from "../components/CatLoading";

const styles = theme => {
  return {
    headerGrow: {
      flexGrow: 1,
      marginLeft: theme.spacing.unit
    },
    headerPadding: {
      paddingTop: 64
    },
    avatar: {
      marginRight: theme.spacing.unit
    },
    deleteIcon: {
      color: "darkred"
    },
    loadingIcon: {
      marginTop: theme.spacing.unit * 4
    }
  };
};

class Profile extends Component {
  constructor(props) {
    super(props);

    if (!props.location.state) {
      this.props.history.push(LANDING);
    }

    this.state = {
      dialogOpen: false,
      loading: true,
      menuAnchor: null,
      mounted: false,
      user: props.location.state.user,
      userCats: []
    };

    // Function Binding
    this.signOut = this.signOut.bind(this);
    this.deleteAccount = this.deleteAccount.bind(this);
    this.getVotedCats = this.getVotedCats.bind(this);

    this.renderCatGrid = this.renderCatGrid.bind(this);

    this.renderMenu = this.renderMenu.bind(this);
    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);

    this.renderDialog = this.renderDialog.bind(this);
    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
  }

  render() {
    const { classes, history, location } = this.props;
    const { user } = location.state;

    return (
      <Fragment>
        <AppBar color="primary" position="fixed">
          <Toolbar>
            <Tooltip title="Go Back">
              <IconButton color="inherit" onClick={history.goBack}>
                <ArrowBackRounded />
              </IconButton>
            </Tooltip>

            <Typography
              variant="h6"
              color="inherit"
              className={classes.headerGrow}
            >
              {user.name}
            </Typography>
            <Avatar src={user.photoURL} className={classes.avatar} />
            <Tooltip title="More Options">
              <IconButton color="inherit" onClick={this.openMenu}>
                <MoreVert />
              </IconButton>
            </Tooltip>
            {this.renderMenu()}
            {this.renderDialog()}
          </Toolbar>
        </AppBar>

        <div className={classes.headerPadding} />

        <Grid container direction="row" justify="center" alignItems="center">
          {this.renderCatGrid()}
        </Grid>
      </Fragment>
    );
  }

  signOut() {
    this.closeMenu();
    // Sign the user out
    fire.auth().signOut();
    // Navigate to the landing page
    this.props.history.push(LANDING);
  }

  async deleteAccount() {
    this.closeDialog();
    // Get the current user
    let user = fire.auth().currentUser;
    try {
      // Attempt to delete the user
      await user.delete();
      // If successful navigate to the landing page
      this.props.history.push(LANDING);
    } catch (error) {
      console.error(error.code, error.message);
      // Reauthetnicate if needed
      let provider = new firebase.auth.GoogleAuthProvider();
      await user.reauthenticateWithPopup(provider);
      // Delete the user once reauthenticated
      try {
        await user.delete();
      } catch (error) {
        console.error(error.code, error.message);
        // TODO: Show snackbar
      }

      // If successful navigate to the landing page
      this.props.history.push(LANDING);
    }
  }

  async getVotedCats() {
    // Make a call to fetch the user's rated cats
    let res = await fetch(
      "https://us-central1-purrpoll.cloudfunctions.net/getUserRatedCats",
      {
        method: "post",
        body: await JSON.stringify({ uid: this.state.user.uid }),
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    // Parse the response into JSON
    res = await res.json();

    // If the fetch was successful, update the state of the page
    if (res.status === "success" && this.state.mounted)
      this.setState({ loading: false, userCats: res.catsPicked });
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
    if (this.state.mounted) this.setState({ dialogOpen: true });
  }

  closeDialog() {
    if (this.state.mounted) this.setState({ dialogOpen: false });
  }

  renderMenu() {
    return (
      <Menu
        id="long-menu"
        anchorEl={this.state.menuAnchor}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        open={Boolean(this.state.menuAnchor)}
        onClose={this.closeMenu}
      >
        {/* Placeholder MenuItem so first real MenuItem is not highlighted */}
        <MenuItem key="placeholder" style={{ display: "none" }} />
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
            <DeleteForever className={this.props.classes.deleteIcon} />
          </ListItemIcon>
          <ListItemText primary="Delete Account" />
        </MenuItem>
      </Menu>
    );
  }

  openMenu(event) {
    if (this.state.mounted) this.setState({ menuAnchor: event.currentTarget });
  }

  closeMenu() {
    if (this.state.mounted) this.setState({ menuAnchor: null });
  }

  renderCatGrid() {
    // If the state is loading, display a loading icon
    if (this.state.loading) {
      return (
        <div className={this.props.classes.loadingIcon}>
          <CatLoading />
        </div>
      );
    }

    // If the user has not voted for any cats, display a message stating such
    if (this.state.userCats.length === 0) {
      return (
        <div className={this.props.classes.loadingIcon}>
          <Typography variant="body1">
            You haven't rated any cats yet!
          </Typography>
        </div>
      );
    }

    // If there are cats the user has voted, display theme
    return (
      <Fragment>
        {this.state.userCats.map(({ id, name, image, totalVotes }) => (
          <CatCard key={id} title={name} src={image} rating={totalVotes} />
        ))}
      </Fragment>
    );
  }

  componentDidMount() {
    this.setState({ mounted: true });
    this.getVotedCats();
  }

  componentWillUnmount() {
    this.setState({ mounted: false });
  }
}

export default withStyles(styles, { withTheme: true })(Profile);
