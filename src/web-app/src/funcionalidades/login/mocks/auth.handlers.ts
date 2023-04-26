import { rest } from 'msw';
import { env } from '@infra/env';
import { ReturnApiDataTableHelper } from '@infra/mock/helper/return-api-data-table.helper';
import { ReturnApiDataHelper } from '@infra/mock/helper/return-api-data.helper';
import { AnyObject } from '@infra/types';
import * as jose from 'jose';

import plainText from '@virtual:plain-text/certs/pkcs8';
console.log(plainText);
const algorithm = 'ES256'

export const privateKey = await jose.importPKCS8(plainText, algorithm);

export const mockLoginEndpointAuthHandler = [
  rest.post(
    `${env.API_URL}api/auth`,
    async (req, res, ctx) => {
      console.log(req.headers);
      const payload = await req.json<AnyObject>();
      console.log('payload', payload);

      const token = await new jose.SignJWT({ nome: payload.nome })
        .setProtectedHeader({ alg: 'ES256' })
        .setIssuedAt()
        .setIssuer(env.API_URL as string)
        .setAudience('PocFirebaseReactApi')
        .setExpirationTime('2h')
        .sign(privateKey);

      console.log('jwt_token', token);

      return res(
        ctx.delay(1000),
        ctx.status(200),
        ctx.json(
          ReturnApiDataHelper.response({
            accessToken: token
          })
        )
      );
    }
  ),
];
