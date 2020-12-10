import React, { Fragment, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid } from "@material-ui/core";
import MovieCard from "../components/MovieCard";
import { movies$ } from "../data/movies";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles({
  root: {
    margin: "50px 100px"
  },
  item: {
    margin: "20px 0"
  }
});

const Index = (props) => {
  const classes = useStyles();

  const [moviesList, setMoviesList] = useState([]);

  useEffect(() => {
    movies$.then((moviesList) => {
      setMoviesList(moviesList);
    });
    //console.log(moviesList.title);
  });

  return (
    <Grid className={classes.root}>
      <Grid container>
        <Grid item>
          <Autocomplete
            options={moviesList}
            getOptionLabel={(option) => option.title}
            style={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Combo box" variant="outlined" />
            )}
          />
        </Grid>
      </Grid>
      <Grid container justify="flex-start" spacing={3}>
        {moviesList.map(data => (
          <Grid item key={data.id} className={classes.item}>
            <MovieCard
              id={data.id}
              title={data.title}
              category={data.category}
              likes={data.likes}
              dislikes={data.dislikes}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default Index;
