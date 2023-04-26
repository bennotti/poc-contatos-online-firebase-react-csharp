import { rest } from 'msw';

export const defaultHandlers = [
  rest.get('*', (req, res, ctx) => {
    return res(ctx.status(404), ctx.json({}));
  }),
  rest.post('*', (req, res, ctx) => {
    return res(ctx.status(404), ctx.json({}));
  }),
  rest.patch('*', (req, res, ctx) => {
    res(ctx.status(404), ctx.json({}));
  }),
  rest.put('*', (req, res, ctx) => {
    res(ctx.status(404), ctx.json({}));
  }),
  rest.delete('*', (req, res, ctx) => {
    res(ctx.status(404), ctx.json({}));
  }),
];
