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
      userCats: []
    };

    // Function Binding
    this.signOut = this.signOut.bind(this);
    this.deleteAccount = this.deleteAccount.bind(this);

    this.renderCatGrid = this.renderCatGrid.bind(this);

    this.renderMenu = this.renderMenu.bind(this);
    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);

    this.renderDialog = this.renderDialog.bind(this);
    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false, userCats: new Array(50).fill(0) });
    }, 2000);
  }

  render() {
    const { menuAnchor } = this.state;
    const open = Boolean(menuAnchor);
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
          {/* <CatCard
            title="Kitty"
            src="https://cdn2.thecatapi.com/images/5vk.jpg"
            rating={1}
          /> */}
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
    this.setState({ menuAnchor: event.currentTarget });
  }

  closeMenu() {
    this.setState({ menuAnchor: null });
  }

  renderCatGrid() {
    if (this.state.loading) {
      return (
        <div className={this.props.classes.loadingIcon}>
          <CatLoading />
        </div>
      );
    } else if (this.state.userCats.length === 0) {
      return <Typography>No cats found</Typography>;
    }
    return (
      <Fragment>
        {this.state.userCats.map(() => (
          <CatCard
            title="Cat"
            src="https://cdn2.thecatapi.com/images/5ek.jpg"
            rating={Math.floor(Math.random() * 100)}
          />
        ))}
      </Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Profile);
