import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';
import Home from '../pages/Home';
import ChicagoArtwork from '../pages/ChicagoArtwork';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/art-institute-chicago" exact component={ChicagoArtwork} />
      {/* <Route path="/singin" exact component={SingIn} /> */}
      {/* <Route path="/singup" component={SingUp} /> */}
      {/* <Route path="/profile" component={Profile} isPrivate /> */}
      {/* <Route path="/favorite" component={Dashboard} isPrivate /> */}
    </Switch>
  );
};

export default Routes;
