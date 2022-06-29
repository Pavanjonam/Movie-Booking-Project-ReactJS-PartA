import React, { Component } from "react";
import ReactDOM from 'react-dom';
import Header from '../../common/header/Header';
import "./Home.css";
import { withStyles } from '@material-ui/core/styles';
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import moviesData from "../../common/moviesData.js";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import artists from "../../common/artists";
import genres from '../../common/genre';
import Details from '../details/Details.js';


const styles = theme => ({
  root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper
  },
  upcomingMoviesHeading: {
      textAlign: 'center',
      background: '#ff9999',
      padding: '8px',
      fontSize: '1rem'
  },
  gridListUpcomingMovies: {
      flexWrap: 'nowrap',
      transform: 'translateZ(0)',
      width: '100%'
  },
  gridListMain: {
      transform: 'translateZ(0)',
      cursor: 'pointer',
      margin:'0%'
      
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 240,
    maxWidth: 240
},
  title: {
      color: theme.palette.primary.light,
  }
});

class Home extends Component {
  constructor() {
    super();
    this.state = {
        movieName: "",
        upcomingMovies: [],
        releasedMovies: [],
        genres: [],
        artists: [],
        genresList: genres,
        artistsList: artists,
        releaseDateStart: "",
        releaseDateEnd: ""
    }
}

movieNameChangeHandler = event => {
  this.setState({ movieName: event.target.value });
}

genreSelectHandler = event => {
  this.setState({ genres: event.target.value });
}

artistSelectHandler = event => {
  this.setState({ artists: event.target.value });
}

releaseDateStartHandler = event => {
  this.setState({ releaseDateStart: event.target.value });
}

releaseDateEndHandler = event => {
  this.setState({ releaseDateEnd: event.target.value });
}

movieClickHandler = (movieId) => {
  ReactDOM.render(<Details movieId={movieId} />, document.getElementById('root'));
}


  render() {
    const { classes } = this.props;
    var filterMovie=moviesData.filter((movie)=>{
    return(movie.title.toLowerCase()=== this.state.movieName.toLowerCase() ||this.state.artists.includes( (movie.artists[0].first_name+" "+movie.artists[0].last_name)))
  })
    if(this.state.movieName.length ===0  && this.state.artists.length === 0){
      filterMovie=moviesData;
    }
    

    return (
      <div>
        <Header baseUrl={this.props.baseU} />
        <div id="upcoming">
          <span>Upcoming Movies</span>
        </div>
        <div>
        <GridList cols={5} className={classes.gridListUpcomingMovies}>
            {moviesData.map((tile) => (
              <GridListTile key={tile.id} className="a">
                <img
                  src={tile.poster_url}
                  alt={tile.title}
                  className="movie-poster"
                />
                <GridListTileBar title={tile.title} />
              </GridListTile>
            ))}
          </GridList>
        </div>
        <div className="flex-container">
            <div className="left">
            <GridList cellHeight={350} cols={4} className={classes.gridListMain}>
              {filterMovie.map((movie) => (
                <GridListTile  onClick={() => this.movieClickHandler(movie.id)} className="released-movie-grid-item"
                key={"grid" + movie.id}
                >
                  <img
                    src={movie.poster_url}
                    className="movie-poster2"
                    alt={movie.title}
                  />
                  <GridListTileBar
                    title={movie.title}
                    subtitle={
                      <span>
                        Release Date:
                        {new Date(movie.release_date).toDateString()}
                      </span>
                    }
                  />
                </GridListTile>
              ))}
            </GridList>

            </div>
            <div className="right">
                        <Card>
                            <CardContent>
                                <FormControl className={classes.formControl}>
                                    <Typography className={classes.title} color="textSecondary">
                                        FIND MOVIES BY:
                                    </Typography>
                                </FormControl>

                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="movieName">Movie Name</InputLabel>
                                    <Input id="movieName" onChange={this.movieNameChangeHandler} />
                                </FormControl>

                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="select-multiple-checkbox">Genres</InputLabel>
                                    <Select
                                        multiple
                                        input={<Input id="select-multiple-checkbox-genre" />}
                                        renderValue={selected => selected.join(',')}
                                        value={this.state.genres}
                                        onChange={this.genreSelectHandler}
                                    >
                                        <MenuItem value="0">None</MenuItem>
                                        {genres.map(genre => (
                                            <MenuItem key={genre.id} value={genre.name}>
                                                <Checkbox checked={this.state.genres.indexOf(genre.name) > -1} />
                                                <ListItemText primary={genre.name} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="select-multiple-checkbox">Artists</InputLabel>
                                    <Select
                                        multiple
                                        input={<Input id="select-multiple-checkbox" />}
                                        renderValue={selected => selected.join(',')}
                                        value={this.state.artists}
                                        onChange={this.artistSelectHandler}
                                    >
                                        <MenuItem value="0">None</MenuItem>
                                        {artists.map(artist => (
                                            <MenuItem key={artist.id} value={artist.first_name + " " + artist.last_name}>
                                                <Checkbox checked={this.state.artists.indexOf(artist.first_name + " " + artist.last_name) > -1} />
                                                <ListItemText primary={artist.first_name + " " + artist.last_name} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                    <TextField
                                        id="releaseDateStart"
                                        label="Release Date Start"
                                        type="date"
                                        defaultValue=""
                                        InputLabelProps={{ shrink: true }}
                                       
                                    />
                                </FormControl>

                                <FormControl className={classes.formControl}>
                                    <TextField
                                        id="releaseDateEnd"
                                        label="Release Date End"
                                        type="date"
                                        defaultValue=""
                                        InputLabelProps={{ shrink: true }}
                                        
                                    />
                                </FormControl>
                                <br /><br />
                                <FormControl className={classes.formControl}>
                                    <Button  variant="contained" color="primary">
                                      
                                        APPLY
                                    </Button>
                                </FormControl>
                            </CardContent>
                        </Card>
                    </div>

        </div>
      </div>
    );
  }
}
export default withStyles(styles)(Home);