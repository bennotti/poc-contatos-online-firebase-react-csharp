import { rest } from 'msw';
import { env } from '@infra/env';
import { ReturnApiDataHelper } from '@infra/mock/helper/return-api-data.helper';
import { AnyObject } from '@infra/types';
import slug from 'slug';

import { FirebaseDatabase } from '@infra/firebase';

export const mockLoginEndpointValidaServidorHandler = [
  rest.post(
    `${env.API_URL}api/valida/servidor`,
    async (req, res, ctx) => {
      
      const payload = await req.json<AnyObject>();

      if (!payload?.nome || payload?.nome === '') {
        return res(
          ctx.delay(1000),
          ctx.status(400),
          ctx.json(
            ReturnApiDataHelper.response(undefined,false, 400, 'Servidor inválido!')
          )
        );
      }

      const slugname = (payload?.nome ? slug(payload?.nome) : '').toLowerCase();
      //slug.charmap['♥'] = 'freaking love'

      const firebase = FirebaseDatabase.getInstance();

      const snapshot = await firebase.obter(`${slugname}`);

      // if (snapshot.exists()) {
      //   console.log(snapshot.val());
      // } else {
      //   console.log("No data available");
      // }

      return res(
        ctx.delay(1000),
        ctx.status(200),
        ctx.json(
          ReturnApiDataHelper.response({
            nome: payload?.nome ?? '',
            slugname: slugname,
            existe: snapshot.exists()
          })
        )
      );
    }
  ),
];
