import { rest } from 'msw';
import { env } from '@infra/env';
import { ReturnApiDataTableHelper } from '@infra/mock/helper/return-api-data-table.helper';
import { ReturnApiDataHelper } from '@infra/mock/helper/return-api-data.helper';
import { AnyObject } from '@infra/types';
import * as jose from 'jose';
import { FirebaseDatabase } from '@infra/firebase';
import slug from 'slug';



export const mockLoginEndpointValidaUsernameHandler = [
  rest.post(
    `${env.API_URL}api/valida/username`,
    async (req, res, ctx) => {
      
      const payload = await req.json<AnyObject>();

      if (!payload?.servidor || payload?.servidor === '') {
        return res(
          ctx.delay(1000),
          ctx.status(400),
          ctx.json(
            ReturnApiDataHelper.response(undefined,false, 400, 'Servidor inválido!')
          )
        );
      }

      const slugname = (payload?.username ? slug(payload?.username) : '').toLowerCase();
      
      const firebase = FirebaseDatabase.getInstance();

      const snapshot = await firebase.obter(`${payload?.servidor}/${slugname}`);

      return res(
        ctx.delay(1000),
        ctx.status(200),
        ctx.json(
          ReturnApiDataHelper.response({
            nome: payload?.username ?? '',
            slugname: slugname,
            existe: snapshot.exists()
          })
        )
      );
    }
  ),
];
