import { RequestHandler } from 'msw';

import { mockContatoEndpointListaHandler } from './endpoints/contato/listar.handlers';

export const mockEndpointsHandlers: RequestHandler[] = [
    ...mockContatoEndpointListaHandler
];
