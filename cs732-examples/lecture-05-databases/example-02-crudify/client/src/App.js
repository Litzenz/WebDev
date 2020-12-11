import React from 'react';
import { Container, Jumbotron } from 'react-bootstrap';
import { Route, Switch, Redirect } from 'react-router-dom';
import UsersPage from './pages/users-page';

export default function App() {
  return (
    <>
      <Jumbotron fluid>
        <Container>
          <h1>Pet Registry</h1>
          <p>A simple pet registry client</p>
        </Container>
      </Jumbotron>
      <Switch>
        <Route path="/users">
          <UsersPage />
        </Route>
        <Route path="*">
          <Redirect to="/users" />
        </Route>
      </Switch>
    </>
  );
}