import { rest } from 'msw';
import { env } from '@infra/env';
import { ReturnApiDataTableHelper } from '@infra/mock/helper/return-api-data-table.helper';
import { AnyObject } from '@infra/types';
import * as jose from 'jose';
import { FirebaseDatabase } from '@infra/firebase';

const secret = new TextEncoder().encode(
  env.MSW.JWT_SECRET,
);

export const mockContatoEndpointListaDisponivelHandler = [
  rest.get(
    `${env.API_URL}api/contato/disponivel`,
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

      // obter info usuario
      const firebase = FirebaseDatabase.getInstance();

      const snapshot = await firebase.obter(`${payload?.servidor}`);
      let records: Array<AnyObject> = [];
      if (snapshot.exists()) {
        records = await Promise.all(Object.values(snapshot.val()).map(async (contato) => {
          const contatoFavorito = await firebase.obter(`${payload?.servidor}/${payload?.username}/favoritos/${(contato as AnyObject).username}`)
          return {
            ...(contato as AnyObject),
            favorito: contatoFavorito.exists()
          };
        }));
      }
      // console.log(data);
      // console.log(Object.values(data));
      // Object.values(data).map((project) => {
      //    setContatos((projects) => [...projects, project as AnyObject]);
      // });
      // console.log(records);
      return res(
        ctx.delay(1000),
        ctx.status(200),
        ctx.json(
          ReturnApiDataTableHelper.response(records)
        )
      );
    }
  ),
];
