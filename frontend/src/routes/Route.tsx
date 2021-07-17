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

  if (isPrivate && !user) {
    return <Redirect to="/login" />;
  }

  return (
    <ReactDomRoute
      {...rest}
      render={() => {
        return (
          <Layout>
            <Component />
          </Layout>
        );
      }}
    />
  );
};

export default Route;
