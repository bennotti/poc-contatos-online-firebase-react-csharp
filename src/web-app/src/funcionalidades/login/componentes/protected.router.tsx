import { FC } from 'react';
import { Navigate, Outlet, RouteProps } from 'react-router-dom';

const isAutenticado = (): boolean => {
  var accessToken = localStorage.getItem('access_token');
  if (!accessToken) return false;

  // const expiraEm = new Date(accessToken.expires_at * 1000);

  // if (Date.now() > expiraEm.getTime()) return false;

  return !!accessToken;
};

const ProtectedRoutes: FC<RouteProps> = () => {
  const isAutenticadoResponse = isAutenticado();
  if (!isAutenticadoResponse) {
    localStorage.clear();
    sessionStorage.clear();
    return (<Navigate to={'/login'} />);
  }

  return (<Outlet />);
};

export default ProtectedRoutes;
