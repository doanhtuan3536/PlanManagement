import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loading from '~/pages/Loading';
import { KeyRouteFullPath } from '~/utils';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();
  // console.log(isAuthenticated)

  if (loading) {
    return <Loading />;
  }

  return isAuthenticated 
  ? children 
  : <Navigate 
      to= {KeyRouteFullPath('login')}
      state={{ from: location }} 
      replace 
    />;
};

export default PrivateRoute;