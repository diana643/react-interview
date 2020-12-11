import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid } from "@material-ui/core";
import MovieCard from "../components/MovieCard";
import { movies$ } from "../data/movies";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles({
  root: {
    margin: "50px 100px"
  },
  item: {
    margin: "20px 0"
  },
  label: {
    fontSize: "35px"
  }
});

const Index = (props) => {
  const classes = useStyles();

  const [moviesList, setMoviesList] = useState([]);
  const [list,setList] = useState([]);

  useEffect(() => {
    movies$.then((value) => {
      setMoviesList(value);
      setList(value);
    });
  }, []);

  const [category, setCategory] = useState([
    "Comedy",
    "Animation",
    "Thriller",
    "Drame"
  ]);

  const [state, setState] = React.useState({
    Comedy: false,
    Animation: false,
    Thriller: false,
    Drame: false
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    const results = moviesList.filter(
      (item) =>
        item.category.includes(event.target.name) &&
        event.target.checked === true
    );
    setMoviesList(results);
    if(event.target.checked === false){
        setMoviesList(list);
    }
  };

  const handleDelete = (id) => {
    let newArr = [...moviesList];
    let newlist = newArr.filter((item) => item.id !== id);
    setMoviesList(newlist);
    setList(newlist);
  };

  return (
    <Grid className={classes.root}>
        <Grid container style={{margin: '30px 0'}}>
            <Typography variant="h4">Welcome to your movie list</Typography>
        </Grid>
      <Grid container>
        <Grid item>
          <Grid
            container
            spacing={3}
            justify="space-between"
            alignItems="center">
            {category.map((data) => (
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      className={classes.label}
                      checked={state.checked}
                      onChange={handleChange}
                      name={data}
                    />
                  }
                  label={data}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Grid container justify="flex-start" spacing={3}>
        {moviesList.map((data) => (
          <Grid item key={data.id} className={classes.item}>
            <MovieCard
              handleDelete={(id) => handleDelete(data.id)}
              id={data.id}
              title={data.title}
              category={data.category}
              likes={data.likes}
              dislikes={data.dislikes}
            />
          </Grid>
        ))}
      </Grid>
      <Grid container justify="center">
          <Grid item>
          <Pagination count={3} />
          </Grid>
        
      </Grid>
    </Grid>
  );
};

export default Index;
