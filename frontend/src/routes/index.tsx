import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';
import Home from '../pages/Home';
import ChicagoArtwork from '../pages/ChicagoArtwork';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import SignIn from '../pages/SignIn';
import Favorite from '../pages/Favorite';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/art-institute-chicago" exact component={ChicagoArtwork} />
      <Route path="/login" exact component={Login} isNotPrivate />
      <Route path="/signin" exact component={SignIn} isNotPrivate />
      <Route path="/profile" component={Profile} isPrivate />
      <Route path="/favorite" component={Favorite} isPrivate />
    </Switch>
  );
};

export default Routes;
