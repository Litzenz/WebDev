import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, NavLink } from 'react-router-dom';
import styles from './app.module.css';
import MasterDetailExample from './master-detail-example';
import Directory from './directory';

function App() {
  return (
    <Router>
      <div className={styles.container}>

        <header>
          <h1>My Website</h1>
          <nav>
            <NavLink to="/page1" activeClassName={styles.activeLink}>Page One</NavLink>
            <NavLink to="/page2" activeClassName={styles.activeLink}>Page Two</NavLink>
            <NavLink to="/master-detail" activeClassName={styles.activeLink}>Master-Detail Example</NavLink>
            <NavLink to="/staff-directory" activeClassName={styles.activeLink}>Directory (Ex 01)</NavLink>
          </nav>
        </header>

        <main>
          {/* One of the Routes will be rendered based on the URL path */}
          <Switch>
            <Route path="/page1">
              <p>Page One</p>
            </Route>
            <Route path="/page2">
              <p>Page Two</p>
            </Route>
            <Route path="/master-detail">
              <MasterDetailExample />
            </Route>
            <Route path="/staff-directory">
              <Directory />
            </Route>
            <Route path="*">
              <p>404 Not Found!!</p>
            </Route>
          </Switch>
        </main>

      </div>
    </Router>
  );
}

export default App;