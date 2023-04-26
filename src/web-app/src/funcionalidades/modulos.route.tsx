import { IReactRouterDinamico } from '@infra/types';
import { Navigate } from 'react-router-dom';
import { inicioRouteModule } from './inicio/inicio.route';
import { loginRouteModule } from './login/login.route';

const rotasModulos: Array<IReactRouterDinamico> = [
  ...loginRouteModule,
  ...inicioRouteModule,
  {
    path: '/',
    element: <Navigate to={'/inicio'} />,
  },
];

export { rotasModulos };
