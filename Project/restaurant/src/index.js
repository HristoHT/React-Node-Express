import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Route, Switch, Redirect } from "react-router-dom";
import PrivateRoute from './components/utils/PrivateRoute';
import { Router } from 'react-router';
import PosMenu from "../src/view/PosMenu";
import FloorsManager from "../src/view/FloorsManager";
import Floors from "../src/view/Floors";
import AppMenu from "../src/view/AppMenu";
import PriceList from "./view/PriceList";
import Login from "./view/Login";
import Personnel from "./view/Personnel";
import history from './history';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { orange, blue, red } from '@material-ui/core/colors';

import { Provider } from 'react-redux';
import store from './store/store';

import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import format from "date-fns/format";

import bg from "date-fns/locale/bg";
import pages from "./globals/pages";


import NewFloor from './components/FloorManager/Floor';
/**
 * Datepicker's date format type
 */
class LocalizedUtils extends DateFnsUtils {
  getDatePickerHeaderText(date) {
    return format(date, "dd.mm.yyyy");
  }
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: red[500],
    },
  },

});

theme.typography.h4 = {
  fontSize: '1rem',
  '@media (min-width:600px)': {
    fontSize: '1.6rem',
  },
  '@media (max-width:320px)': {
    fontSize: '0.5rem',
  },
};

ReactDOM.render(
  <React.StrictMode>
    <MuiPickersUtilsProvider locale={bg} utils={LocalizedUtils}> {/** for datepickers */}
      <Provider store={store}> {/** Redux store */}
        <Router history={history}> {/** React history */}
          <ThemeProvider theme={theme}> {/** Material UI Theme provider */}
            <Switch>
              <Route path='/f' exact component={(props) => <NewFloor {...props} />} />
              <PrivateRoute path={pages.default} exact component={(props) => <AppMenu {...props} />} />
              <PrivateRoute path={pages.floors} exact component={(props) => <Floors {...props} />} />
              <PrivateRoute path={pages.floorsmanager} exact component={(props) => <FloorsManager {...props} />} />
              <PrivateRoute path={pages.menu} component={(props) => <PosMenu {...props} />} />
              <PrivateRoute path={pages.pricelist} component={(props) => <PriceList {...props} />} />
              <PrivateRoute path={pages.personnel} component={(props) => <Personnel {...props} />} />
              <PrivateRoute path={pages.login} component={(props) => <Login {...props} />} />
            </Switch>
          </ThemeProvider>
        </Router>
      </Provider>
    </MuiPickersUtilsProvider>
  </React.StrictMode >,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
