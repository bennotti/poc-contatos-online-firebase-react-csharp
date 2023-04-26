import { RequestHandler } from 'msw';

import { mockContatoEndpointListaHandler } from './endpoints/contato/listar.handlers';
import { mockLoginEndpointAuthHandler } from './endpoints/login/auth.handlers';

export const mockEndpointsHandlers: RequestHandler[] = [
    ...mockContatoEndpointListaHandler,
    ...mockLoginEndpointAuthHandler
];
