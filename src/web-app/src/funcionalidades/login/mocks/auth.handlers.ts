import { rest } from 'msw';
import { env } from '@infra/env';
import { ReturnApiDataTableHelper } from '@infra/mock/helper/return-api-data-table.helper';
import { ReturnApiDataHelper } from '@infra/mock/helper/return-api-data.helper';
import { AnyObject } from '@infra/types';
import * as jose from 'jose';
import {v4 as uuidv4} from 'uuid';

import { db } from '@infra/firebase';
import { onValue, ref, set, child, get } from "firebase/database";

const secret = new TextEncoder().encode(
  env.MSW.JWT_SECRET,
);

const obterListaContatos = () => {
  const dbRef = ref(db);
  const query = ref(db, `contatos`);


  // set(query, {});

  /*
  https://medium.com/innovance-company-blog/how-to-connect-firebase-realtime-database-to-a-react-app-f7dcb983150a
  get(child(dbRef, `contatos/${userId}`)).then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val());
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});


set(ref(db, 'users/' + userId), {
  username: name,
  email: email,
  profile_picture : imageUrl
})
.then(() => {
  // Data saved successfully!
})
.catch((error) => {
  // The write failed...
});
  
  */

  console.log(query);
  return onValue(query, (snapshot) => {
    const data = snapshot.val();
    console.log(data);
    if (snapshot.exists()) {
      // Object.values(data).map((project) => {
      //   setContatos((projects) => [...projects, project as AnyObject]);
      // });
    } else {
      console.log("No data available");
    }
  });
};

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
        nome: payload.nome,
        id: myuuid
      })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setIssuer(env.API_URL as string)
      .setAudience('PocFirebaseReactApi')
      .setExpirationTime('2h')
      .setSubject(myuuid)
      .sign(secret);

      // console.log('jwt_token', token);

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
