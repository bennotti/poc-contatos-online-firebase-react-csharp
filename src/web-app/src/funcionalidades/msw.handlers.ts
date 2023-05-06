import { RequestHandler } from 'msw';
import { mockLoginEndpointAuthHandler } from './login/mocks/auth.handlers';
import { mockLoginEndpointUserInfoHandler } from './login/mocks/user-info.handlers';
import { mockLoginEndpointValidaServidorHandler } from './login/mocks/valida-servidor.handlers';
import { mockLoginEndpointValidaUsernameHandler } from './login/mocks/valida-username.handlers';
import { mockLoginEndpointEndSessionHandler } from './login/mocks/end-session.handlers';

export const mswHandlers: RequestHandler[] = [
    ...mockLoginEndpointValidaServidorHandler,
    ...mockLoginEndpointValidaUsernameHandler,
    ...mockLoginEndpointAuthHandler,
    ...mockLoginEndpointUserInfoHandler,
    ...mockLoginEndpointEndSessionHandler
];
