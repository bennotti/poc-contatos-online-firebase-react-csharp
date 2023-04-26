import { RequestHandler } from 'msw';
import { mockLoginEndpointAuthHandler } from './login/mocks/auth.handlers';

export const mswHandlers: RequestHandler[] = [
    ...mockLoginEndpointAuthHandler
];
