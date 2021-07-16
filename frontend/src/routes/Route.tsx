import React from 'react';
import {
  RouteProps as ReactDOMRouteProps,
  Route as ReactDomRoute,
  Redirect,
} from 'react-router-dom';
import Layout from '../components/Layout';
import useAuth from '../hooks/auth/useAuth';

interface IRouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<IRouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <ReactDomRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === !!user ? (
          <Layout>
            <Component />
          </Layout>
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/singin' : '/',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
