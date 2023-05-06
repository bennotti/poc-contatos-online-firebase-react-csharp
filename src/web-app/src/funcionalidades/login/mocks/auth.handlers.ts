import { rest } from 'msw';
import { env } from '@infra/env';
import { ReturnApiDataHelper } from '@infra/mock/helper/return-api-data.helper';
import { AnyObject } from '@infra/types';
import * as jose from 'jose';
import {v4 as uuidv4} from 'uuid';
import slug from 'slug';
import { FirebaseDatabase } from '@infra/firebase';

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

      if (
        !payload
        || !payload?.servidor
        || payload?.servidor === ''
        || !payload?.username
        || payload?.username === ''
        || !payload?.nome
        || payload?.nome === ''
      ) {
        return res(
          ctx.delay(1000),
          ctx.status(400),
          ctx.json(
            ReturnApiDataHelper.response(undefined,false, 400, 'Servidor inválido!')
          )
        );
      }

      const servidorSlugname = (payload?.servidor ? slug(payload?.servidor) : '').toLowerCase();
      const usernameSlugname = (payload?.username ? slug(payload?.username) : '').toLowerCase();
      //slug.charmap['♥'] = 'freaking love'

      const firebase = FirebaseDatabase.getInstance();

      // const servidorSnapshot = await firebase.obter(`${servidorSlugname}`);

      // if (!servidorSnapshot.exists()) {
      //   // criar
      //   firebase.criar(
      //     `${servidorSlugname}`, 
      //     {
            
      //     }
      //   );
      // }

      let usernameSnapshot = await firebase.obter(`${servidorSlugname}/${usernameSlugname}`);

      if (!usernameSnapshot.exists()) {
        usernameSnapshot = await firebase.criar(
          `${servidorSlugname}/${usernameSlugname}`,
          {
            online: true,
            nome: payload?.nome,
            id: myuuid
          }
        );
      } else {
        usernameSnapshot = await firebase.atualizar(
          `${servidorSlugname}/${usernameSlugname}`,
          {
            online: true,
          }
        );
      }

      const token = await new jose.SignJWT({
        servidor: payload.servidor,
        nome: payload.nome,
        username: payload.username,
        id: myuuid
      })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setIssuer(env.API_URL as string)
      .setAudience(['PocFirebaseReactApi', payload.servidor])
      .setExpirationTime('2h')
      .setSubject(myuuid)
      .sign(secret);

      let expIn: number | undefined = 0;

      try{
        const responseVerify = await jose.jwtVerify(
          token,
          secret,
          {
            issuer: env.API_URL as string,
            audience: 'PocFirebaseReactApi',
          }
        );

        expIn = responseVerify.payload.exp;
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

      return res(
        ctx.delay(1000),
        ctx.status(200),
        ctx.json(
          ReturnApiDataHelper.response({
            id_token: token,
            access_token: token,
            refresh_token: token,
            redirect_uri: '',
            token_type: 'Bearer',
            expires_in: (120 * 60),
            access_token_expiration: expIn,
            refresh_token_expiration: expIn,
          })
        )
      );
    }
  ),
];
