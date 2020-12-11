import React from 'react';
import App from './App';

import { BrowserRouter, Route } from 'react-router-dom';

import SignupPage from './client/components/signup/SignupPage'
import SigninPage from './client/components/signin/SigninPage'
import RoomRoute from './RoomRoute'
import Agreement from './client/Agreement';
import CreateRoom from './CreateRoom'

export default (
    <BrowserRouter>
        <Route exact path="/" component={ App } />
        <Route exact path="/signup" component={ SignupPage } />
        <Route exact path="/signin" component={ SigninPage } />
        <Route exact path="/join" component={ RoomRoute } />
        <Route exact path="/agreement" component={ Agreement } />
        <Route exact path="/creatRoom" component={ CreateRoom } />
    </BrowserRouter>
)
