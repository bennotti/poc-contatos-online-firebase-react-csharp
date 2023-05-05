import { rest } from 'msw';
import { env } from '@infra/env';
import { ReturnApiDataHelper } from '@infra/mock/helper/return-api-data.helper';
import { AnyObject } from '@infra/types';
import * as jose from 'jose';
import {v4 as uuidv4} from 'uuid';


const secret = new TextEncoder().encode(
  env.MSW.JWT_SECRET,
);

export const mockLoginEndpointAuthHandler = [
  rest.post(
    `${env.API_URL}api/auth`,
    async (req, res, ctx) => {
      const myuuid = uuidv4();

      // console.log(req.headers);
      const payload = await req.json<AnyObject>();
      // console.log('payload', payload);

        //setNotBefore
        //setSubject
      const token = await new jose.SignJWT({
        servidor: payload.servidor,
        nome: payload.nome,
        username: payload.username,
        id: myuuid
      })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setIssuer(env.API_URL as string)
      .setAudience('PocFirebaseReactApi')
      .setAudience(payload.servidor)
      .setExpirationTime('2h')
      .setSubject(myuuid)
      .sign(secret);

      // console.log('jwt_token', token);

      return res(
        ctx.delay(1000),
        ctx.status(200),
        ctx.json(
          ReturnApiDataHelper.response({
            id_token: '',
            access_token: token,
            refresh_token: '',
            redirect_uri: '',
            token_type: 'Bearer',
            expires_in: '',
            access_token_expiration: '',
            refresh_token_expiration: '',
          })
        )
      );
    }
  ),
];
