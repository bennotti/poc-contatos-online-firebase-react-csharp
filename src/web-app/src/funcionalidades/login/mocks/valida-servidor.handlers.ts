import { rest } from 'msw';
import { env } from '@infra/env';
import { ReturnApiDataTableHelper } from '@infra/mock/helper/return-api-data-table.helper';
import { ReturnApiDataHelper } from '@infra/mock/helper/return-api-data.helper';
import { AnyObject } from '@infra/types';
import * as jose from 'jose';
import slug from 'slug';

import { db, getAuthAnonimo } from '@infra/firebase';
import { onValue, ref, set, child, get } from "firebase/database";

export const mockLoginEndpointValidaServidorHandler = [
  rest.post(
    `${env.API_URL}api/valida/servidor`,
    async (req, res, ctx) => {
      
      const payload = await req.json<AnyObject>();

      const slugname = (payload?.nome ? slug(payload?.nome) : '').toLowerCase();
      //slug.charmap['♥'] = 'freaking love'
      await getAuthAnonimo();
      // verificar se existe no firebase
      const dbRef = ref(db);

      const snapshot = await get(child(dbRef, `${slugname}`));

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
