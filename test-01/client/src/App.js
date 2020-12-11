import React from 'react';
import { getStore } from './redux';
import { Provider } from 'react-redux';
import { AppBar, Toolbar, Typography, FormControlLabel, Checkbox, makeStyles } from '@material-ui/core';
import GalleryPage from './pages/gallery-page';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import ImageIcon from '@material-ui/icons/Image';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import { setShowOnlyFavourites } from "./redux/actions";

const myStore = getStore();
/**
 * Main app component. Hooks up the Redux store and provides the app bar. The main app logic is all handled
 * within the ToDoManager.
 */
function App(props) {

  const classes = useStyles();

  return (
    <Provider store={myStore}>
      <Router>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <AppBar position="static" className={classes.appBar}>
            <Toolbar>
              <ImageIcon fontSize="large" className={classes.icon} />
              <Typography variant="h6" className={classes.title}>Yet Another Image Gallery</Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    icon={<StarBorderIcon />}
                    checkedIcon={<StarIcon />}
                    checked={props.config.showOnlyFavourites}
                    onChange={event => props.setShowOnlyFavourites(event.target.checked)}
                    color="secondary"
                  />
                }
                label="Show only favourites"
              />
            </Toolbar>
          </AppBar>
          <div className={classes.container}>
            <GalleryPage />
          </div>
        </MuiPickersUtilsProvider>
      </Router>
    </Provider>
  );
}

const mapStateToProps = state => {
  return {
      config: state.config
  }
}

const mapDispatchToProps = {
  setShowOnlyFavourites
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(1)
  },
  appBar: {
    marginBottom: theme.spacing(1)
  },
  title: {
    flexGrow: 1
  },
  container: {
    display: 'grid',
    gridTemplateRows: '1fr',
    gridTemplateColumns: '1fr'
  }
}));

export default connect(mapStateToProps, mapDispatchToProps)(App);