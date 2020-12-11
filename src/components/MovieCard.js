import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles({
  root: {
    width: "350px"
    //height: "150px"
  },
  title: {
    fontWeight: "500"
  },
  actionArea: {
    display: "flex",
    justifyContent: "flex-end"
  }
});

const MovieCard = (props) => {
  const classes = useStyles();

  const [likes, setLikes] = useState(props.likes);
  const [dislikes, setDislikes] = useState(props.dislikes);

  const handleDelete = () =>{
      props.handleDelete(props.id);
  }
   const handleLike = () => {
     setLikes(likes + 1);
  };

  const handleDislike = () => {
    setDislikes(dislikes + 1);
  };

  return (
    <Card className={classes.root}>
      <CardActions className={classes.actionArea}>
        <IconButton size="small" className onClick={handleDelete}>
          <CloseIcon />
        </IconButton>
      </CardActions>
      <CardContent>
        <Grid
          container
          direction="column"
          justify="space-between"
          alignItems="center">
          <Grid item>
            <Typography variant="h4" className={classes.title}>
              {props.title}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h5">{props.category}</Typography>
          </Grid>
          <Grid item>
            <Grid container justify="flex-start" alignItems="center">
              <Grid item>
                <IconButton size="small" onClick={handleLike}>
                  <ThumbUpAltIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <Typography variant="h5">{likes}</Typography>
              </Grid>
              <Grid item>
                <IconButton size="small" onClick={handleDislike}>
                  <ThumbDownIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <Typography variant="h5">{dislikes}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
