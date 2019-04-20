import React, { PureComponent } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  withStyles
} from "@material-ui/core";

const styles = theme => ({
  root: {
    display: "inline-block",
    width: 300,
    margin: theme.spacing.unit * 3
  },
  media: {
    width: 300,
    height: 300,
    objectFit: "cover"
  },
  rating: {
    margin: theme.spacing.unit
  }
});

class CatCard extends PureComponent {
  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="h6">{this.props.title}</Typography>
        </CardContent>
        <CardMedia
          className={classes.media}
          image={this.props.src}
          title={this.props.title}
        />
        <Typography color="textSecondary" className={classes.rating}>
          {`Total purrpoints: ${this.props.rating}`}
        </Typography>
      </Card>
    );
  }
}

export default withStyles(styles)(CatCard);
