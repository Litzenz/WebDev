import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import PageHeader from './layout-components/page-header';
import styles from './app.module.css';
import NavBar from './layout-components/nav-bar';
import ToDoPage from './to-do-page';
import CalendarPage from './calendar-page';
import moment from 'moment';

/**
 * Renders the page header, navbar, footer, and main content.
 * 
 * The main content is set based on the current URL (achieved using react-router-dom).
 */
function App() {
  return (
    <Router>
      <div className={styles.container}>

        <PageHeader title="Organizer" description="Organize your life!" />
        
        <NavBar links={[
          { path: "/todos", text: "My To-Dos" },
          { path: "/calendar", text: "My Calendar" }
        ]} afterLinks={<>
          <p><strong>0</strong> upcoming events, <strong>0</strong> pending to-dos</p>
        </>} />

        <main>
          <Switch>
            <Route path="/todos">
              <ToDoPage />
            </Route>
            <Route path="/calendar">
              <CalendarPage />
            </Route>
            <Route exact path="/">
              <Redirect to="/todos" />
            </Route>
            <Route path="*">
              <p>404 Not Found!!</p>
            </Route>
          </Switch>
        </main>

        <footer>
          <p>&copy; SE750 / CS732, {moment().format("MMMM Do, YYYY")}</p>
        </footer>

      </div>
    </Router>
  );
}

export default App;