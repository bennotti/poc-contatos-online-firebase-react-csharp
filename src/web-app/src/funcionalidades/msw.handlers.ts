import { RequestHandler } from 'msw';
import { mockLoginEndpointAuthHandler } from './login/mocks/auth.handlers';
import { mockLoginEndpointUserInfoHandler } from './login/mocks/user-info.handlers';

export const mswHandlers: RequestHandler[] = [
    ...mockLoginEndpointAuthHandler,
    ...mockLoginEndpointUserInfoHandler
];
