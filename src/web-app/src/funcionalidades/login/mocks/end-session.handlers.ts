import { rest } from 'msw';
import { env } from '@infra/env';
import { ReturnApiDataHelper } from '@infra/mock/helper/return-api-data.helper';
import { AnyObject } from '@infra/types';
import * as jose from 'jose';
import { FirebaseDatabase } from '@infra/firebase';
import {v4 as uuidv4} from 'uuid';

const secret = new TextEncoder().encode(
  env.MSW.JWT_SECRET,
);

export const mockLoginEndpointEndSessionHandler = [
  rest.post(
    `${env.API_URL}api/auth/end-session`,
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
            ReturnApiDataHelper.response({})
          )
        );
      }

      // obter info usuario
      const firebase = FirebaseDatabase.getInstance();

      let usernameSnapshot = await firebase.obter(`${payload?.servidor}/${payload?.username}`);

      if (!usernameSnapshot.exists()) {
        const myuuid = uuidv4();
        usernameSnapshot = await firebase.criar(
          `${payload?.servidor}/${payload?.username}`,
          {
            online: false,
            nome: payload?.nome,
            id: myuuid,
            lastPing: new Date
          }
        );
      } else {
        usernameSnapshot = await firebase.atualizar(
          `${payload?.servidor}/${payload?.username}`,
          {
            online: false,
            lastPing: new Date
          }
        );
      }

      return res(
        ctx.delay(1000),
        ctx.status(200),
        ctx.json(
          ReturnApiDataHelper.response({
            ...payload,
            snapshot: usernameSnapshot.val()
          })
        )
      );
    }
  ),
];
