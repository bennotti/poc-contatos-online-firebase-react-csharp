import { rest } from 'msw';
import { env } from '@infra/env';
import { ReturnApiDataTableHelper } from '@infra/mock/helper/return-api-data-table.helper';
import { ReturnApiDataHelper } from '@infra/mock/helper/return-api-data.helper';
import { AnyObject } from '@infra/types';
import * as jose from 'jose';

const secret = new TextEncoder().encode(
  env.MSW.JWT_SECRET,
);

export const mockLoginEndpointValidaUsernameHandler = [
  rest.post(
    `${env.API_URL}api/valida/username`,
    async (req, res, ctx) => {

      return res(
        ctx.delay(1000),
        ctx.status(200),
        ctx.json(
          ReturnApiDataHelper.response({
            
          })
        )
      );
    }
  ),
];
