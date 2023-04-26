// src/mocks/browser.js
import { RequestHandler, setupWorker, SetupWorker } from 'msw';

export function createWorker(handlers: RequestHandler[]): SetupWorker {
  return setupWorker(...handlers);
}
