import { rest } from 'msw';
import { env } from '@infra/env';
import { ReturnApiDataTableHelper } from '@infra/mock/helper/return-api-data-table.helper';
import { AnyObject } from '@infra/types';
import * as jose from 'jose';
import { FirebaseDatabase } from '@infra/firebase';
import { ReturnApiHelper } from '@infra/mock/helper/return-api.helper';

const secret = new TextEncoder().encode(
  env.MSW.JWT_SECRET,
);

export const mockContatoEndpointFavoritosToggleHandler = [
  rest.post(
    `${env.API_URL}api/contato/favoritos/toggle`,
    async (req, res, ctx) => {

      let authorization: string = req.headers.get('authorization') ?? '';

      authorization = authorization.replace('Bearer ', '');

      let payload: AnyObject | null;

      try{
        const responseVerify = await jose.jwtVerify(
          authorization,
          secret,
          {
            issuer: env.API_URL as string,
            audience: 'PocFirebaseReactApi',
          }
        );
        
        payload = responseVerify.payload;
      } catch (e) {
        console.log(e);
        return res(
          ctx.delay(1000),
          ctx.status(401),
          ctx.json(
            ReturnApiDataTableHelper.response([])
          )
        );
      }
      const payloadBody = await req.json<AnyObject>();

      // obter info usuario
      const firebase = FirebaseDatabase.getInstance();

      let responseSnapshot = await firebase.obter(`${payload?.servidor}/${payload?.username}/favoritos/${payloadBody?.username}`);

      if (responseSnapshot.exists()) {
        await firebase.remover(
          `${payload?.servidor}/${payload?.username}/favoritos/${payloadBody?.username}`
        );
      } else {
        await firebase.criar(
          `${payload?.servidor}/${payload?.username}/favoritos/${payloadBody?.username}`,
          true
        );
      }

      return res(
        ctx.delay(1000),
        ctx.status(200),
        ctx.json(
          ReturnApiHelper.response()
        )
      );
    }
  ),
];
