import { rest } from 'msw';
import { env } from '@infra/env';
import { ReturnApiDataTableHelper } from '@infra/mock/helper/return-api-data-table.helper';

export const mockContatoEndpointListaHandler = [
  rest.get(
    `${env.API_URI}api/contato`,
    (_, res, ctx) => {
      return res(
        ctx.delay(1000),
        ctx.status(200),
        ctx.json(
          ReturnApiDataTableHelper.response([])
        )
      );
    }
  ),
];
