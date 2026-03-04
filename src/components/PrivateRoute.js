import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loading from '~/pages/Loading';
import { KeyRouteFullPath } from '~/utils';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  console.log(isAuthenticated)

  if (loading) {
    return <Loading />;
  }

  return isAuthenticated ? children : <Navigate to= {KeyRouteFullPath('login')} />;
};

export default PrivateRoute;