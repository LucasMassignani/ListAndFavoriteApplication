import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';
import Home from '../pages/Home';
import ChicagoArtwork from '../pages/ChicagoArtwork';
import SignIn from '../pages/SignIn';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/art-institute-chicago" exact component={ChicagoArtwork} />
      {/* <Route path="/login" exact component={Login} /> */}
      <Route path="/signin" component={SignIn} />
      {/* <Route path="/profile" component={Profile} isPrivate /> */}
      {/* <Route path="/favorite" component={Dashboard} isPrivate /> */}
    </Switch>
  );
};

export default Routes;
