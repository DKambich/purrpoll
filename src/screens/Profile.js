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

  async getVotedCats() {
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
    res = await res.json();
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
    if (this.state.loading) {
      return (
        <div className={this.props.classes.loadingIcon}>
          <CatLoading />
        </div>
      );
    } else if (this.state.userCats.length === 0) {
      return (
        <div className={this.props.classes.loadingIcon}>
          <Typography variant="body1">
            You haven't rated any cats yet!
          </Typography>
        </div>
      );
    }
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
