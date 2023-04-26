import ProtectedRoutes from '@modulos/login/componentes/protected.router';
import { IReactRouterDinamico } from '@infra/types';
import { LoginScreen } from './telas/login.screen';

const loginRouteModule: Array<IReactRouterDinamico> = [
    {
        path: '/login',
        element: <LoginScreen />
    },
];

export { loginRouteModule };
