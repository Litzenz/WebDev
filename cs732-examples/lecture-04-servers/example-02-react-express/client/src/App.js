import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import PageHeader from './layout-components/page-header';
import styles from './app.module.css';
import NavBar from './layout-components/nav-bar';
import ToDoPage from './to-do-page';
import CalendarPage from './calendar-page';
import moment from 'moment';
import { connect } from 'react-redux';
import { loadTodos } from './redux/actions/thunk';

/**
 * Renders the page header, navbar, footer, and main content.
 * 
 * The main content is set based on the current URL (achieved using react-router-dom).
 */
class App extends React.Component {

  // constructor(props) {
  //   super(props);

  //   // this.state = {};
  // }

  componentDidMount() {
    // this.callApi();
    this.props.loadTodos();
  }

  // async callApi() {
  //   try {
  //     const response = await fetch("/api");
  //     const json = await response.json();
  //     console.log(json);
  //     this.setServerStatus(`Server status: ${response.status}`);
  //   } catch (err) {
  //     console.log(err);
  //     this.setServerStatus("Server errored out!")
  //   }
  // }

  // setServerStatus(status) {
  //   this.setState(state => ({
  //     serverStatus: status
  //   }));
  // }

  render() {
    return (
      <Router>
        <div className={styles.container}>

          <PageHeader title="Organizer" description="Organize your life!" />

          <NavBar links={[
            { path: "/todos", text: "My To-Dos" },
            { path: "/calendar", text: "My Calendar" }
          ]} afterLinks={<>
            <p><strong>{this.props.numUpcomingEvents}</strong> upcoming events, <strong>{this.props.numPendingTodos}</strong> pending to-dos</p>
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
            <p>&copy; SE750 / CS732, {moment().format("MMMM Do, YYYY")}
              {/*this.state.serverStatus && <span> {this.state.serverStatus}</span>*/}</p>
          </footer>

        </div>
      </Router>
    );
  }
}

// This code connects App to the Redux store.
// -------------------------------------------------------------
/**
 * This function will configure the App to have a couple of values exposed as properties.
 * These values are calculated from data contained in the Redux store.
 * 
 * @param state The entire Redux state tree
 */
function mapStateToProps(state) {
  const now = moment();
  return {
    numUpcomingEvents: state.events.filter(event => now.isBefore(event.start)).length,
    numPendingTodos: state.todos.filter(todo => !todo.completed).length
  };
}

const mapDispatchToProps = {
  loadTodos
}

// Applies the config using the "connect" higher-order component provided by Redux
export default connect(mapStateToProps, mapDispatchToProps)(App);
// -------------------------------------------------------------