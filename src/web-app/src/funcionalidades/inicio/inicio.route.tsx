import ProtectedRoutes from '@modulos/login/componentes/protected.router';
import { IReactRouterDinamico } from '@infra/types';
import { InicioScreen } from './telas/inicio.screen';

const inicioRouteModule: Array<IReactRouterDinamico> = [
    {
        path: '/inicio',
        element: <ProtectedRoutes />,
        childrens: [
          {
            path: '',
            element: <InicioScreen />,
          },
        ],
    },
];

export { inicioRouteModule };
